
let flag = 1, f_e = 1, deg_rad = 1, inv_trigo = 1, hyp_trigo = 1;
let memory = [];
var input_value = document.getElementById("display");

function calculate(statement) {
    try {
        var ans = eval(statement);
        input_value.value = ans;
    }
    catch (e) {
        input_value.value = "ERROR!";
    }
}

function factorial() {
    let num = Number(input_value.value);
    if (num == 0 || num == 1) {
        input_value.value = "1";
    }
    else if (num > 1) {
        for (var i = num - 1; i > 1; i--) {
            num = num * i;
        }
        input_value.value = num;
    }
}

function only_val(val) {
    if (String(input_value.value).charAt(input_value.value.length - 1) == '-' || String(input_value.value).charAt(input_value.value.length - 1) == '+' || String(input_value.value).charAt(input_value.value.length - 1) == '/' || input_value.value == "") {
        input_value.value += val;
    }
    else {
        input_value.value = input_value.value + '*' + val;
    }
}

function change_sign() {
    if (input_value.value.charAt(0) === "-") {
        input_value.value = input_value.value.slice(1);
    } else {
        input_value.value = "-" + input_value.value;
    }
}
function modx() {
    if (input_value.value.charAt(0) === '-') {
        input_value.value = input_value.value.slice(1);
    }
}
function split_values(symbol) {
    let expression = input_value.value.split(symbol)
    let y = Number(expression[0]);
    let x = Number(expression[1]);
    return [x, y];
}
function yrtx() {
    let nums = split_values('√')
    input_value.value = Math.pow(nums[0], 1 / nums[1])
}

function getBaseLog() {
    let nums = split_values('ylog');
    input_value.value = Math.log(nums[0]) / Math.log(nums[1]);
}

function change_btn(curr_val, next_val) {
    if (flag == 1) {
        for (let element of document.getElementsByClassName(curr_val)) {
            element.style.display = "none";
        }
        for (let element of document.getElementsByClassName(next_val)) {
            element.style.display = "inline-block";
        }
        flag = 0;
    } else {
        for (let element of document.getElementsByClassName(next_val)) {
            element.style.display = "none";
        }
        for (let element of document.getElementsByClassName(curr_val)) {
            element.style.display = "inline-block";
        }
        flag = 1;
    }
}



function change_trigo_func() {
    if (inv_trigo == 0 && hyp_trigo == 1) {
        document.getElementById('trigo_func').style.display = "none";
        document.getElementById('inverse_trigo_func').style.display = "inline-block";
        document.getElementById('hyp_trigo_func').style.display = "none";
        document.getElementById('hyp_inverse_trigo_func').style.display = "none";
    }
    else if (inv_trigo == 1 && hyp_trigo == 1) {
        document.getElementById('trigo_func').style.display = "inline-block";
        document.getElementById('inverse_trigo_func').style.display = "none";
        document.getElementById('hyp_trigo_func').style.display = "none";
        document.getElementById('hyp_inverse_trigo_func').style.display = "none";
    }
    else if (inv_trigo == 0 && hyp_trigo === 0) {
        document.getElementById('trigo_func').style.display = "none";
        document.getElementById('inverse_trigo_func').style.display = "none";
        document.getElementById('hyp_trigo_func').style.display = "none";
        document.getElementById('hyp_inverse_trigo_func').style.display = "inline-block";
    }
    else {
        document.getElementById('trigo_func').style.display = "none";
        document.getElementById('inverse_trigo_func').style.display = "none";
        document.getElementById('hyp_trigo_func').style.display = "inline-block";
        document.getElementById('hyp_inverse_trigo_func').style.display = "none";
    }
}

function expo_val(num, sup) {
    return Math.pow(num, sup);
}
function clear_display() {
    if (input_value.value == "ERROR!") {
        input_value.value = "";
    }
}

function sin_cos_tan_trigo(func_name) {
    if (deg_rad) {
        input_value.value = (func_name((Math.PI / 180) * Number(input_value.value))).toFixed(5);
    }
    else {
        input_value.value = (func_name(input_value.value)).toFixed(5);
    }
}

function csc_sec_cot_trigo(func_name) {
    if (deg_rad) {
        input_value.value = 1 / (func_name(Math.PI / 180 * input_value.value)).toFixed(5);
    }
    else {
        input_value.value = 1 / func_name(display.value).toFixed(5);
    }
}

function sin_cos_tan_inv_trigo(func_name) {
    if (deg_rad) {
        input_value.value = (180 / Math.PI * func_name(input_value.value)).toFixed(5);
    }
    else {
        input_value.value = func_name(input_value.value).toFixed(5);
    }
}

function csc_sec_cot_inv_trigo(func_name) {
    if (deg_rad) {
        input_value.value = (180 / Math.PI * (func_name(1 / input_value.value))).toFixed(5);
    }
    else {
        input_value.value = 1 / func_name(input_value.value).toFixed(5);
    }
}

function hyp_sin_cos_tan_func(func_name){
    input_value.value = (func_name(input_value.value)).toFixed(5);
}
function hyp_csc_sec_cot_func(func_name){
    input_value.value = (1/func_name(input_value.value)).toFixed(5);
}

function enable_mc_mr() {
    document.getElementById('mc').disabled = false;
    document.getElementById('mr').disabled = false;
}

function mc() {
    memory = [];
    document.getElementById('mc').disabled = true;
    document.getElementById('mr').disabled = true;
}

function mr() {
    input_value.value = memory[memory.length - 1];
}

function m_plus() {
    enable_mc_mr();
    if (memory.length == 0) {
        memory.push(parseFloat(input_value.value));
    } else {
        memory[memory.length - 1] += parseFloat(input_value.value);
    }
}
function m_minus() {
    enable_mc_mr();
    if (memory.length == 0) {
        memory.push(parseFloat(input_value.value));
    } else {
        memory[memory.length - 1] -= parseFloat(input_value.value);
    }
}

function ms() {
    enable_mc_mr();
    if (parseFloat(input_value.value) == NaN) {
        alert("Enter a number");
    } else {
        memory.push(parseFloat(input_value.value));
    }
}

function enter_value(entered_value) {
    clear_display();
    switch (entered_value) {
        case 'C': {
            input_value.value = "";
            break;
        }
        case '=': {
            if (input_value.value == "") {
                input_value.value = 0;
            }
            else {
                input_value.value = String(input_value.value).replaceAll("^", "**");
                input_value.value = String(input_value.value).replaceAll("mod", "%");
                if (input_value.value.includes('√')) {
                    yrtx();
                } else if (input_value.value.includes('ylog')) {

                    getBaseLog();
                }
                else {
                    calculate(input_value.value);
                }
            }
            break;
        }
        case 'del': {
            let len = input_value.value.length;
            input_value.value = input_value.value.slice(0, Number(len) - 1);
            break;
        }
        case 'ln': {
            let log_ans = Math.log(input_value.value);
            input_value.value = log_ans;
            break;
        }
        case 'log': {
            let log_ans = Math.log10(input_value.value);
            input_value.value = log_ans;
            break;
        }
        case 'x^2': {
            input_value.value = expo_val(Number(input_value.value), 2);
            break;
        }
        case 'x^3': {
            input_value.value = expo_val(Number(input_value.value), 3);
            break;
        }
        case '10x': {
            input_value.value = expo_val(10, Number(input_value.value));
            break;
        }
        case 'fact': {
            factorial();
            break;
        }
        case 'o_b': {
            input_value.value += "(";
            break;
        }
        case 'c_b': {
            input_value.value += ")";
            break;
        }
        case 'sqrt': {
            input_value.value = Math.sqrt(Number(input_value.value));
            break;
        }
        case 'cbrt': {
            input_value.value = Math.cbrt(Number(input_value.value));
            break;
        }
        case 'sign': {
            change_sign();
            break;
        }
        case 'pi': {
            only_val(Math.PI);
            break;
        }
        case 'e': {
            only_val(Math.exp(1));
            break;
        }
        case '2nd': {
            change_btn('change_val_btn', 'change_val_btn1');
            break;
        }
        case 'modx': {
            modx();
            break;
        }
        case '2x': {
            input_value.value = expo_val(2, Number(input_value.value));
            break;
        }
        case 'ex': {

            input_value.value = expo_val(Math.exp(1), Number(input_value.value));
            break;
        }
        case 'deg': {
            if (deg_rad == 1) {
                document.querySelector('.deg').innerHTML = "RAD";
                deg_rad = 0;
            } else {
                document.querySelector('.deg').innerHTML = 'DEG';
                deg_rad = 1;
            }
            break;
        }
        case 'f-e': {
            if (f_e) {
                input_value.value = Number(input_value.value);
                f_e = 0;
            }
            else {
                input_value.value = Number(input_value.value).toExponential();
                f_e = 1;
            }
            break;
        }
        case 'floor': {
            input_value.value = Math.floor(input_value.value);
            break;
        }
        case 'random': {
            input_value.value = Math.random();
            break;
        }
        case 'ceil': {
            input_value.value = Math.ceil(input_value.value);
            break;
        }
        case 'trigo_2nd': {
            if(inv_trigo){
                inv_trigo = 0;
            }
            else{
                inv_trigo = 1;
            }
            change_trigo_func();
            break;
        }
        case 'hyp': {
            if(hyp_trigo){
                hyp_trigo = 0;
            }
            else{
                hyp_trigo = 1;
            }
            change_trigo_func();
            break;
        }
        default: {
            input_value.value += entered_value;
        }
    }
}
