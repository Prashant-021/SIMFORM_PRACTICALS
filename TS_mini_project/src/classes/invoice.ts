import { hasFormatter } from '../utilities/utilities.js'

export class Invoice implements hasFormatter {
    constructor(
        public Type: string,
        private readonly client: string,
        private details: string,
        private amount: number
    ) { }
    getType() {
        return `${this.Type}`
    }
    format() {
        return `You got ₹${this.amount} from ${this.client} for ${this.details}`
    }
}