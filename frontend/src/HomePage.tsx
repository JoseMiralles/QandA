import React from "react";

import { QuestionList } from "./QuestionList";
import { getUnansweredQuestions, QuestionData } from "./QuestionsData";
import { Page } from "./Page";
import { PageTitle } from "./PageTitle";

export const HomePage = () => {

    const [questions, setQuestions] = React.useState<QuestionData[]>([]);
    const [questionsLoading, setQuestionsLoading] = React.useState<boolean>(true);

    // useEffect works similarly to ComponentDidMount, in that it gets called after the first render.
    React.useEffect(() => {
        const doGetUnasnweredQuestions = async () => {
            const unansweredQuestions: QuestionData[] = await getUnansweredQuestions();
            setQuestions(unansweredQuestions);
            setQuestionsLoading(false);
        };
        doGetUnasnweredQuestions();
    }, []);

    const handleAskQuestionClick = () => {
        console.log('Clicked');
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