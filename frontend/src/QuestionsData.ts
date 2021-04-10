import { AnswerList } from "./AnswerList";

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

const questions: QuestionData[] = [
  {
    questionId: 1,
    title: 'Why should I learn TypeScript?',
    content:
      'TypeScript seems to be getting popular so I wondered whether it is worth my time learning it? What benefits does it give over JavaScript?',
    userName: 'Bob',
    created: new Date(),
    answers: [
      {
        answerId: 1,
        content: 'To catch problems earlier speeding up your developments',
        userName: 'Jane',
        created: new Date(),
      },
      {
        answerId: 2,
        content:
          'So, that you can use the JavaScript features of tomorrow, today',
        userName: 'Fred',
        created: new Date(),
      },
    ],
  },
  {
    questionId: 2,
    title: 'Which state management tool should I use?',
    content:
      'There seem to be a fair few state management tools around for React - React, Unstated, ... Which one should I use?',
    userName: 'Bob',
    created: new Date(),
    answers: [],
  },
  {
    questionId: 3,
    title: 'Which state management tool should I use?',
    content:
      'There seem to be a fair few state management tools around for React - React, Unstated, ... Which one should I use?',
    userName: 'Bob',
    created: new Date(),
    answers: [],
  },
];

export const postQuesiton =
  async (question: PostQuestionData): Promise<QuestionData | undefined> => {
    await wait(1000);
    const questionId = Math.max(...questions.map(q => q.questionId)) + 1;
    const newQuestion: QuestionData = {
      ...question,
      questionId,
      answers: []
    };
    questions.push(newQuestion);
    return newQuestion;
  };

export const postAnswer =
  async (answer: PostAnwerData): Promise<AnswerData | undefined> => {
    await wait(1000);
    
    const question: QuestionData = questions.filter(q => q.questionId === answer.questionId)[0];
    const newAnswer: AnswerData = { answerId: 99, ...answer }
    question.answers.push(newAnswer);
    
    return newAnswer;
  };

export const getUnansweredQuestions = async (): Promise<QuestionData[]> => {
  await wait(1000);
  return questions.filter(q => q.answers.length === 0);
};

export const getQuestion = async (id: number): Promise<QuestionData | null> => {
  await wait(1000);
  const results = questions.filter(q => q.questionId === id);

  return results[0] ? results[0] : null;
};

export const searchQuestions = async (query: string): Promise<QuestionData[]> => {
  await wait(1000);
  return questions.filter(q =>
    q.content.toLowerCase().includes(query.toLowerCase()) ||
    q.title.toLowerCase().includes(query.toLowerCase())
  );
};

const wait = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};