import { findUser, getElement, User } from "./utilities/utilities.js";

type ObjUsers = {
    users: User[];
}

const registerBtn = getElement<HTMLInputElement>('registerBtn')
const savedData = localStorage.getItem('UserData')
let presentUsers: ObjUsers = {
    users: [],
};

if(savedData != null){
    presentUsers.users = JSON.parse(savedData)
}
const newUserName = getElement<HTMLInputElement>('newUserName')
const newpassword = getElement<HTMLInputElement>('newPassword')

registerBtn.addEventListener("click", (e: Event) => {
    e.preventDefault()
    let newUser : User={
        userName: newUserName.value,
        password: newpassword.value
    } 
    if(!findUser(newUser, "User already exist")){
        if(newUser.password === "" || newUser.password.length < 4){
            alert("Please enter Valid Passowrd")
        }else{
            presentUsers.users.push(newUser)
            localStorage.setItem("UserData",JSON.stringify(presentUsers.users) )
            alert("User Added");
        }
    }
    
})