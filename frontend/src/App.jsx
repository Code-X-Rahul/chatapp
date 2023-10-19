import { useState, useEffect, useRef } from "react";
import "./style.css";
import "./App.css";
import Background from "./components/Background";
import Login from "./components/Login";
import Register from "./components/Register";
import api from "./api/data";
import { Route, Routes, Link, useNavigate } from "react-router-dom";

function App() {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [signUpDetails, setSignUpDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const navigate = useNavigate()

  const { email, password } = loginDetails;
  const {
    name,
    email: signupEmail,
    password: signupPassword,
    confirmPassword,
  } = signUpDetails;

  const loginInputHandler = (e) => {
    setLoginDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const signupInputHandler = (e) => {
    setSignUpDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/v1/auth/login", loginDetails);
      if (response.status === 200) {
        console.log("Login successful.");
      } else {
        console.log("Invalid Credentials.");
      }
      setLoginDetails({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log("Login Failed", error.message);
    }
  };

  const signupHandler = async (e) => {
    try {
      const response = await api.post("/api/v1/auth/register", signUpDetails);
      if (response.status !== 200) {
        throw new Error("Failed to something")
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
    }
  };

  return (
    <Routes>
      <Route>
        <Route
          index
          element={
            <Login
              email={email}
              password={password}
              loginInputHandler={loginInputHandler}
              loginHandler={loginHandler}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              name={name}
              signupEmail={signupEmail}
              signupPassword={signupPassword}
              confirmPassword={confirmPassword}
              signupInputHandler={signupInputHandler}
              signupHandler={signupHandler}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
