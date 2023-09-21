import { useState , useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./style.css"
import './App.css'
import Auth from './Auth'

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
  })
  const {email, password} = loginDetails
  const {name, signupEmail, password: signupPassword, confirmPassword} = signUpDetails


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
        email,
        password,
      }
    })
    console.log("submitted");
  };

  const signupHandler = (e) => {
    // e.preventDefault()x`
     fetch("http://localhost:5000", {
       body: {
         name,
         signupEmail,
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
        email={email}
        password={password}
        name={name}
        signupEmail={signupEmail}
        signupPassword={signupPassword}
        confirmPassword={confirmPassword}
        signupInputHandler={signupInputHandler}
        signupHandler={signupHandler}
      />
    </>
  )
}

export default App
