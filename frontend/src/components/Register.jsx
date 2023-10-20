import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Register = ({
  name,
  signupEmail,
  signupPassword,
  confirmPassword,
  signupInputHandler,
  signupHandler,
}) => {
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (signupPassword === confirmPassword) {
      setPasswordMatch(true);
      signupHandler();
    } else {
      setPasswordMatch(false);
    }
  };

  return (
    <>
      <Toaster />
      <img
        className="background"
        src="image/background.jpg"
        alt="Background-image"
      />
      <div className="signup-Container">
        <h1>Sign Up</h1>

        <form id="signup-Form" onSubmit={handleSignupSubmit}>
          <input
            className="inputField"
            type="text"
            name="name"
            placeholder="Name"
            required
            value={name}
            onChange={signupInputHandler}
          />
          <input
            className="inputField"
            name="email"
            type="email"
            placeholder="Email Address"
            required
            value={signupEmail}
            onChange={signupInputHandler}
          />
          <input
            className="inputField"
            type="password"
            minLength={"8"}
            name="password"
            placeholder="Password"
            required
            value={signupPassword}
            onChange={signupInputHandler}
          />

          <input
            className="inputField"
            type="password"
            minLength={"8"}
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={signupInputHandler}
          />
          {!passwordMatch && (
            <p
              className="password-mismatch-error"
              style={{ color: "red", textAlign: "center" }}
            >
              Passwords do not match.
            </p>
          )}

          <div className="buttomContainer">
            <button className="formBtn signUp" type="submit">
              Sign Up
            </button>
          </div>
          <p className="signupLink">
            Already Registered?
            <Link to="/" id="loginBtn">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
