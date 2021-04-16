import React from "react";

import { QuestionList } from "../QuestionList";
import { getUnansweredQuestions } from "../QuestionsData";
import { Page } from "../Page";
import { PageTitle } from "../PageTitle";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { gettingUnansweredQuestionsAction, gotUnansweredQuestionsAction  } from "../Actions/QuestionActions";
import { IAppState } from "../Store";

export const HomePage = () => {

    const dispatch = useDispatch();
    const questions = useSelector((state: IAppState) => state.questions.unanswered);
    const questionsLoading = useSelector((state: IAppState) => state.questions.loading);
    const navigate = useNavigate();

    // useEffect works similarly to ComponentDidMount, in that it gets called after the first render.
    React.useEffect(() => {
        let cancelled = false;
        const doGetUnasnweredQuestions = async () => {
            dispatch(gettingUnansweredQuestionsAction());
            const unansweredQuestions = await getUnansweredQuestions();

            if (!cancelled)
                dispatch(gotUnansweredQuestionsAction(unansweredQuestions));
        };
        doGetUnasnweredQuestions();
    }, []);
    

    const handleAskQuestionClick = () => {
        navigate("ask");
    }

    return (
        <Page>
            <div id='home_page'>
                
                <span className='centered-bar top-bar'>
                    <PageTitle>Unanswered Questions</PageTitle>
                    <button className='btn btn-primary' onClick={ handleAskQuestionClick }>Ask a question</button>
                </span>

                {
                    questionsLoading
                        ? <div className="loading">loading..</div>
                        : (
                            <QuestionList
                                data={questions}
                            />
                        )
                }
            </div>
        </Page>
    );
};