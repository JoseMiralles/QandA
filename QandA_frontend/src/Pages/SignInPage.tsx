import React from "react";
import { Page } from "../Page";
import { useAuth } from "../Auth";

type signInAction = "signin"|"signin-callback";
interface Props {
    action: signInAction;
}

export const SignInPage = ({ action }: Props) => {

    const { signIn } = useAuth(); // Get signIn from the auth context.

    if (action === "signin") signIn();

    return (
        <Page title="Sign In">
            <h4>Signing in ...</h4>
        </Page>
    );
};