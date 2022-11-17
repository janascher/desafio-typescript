import { RegexValidator } from './regexValidator';

export class UUIDValidator extends RegexValidator {
    constructor(data: any) {
        super(data);
        this.regexp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gim;
        const result: boolean = this.regexp.test(data);

        if (result === true) {
            console.log(`O id ${data} está correto.`);
        } else {
            throw new Error('O formato está errado');
        }
    }
}