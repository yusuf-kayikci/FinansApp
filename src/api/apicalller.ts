

import Data from '../model/Data'
import { resolve } from 'dns';
export default class ApiCaller {
    public apiUrl : string;

    constructor(_apiUrl : string){
        this.apiUrl = _apiUrl;
    }


    callApi():Data[]{
        let items : Data[] = [];
        fetch(this.apiUrl)
            .then(response => response.json())
            .then((response) => {
                for(var i = 0;i < response.length;i++){
                    let name : string = response[i]['full_name'];
                    let buying : number = response[i]['buying'].toFixed(2);
                    let selling : number =  response[i]['selling'].toFixed(2)
                    let change_Rate : number = response[i]['change_rate'].toFixed(2) 
                    let item : Data = new Data(name,buying,selling,change_Rate);
                    items.push(item);
                }              
            }).catch((err) => {
                console.log(err);
            })
            return items;




    }



}