import { useState, useEffect, useRef } from "react";
import "./style.css";
import "./css/chatContainer.css";
import "./css/conContainer.css";
import "./css/sidebar.css";
import "./css/main.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import api from "./api/data";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
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
    const loading = toast.loading("Checking For Credentials");
    setIsLoading(true);
    try {
      const response = await api.post("/api/v1/auth/login", loginDetails);

      if (response.status === 200) {
        toast.dismiss(loading);
        toast.success("Login Successful");
        setTimeout(() => {
          navigate("/Home");
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
              isLoading={isLoading}
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
        <Route path="Home" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
