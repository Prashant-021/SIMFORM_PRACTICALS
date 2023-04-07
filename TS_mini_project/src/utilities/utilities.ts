export interface User {
    userName: string;
    password: string;
}

export interface Log {
    type: string
    person: string;
    details: string;
    amount: number
}

export interface hasFormatter {
    Type: any;
    getType(): string
    format(): string
}

export enum setColor {
    red = 'red',
    green = 'green',
    transparent = ""
}

export const onError = (inputField: HTMLInputElement): void => {
    inputField.style.borderColor = setColor.red
    setTimeout(() => {
        inputField.style.borderColor = setColor.transparent
    }, 1500);
}

export function getElement<T extends HTMLElement>(id: string): T {
    const element = document.getElementById(id);
    if (!element) {
        alert(`Could not find element`);
    }
    return element as T;
}

export const findUser = (user: User, message: string): boolean => {
    let userExist = false
    let savedData = localStorage.getItem("UserData")
    if (typeof savedData === 'string') {    
        let Users = JSON.parse(savedData)
        for (let i = 0; i < Users.length; i++) {
            if ((Users[i].userName).toLowerCase() === (user.userName).toLowerCase( )) {
                userExist = true
                alert(message)
            }
        }
    }
    return userExist
}