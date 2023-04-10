import { Invoice } from './classes/invoice.js'
import { ListTemplate } from './classes/listTemplate.js';
import { Payment } from './classes/payment.js';
import { hasFormatter, Log, onError } from './utilities/utilities.js';

type ObjLogs = {
    logs: hasFormatter[]
}

const form = document.querySelector('.addFinanceLog') as HTMLFormElement;

const type = document.querySelector('#type') as HTMLSelectElement;
const toFrom = document.querySelector('#toFrom') as HTMLInputElement;
const details = document.querySelector('#details') as HTMLInputElement;
const amount = document.querySelector('#amount') as HTMLInputElement;

const logoutBtn = document.querySelector('#logOutBtn')

const savedData = localStorage.getItem('LogsData')
let presentLogs: ObjLogs = {
    logs: [],
}
if (savedData != null) {
    presentLogs.logs = JSON.parse(savedData)
}



//list Template
const ul = document.querySelector('ul') as HTMLUListElement;
const list = new ListTemplate(ul);


const validateDate = (...data: string[]): boolean => {
    let isValid: boolean = true;
    if (data[0] === "") {
        onError(toFrom)
        isValid = false
    }
    if (data[1] === "") {
        onError(details)
        isValid = false
    }
    if (data[2] === "") {
        onError(amount)
        isValid = false
    }
    return isValid
}
let current: string | null=sessionStorage.getItem('currentUser');

if (form) {
    form.addEventListener("submit", (e: Event) => {
        e.preventDefault()
        
        let logs: hasFormatter;
        if (validateDate(toFrom.value, details.value, amount.value)) {
            
            if (type.value === 'invoice') {
                logs = new Invoice(type.value, toFrom.value, details.value, amount.valueAsNumber)
            } else {
                logs = new Payment(type.value, toFrom.value, details.value, amount.valueAsNumber)
            }
            presentLogs.logs.push(logs)
            if(current)
                localStorage.setItem(current, JSON.stringify(presentLogs.logs))
            list.render(logs, logs.Type, "end")
            console.log(logs);
            
        }
    })
}


const viewLogs = (): void => {
    if(current){
        let userLog = localStorage.getItem(current)
        console.log(userLog);
        
    }
};
viewLogs()



logoutBtn?.addEventListener("click", () => {
    document.location = 'index.html'
    sessionStorage.clear()
})

