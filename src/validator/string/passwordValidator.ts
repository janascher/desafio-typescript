import { RegexValidator } from './regexValidator';

export class PasswordValidator extends RegexValidator {
    constructor(data: any) {
        super(data);
        this.regexp = /^\w{1,}$/gim;
        const result: boolean = this.regexp.test(data);

        if (result === true) {
            console.log(`A senha ${data} está correta.`);
        } else {
            throw new Error('O formato está errado');
        }
    }
}
