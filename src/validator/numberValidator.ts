import { Validator } from './validator';

export class NumberValidator extends Validator {
    constructor(data: any) {
        if (typeof data === 'number') {
            super(data);
        } else {
            throw new Error('O tipo number está errado');
        }
    }
}