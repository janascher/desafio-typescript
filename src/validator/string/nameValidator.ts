import { RegexValidator } from './regexValidator';

export class NameValidator extends RegexValidator {
    constructor(data: any) {
        super(data);
        this.regexp = /^([a-z]{1,})([ ]{1}[a-z]{1,}){0,}$/gim;
        const result: boolean = this.regexp.test(data);

        if (result === true) {
            console.log(`O nome ${data} está correto.`);
        } else {
            throw new Error('O formato está errado');
        }
    }
}
