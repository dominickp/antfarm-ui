import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { FormsModule }   from '@angular/forms';
// import { TooltipModule } from 'ng2-bootstrap/ng2-bootstrap';

import {MultipartItem} from "../plugins/multipart-upload/multipart-item";
import {MultipartUploader} from "../plugins/multipart-upload/multipart-uploader";

import { HookService } from './hook.service';
import { Hook } from './hook';
import { HookInterface } from './hook-interface';

@Component({
    selector: 'hook-interface',
    template: `
      <div *ngIf="hookInterface">
        <form *ngIf="active" (ngSubmit)="upload()" #interfaceForm="ngForm">
        
            <div *ngFor="let field of hookInterface.fields" class="form-group">
            
                <label htmlFor="{{field.id}}">
                    {{field.name}} 
                    <span *ngIf="field.tooltip" [tooltip]="field.tooltip" tooltipPlacement="right"
                        class="glyphicon glyphicon-info-sign" ></span>
                </label>
                
                    <div [ngSwitch]="field.type">
                    
                        <textarea *ngSwitchCase="'textarea'" class="form-control" id="{{field.id}}" 
                        placeholder="{{field.placeholder}}" name="{{field.id}}"
                        [(ngModel)]="field.value"></textarea>
                        
                        <input *ngSwitchCase="'text'" type="text" class="form-control" id="{{field.id}}" 
                        placeholder="{{field.placeholder}}" name="{{field.id}}"
                        [(ngModel)]="field.value">
                        
                        <select *ngSwitchCase="'select'" id="{{field.id}}" name="{{field.id}}" class="form-control">
                          <option *ngFor="let value of field.acceptableValues">{{value}}</option>
                        </select>
                        
                        <div class="file_upload" *ngSwitchCase="'file'" >
                            <input type="file" name="{{field.id}}" id="{{field.id}}" class="form-control" 
                                (change)="selectFile($event)">
                        </div>
 
                        <div *ngSwitchDefault="" class="alert alert-danger" role="alert">
                            <strong>Error!</strong> Field type "{{field.type}}" is not supported.
                        </div>
                      
                    </div>
                    
                    <p class="help-block">{{field.description}}</p>

                    
            </div>
             <button class="btn btn-primary" (click)="upload($event);">Submit</button>
            
        </form>
      </div>
    `
})

export class HookInterfaceComponent implements OnInit {

    protected endpoint = "http://insight.dev:8081/hooks/proof/create";

    private uploader:MultipartUploader = new MultipartUploader({url: "http://insight.dev:8081/hooks/proof/create"});

    multipartItem:MultipartItem = new MultipartItem(this.uploader);

    /**
     * Holds files as they are added to the form.
     * @type {Array}
     */
    files: File[] = [];

    constructor(
        private hookService: HookService,
        private route: ActivatedRoute,
        private location: Location
    ) {
        this.multipartItem.withCredentials = false;
    }

    upload (event) {
        let model = this;
        event.preventDefault();
        console.debug("home.ts & upload() ==>");

        if (model.multipartItem == null){
            model.multipartItem = new MultipartItem(model.uploader);
        }
        if (model.multipartItem.formData == null){
            model.multipartItem.formData = new FormData();
        }

        // Add form fields in
        model.hookInterface.fields.forEach(function(field){
            if(field.type !== "file"){
                console.log("Adding to formdata", field.id, field.value);
                model.multipartItem.formData.append(field.id, field.value);
            }

        });

        // Add files in
        model.files.forEach(function(file, index){
            model.multipartItem.formData.append("file"+index,  file);
        });

        this.multipartItem.callback = this.uploadCallback;
        this.multipartItem.upload();
    };

    uploadCallback = (data) => {
        console.debug("home.ts & uploadCallback() ==>");
        this.files = [];
        if (data){
            console.debug("home.ts & uploadCallback() upload file success.");
        }else{
            console.error("home.ts & uploadCallback() upload file false.");
        }
    };

    @Input()
    hookInterface: HookInterface;
    @Input()
    hook: Hook;

    active = true;
    submitted = false;

    ngOnInit() {}

    selectFile($event): void {
        var inputValue = $event.target;
        var theFile = inputValue.files[0];
        if( null == inputValue || null == inputValue.files[0]){
            console.debug("Input file error.");
            return;
        }else {
            this.files.push(inputValue.files[0]);
            console.debug("Input File name: " + theFile.name + " type:" + theFile.type + " size:" +theFile.size);
        }
    }
}
