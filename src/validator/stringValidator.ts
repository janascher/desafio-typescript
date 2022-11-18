import { Validator } from './validator';

export class StringValidator extends Validator {
    constructor(data: any) {
        if (typeof data === 'string') {
            super(data);
        } else {
            throw new Error('O tipo string está errado');
        }
    }
}