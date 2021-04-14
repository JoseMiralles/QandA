import React from "react";

import { AnswerData } from "./QuestionsData";
import { Answer } from "./Answer";

interface Props {
    data: AnswerData[];
}

export const AnswerList = ({ data }: Props): JSX.Element => {

    return (
        <ul className='answer-list'>
            {data.map(a => (
                <li key={a.answerId}>
                    <Answer data={a} />
                </li>
            ))}
        </ul>
    );
};