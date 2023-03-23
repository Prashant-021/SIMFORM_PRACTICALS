"use strict";
const display = document.getElementById('display');
const degToRadVal = document.querySelector('.deg');
const memoryClearBtn = document.getElementById('mc');
const memoryRecallBtn = document.getElementById('mr');
const trigoFunc = document.getElementById('trigo_func');
const invTrigoFunc = document.getElementById('inverse_trigo_func');
const hypTrigoFunc = document.getElementById('hyp_trigo_func');
const hypeInvTrigoFunc = document.getElementById('hyp_inverse_trigo_func');
let memory = [];
let flag = true;
let degToRad = true;
let fixedToExponential = true;
let invTrigo = true;
let hypeTrigo = true;
function expoValue(num, sup) {
    return Math.pow(num, sup).toString();
}
function onlyVal(val) {
    if (display === null)
        return;
    if (/[-+\/\(\)]$/.test(display.value) || display.value === "") {
        return val.toString();
    }
    else {
        return '*' + val;
    }
}
function toggleBtn(curr, next) {
    const elementToHide = document.getElementsByClassName(curr);
    const elementToShow = document.getElementsByClassName(next);
    const hideElements = (elements) => {
        for (let i = 0; i < elements.length; i++) {
            if (elements[i] instanceof HTMLElement) {
                elements[i].style.display = 'none';
            }
        }
    };
    const showElements = (elements) => {
        for (let i = 0; i < elements.length; i++) {
            if (elements[i] instanceof HTMLElement) {
                elements[i].style.display = 'inline-block';
            }
        }
    };
    if (flag) {
        hideElements(elementToHide);
        showElements(elementToShow);
        flag = false;
    }
    else {
        hideElements(elementToShow);
        showElements(elementToHide);
        flag = true;
    }
}
function modx() {
    if (display === null) {
        return "";
    }
    if (display.value.startsWith('-')) {
        return display.value.slice(1);
    }
    return display.value;
}
function factorial() {
    if (display === null)
        return;
    let num = Number(display.value);
    if (num === 0 || num === 1) {
        display.value = "1";
    }
    else if (num > 1) {
        for (let i = num - 1; i > 1; i--) {
            num = num * i;
        }
        display.value = String(num);
    }
}
function changeSign() {
    if (display === null)
        return;
    if (display.value.startsWith('-')) {
        display.value = display.value.slice(1);
    }
    else {
        display.value = "-" + display.value;
    }
}
function splitValues(symbol) {
    if (display === null)
        return;
    const expression = display.value.split(symbol);
    const y = Number(expression[0]);
    const x = Number(expression[1]);
    return [x, y];
}
function yrootx() {
    if (display === null)
        return;
    const nums = splitValues('√');
    if (nums != null) {
        display.value = Math.pow(nums[0], 1 / nums[1]).toString();
    }
}
function getBaseLog() {
    if (display === null)
        return;
    let nums = splitValues('ylog');
    if (nums != null) {
        display.value = (Math.log(nums[0]) / Math.log(nums[1])).toString();
    }
}
function enableMemoryClearAndRecall() {
    if (memoryRecallBtn === null || memoryClearBtn === null)
        return;
    memoryClearBtn.disabled = false;
    memoryRecallBtn.disabled = false;
}
function memoryClear() {
    if (memoryRecallBtn === null || memoryClearBtn === null)
        return;
    memory = [];
    memoryClearBtn.disabled = true;
    memoryRecallBtn.disabled = true;
}
function memoryRecall() {
    if (display === null)
        return;
    display.value = String(memory[memory.length - 1]);
}
function memoryPlus() {
    if (display === null)
        return;
    enableMemoryClearAndRecall();
    if (memory.length === 0) {
        memory.push(parseFloat(display.value));
    }
    else {
        memory[memory.length - 1] += parseFloat(display.value);
    }
}
function memoryMinus() {
    if (display === null)
        return;
    enableMemoryClearAndRecall();
    if (memory.length === 0) {
        memory.push(parseFloat(display.value));
    }
    else {
        memory[memory.length - 1] -= parseFloat(display.value);
    }
}
function memoryStore() {
    if (display === null)
        return;
    enableMemoryClearAndRecall();
    if (Number.isNaN(Number(display.value))) {
        alert("Enter a number");
    }
    else {
        memory.push(parseFloat(display.value));
    }
}
function toggleTrigoFunc() {
    if (trigoFunc === null || invTrigoFunc === null || hypTrigoFunc === null || hypeInvTrigoFunc === null)
        return;
    if (invTrigo == false && hypeTrigo == true) {
        trigoFunc.style.display = "none";
        invTrigoFunc.style.display = "inline-block";
        hypTrigoFunc.style.display = "none";
        hypeInvTrigoFunc.style.display = "none";
    }
    else if (invTrigo == true && hypeTrigo == true) {
        trigoFunc.style.display = "inline-block";
        invTrigoFunc.style.display = "none";
        hypTrigoFunc.style.display = "none";
        hypeInvTrigoFunc.style.display = "none";
    }
    else if (invTrigo == false && hypeTrigo === false) {
        trigoFunc.style.display = "none";
        invTrigoFunc.style.display = "none";
        hypTrigoFunc.style.display = "none";
        hypeInvTrigoFunc.style.display = "inline-block";
    }
    else {
        trigoFunc.style.display = "none";
        invTrigoFunc.style.display = "none";
        hypTrigoFunc.style.display = "inline-block";
        hypeInvTrigoFunc.style.display = "none";
    }
}
function clearDisplay() {
    if (display === null)
        return;
    if (display.value === "ERROR!") {
        display.value = "";
    }
}
function calculateExpression(statement) {
    if (display === null) {
        return;
    }
    try {
        display.value = eval(statement);
    }
    catch (e) {
        display.value = "ERROR!";
    }
}
function enterValue(enteredValue) {
    if (display === null)
        return;
    clearDisplay();
    switch (enteredValue) {
        //Deg and F-E function
        case 'deg': {
            if (degToRadVal === null)
                break;
            if (degToRad) {
                degToRadVal.innerHTML = "RAD";
                degToRad = false;
            }
            else {
                degToRadVal.innerHTML = 'DEG';
                degToRad = true;
            }
            break;
        }
        case 'f-e': {
            if (fixedToExponential) {
                display.value = Number(display.value).toExponential();
                fixedToExponential = false;
            }
            else {
                display.value = Number(display.value).toString();
                fixedToExponential = true;
            }
            break;
        }
        //Trigonometric Functions
        case 'trigo_2nd': {
            if (invTrigo)
                invTrigo = false;
            else
                invTrigo = true;
            toggleTrigoFunc();
            break;
        }
        case 'hyp': {
            if (hypeTrigo) {
                hypeTrigo = false;
            }
            else {
                hypeTrigo = true;
            }
            toggleTrigoFunc();
            break;
        }
        case 'sin': {
            if (degToRad) {
                display.value = (Math.sin((Math.PI / 180) * Number(display.value))).toString();
            }
            else {
                display.value = (Math.sin(Number(display.value))).toString();
            }
            break;
        }
        case 'cos': {
            if (degToRad) {
                display.value = (Math.cos((Math.PI / 180) * Number(display.value))).toString();
            }
            else {
                display.value = (Math.cos(Number(display.value))).toString();
            }
            break;
        }
        case 'tan': {
            if (degToRad) {
                display.value = (Math.tan((Math.PI / 180) * Number(display.value))).toString();
            }
            else {
                display.value = (Math.tan(Number(display.value))).toString();
            }
            break;
        }
        case 'cosec': {
            if (degToRad) {
                display.value = (1 / (Math.sin(Math.PI / 180 * Number(display.value)))).toString();
            }
            else {
                display.value = (1 / Math.sin(Number(display.value))).toString();
            }
            break;
        }
        case 'sec': {
            if (degToRad) {
                display.value = (1 / (Math.cos(Math.PI / 180 * Number(display.value)))).toString();
            }
            else {
                display.value = (1 / Math.cos(Number(display.value))).toString();
            }
            break;
        }
        case 'cot': {
            if (degToRad) {
                display.value = (1 / (Math.tan(Math.PI / 180 * Number(display.value)))).toString();
            }
            else {
                display.value = (1 / Math.tan(Number(display.value))).toString();
            }
            break;
        }
        case 'sinh': {
            display.value = (Math.sinh(Number(display.value))).toString();
            break;
        }
        case 'cosh': {
            display.value = (Math.cosh(Number(display.value))).toString();
            break;
        }
        case 'tanh': {
            display.value = (Math.tanh(Number(display.value))).toString();
            break;
        }
        case 'cosech': {
            display.value = (1 / Math.sinh(Number(display.value))).toString();
            break;
        }
        case 'sech': {
            display.value = (1 / Math.cosh(Number(display.value))).toString();
            break;
        }
        case 'coth': {
            display.value = (1 / Math.tanh(Number(display.value))).toString();
            break;
        }
        case 'asin': {
            if (degToRad) {
                display.value = (Math.asin((Math.PI / 180) * Number(display.value))).toString();
            }
            else {
                display.value = (Math.asin(Number(display.value))).toString();
            }
            break;
        }
        case 'acos': {
            if (degToRad) {
                display.value = (Math.acos((Math.PI / 180) * Number(display.value))).toString();
            }
            else {
                display.value = (Math.acos(Number(display.value))).toString();
            }
            break;
        }
        case 'atan': {
            if (degToRad) {
                display.value = (Math.atan((Math.PI / 180) * Number(Number(display.value)))).toString();
            }
            else {
                display.value = (Math.atan(Number(display.value))).toString();
            }
            break;
        }
        case 'acosec': {
            if (degToRad) {
                display.value = (1 / (Math.asin(Math.PI / 180 * Number(display.value)))).toString();
            }
            else {
                display.value = (1 / Math.asin(Number(display.value))).toString();
            }
            break;
        }
        case 'asec': {
            if (degToRad) {
                display.value = (1 / (Math.acos(Math.PI / 180 * Number(display.value)))).toString();
            }
            else {
                display.value = (1 / Math.acos(Number(display.value))).toString();
            }
            break;
        }
        case 'acot': {
            if (degToRad) {
                display.value = (1 / (Math.atan(Math.PI / 180 * Number(display.value)))).toString();
            }
            else {
                display.value = (1 / Math.atan(Number(display.value))).toString();
            }
            break;
        }
        case 'asinh': {
            display.value = (Math.asinh(Number(display.value))).toString();
            break;
        }
        case 'acosh': {
            display.value = (Math.acosh(Number(display.value))).toString();
            break;
        }
        case 'atanh': {
            display.value = (Math.atanh(Number(display.value))).toString();
            break;
        }
        case 'acosech': {
            display.value = (1 / Math.asinh(Number(display.value))).toString();
            break;
        }
        case 'asech': {
            display.value = (1 / Math.acosh(Number(display.value))).toString();
            break;
        }
        case 'acoth': {
            display.value = (1 / Math.atanh(Number(display.value))).toString();
            break;
        }
        //Functions
        case 'floor': {
            display.value = Math.floor(Number(Number(display.value))).toString();
            break;
        }
        case 'random': {
            display.value = Math.random().toString();
            break;
        }
        case 'ceil': {
            display.value = Math.ceil(Number(Number(display.value))).toString();
            break;
        }
        //2nd , Pi, Exponential, Clear , delete  
        case '2nd': {
            toggleBtn('change_val_btn', 'change_val_btn1');
            break;
        }
        case 'pi': {
            display.value += onlyVal(Math.PI);
            break;
        }
        case 'e': {
            display.value += onlyVal(Math.exp(1));
            break;
        }
        case 'C': {
            display.value = "";
            break;
        }
        case 'del': {
            display.value = display.value.slice(0, display.value.length - 1);
            break;
        }
        // x^2, x^3, |x|
        case 'x^2': {
            display.value = expoValue(Number(display.value), 2);
            break;
        }
        case 'x^3': {
            display.value = expoValue(Number(display.value), 3);
            break;
        }
        case 'modx': {
            display.value = modx();
            break;
        }
        //√x, 3√x, (, ), n! 
        case 'sqrt': {
            display.value = Math.sqrt(Number(display.value)).toString();
            break;
        }
        case 'cbrt': {
            display.value = Math.cbrt(Number(display.value)).toString();
            break;
        }
        case 'o_b': {
            display.value += "(";
            break;
        }
        case 'c_b': {
            display.value += ")";
            break;
        }
        case 'fact': {
            factorial();
            break;
        }
        //10^x, 2^x, log, ln
        case '10x': {
            display.value = expoValue(10, Number(display.value));
            break;
        }
        case '2x': {
            display.value = expoValue(2, Number(display.value));
            break;
        }
        case 'log': {
            display.value = Math.log10(Number(display.value)).toString();
            break;
        }
        case 'ln': {
            display.value = Math.log(Number(display.value)).toString();
            break;
        }
        // e^x, +/-, =
        case 'ex': {
            display.value = expoValue(Math.exp(1), Number(display.value));
            break;
        }
        case 'sign': {
            changeSign();
            break;
        }
        case '=': {
            if (display.value === "") {
                display.value = "0";
            }
            else {
                display.value = String(display.value).replaceAll("^", "**");
                display.value = String(display.value).replaceAll("mod", "%");
                if (display.value.includes('√')) {
                    yrootx();
                }
                else if (display.value.includes('ylog')) {
                    getBaseLog();
                }
                else {
                    calculateExpression(display.value);
                }
            }
            break;
        }
        default: {
            display.value += enteredValue;
        }
    }
}
document.addEventListener('keydown', function (event) {
    if (display === null)
        return;
    clearDisplay();
    let key = event.key;
    if (isNaN(Number(key)) === false || key === '+' || key === '-' || key === '*' || key === '/' || key === '.') {
        display.value += key;
    }
    else if (key === "Backspace") {
        let len = display.value.length;
        display.value = display.value.slice(0, len - 1);
    }
    else if (key === 'Enter') {
        calculateExpression(display.value);
    }
});
