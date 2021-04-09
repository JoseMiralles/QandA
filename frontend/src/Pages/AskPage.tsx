import React from "react";
import { Page } from "../Page";
import { useForm } from "react-hook-form";

import "../styles/form.scss";

type FormData = {
    title: string;
    content: string;
};

const AskPage = (): JSX.Element => {

    const { register, watch, formState: { errors } } = useForm<FormData>({ mode: "onBlur" });

    return (
        <Page title="Ask a question">
            <form className="form card-shadow">


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
                    {...register("content", {required: true, minLength: 50})}
                />

                <button className="btn btn-primary" type="submit">Submit Question</button>

            </form>
        </Page>
    );
};

export default AskPage;