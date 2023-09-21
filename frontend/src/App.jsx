import { useState , useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./style.css"
import './App.css'
import Auth from './Auth'

function App() {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const [signUpDetails, setSignUpDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const {username, password} = loginDetails
  const {username: signupUsername, email, password: signupPassword, confirmPassword} = signUpDetails


  const loginInputHandler = (e) => {  
    setLoginDetails((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  const signupInputHandler = (e) => {  
    setSignUpDetails((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  const loginHandler = (e) => {
  //  e.preventDefault()
    method: "POST"
    fetch("http://localhost:5000", {
      body: {
        username,
        password,
      }
    })
    console.log("submitted");
  };

  const signupHandler = (e) => {
    // e.preventDefault()
     fetch("http://localhost:5000", {
       body: {
         username,
         email,
         password,
        confirmPassword,
       }
     })
     console.log("Sign Up");
   };

  return (
    <>
      <Auth 
        loginInputHandler={loginInputHandler}
        loginHandler={loginHandler}
        username={username}
        password={password}
        signupUsername={signupUsername}
        email={email}
        signupPassword={signupPassword}
        confirmPassword={confirmPassword}
        signupInputHandler={signupInputHandler}
        signupHandler={signupHandler}
      />
    </>
  )
}

export default App
