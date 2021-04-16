import { AnswerList } from "./AnswerList";
import { http } from "./http";
import { getAccessToken } from "./Auth";

export interface QuestionData {
  questionId: number;
  title: string;
  content: string;
  userName: string;
  created: Date;

  answers: AnswerData[];
}

export interface AnswerData {
  answerId: number;
  content: string;
  userName: string;
  created: Date;
}

export interface PostQuestionData {
  title: string;
  content: string;
  userName: string;
  created: Date;
}

export interface PostAnwerData {
  questionId: number;
  content: string;
  userName: string;
  created: Date;
}

export interface QuestionDataFromServer {
  questionId: number;
  title: string;
  content: string;
  userName: string;
  created: string;
  answers: Array<{
    answerId: number;
    content: string;
    userName: string;
    created: string;
  }>;
}

export const postQuesiton =
  async (question: PostQuestionData): Promise<QuestionData | undefined> => {
    const accessToken = await getAccessToken();
    const result = await http<QuestionDataFromServer, PostQuestionData>({
      path: "/questions",
      method: 'post',
      body: question,
      accessToken
    });
    if (result.ok && result.body) return mapQuestionFromServer(result.body);
    return undefined;
  };

export const postAnswer =
  async (answer: PostAnwerData): Promise<AnswerData | undefined> => {
    const accessToken = await getAccessToken();
    const result = await http<AnswerData, PostAnwerData>({
      path: "/questions/answers",
      method: "post",
      body: answer,
      accessToken
    });
    if (result.ok) return result.body;
    return undefined;
  };

export const getUnansweredQuestions = async (): Promise<QuestionData[]> => {

  const result = await http<QuestionDataFromServer[]>({ path: '/questions/unanswered' });
  
  if (result.ok && result.body) {
    return result.body.map(mapQuestionFromServer);
  } else {
    return [];
  }

};

export const getQuestion = async (id: number): Promise<QuestionData | null> => {
  
  const result = await http<QuestionDataFromServer>({
    path: `/questions/${id}`
  });

  if (result.ok && result.body) {
    return mapQuestionFromServer(result.body);
  }
  
  return null;

};

export const searchQuestions = async (query: string): Promise<QuestionData[]> => {
  const result = await http<QuestionDataFromServer[]>({
    path: `/questions?search=${query}`
  });

  if (result.ok && result.body) {
    return result.body.map(mapQuestionFromServer);
  } else {
    return [];
  }
};

const wait = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const mapQuestionFromServer = (
  question: QuestionDataFromServer,
): QuestionData => ({
  ...question,
  created: new Date(question.created),
  answers: question.answers
    ? question.answers.map((answer) => ({
        ...answer,
        created: new Date(answer.created),
      }))
    : [],
});