

import Data from '../model/Data'
import { resolve } from 'dns';
export default class ApiCaller {
    public apiUrl : string;

    constructor(_apiUrl : string){
        this.apiUrl = _apiUrl;
    }


    callCurrencyApi():Promise<Data[]>{
        return new Promise<Data[]>((resolve,reject)=>{
            let items : Data[] = [];
            fetch(this.apiUrl)
                .then(response => response.json())
                .then((response) => {
                    for(var i = 0;i < response.length;i++){
                        let name : string = response[i]['full_name'];
                        let code : string = response[i]['code'];
                        let buying : number = response[i]['buying'].toFixed(3);
                        let selling : number =  response[i]['selling'].toFixed(3)
                        let change_Rate : number = response[i]['change_rate'].toFixed(2);                       
                        let item : Data = new Data(name,code,buying,selling,change_Rate);                                            
                        items.push(item);
                    }
                }).then(()=>{
                    resolve(items);
                }).catch((err) => {
                    reject(err);
                    console.log(err);


                })
        })
    }
        callGoldApi():Promise<Data[]>{
            return new Promise<Data[]>((resolve,reject)=>{
                let items : Data[] = [];
                fetch(this.apiUrl)
                    .then(response => response.json())
                    .then((response) => {
                        for(var i = 0;i < response.length;i++){
                            if(response[i] != null)
                            {
                                let name : string = response[i]['full_name'];
                                let code : string = response[i]['full_name'];
                                let buying : number = response[i]['buying'].toFixed(2);
                                let selling : number =  response[i]['selling'].toFixed(2)
                                let change_Rate : number = response[i]['change_rate'].toFixed(2);
                                let item : Data = new Data(name,code,buying,selling,change_Rate);                                            
                                items.push(item);
                            }
                        }
                    }).then(()=>{
                        resolve(items);
                    }).catch((err) => {
                        reject(err);
                        console.log(err);
                    })
            })
    }



}