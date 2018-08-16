

export default class Data{
    name : string;
    code : string;
    selling : number;
    buying : number;
    change_Rate : number;
    
    constructor(_name:string,_code : string ,_selling : number,_buying : number,_change_Rate : number){
        this.name = _name;
        this.code = _code;
        this.selling = _selling;
        this.buying = _buying;
        this.change_Rate = _change_Rate;
    }
    

}