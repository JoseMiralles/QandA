import React from "react";
import { AnswerData } from "./QuestionsData";

interface Props {
    data: AnswerData;
};

export const Answer = ({ data }: Props): JSX.Element => {

    return (
        <>
            <p>{data.content}</p>
            <i>{`Answered by ${data.userName} on ${data.created.toLocaleDateString()} ${data.created.toLocaleTimeString()}`}</i>
        </>
    );
}