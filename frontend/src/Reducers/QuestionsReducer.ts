import { GETTINGQUESTION, GETTINGUNANSWEREDQUESTIONS, GOTQUESTION, GOTUNANSWEREDQUESTIONS, QuestionActions, SEARCHEDQUESTIONS, SEARCHINGQUESTIONS } from "../Actions/QuestionActions";
import { initialQuestionState } from "../Store";

export const quesitonsReducer = (state = initialQuestionState, action: QuestionActions) => {

    Object.freeze(state);

    switch (action.type) {

        case GETTINGUNANSWEREDQUESTIONS: {
            return {
                ...state,
                loading: true
            }
        }
            
        case GOTUNANSWEREDQUESTIONS: {
            return {
                ...state,
                loading: false,
                unanswered: action.questions
            }
        }
            
        case GETTINGQUESTION: {
            return {
                ...state,
                loading: true,
                viewing: null
            }
        }
            
        case GOTQUESTION: {
            return {
                ...state,
                loading: false,
                viewing: action.question
            }
        }
            
        case SEARCHINGQUESTIONS: {
            return {
                ...state,
                loading: false,
                searched: []
            }
        }
            
        case SEARCHEDQUESTIONS: {
            return {
                ...state,
                loading: false,
                searched: action.questions
            }
        }
        
        default: return state;
    }

};