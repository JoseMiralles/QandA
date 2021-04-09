import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./styles/header.scss";

type FormData = {
    search: string;
};

export const Header = (): JSX.Element => {

    const { register, watch } = useForm<FormData>();
    const [searchParams] = useSearchParams();
    const criteria = searchParams.get('criteria') || "";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(watch("search"));
    };

    return (
        <div id="header-container">
            <Link to="/" id='main-logo'>Q&A</Link>
            <form onSubmit={ handleSubmit }>
                <input
                    {...register("search")}
                    defaultValue={criteria}
                    className='search-bar'
                    name="search"
                    type="text"
                    placeholder="Search.."
                />
            </form>
            <Link to="/signin" className="btn">
                <span>Sign In</span>
            </Link>
        </div>
    );

};
