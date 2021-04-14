import React from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./styles/header.scss";

type FormData = {
    search: string;
};

export const Header = (): JSX.Element => {

    const { register, watch, handleSubmit } = useForm<FormData>();
    const [searchParams] = useSearchParams();
    const criteria = searchParams.get('criteria') || "";
    const navigate = useNavigate();

    const submitForm = ({ search }: FormData) => {
        navigate(`search?criteria=${search}`);
    };

    return (
        <div id="header-container">
            <Link to="/" id='main-logo'>Q&A</Link>
            <form onSubmit={ handleSubmit(submitForm) }>
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
