import { findUser, getElement, onError } from "./utilities/utilities.js";
const loginBtn = document.querySelector('#loginBtn');
const userName = getElement('userName');
const password = getElement('password');
const validate = (user) => {
    let isValid = true;
    if (user.userName === '') {
        onError(userName);
        isValid = false;
    }
    if (user.password === '') {
        onError(password);
        isValid = false;
    }
    return isValid;
};
if (loginBtn) {
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let userData = {
            userName: userName.value,
            password: password.value
        };
        if (validate(userData)) {
            if (findUser(userData, `Welcome ${userName.value}`)) {
                document.location = 'homePage.html';
            }
            else {
                alert('Invalid Username or Password');
            }
        }
    });
}
