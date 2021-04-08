import React from "react";
import { Link } from "react-router-dom";
import "./styles/header.scss";

export const Header = () => {

    const handleSearchInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        console.log(e.currentTarget.value);
    }

    return (
        <div id="header-container">
            <Link to="/" id='main-logo'>Q&A</Link>
            <input className='search-bar' type="text" onChange={ handleSearchInputChange } placeholder="Search.." />
            <Link to="/signin" className="btn">
                <span>Sign In</span>
            </Link>
        </div>
    );

};
