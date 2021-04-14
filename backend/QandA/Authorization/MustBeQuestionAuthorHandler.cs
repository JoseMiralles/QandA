using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using QandA.Data;

namespace QandA.Authorization
{
    public class MustBeQuestionAuthorHandler: AuthorizationHandler<MustBeQuestionAuthorRequirement>
    {
        private readonly IDataRepository _dataRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public MustBeQuestionAuthorHandler(
            IDataRepository dataRepository,
            IHttpContextAccessor httpContextAccessor
        )
        {
            this._dataRepository = dataRepository;
            this._httpContextAccessor = httpContextAccessor;
        }

        protected async override Task HandleRequirementAsync(AuthorizationHandlerContext context, MustBeQuestionAuthorRequirement requirement)
        {
            if (!context.User.Identity.IsAuthenticated)
            {
                // The user isn't authenticated, leave.
                context.Fail();
                return;
            }

            // Get the questionId from the RouteValues dictionary.
            var questionId = _httpContextAccessor.HttpContext.Request.RouteValues["questionId"];
            int questionIdAsInt = Convert.ToInt32(questionId);

            // Get the userId from the user's identity claims.
            var userId = context.User.FindFirst(ClaimTypes.NameIdentifier).Value;

            // Lookup the question with the questionId.
            var question = _dataRepository.GetQuestion(questionIdAsInt);
            if (question == null)
            {
                // Let the request trough. This is so that a 404 / not found code can be returned.
                context.Succeed(requirement);
                return;
            }

            // Check that the userId from the user's claims matches the userId from the question in the database.
            if (question.UserId != userId)
            {
                // The user is not the owner, so they are not authorized.
                context.Fail();
                return;
            }

            // User is authorized, proceed.
            context.Succeed(requirement);

        }
    }
}