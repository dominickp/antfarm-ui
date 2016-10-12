import { Injectable }    from '@angular/core';

@Injectable()
export class ErrorService {
    public _message: string = "";

    public set message(message: string) {
        this._message = message;
    }

    public get message() {
        return this._message;
    }

    public resetMessage() {
        this._message = "";
    }
}