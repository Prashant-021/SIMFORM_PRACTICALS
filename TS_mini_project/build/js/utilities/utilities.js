export var setColor;
(function (setColor) {
    setColor["red"] = "red";
    setColor["green"] = "green";
    setColor["transparent"] = "";
})(setColor || (setColor = {}));
export const onError = (inputField) => {
    inputField.style.borderColor = setColor.red;
    setTimeout(() => {
        inputField.style.borderColor = setColor.transparent;
    }, 1500);
};
export function getElement(id) {
    const element = document.getElementById(id);
    if (!element) {
        alert(`Could not find element`);
    }
    return element;
}
export const findUser = (user, message) => {
    let userExist = false;
    let savedData = localStorage.getItem("UserData");
    if (typeof savedData === 'string') {
        let Users = JSON.parse(savedData);
        for (let i = 0; i < Users.length; i++) {
            if ((Users[i].userName).toLowerCase() === (user.userName).toLowerCase() && Users[i].password === user.password) {
                userExist = true;
                alert(message);
            }
        }
    }
    return userExist;
};
