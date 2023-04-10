export class Payment {
    constructor(Type, recipient, details, amount) {
        this.Type = Type;
        this.recipient = recipient;
        this.details = details;
        this.amount = amount;
    }
    getType() {
        return this.Type;
    }
    format() {
        return `You gave ${this.recipient} to ₹${this.amount} for ${this.details}`;
    }
}
