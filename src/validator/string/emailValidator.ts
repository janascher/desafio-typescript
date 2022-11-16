import { RegexValidator } from './regexValidator';

export class EmailValidator extends RegexValidator {
    constructor(data: any) {
        super(data);
        this.regexp = /^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim;
        const result: boolean = this.regexp.test(data);

        if (result === true) {
            console.log(`O e-mail ${data} está correto.`);
        } else {
            throw new Error('O formato está errado');
        }
    }
}
