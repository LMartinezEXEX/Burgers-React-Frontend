import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Routes, Route, Link } from "react-router-dom";

import './assets/css/index.css';
import './assets/css/App.css';

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import Design from "./components/Design";
import Resume from "./components/Resume"

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from "./helpers/history";
import Footer from "./components/Footer";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const {user: currentUser} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage());
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  }

  return (
    <div>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <ul>
            <li>
              <Link to={"/"} className="navbar-brand">
                Burgers
              </Link>
            </li>

            {showModeratorBoard && (
              <li>
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li>
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <>
                <li>
                  <Link to={"/design"} className="nav-link">
                    Order
                  </Link>
                </li>
              </>
            )}

          {currentUser ? (
            <>
              <li className="push logout">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </>
          ) : (
            <>
              <li className="push login">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li>
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </>
          )}

          </ul>
        </nav>

        <div className="container mt-3">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/user" element={<BoardUser/>} />
              <Route path="/mod" element={<BoardModerator/>} />
              <Route path="/admin" element={<BoardAdmin/>} />
              <Route path="/design" element={<Design/>} />
              <Route path="/resume" element={<Resume />} />
            </Routes>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default App;
