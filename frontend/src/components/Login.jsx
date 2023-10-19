import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ loginInputHandler, loginHandler, email, password }) => {
  return (
    <>
      <img
        className="background"
        src="image/background.jpg"
        alt="Background-image"
      />
      <div className="login-Container">
        <h1>Log in</h1>

        <form id="login-Form" onSubmit={loginHandler}>
          <input
            className="inputField loginUsername"
            type="email"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={loginInputHandler}
          />
          <input
            className="inputField loginPassword"
            type="password"
            minLength={"8"}
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={loginInputHandler}
          />
          <div className="buttomContainer">
            <button className="formBtn" type="submit">
              Login
            </button>
          </div>
          <p className="signupLink">
            Don't have an account?{" "}
            <Link to="/register" id="signupBtn">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
