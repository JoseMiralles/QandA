import React from "react";
import "./styles/header.scss";

export const Header = () => {

    const handleSearchInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        console.log(e.currentTarget.value);
    }

    return (
        <div id="header-container">
            <a href="./" id='main-logo'>Q&A</a>
            <input className='search-bar' type="text" onChange={ handleSearchInputChange } placeholder="Search.." />
            <a href="./signin" className="btn">
                <span>Sign In</span>
            </a>
        </div>
    );

};
