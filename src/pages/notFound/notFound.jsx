import React from "react";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

import "./style.scss";



const notFound = ({code,message}) => {
    return (
        <div className="notFound">
            <ContentWrapper>
                <span className="bigText">{code}</span>
                <span className="smallText">{message}</span>
            </ContentWrapper>
        </div>
    );
};

export default notFound;
