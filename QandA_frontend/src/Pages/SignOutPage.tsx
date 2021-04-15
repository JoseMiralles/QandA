import React from "react";
import { Page } from "../Page";
import { useAuth } from "../Auth";

type action = 'signout'|"signout-callback";
interface Props {
    action: action;
}

export const SignOutPage = ({ action }: Props) => {

    let message = "Signing out ...";
    const { signOut } = useAuth();

    if (action === 'signout') signOut();

    switch (action) {
        case 'signout':
            signOut();
            break;
        case "signout-callback":
            message = "You successfully signed out!";
            break;
    }

    return (
        <Page title="Sign Out">
            <h4>{ message }</h4>
        </Page>
    );
};