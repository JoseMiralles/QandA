import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Page } from "../Page";
import { QuestionList } from "../QuestionList";
import { QuestionData, searchQuestions } from "../QuestionsData";
import { searchingQuestionsAction, searchedQuestionsAction } from "../Actions/QuestionActions";
import { IAppState } from "../Store";

export const SearchPage = () => {

    const dispatch = useDispatch();
    const questions = useSelector((state: IAppState) => state.questions.searched);
    const loading = useSelector((state: IAppState) => state.questions.loading);
    const [searchParams] = useSearchParams();
    const search: string = searchParams.get('criteria') || "";

    React.useEffect(() => {
        const doSearchQuestions = async () => {
            dispatch(searchingQuestionsAction());
            const results: QuestionData[] = await searchQuestions(search);
            dispatch(searchedQuestionsAction(results));
        }
        doSearchQuestions();
    }, [search]);

    return (
        <Page title="Search Results">
            {
                questions.length
                    ? <QuestionList data={questions} />
                    : !loading && <p>Nothing was found!</p>
            }
            { loading && <p>searching...</p> }
        </Page>
    );
};