import { Injectable, OnInit, NgZone }    from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';

import {MultipartItem} from "../plugins/multipart-upload/multipart-item";
import {MultipartUploader} from "../plugins/multipart-upload/multipart-uploader";

import 'rxjs/add/operator/toPromise';

import { Hook } from './hook';
import {HookInterface} from "./hook-interface";

@Injectable()
export class HookService {

    private host = "http://localhost:8081";
    private hooks_path = '/hooks';  // URL to web api

    private multipartItem:MultipartItem;
    private uploader:MultipartUploader;

    private hooksCache: Hook[];

    constructor(private http: Http) {}

    /**
     * Holds files as they are added to the form.
     * @type {Array}
     */
    files: File[] = [];

    getHooks(): Promise<Hook[]> {
        return this.http.get(this.host + this.hooks_path)
            .toPromise()
            .then(response => response.json() as Hook[])
            .catch(this.handleError);
    }

    // private handleError(error: any): Promise<any> {
    //     console.error('An error occurred', error); // for demo purposes only
    //     return Promise.reject(error.message || error);
    // }

    private handleError (error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Promise.reject(errMsg);
    }

    // protected findHook(hook) {
    //     return hook.id === 'cherries';
    // }

    getHook(id: string): Promise<Hook> {
        return this.getHooks()
            .then((hooks) => {
                return hooks.find((hook, index, hooks) => {
                    return hook.id == id;
                });
            });
    }

    getHookInterface(interface_path: string): Promise<HookInterface> {
        return this.http.get(this.host + interface_path)
            .toPromise()
            .then(response => response.json() as HookInterface)
            .catch(this.handleError);
    }


    // Upload below

    uploadCallback = (data) => {
        console.debug("home.ts & uploadCallback() ==>");
        this.files = [];
        if (data){
            console.debug("home.ts & uploadCallback() upload file success.");
        }else{
            console.error("home.ts & uploadCallback() upload file false.");
        }
    };

    selectFile($event): void {
        var inputValue = $event.target;
        var theFile = inputValue.files[0];
        if( null == inputValue || null == inputValue.files[0]){
            console.debug("Input file error.");
            return;
        } else {
            this.files.push(inputValue.files[0]);
            console.debug("Input File name: " + theFile.name + " type:" + theFile.type + " size:" +theFile.size);
        }
    }

    upload (event, hookInterface: HookInterface, hook: Hook) {
        let model = this;

        model.uploader = new MultipartUploader({url: model.host + hook.path});
        model.multipartItem = new MultipartItem(this.uploader);
        model.multipartItem.withCredentials = false;
        model.multipartItem.method = hook.method.toUpperCase();


        // event.preventDefault();
        console.debug("home.ts & upload() ==>");

        if (model.multipartItem == null){
            model.multipartItem = new MultipartItem(model.uploader);
        }
        if (model.multipartItem.formData == null){
            model.multipartItem.formData = new FormData();
        }

        // Add form fields in
        hookInterface.fields.forEach(function(field){
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


}
