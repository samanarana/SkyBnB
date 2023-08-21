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
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const fillDemoCredentials = () => {
    setCredential("Demo-lition");
    setPassword("password");
  }

  return (
    <>
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
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
            {errors.credential && <p>{errors.credential}</p>}
            <button type="submit">Log In</button>
            <span className="demo-user" onClick={fillDemoCredentials}>Demo User</span>
        </form>
    </>
);
}

export default LoginFormPage;
