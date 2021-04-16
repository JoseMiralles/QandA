import React from "react";
import { useAuth } from "./Auth";
import { Page } from "./Page";

interface Props {
    children: React.Component
}

export const AuthorizedPage: React.FC = ({ children }): JSX.Element => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated)
        return (
            <>{ children }</>
        );
    
    return (
        <Page title="Sing in to access this page.">
            { null }
        </Page>
    );
};