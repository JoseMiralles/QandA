using QandA.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.Extensions.Caching.Memory;

namespace QandA.Data
{
    public class QuestionCache : IQuestionCache
    {
        private MemoryCache _cache { get; set; }

        public QuestionCache()
        {
            _cache = new MemoryCache
                (
                    new MemoryCacheOptions
                    {
                        SizeLimit = 100
                    }
                );
        }

        private string GetCacheKey(int questionId) => $"Question-{questionId}";

        /// <summary>
        /// Attempts to get a question from the cache.
        /// </summary>
        /// <param name="questionId">The id of the question to be retreived.</param>
        /// <returns>Null if the question is not found.</returns>
        public QuestionGetSingleResponse Get(int questionId)
        {
            QuestionGetSingleResponse question;
            _cache.TryGetValue(
                GetCacheKey(questionId),
                out question
            );
            return question;
        }

        /// <summary>
        /// Removes a question from the cache.
        /// </summary>
        /// <param name="questionId"></param>
        public void Remove(int questionId)
        {
            _cache.Remove(GetCacheKey(questionId));
        }

        /// <summary>
        /// Stores the given question into the cache, and sets the id of the question as the key.
        /// </summary>
        /// <param name="question"></param>
        public void Set(QuestionGetSingleResponse question)
        {
            var cacheEntryOptions = new MemoryCacheEntryOptions().SetSize(1);
            _cache.Set(
                key: GetCacheKey(question.QuestionId),
                value: question,
                options: cacheEntryOptions
            );
        }

    }
}
