import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const Login = ({ loginInputHandler, loginHandler, email, password }) => {
  const [hidePassword, setHidePassword] = useState("false");

  const handleHidePassword = () => {
    console.log(hidePassword);
    setHidePassword((current) => !current);
  };
  return (
    <>
      <Toaster />
      <img
        className="background"
        src="image/background.jpg"
        alt="Background-image"
      />
      <div className="login-Container">
        <h1>Log in</h1>
        toast('Hello World');
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
          <div className="passwordInput">
            <input
              className="inputField loginPassword"
              type={hidePassword ? "password" : "text"}
              minLength={"8"}
              name="password"
              placeholder="Password"
              required
              onChange={loginInputHandler}
            />
            {!hidePassword ? (
              <FaEyeSlash
                className="hidePassword"
                onClick={handleHidePassword}
              />
            ) : (
              <FaEye className="hidePassword" onClick={handleHidePassword} />
            )}
          </div>

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
