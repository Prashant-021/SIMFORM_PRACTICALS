import { findUser, getElement, onError, User } from "./utilities/utilities.js"

const loginBtn = document.querySelector('#loginBtn')

const userName = getElement<HTMLInputElement>('userName')
const password = getElement<HTMLInputElement>('password')

const validate = (user: User): boolean => {
    let isValid: boolean = true
    if (user.userName === '') {
        onError(userName)
        isValid = false
    }
    if (user.password === '') {
        onError(password)
        isValid = false
    }
    return isValid
}



if (loginBtn) {
    loginBtn.addEventListener('click', (e: Event) => {
        e.preventDefault()
        let userData = {
            userName: userName.value,
            password: password.value
        }
        if (validate(userData)) {
            if (findUser(userData, `Welcome ${userName.value}`)) {
                document.location = 'homePage.html'
            }
            else {
                alert('Invalid Username or Password')
            }
        }
    })
}