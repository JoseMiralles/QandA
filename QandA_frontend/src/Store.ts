import { QuestionData } from "./QuestionsData";
import { Store, createStore, combineReducers } from "redux"
import { quesitonsReducer } from "./Reducers/QuestionsReducer";

interface IQuestionState {
    readonly loading: boolean;
    readonly unanswered: QuestionData[];
    readonly viewing: QuestionData | null;
    readonly searched: QuestionData[];
}

export interface IAppState {
    readonly questions: IQuestionState;
}

export const initialQuestionState: IQuestionState = {
    loading: false,
    unanswered: [],
    viewing: null,
    searched: []
}

const rootReducer = combineReducers<IAppState>({
    questions: quesitonsReducer
});

export const configureStore = (): Store<IAppState> => {
    const store = createStore(rootReducer, undefined);
    return store;
};