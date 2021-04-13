using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using QandA.Data;
using QandA.Data.Models;

namespace QandA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly IDataRepository _dataRepository;

        private readonly IQuestionCache _cache;

        public QuestionsController(IDataRepository dataRepository, IQuestionCache questionCache)
        {
            this._dataRepository = dataRepository;
            this._cache = questionCache;
        }

        [HttpGet]
        public IEnumerable<QuestionGetManyResponse> GetQuestions(
            string search,
            bool includeAnswers,
            int page = 1,
            int pageSize = 20)
        {
            if (String.IsNullOrEmpty(search))
            {
                if (includeAnswers) return _dataRepository.GetQuestionsWithAnswers();
                return _dataRepository.GetQuestions();
            }
            else
            {
                return _dataRepository.GetQuestionsBySearchWithPaging(
                    search, page, pageSize
                );
            }
        }

        // api/questions/unanswered
        [HttpGet("unanswered")]
        public async Task <IEnumerable<QuestionGetManyResponse>> GetUnansweredQuestions()
        {
            return await _dataRepository.GetUnansweredQuestionsAsync();
        }

        // api/questions/:quesitonId
        [HttpGet("{questionId}")]
        public ActionResult<QuestionGetSingleResponse> GetQuestion(int questionId)
        {
            var question = this._cache.Get(questionId);

            if (question == null)
            {
                question = _dataRepository.GetQuestion(questionId);
                if (question == null) return NotFound();
                // The question was not in the cache, but it was found, so store it in the cache.
                this._cache.Set(question);
            }

            return question;
        }

        [HttpPost]
        public ActionResult<QuestionGetSingleResponse> PostQuestion(QuestionPostRequest questionPostRequest)
        {
            var savedQuestion = _dataRepository.PostQuestion(
                new QuestionPostFullRequest {
                    Title = questionPostRequest.Title,
                    Content = questionPostRequest.Content,
                    UserId = "1",
                    UserName = "bob.test@test.com",
                    Created = DateTime.UtcNow
                });

            return CreatedAtAction(nameof(GetQuestion),
                new { questionId = savedQuestion.QuestionId },
                savedQuestion);
        }

        [HttpPut("{questionId}")]
        public ActionResult<QuestionGetSingleResponse> PutQuestion(int questionId, QuestionPutRequest questionPutRequest)
        {
            var question = _dataRepository.GetQuestion(questionId);

            if (question == null) return NotFound();

            question.Title = string.IsNullOrEmpty(questionPutRequest.Title)
                ? question.Title // Keep the original title.
                : questionPutRequest.Title; // Replace with new title.

            question.Content = string.IsNullOrEmpty(questionPutRequest.Content)
                ? question.Content
                : questionPutRequest.Content;

            var savedQuestion = _dataRepository.PutQuestion(questionId, questionPutRequest);

            // Remove this question from the cache, since it has been edited.
            this._cache.Remove(questionId);

            return savedQuestion;
        }

        [HttpDelete("{questionId}")]
        public ActionResult DeleteQuestion(int questionId)
        {
            var question = _dataRepository.GetQuestion(questionId);

            if (question == null) return NotFound();

            _dataRepository.DeleteQuestion(questionId);
            this._cache.Remove(questionId); // Delete from cache as well.
            return NoContent();
        }

        [HttpPost("answer")]
        public ActionResult<AnswerGetResponse> PostAnswer(AnswerPostRequest answer)
        {
            var questionExists = _dataRepository.QuestionExists(answer.QuestionId.Value);

            if (!questionExists) return NotFound();

            var savedAnswer = _dataRepository.PostAnswer(
                new AnswerPostFullRequest {
                    QuestionId = answer.QuestionId.Value,
                    Content = answer.Content,
                    UserId = "1",
                    UserName = "bob.test@test.com",
                    Created = DateTime.UtcNow
                });

            this._cache.Remove(answer.QuestionId.Value); // Remove from cache.
            return savedAnswer;
        }

    }
}
