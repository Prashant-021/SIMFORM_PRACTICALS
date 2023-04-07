import { Invoice } from './classes/invoice.js';
import { ListTemplate } from './classes/listTemplate.js';
import { Payment } from './classes/payment.js';
import { onError } from './utilities/utilities.js';
const form = document.querySelector('.addFinanceLog');
const type = document.querySelector('#type');
const toFrom = document.querySelector('#toFrom');
const details = document.querySelector('#details');
const amount = document.querySelector('#amount');
const logoutBtn = document.querySelector('#logOutBtn');
const savedData = localStorage.getItem('LogsData');
let presentLogs = {
    logs: [],
};
if (savedData != null) {
    presentLogs.logs = JSON.parse(savedData);
}
//list Template
const ul = document.querySelector('ul');
const list = new ListTemplate(ul);
const validateDate = (...data) => {
    let isValid = true;
    if (data[0] === "") {
        onError(toFrom);
        isValid = false;
    }
    if (data[1] === "") {
        onError(details);
        isValid = false;
    }
    if (data[2] === "") {
        onError(amount);
        isValid = false;
    }
    return isValid;
};
let current = sessionStorage.getItem('currentUser');
if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let logs;
        if (validateDate(toFrom.value, details.value, amount.value)) {
            if (type.value === 'invoice') {
                logs = new Invoice(type.value, toFrom.value, details.value, amount.valueAsNumber);
            }
            else {
                logs = new Payment(type.value, toFrom.value, details.value, amount.valueAsNumber);
            }
            presentLogs.logs.push(logs);
            if (current)
                localStorage.setItem(current, JSON.stringify(presentLogs.logs));
            list.render(logs, logs.Type, "end");
            console.log(logs);
        }
    });
}
const viewLogs = () => {
    if (current) {
        let userLog = localStorage.getItem(current);
        console.log(userLog);
    }
};
viewLogs();
logoutBtn === null || logoutBtn === void 0 ? void 0 : logoutBtn.addEventListener("click", () => {
    document.location = 'index.html';
    sessionStorage.clear();
});
