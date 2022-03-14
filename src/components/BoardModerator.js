import React, { useState, useEffect } from "react";

import user_service from "../services/user_service";
import IngredientAdministrator from "./IngredientAdminitsrator";

const BoardModerator = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        user_service.getModeratorBoard().then(
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
        <IngredientAdministrator />
    );

};

export default BoardModerator;