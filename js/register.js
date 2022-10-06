"use strict";

const inputs = document.querySelectorAll(".form-control");
const errorMsg = document.querySelector(".error-text");
const registerBtn = document.querySelector(".btn");

let usersList = [];

registerBtn.addEventListener("click", createUser);

inputs[0].addEventListener("blur", function () {
  if (!validateName()) {
    inputs[0].classList.add("is-invalid");
    inputs[0].classList.remove("is-valid");
  } else {
    inputs[0].classList.remove("is-invalid");
    inputs[0].classList.add("is-valid");
  }
});
inputs[1].addEventListener("blur", function () {
  if (!validateEmail()) {
    inputs[1].classList.add("is-invalid");
    inputs[1].classList.remove("is-valid");
  } else {
    inputs[1].classList.remove("is-invalid");
    inputs[1].classList.add("is-valid");
  }
});

inputs[2].addEventListener("blur", function () {
  if (!validatePassword()) {
    inputs[2].classList.add("is-invalid");
    inputs[2].classList.remove("is-valid");
  } else {
    inputs[2].classList.remove("is-invalid");
    inputs[2].classList.add("is-valid");
  }
});

function createUser() {
  if (validateName() && validateEmail()) {
    usersList = JSON.parse(localStorage.getItem("usersList"));

    let user = {
      name: inputs[0].value,
      email: inputs[1].value,
      password: inputs[2].value,
    };

    if (userexist(user.email)) {
      showErrorMessage("Please use another email");
    } else {
      hideErrorMessage();
      usersList.push(user);
      localStorage.setItem("usersList", JSON.stringify(usersList));
      sessionStorage.setItem("userName", user.name);
      location.href = "home.html";
    }
  } else {
    showErrorMessage("Please enter values");
  }
}

function userexist(userEmail) {
  let foundUser;
  if (usersList != null) {
    for (const user of usersList) {
      if (user.email === userEmail) {
        foundUser = true;
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

function validateName() {
  let regx = /[A-Z][a-z]+\s[A-Za-z]+/;
  if (regx.test(inputs[0].value)) return true;
  else return false;
}
function validateEmail() {
  let regx = /\w+@[A-Za-z]+.[a-z]{1,3}/;
  if (regx.test(inputs[1].value)) return true;
  else return false;
}
function validatePassword() {
  let regx = /\S{4,8}/;
  if (regx.test(inputs[2].value)) return true;
  else return false;
}
