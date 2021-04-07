import React from "react";
import { PageTitle } from "./PageTitle";

interface Props {
    title?: string;
    children: React.ReactNode;
}

export const Page = ({ title, children }: Props) => {
    return (
        <div>
            { title && <PageTitle>{title}</PageTitle>}
            { children }
        </div>
    );
}
