import React from "react";
import PageLayout from "../components/pageLayout";
import "../styles/homepage.css";

const HomePage = () => {

    return (
        <div className="home-page">
            <PageLayout>
                <div className="home-page-body">
                    <h1>The website</h1>
                </div>
            </PageLayout>
        </div>
    )
}

export default HomePage;