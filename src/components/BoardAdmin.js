import React, { useState, useEffect } from "react";

import user_service from "../services/user_service";
import CouponAdministrator from "./CouponAdministartor";
import IngredientAdministrator from "./IngredientAdminitsrator";
import UserAdministrator from "./UserAdministrator";

import "../assets/css/BoardAdmin.css";

const BoardAdmin = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        user_service.getAdminBoard().then(
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
            <UserAdministrator />

            <section className="second-row">
                <IngredientAdministrator />

                <CouponAdministrator />
            </section>
        </div>
    );

};

export default BoardAdmin;