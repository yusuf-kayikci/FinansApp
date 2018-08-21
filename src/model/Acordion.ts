import {View ,Text} from 'react-native'
export class Acordion{
    header : string ;
    content : Array<string> ;
    price : number ;

    constructor(_header : string , _content : Array<string> , _price : number ){
        this.header = _header;
        this.content = _content;
        this.price = _price;
    }
}