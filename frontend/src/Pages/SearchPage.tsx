import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { Page } from "../Page";
import { QuestionList } from "../QuestionList";
import { QuestionData, searchQuestions } from "../QuestionsData";

export const SearchPage = () => {

    const [searchParams] = useSearchParams();
    const [questions, setQuestions] = React.useState<QuestionData[] | null>([]);
    const search: string = searchParams.get('criteria') || "";

    React.useEffect(() => {
        const doSearchQuestions = async () => {
            const results: QuestionData[] = await searchQuestions(search);
            results && setQuestions(results);
        }
        doSearchQuestions();
    }, [search]);

    return (
        <Page title="Search Results">
            {
                questions
                    ? <QuestionList data={questions} />
                    : <p>Loading...</p>
                }
        </Page>
    );
};