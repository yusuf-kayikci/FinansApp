export class GoldLines{
    public name : string;
    public minBuyCarat : number;
    public maxBuyCarat : number;
    public minSellCarat : number;
    public maxSellCarat : number;
    public minBuyPrice : number;
    public maxBuyPrice : number;
    public minSellPrice : number;
    public maxSellPrice : number;
    public gram : number;
    public amount : number;
    constructor(
        _name : string,
        _minBuyCarat : number,
        _maxBuyCarat : number,
        _minSellCarat : number,
        _maxSellCarat : number,
        _minBuyPrice : number,
        _maxBuyPrice : number,
        _minSellPrice : number,
        _maxSellPrice : number,
        _gram : number,
        _amount : number
    ){
        this.name = _name; 
        this.minBuyCarat = _minBuyCarat; 
        this.maxBuyCarat = _maxBuyCarat; 
        this.minSellCarat = _minSellCarat; 
        this.maxSellCarat = _maxSellCarat; 
        this.minBuyPrice = _minBuyPrice; 
        this.maxBuyPrice = _maxBuyPrice; 
        this.minSellPrice = _minSellPrice; 
        this.maxSellPrice = _maxSellPrice; 
        this.gram = _gram; 
        this.amount = _amount;
    }
}  