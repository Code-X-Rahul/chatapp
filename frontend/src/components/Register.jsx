import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import api from "../api/data";

const Register = () => {
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [signUpDetails, setSignUpDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = signUpDetails;

  const signupInputHandler = (e) => {
    setSignUpDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const signupHandler = async () => {
    try {
      const response = await api.post("/api/v1/auth/register", signUpDetails);
      if (response.status == 201) {
        toast.success(response.data.msg);
        console.log("asd");
      }
      console.log(response.data);
      setSignUpDetails({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error.response.status);
      console.log(error.message);
      console.log(error.response.data.msg);
      toast.error(error.response.data.msg);
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setPasswordMatch(true);
      signupHandler();
    } else {
      setPasswordMatch(false);
    }
  };

  return (
    <>
      <Toaster />
      {/* <img
        className="background"
        src="image/background.jpg"
        alt="Background-image"
      /> */}
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
            value={email}
            onChange={signupInputHandler}
          />
          <input
            className="inputField"
            type="password"
            minLength={"8"}
            name="password"
            placeholder="Password"
            required
            value={password}
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
