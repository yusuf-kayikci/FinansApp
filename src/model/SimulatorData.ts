export default class SimulatorData{
    public code : string;
    public amount : number;
    public buying : number;
    public selling : number; 
    public change_Rate : number;
    public toConvertCurrency : string;

    constructor( _code : string , _amount : number , _buying : number , _selling : number , _change_Rate : number , _toConvertCurrency : string )
    {
        this.code = _code;
        this.amount = _amount;
        this.buying = _buying;
        this.selling = _selling;
        this.change_Rate = _change_Rate; 
        this.toConvertCurrency = _toConvertCurrency;
    }
}