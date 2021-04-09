import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Page } from "../Page";
import { QuestionData, getQuestion } from "../QuestionsData";
import { AnswerList } from "../AnswerList";

import "../styles/Question.scss";
import "../styles/form.scss";

export const QuestionPage = () => {

    const { questionId } = useParams();
    const [question, setQuestion] = React.useState<QuestionData | null>();
    const { register, watch, errors } = useForm<FormData>({mode: 'onBlur'});
    
    useEffect(() => {

        const doGetQuestion = async (questionId: number) => {
            const result = await getQuestion(questionId);
            setQuestion(result);
        }

        if (questionId) doGetQuestion(Number(questionId));

    }, [questionId]);

    return (
        <Page>
            <div className="Question">

                <h3>
                    { question ? question.title : `loading..` }
                </h3>

                {question && (
                    <>
                        <br/>
                        <p>{question.content}</p>
                        <i>
                            {`Asked by ${question.userName} on
                            ${question.created.toLocaleDateString()}
                            ${question.created.toLocaleTimeString()}`}
                        </i>

                        <hr />
                        
                        {question.answers && <AnswerList data={question.answers} />}
                        
                        <form className="form shadow">
                            <label htmlFor="content">Your Answer</label>
                            <textarea id="content"
                                {...register("content", { required: true, minLength: 10 })}
                            />
                            
                            <button className="btn btn-primary" type="submit">Submit Your Answer</button>
                        </form>
                    </>
                )}

            </div>
        </Page>
    );
};