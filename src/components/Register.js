import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { register } from "../actions/auth";

import '../assets/css/Register.css';

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const validEmain = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 2 and 20 characters.
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

const Register = () => {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);

    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleRegister = (e) => {
        e.preventDefault();

        setSuccessful(false);

        form.current.validateAll();

        if(checkBtn.current.context._errors.length === 0) {
            dispatch(register(username, email, password))
            .then(() => {
                setSuccessful(true);
            })
            .catch(() => {
                setSuccessful(false);
            });
        }
    };

    return (
        <div className="register-container">
            <Form className="register" onSubmit={handleRegister} ref={form}>
                {!successful && (
                    <div>
                        <div>
                            <label className="input-label" htmlFor="username">Username</label>
                            <Input 
                                type="text"
                                className="input-field"
                                name="username"
                                value={username}
                                onChange={onChangeUsername}
                                validations={[required, vusername]}
                            />
                        </div>

                        <div>
                        <label className="input-label" htmlFor="email">Email</label>
                        <Input 
                            type="text"
                            className="input-field"
                            name="email"
                            value={email}
                            onChange={onChangeEmail}
                            validations={[required, validEmain]}
                        />
                        </div>

                        <div>
                            <label className="input-label" htmlFor="password">Password</label>
                            <Input 
                                type="password"
                                className="input-field"
                                name="password"
                                value={password}
                                onChange={onChangePassword}
                                validations={[required, vpassword]}
                            />
                        </div>

                        <div>
                            <button className="btn-primary">Sign Up</button>
                        </div>
                    </div>
                )}

                {message && (
                    <div >
                        <div className={successful ? "alert alert-success" : "alert alert-danger"}>
                            {message}
                        </div>
                    </div>
                )}
                <CheckButton style={{display: "none"}} ref={checkBtn} />
            </Form>
        </div>
    );
};

export default Register;