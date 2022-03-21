import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route , Routes} from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { login } from "../actions/auth";

import '../assets/css/Login.css';

const required = (value) => {
    if(!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const Login = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { isLoggedIn } = useSelector((state) => state.auth);
    const { message } = useSelector((state) => state.message);

    const dispatch = useDispatch();

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setLoading(true);

        form.current.validateAll();

        if(checkBtn.current.context._errors.length === 0) {
            dispatch(login(username, password))
            .then(() => {
            })
            .catch(() => {
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    };

    if (isLoggedIn) {   
        return (
            <Navigate to="/"/>
        );
    }

    return (
        <div className="login-container">
            <Form className="login" onSubmit={handleLogin} ref={form}>
            <div>
                <label className="input-label" htmlFor="username">Username</label>
                <Input 
                    type="text"
                    className="input-field"
                    name="username"
                    value={username}
                    onChange={onChangeUsername}
                    validations={[required]}
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
                    validations={[required]}
                />
            </div>

            <div>
                <button className="btn-primary" disabled={loading}>
                    {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Login</span>
                </button>
            </div>

            {message && (
                <div>
                    <div className="alert alert-danger" role="alert">
                        {message}
                    </div>
                </div>
            )}
            <CheckButton style={{display: "none"}} ref={checkBtn} />
            </Form>
        </div>
    );
};

export default Login;
