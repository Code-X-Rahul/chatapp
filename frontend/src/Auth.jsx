import React, { useState } from 'react'

const Auth = ({loginInputHandler,loginHandler,email,password, name,signupEmail,signupPassword,confirmPassword,signupInputHandler,signupHandler}) => {
  return (
    <>
      <img id="background" src="image/background.jpg" alt=""></img>
      <div className="login-Container">
        <h1>Log in</h1>
        
        <form id="login-Form" action="login/auth" onSubmit={loginHandler}  >
          <input 
              className="inputField loginUsername" 
              type="email" 
              name='email'
              placeholder="Name" 
              required
              value={email}
              onChange={loginInputHandler} 
          />
          <input 
              className="inputField loginPassword" 
              type="password" minLength={"8"}
              name='password'
              placeholder="Password" 
              required 
              value={password}
              onChange={loginInputHandler} 
            />
          <div className="buttomContainer">
            <button className="formBtn" type="submit">Login</button>
          </div>
          <p className="signupLink">Don't have an account? <a  id="signupBtn"
            onClick={() => {
              const signupContainer = document.querySelector(".signup-Container")
              const loginContainer = document.querySelector(".login-Container")
              signupContainer.style.display = "flex";
              loginContainer.style.display = "none";
            }}>Register here</a></p>
        </form>
      </div>

      <div className="signup-Container">
        <h1>Sign Up</h1>
        
        <form id="signup-Form"  action="signup/auth" onSubmit={signupHandler}>
          <input 
              className="inputField" 
              type="text" 
              name='name'
              placeholder="Name" 
              required
              value={name}
              onChange={signupInputHandler}
          />
          <input 
              className='inputField' 
              name='signupEmail'
              type='email' 
              placeholder='Email Address' 
              required
              value={signupEmail}
              onChange={signupInputHandler}
          />
          <input 
              className="inputField" 
              type="password" 
              minLength={"8"}
              name='password'
              placeholder="Password" 
              required
              value={signupPassword}   
              onChange={signupInputHandler}
          />
          <input 
              className="inputField" 
              type="password" 
              minLength={"8"} 
              name='confirmPassword'
              placeholder="Confirm Password" 
              required
              value={confirmPassword}
              onChange={signupInputHandler}
          />
          <div className="buttomContainer">
            <button className="formBtn signUp" type="submit">Sign Up</button>
          </div>
          
          
          <p className="signupLink">Already Registered?
            <a  id="loginBtn"
              onClick={() => {
                const signupContainer = document.querySelector(".signup-Container")
                const loginContainer = document.querySelector(".login-Container")
                signupContainer.style.display = "none";
                loginContainer.style.display = "flex";
            }}>Login here</a></p>
        </form>
      </div>
    </>
  )
}

export default Auth
