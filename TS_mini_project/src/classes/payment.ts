import { hasFormatter } from "../utilities/utilities.js"

export class Payment implements hasFormatter{
    constructor(
        public Type: string,
        private readonly recipient: string,
        private details: string,
        private amount: number
    ) { }
    
    getType() {
        return this.Type
    }
    format() {
        return `You gave ${this.recipient} to ₹${this.amount} for ${this.details}`
    }
}   