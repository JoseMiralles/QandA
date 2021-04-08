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
            <a href="./" className='badge'><h2>Q&A</h2></a>
            <input type="text" onChange={ handleSearchInputChange } placeholder="Search.." />
            <a href="./signin" className="btn btn-primary">
                <span>Sign In</span>
            </a>
        </div>
    );

};
