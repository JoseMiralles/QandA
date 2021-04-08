import React from "react";

import './styles/QuestionList.scss';

import { QuestionData } from "./QuestionsData";
import { Question } from "./Question";

interface Props {
    data: QuestionData[];
    renderItem?: (item: QuestionData) => JSX.Element;
}

export const QuestionList = ({ data, renderItem }: Props) => (
    <ul className='question-list'>
        { data && data.map(question => (
            <li key={question.questionId}>
                {
                    renderItem
                        ? renderItem(question)
                        : <Question data={ question } />
                }
            </li>
        ))}
    </ul>
);