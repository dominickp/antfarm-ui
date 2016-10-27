import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

    save(name,data){
        let localData= localStorage.getItem('antfarm-ui');
        if(localData){
            localData = JSON.parse(localData);
        }else{
            localData = {};
        }

        localData[name] = data;

        localStorage.setItem('antfarm-ui',JSON.stringify(localData))
    }

    get(name){
        let data = JSON.parse(localStorage.getItem('antfarm-ui'));
        if(!data){
            return undefined;
        }
        if(name){
            if(data[name]){
                return data[name];
            }else{
                return {};
            }
        }
        return data ;
    }
}