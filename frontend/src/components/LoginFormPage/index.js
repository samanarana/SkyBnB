// frontend/src/components/LoginFormPage/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import "./LoginForm.css";
import { useModal } from "../../context/Modal";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { closeModal } = useModal();

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
    .then(() => {
      closeModal();
    })
    .catch(
      async (res) => {
        const data = await res.json();
        if (data && data.message) setErrors({credential: data.message});
      }
    );
  };

  const fillDemoCredentials = () => {
    setCredential("Demo-lition");
    setPassword("password");
  }

  // Condition to check if the button should be disabled
  const isButtonDisabled = credential.length < 4 || password.length < 6;

  return (
    <>
        <h1>Log In</h1>

        <form onSubmit={handleSubmit}>
        {errors.credential && <p className="error">The provided credentials were invalid.</p>}
            <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
                placeholder="Username or Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
            />
            <button type="submit" disabled={isButtonDisabled}>Log In</button>
            <span className="demo-user" onClick={fillDemoCredentials}>Demo User</span>
        </form>
    </>
);
}

export default LoginFormPage;
