const signupBtn = document.getElementById("signupBtn")
const loginBtn = document.getElementById("loginBtn")


signupBtn.addEventListener('click', () => {
  const signupContainer = document.querySelector(".signup-Container")
  const loginContainer = document.querySelector(".login-Container")
  signupContainer.style.display = "flex";
  loginContainer.style.display = "none";
})

loginBtn.addEventListener("click", () => {
  const signupContainer = document.querySelector(".signup-Container")
  const loginContainer = document.querySelector(".login-Container")
  signupContainer.style.display = "none";
  loginContainer.style.display = "flex";
})

console.log(signupContainer)