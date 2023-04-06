import { findUser, getElement, onError, User } from "./utilities/utilities.js";

type ObjUsers = {
    users: User[];
}

const registerBtn = getElement<HTMLInputElement>('registerBtn')
const savedData = localStorage.getItem('UserData')
let presentUsers: ObjUsers = {
    users: [],
};

if (savedData != null) {
    presentUsers.users = JSON.parse(savedData)
}
const newUserName = getElement<HTMLInputElement>('newUserName')
const newpassword = getElement<HTMLInputElement>('newPassword')

const validate = (user: User): boolean => {
    let isValid: boolean = true
    if (user.userName === '') {
        onError(newUserName)
        isValid = false
    }
    if (user.password === '') {
        onError(newpassword)
        isValid = false
    }
    return isValid
}

registerBtn.addEventListener("click", (e: Event) => {
    e.preventDefault()
    let newUser: User = {
        userName: newUserName.value,
        password: newpassword.value
    }
    if (validate(newUser)) {
        if (!findUser(newUser, "User already exist")) {
            presentUsers.users.push(newUser)
            localStorage.setItem("UserData", JSON.stringify(presentUsers.users))
            alert("User Added");
        }
    }
})