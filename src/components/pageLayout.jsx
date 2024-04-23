import React from "react";
import NavBar from "./navBar";
//import './style/pageLayout.css'

const PageLayout = ({ children }) => {
    return (
        <div className="page-layout">
            <NavBar />
            <div className="content">
                {children}
            </div>
        </div>
    );
}

export default PageLayout;