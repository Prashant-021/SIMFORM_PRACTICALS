export class Invoice {
    constructor(Type, client, details, amount) {
        this.Type = Type;
        this.client = client;
        this.details = details;
        this.amount = amount;
    }
    getType() {
        return `${this.Type}`;
    }
    format() {
        return `You got ₹${this.amount} from ${this.client} for ${this.details}`;
    }
}
