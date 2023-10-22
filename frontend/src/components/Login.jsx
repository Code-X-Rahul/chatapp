import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../api/data";

const Login = () => {
  const navigate = useNavigate();
  const [hidePassword, setHidePassword] = useState("false");
  const [isLoading, setIsLoading] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const loginInputHandler = (e) => {
    setLoginDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    const loading = toast.loading("Checking For Credentials");
    setIsLoading(true);
    try {
      const response = await api.post("/api/v1/auth/login", loginDetails);

      if (response.status === 200) {
        toast.dismiss(loading);
        toast.success("Login Successful");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
      setLoginDetails({
        email: "",
        password: "",
      });
    } catch (error) {
      toast.dismiss(loading);
      toast.error("Invalid Credentials!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleHidePassword = () => {
    console.log(hidePassword);
    setHidePassword((current) => !current);
  };

  const { email, password } = loginDetails;

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
              value={password}
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
