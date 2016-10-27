import { Injectable, OnInit, NgZone }    from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';

import {MultipartItem} from "../plugins/multipart-upload/multipart-item";
import {MultipartUploader} from "../plugins/multipart-upload/multipart-uploader";

import 'rxjs/add/operator/toPromise';

import { Hook } from './hook';
import {HookInterface} from "../hook-interface/hook-interface";
import {Field} from "./field";
import {HeldJob} from "../hook-interface/held-job";
import {AntfarmServer} from "../management/antfarm-server";
import {LocalStorageService} from "../local-storage/local-storage.service";

@Injectable()
export class HookService {

    private host = null;
    private hooks_path = '/hooks';  // URL to web api

    private multipartItem: MultipartItem;
    private uploader: MultipartUploader;

    // private hooksCache: Hook[];

    public hookInterface: HookInterface;

    public hook: Hook;

    public hookResponse;

    protected servers: AntfarmServer[];

    constructor(private http: Http, private storageService: LocalStorageService) {
        this.servers = storageService.get("servers") as AntfarmServer[] || [];
    }

    public getServer(index: number) {
        return this.servers[index] as AntfarmServer;
    }

    public getServers() {
        return this.servers;
    }

    public addServer(server: AntfarmServer) {
        this.servers.push(server);
        this.updateServerStorage();
    }

    public deleteServer(index: number) {
        this.servers.splice(index, 1);
        this.updateServerStorage();
    }

    public setActiveServerId(index: number) {
        let s = this;
        s.setActiveServer(s.getServer(index));
    }
    public setActiveServer(server: AntfarmServer) {
        this.host = `http://${server.host}:${server.port}`;
    }

    public updateServerStorage() {
        let s = this;
        s.storageService.save("servers", s.servers);
    }

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

    loadHook(id: string): Promise<Hook> {
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
            .then(response => {
                let hi = response.json() as HookInterface;
                return hi;
            } )
            .catch(this.handleError);
    }


    // Upload below

    uploadCallback = (data, status) => {
        let response = JSON.parse(data);
        response.status = status;
        this.hookResponse = response;
        console.debug("home.ts & uploadCallback() ==>");
        this.files = [];
        if (data){
            console.debug("home.ts & uploadCallback() upload file success.");
            console.log(data);
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

    protected serializeHookInterface(sessionId: string, fields: Field[], heldJobs?: HeldJob[]){

        let fieldsParam = [];
        fields.forEach(field => {
            let fieldObj = {
                id: field.id,
                value: field.value
            };
            fieldsParam.push(fieldObj);
        });

        let str = [];
        fieldsParam.forEach(field =>{
            str.push(encodeURIComponent(field.id) + "=" + encodeURIComponent(field.value))
        });

        if(heldJobs) {

            let heldJobsParam = [];
            heldJobs.forEach(job => {
                if (job.process === true) {
                    heldJobsParam.push(job.id);
                }
            });

            heldJobsParam.forEach(jobId => {
                str.push("processHeld=" + encodeURIComponent(jobId));
            })
        }

        return "?sessionId="+sessionId+"&" + str.join("&");

    }

    upload (event, hookRequest = true, callback?: any) {
        let model = this;
        let hookInterface = model.getInterface();
        let hook = model.getHook();

        // If GET, serialize interface values into URL
        let queryString = "";

        // Determine request URL
        let requestUrl, requestMethod;
        if(hookRequest === true) {
            requestMethod = hook.method.toUpperCase();
            if(hook.method.toUpperCase() === "GET") {
                queryString = model.serializeHookInterface(hookInterface.sessionId, hookInterface.fields, hookInterface.heldJobs);
            }
            requestUrl = model.host + hook.path + queryString;
        } else {
            queryString = model.serializeHookInterface(hookInterface.sessionId, hookInterface.fields, hookInterface.heldJobs);
            requestUrl = model.host + hook.interface_path + queryString;
            requestMethod = "GET";
        }

        model.uploader = new MultipartUploader({url: requestUrl});
        model.multipartItem = new MultipartItem(this.uploader);
        model.multipartItem.withCredentials = false;
        model.multipartItem.method = requestMethod;


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

        // Add held jobs that were selected in
        hookInterface.heldJobs.forEach(function(heldJob){
            if(heldJob.process === true){
                model.multipartItem.formData.append("process", heldJob.id);
            }
        });

        // Add files in
        model.files.forEach(function(file, index){
            model.multipartItem.formData.append("file"+index,  file);
        });

        if(callback){
            this.multipartItem.callback = callback;
        } else {
            this.multipartItem.callback = this.uploadCallback;
        }
        this.multipartItem.upload();
    };

    public setInterface(i: HookInterface) {
        this.hookInterface = i;
    }

    public getInterface() {
        return this.hookInterface;
    }

    public setHook(h: Hook) {
        this.hook = h;
    }

    public getHook() {
        return this.hook;
    }

}
