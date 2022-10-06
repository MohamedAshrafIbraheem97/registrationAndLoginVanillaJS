const personName = document.getElementById("personName");
const logoutBtn = document.querySelector("#logout");

personName.textContent = sessionStorage.getItem("userName");

logoutBtn.addEventListener("click", function () {
  sessionStorage.clear();
  location.href = "index.html";
});
