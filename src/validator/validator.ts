export class Validator {
    protected _data: string | number | boolean | undefined | null | void;

    constructor(data: any) {
        this._data = data;
    }
}