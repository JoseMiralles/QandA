import React from "react";
import { PageTitle } from "./PageTitle";

interface Props {
    title?: string;
    children: React.ReactNode;
}

export const Page = ({ title, children }: Props) => {
    return (
        <div className="container">
            <div id='page-title'>
                { title && <PageTitle>{title}</PageTitle>}
            </div>
            { children }
        </div>
    );
}
