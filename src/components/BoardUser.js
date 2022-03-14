import React, { useState, useEffect } from "react";

import user_service from "../services/user_service";

const BoardUser = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        user_service.getUserBoard().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content = (error.response && error.response.data) ||
                                    error.message ||
                                    error.toString();

                setContent(_content);
            }
        );
    }, []);

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{content}</h3>
            </header>
        </div>
    );

};

export default BoardUser;