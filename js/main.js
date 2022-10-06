const inputs = document.querySelectorAll(".form-control");
const errorMsg = document.querySelector(".error-text");
const loginBtn = document.querySelector(".btn");

let usersList = [];

loginBtn.addEventListener("click", login);

inputs[0].addEventListener("blur", function () {
  if (!validateEmail()) {
    inputs[0].classList.add("is-invalid");
    inputs[0].classList.remove("is-valid");
  } else {
    inputs[0].classList.remove("is-invalid");
    inputs[0].classList.add("is-valid");
  }
});
inputs[1].addEventListener("blur", function () {
  if (!validatePassword()) {
    inputs[1].classList.add("is-invalid");
    inputs[1].classList.remove("is-valid");
  } else {
    inputs[1].classList.remove("is-invalid");
    inputs[1].classList.add("is-valid");
  }
});

function login() {
  if (validateEmail() && validatePassword()) {
    usersList = JSON.parse(localStorage.getItem("usersList"));

    let user = {
      email: inputs[0].value,
      password: inputs[1].value,
    };
    let userWhoWantsToLogin = userexist(user.email, user.password);
    if (!userWhoWantsToLogin) {
      showErrorMessage("Either email or password is wrong");
    } else {
      hideErrorMessage();
      sessionStorage.setItem("userName", userWhoWantsToLogin.name);
      console.log(userWhoWantsToLogin);
      location.href = "home.html";
    }
  } else {
    showErrorMessage("All fields are required");
  }
}

function userexist(userEmail, userPassword) {
  let foundUser;
  if (usersList != null) {
    for (const user of usersList) {
      if (user.email == userEmail && user.password == userPassword) {
        foundUser = user;
        break;
      } else foundUser = false;
    }
  } else {
    usersList = [];
    foundUser = false;
  }
  return foundUser;
}

function showErrorMessage(errorMessage) {
  errorMsg.classList.remove("d-none");
  errorMsg.classList.add("d-block");
  errorMsg.textContent = errorMessage;
}
function hideErrorMessage() {
  errorMsg.classList.add("d-none");
  errorMsg.classList.remove("d-block");
}

function validateEmail() {
  let regx = /\w+@[A-Za-z]+.[a-z]{1,3}/;
  if (regx.test(inputs[0].value)) return true;
  else return false;
}
function validatePassword() {
  let regx = /\S{1,}/;
  if (regx.test(inputs[1].value)) return true;
  else return false;
}
