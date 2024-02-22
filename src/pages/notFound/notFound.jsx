import React from "react";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

import "./style.scss";



const notFound = () => {
    return (
        <div className="notFound">
            <ContentWrapper>
                <span className="bigText">404</span>
                <span className="smallText">Page not found!</span>
            </ContentWrapper>
        </div>
    );
};

export default notFound;
