import { QuestionData } from "../QuestionsData";

export const GETTINGUNANSWEREDQUESTIONS = "GETTINGUNANSWEREDQUESTIONS";
export const gettingUnansweredQuestionsAction = () => ({
    type: GETTINGUNANSWEREDQUESTIONS
} as const);

export const GOTUNANSWEREDQUESTIONS = "GOTUNANSWEREDQUESTIONS";
export const gotUnansweredQuestionsAction = (questions: QuestionData[]) => ({
    type: GOTUNANSWEREDQUESTIONS,
    questions
} as const);

export const GETTINGQUESTION = "GETTINGQUESTION";
export const gettingQuestionAction = () => ({
    type: GETTINGQUESTION
} as const);

export const GOTQUESTION = "GOTQUESTION";
export const gotQuestionAction = (question: QuestionData | null) => ({
    type: GOTQUESTION,
    question
} as const);

export const SEARCHINGQUESTIONS = "SEARCHINGQUESTIONS";
export const searchingQuestionsAction = () => ({
    type: SEARCHINGQUESTIONS
} as const);

export const SEARCHEDQUESTIONS = "SEARCHEDQUESTIONS";
export const searchedQuestionsAction = (questions: QuestionData[]) => ({
    type: SEARCHEDQUESTIONS,
    questions
} as const);

export type QuestionActions =
    | ReturnType<typeof gettingUnansweredQuestionsAction>
    | ReturnType<typeof gotUnansweredQuestionsAction>
    | ReturnType<typeof gettingQuestionAction>
    | ReturnType<typeof gotQuestionAction>
    | ReturnType<typeof searchingQuestionsAction>
    | ReturnType<typeof searchedQuestionsAction>;

