

export default class Data{
    public name : string;
    public selling : number;
    public buying : number;
    public change_Rate : number;
    constructor(_name:string,_selling : number,_buying : number,_change_Rate : number){
        this.name = _name;
        this.selling = _selling;
        this.buying = _buying;
        this.change_Rate = _change_Rate;
    }

}