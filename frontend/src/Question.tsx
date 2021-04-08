import React from "react";
import { QuestionData } from "./QuestionsData";

interface Props {
    data: QuestionData;
    showContent?: boolean;
}

export const Question = ({ data, showContent = true }: Props) => (
    <div>
        <h4>
            {data.title}
        </h4>
        {
            showContent &&
            (<div className='preview'>
                {
                    data.content.length > 50
                        ? `${data.content.substring(0, 50)}...`
                        : data.content
                }
            </div>)
        }
        <small>
            {`Asked by ${data.userName} on ${data.created.toLocaleDateString()} ${data.created.toLocaleTimeString()}`}
        </small>
    </div>
);