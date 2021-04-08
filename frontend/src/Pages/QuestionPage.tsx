import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Page } from "../Page";
import { QuestionData, getQuestion } from "../QuestionsData";

export const QuestionPage = () => {

    const { questionId } = useParams();

    const [question, setQuestion] = React.useState<QuestionData | null>();
    
    useEffect(() => {

        const doGetQuestion = async (questionId: number) => {
            const result = await getQuestion(questionId);
            setQuestion(result);
        }

        if (questionId) doGetQuestion(Number(questionId));

    }, [questionId]);

    return (
        <Page>
            <div>
                <div>
                    { question ? question.title : `loading..` }
                </div>
            </div>
        </Page>
    );
};