import React from "react";
import { Page } from "../Page";
import { useForm, useFormState } from "react-hook-form";

import { postQuesiton } from "../QuestionsData";

import "../styles/form.scss";

type FormData = {
    title: string;
    content: string;
};

const AskPage = (): JSX.Element => {

    const [successfullySubmitted, setSuccessfullySubmitted] = React.useState<boolean>(false);
    const { register, handleSubmit, formState, formState: { errors } } = useForm<FormData>({ mode: "onBlur" });

    const submitForm = async (data: FormData) => {
        const result = await postQuesiton({
            title: data.title,
            content: data.content,
            userName: 'Fred',
            created: new Date()
        });
        result && setSuccessfullySubmitted(true);
    };

    return (
        <Page title="Ask a question">
            <form onSubmit={handleSubmit(submitForm)}>
                <fieldset className="form card-shadow" disabled={formState.isSubmitting || successfullySubmitted}>


                    {errors.title && errors.title.type === "required" && (
                        <b className="error text-danger">You must enter the question title!</b>
                    )}
                    {errors.title && errors.title.type === 'minLength' && (
                        <b className="error text-danger">Title needs to be at least 10 characters!</b>
                    )}
                    <label htmlFor="title">Title</label>
                    <input id="title" type="text"
                        {...register("title", { required: true, minLength: 10 })} />

                    {errors.content && errors.content.type === "required" && (
                        <b className="error text-danger">You must enter the question content!</b>
                    )}
                    {errors.content && errors.content.type === "minLength" && (
                        <b className="error text-danger">The body needs to be at least 50 characters!</b>
                    )}
                    <label htmlFor="content">Content</label>
                    <textarea id="content"
                        {...register("content", { required: true, minLength: 50 })}
                    />

                    <hr />

                    <button className="btn btn-primary" type="submit">Submit Question</button>

                    {successfullySubmitted && (
                        <b className="text-primary">Your question was submitted!</b>
                    )}

                </fieldset>
            </form>
        </Page>
    );
};

export default AskPage;