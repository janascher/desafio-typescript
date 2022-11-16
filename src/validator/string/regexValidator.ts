import { StringValidator } from "../stringValidator";

export abstract class RegexValidator extends StringValidator {
    regexp: RegExp = new RegExp('');
    constructor(data: any) {
        super(data);
        const stringData = this._data as string;
        if (!stringData.match(this.regex))
        {
            throw new Error('O formato está errado');
        }
    }

    get regex() {
        return this.regexp;
    }
}