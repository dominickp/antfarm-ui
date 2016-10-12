import { Component } from '@angular/core';
import {ErrorService} from "./error.service";

@Component({
    moduleId: module.id,
    selector: 'error-message',
    template:`
        <div *ngIf="errorService.message" class="alert alert-danger">
            <strong>Error!</strong> {{ errorService.message }}
        </div>
      `,
    styles: [],
    providers: []

})

export class ErrorMessageComponent {

    constructor(private errorService: ErrorService) {}

}