import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm, useFormState } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { Page } from "../Page";
import { QuestionData, getQuestion, postAnswer } from "../QuestionsData";
import { AnswerList } from "../AnswerList";
import { gettingQuestionAction, gotQuestionAction } from "../Actions/QuestionActions";

import "../styles/Question.scss";
import "../styles/form.scss";
import { IAppState } from "../Store";
import { useAuth } from "../Auth";

type FormData = {
    content: string;
};

export const QuestionPage = () => {

    const dispatch = useDispatch();
    const question = useSelector((state: IAppState) => state.questions.viewing);

    const { isAuthenticated } = useAuth();
    const { questionId } = useParams();
    const [submitted, setSubmitted] = React.useState<boolean>(false);
    const { register, handleSubmit, formState, formState: { errors } } = useForm<FormData>({ mode: "onBlur" });

    useEffect(() => {

        const doGetQuestion = async (questionId: number) => {
            dispatch(gettingQuestionAction());
            const result = await getQuestion(questionId);
            dispatch(gotQuestionAction(result));
        }

        if (questionId) doGetQuestion(Number(questionId));

    }, [questionId]);

    const submitForm = async (data: FormData) => {
        if (!question) return;
        const result = await postAnswer({
            content: data.content,
            questionId: question.questionId,
            userName: question.userName,
            created: new Date()
        });
        result && setSubmitted(true);
    };

    return (
        <Page>
            <div className="Question">

                <h3>
                    {question ? question.title : `loading..`}
                </h3>

                {question && (
                    <>
                        <br />
                        <p>{question.content}</p>
                        <i>
                            {`Asked by ${question.userName} on
                            ${question.created.toLocaleDateString()}
                            ${question.created.toLocaleTimeString()}`}
                        </i>

                        <hr />

                        {question.answers && <AnswerList data={question.answers} />}

                        {isAuthenticated ?
                            <form onSubmit={handleSubmit(submitForm)}>
                                <fieldset className="form shadow"
                                    disabled={formState.isSubmitting || submitted ? true : false}>

                                    {errors.content && errors.content.type === "required" && (
                                        <b className="error text-danger">The body of the answer is required!</b>
                                    )}
                                    {errors.content && errors.content.type === "minLength" && (
                                        <b className="error text-danger">Answers need to at least 10 characters!</b>
                                    )}
                                    <label htmlFor="content">Your Answer</label>
                                    <textarea id="content"
                                        {...register("content", { required: true, minLength: 10 })}
                                    />

                                    <button className="btn btn-primary" type="submit">Submit Your Answer</button>

                                    {submitted && <b className="text-primary">Question submitted!</b>}

                                </fieldset>
                            </form> :
                            <p>Sign in to answer.</p>
                        }
                    </>
                )}

            </div>
        </Page>
    );
};