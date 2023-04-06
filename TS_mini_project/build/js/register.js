import { findUser, getElement, onError } from "./utilities/utilities.js";
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
const validate = (user) => {
    let isValid = true;
    if (user.userName === '') {
        onError(newUserName);
        isValid = false;
    }
    if (user.password === '') {
        onError(newpassword);
        isValid = false;
    }
    return isValid;
};
registerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let newUser = {
        userName: newUserName.value,
        password: newpassword.value
    };
    if (validate(newUser)) {
        if (!findUser(newUser, "User already exist")) {
            presentUsers.users.push(newUser);
            localStorage.setItem("UserData", JSON.stringify(presentUsers.users));
            alert("User Added");
        }
    }
});
