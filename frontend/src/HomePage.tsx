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

    return (
        <Page title={"Home"}>
            <div>
                <PageTitle>Unanswered Questions</PageTitle>
                <button>Ask a question</button>
                {
                    questionsLoading
                        ? <div>loading..</div>
                        : (
                            <QuestionList
                                data={questions}
                                renderItem={question => <div>{question.title}</div>}
                            />
                        )
                }
            </div>
        </Page>
    );
};