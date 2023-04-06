import { findUser, getElement } from "./utilities/utilities.js";
const registerBtn = getElement('registerBtn');
const savedData = localStorage.getItem('UserData');
let presentUsers = {
    users: [],
};
if (savedData != null) {
    presentUsers.users = JSON.parse(savedData);
}
const newUserName = getElement('newUserName');
const newpassword = getElement('newPassword');
registerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let newUser = {
        userName: newUserName.value,
        password: newpassword.value
    };
    if (!findUser(newUser, "User already exist")) {
        presentUsers.users.push(newUser);
        localStorage.setItem("UserData", JSON.stringify(presentUsers.users));
        alert("User Added");
    }
});
