import {Acordion} from './Acordion'
import React  from 'react'
import {Component} from 'react';
import {View,Text,TouchableOpacity , ScrollView , StyleSheet, TextInput} from 'react-native'
import ApiCaller from '../api/apicalller'
import ApiUri from '../api/apiuri'
import {GoldLines} from '../model/GoldLines'


interface State{
    officialgold : Array<GoldLines>,
    buyUnitPrice : number,
    sellUnitPrice : number,
    menuSellorBuy : Array<boolean>
    carats : Array<GoldLines>
    gramgold : Array<GoldLines>
    totalSellorBuy : boolean,
    totalBuyPrice  : Array<number>,
    totalSellPrice : Array<number>
}



interface Props{
    carats : Array<GoldLines>;
    gramgold : Array<GoldLines>;
    officialgold : Array<GoldLines>;
}



export class GoldCalculator extends React.Component<Props,State>{
    public apiCaller : ApiCaller = new ApiCaller();
    constructor(props : Props){
        super(props);
        this.state = {
            buyUnitPrice      : 0,
            sellUnitPrice     : 0,
            carats            : this.props.carats,
            gramgold          : this.props.gramgold,
            officialgold      : this.props.officialgold,
            menuSellorBuy     : [true,true,true],  //true means sell for each menu false is buy
            totalSellorBuy    : true,               // true means sell when calculate total price false is buy
            totalBuyPrice     : [0,0],
            totalSellPrice    : [0,0]
        }
    }

    componentWillMount(){
        this.getGoldUnitPrice();
    }

    getGoldUnitPrice (){
        this.apiCaller.call22CaratApi().then((item)  =>{
            console.log(item);
            this.setState({
                buyUnitPrice : item.buying,
                sellUnitPrice : item.selling
            })
        })
    }


    renderMenuContents(goldList : Array<GoldLines> , calculateFunc : any){
        return(
            goldList.map((content , index) => {
                return(
                    <View key = {index} style = {style.Row}>
                        <View style = {{flex : 1 , flexDirection : 'row'}}>
                            <Text>{content.name}</Text>
                        </View>
                        <View style = {style.TextInput}>
                            {calculateFunc}
                            <TextInput keyboardType = 'numeric'  onChangeText = {(amount) => {calculateFunc(index,parseFloat(amount))}}   underlineColorAndroid = 'white'/>
                        </View>
                    </View>            
                );
            })
        );
    }


    calculate_carat(index : number , gram : number){
        console.log(index);
        gram = (!isNaN(gram)) ? gram : 0;
        let _minBuyCarat : number = this.state.carats[index].minBuyCarat;
        let _maxBuyCarat : number = this.state.carats[index].maxBuyCarat;
        let _minSellCarat : number = this.state.carats[index].minSellCarat;
        let _maxSellCarat : number = this.state.carats[index].maxSellCarat;
        let minBuyPrice = _minBuyCarat * gram *     this.state.buyUnitPrice; //* price
        let maxBuyPrice = _maxBuyCarat * gram *     this.state.buyUnitPrice;
        let minSellPrice = _minSellCarat * gram *   this.state.sellUnitPrice;
        let maxSellPrice = _maxSellCarat * gram *   this.state.sellUnitPrice;        
        this.state.carats[index].minBuyPrice = minBuyPrice;
        this.state.carats[index].maxBuyPrice = maxBuyPrice;
        this.state.carats[index].minSellPrice = minSellPrice;
        this.state.carats[index].maxSellPrice = maxSellPrice;
        this.setState({
            carats : this.state.carats,
        })
        this.calculateTotalPrices();


    }


    calculate_gramgold(index : number , amount : number){
        amount = (!isNaN(amount)) ? amount : 0;
        let _minBuyCarat : number = this.state.gramgold[index].minBuyCarat;
        let _maxBuyCarat : number = this.state.gramgold[index].maxBuyCarat;
        let _minSellCarat : number = this.state.gramgold[index].minSellCarat;
        let _maxSellCarat : number = this.state.gramgold[index].maxSellCarat;
        
        let minBuyPrice : number = _minBuyCarat *   amount * this.state.buyUnitPrice;
        let maxBuyPrice : number = _maxBuyCarat *   amount * this.state.buyUnitPrice;
        let minSellPrice : number = _minSellCarat * amount * this.state.sellUnitPrice;
        let maxSellPrice : number = _maxSellCarat * amount * this.state.sellUnitPrice;
        this.state.gramgold[index].minBuyPrice =  minBuyPrice //* price
        this.state.gramgold[index].maxBuyPrice =  maxBuyPrice
        this.state.gramgold[index].minSellPrice = minSellPrice 
        this.state.gramgold[index].maxSellPrice = maxSellPrice 
        this.setState({
            gramgold : this.state.gramgold
        })
        this.calculateTotalPrices();
    }


    calculate_officialgold(index : number , amount : number){
        amount = (!isNaN(amount)) ? amount : 0;
        let _minBuyCarat : number = this.state.officialgold[index].minBuyCarat;
        let _maxBuyCarat : number = this.state.officialgold[index].maxBuyCarat;
        let _minSellCarat : number = this.state.officialgold[index].minSellCarat;
        let _maxSellCarat : number = this.state.officialgold[index].maxSellCarat;
        let minBuyPrice : number = _minBuyCarat *   amount * this.state.buyUnitPrice;
        let maxBuyPrice : number = _maxBuyCarat *   amount * this.state.buyUnitPrice;
        let minSellPrice : number = _minSellCarat * amount * this.state.sellUnitPrice;
        let maxSellPrice : number = _maxSellCarat * amount * this.state.sellUnitPrice;
        this.state.officialgold[index].minBuyPrice = minBuyPrice  //* price
        this.state.officialgold[index].maxBuyPrice = maxBuyPrice 
        this.state.officialgold[index].minSellPrice = minSellPrice 
        this.state.officialgold[index].maxSellPrice = maxSellPrice 
        this.setState({
            officialgold : this.state.officialgold
        })
        this.calculateTotalPrices();
    }


    calculateTotalPrices(){
        let totalMaxBuyPrice : number = 0;
        let totalMinBuyPrice : number = 0;
        let totalMaxSellPrice : number = 0;
        let totalMinSellPrice : number = 0;
        this.state.carats.map((carat) => {
            totalMaxBuyPrice += carat.maxBuyPrice;
            totalMinBuyPrice += carat.minBuyPrice;
            totalMaxSellPrice += carat.maxSellPrice;
            totalMinSellPrice += carat.minSellPrice
        })
        this.state.officialgold.map((gold) => {
            totalMaxBuyPrice += gold.maxBuyPrice;
            totalMinBuyPrice += gold.minBuyPrice;
            totalMaxSellPrice +=gold.maxSellPrice;
            totalMinSellPrice +=gold.minSellPrice
        })

        this.state.gramgold.map((gram) => {
            totalMaxBuyPrice += gram.maxBuyPrice;
            totalMinBuyPrice += gram.minBuyPrice;
            totalMaxSellPrice +=gram.maxSellPrice;
            totalMinSellPrice +=gram.minSellPrice
        })
        this.setState({
            totalBuyPrice : [totalMinBuyPrice,totalMaxBuyPrice],
            totalSellPrice : [totalMinSellPrice , totalMaxSellPrice]       
        })
    }

    renderSellOrBuy(index : number){
        let selectedEvent = null; 
        let unselctedEvent = null;
        let menuSellorBuy : Array<boolean> = this.state.menuSellorBuy;
        if(this.state.menuSellorBuy[index] == true)
        {
            selectedEvent = style.SelectedEvent;
            unselctedEvent = style.UnselectedEvent;
        }
        else
        {
            selectedEvent = style.UnselectedEvent;
            unselctedEvent = style.SelectedEvent;
        }
        return(
            <View style = {style.RowContainer}>
                <View style = {selectedEvent}>
                    <TouchableOpacity onPress = {() => this.setState({menuSellorBuy : this.setActiveMenu(index)})}><Text style = {style.ColumnTextStyle}>ALIŞ</Text></TouchableOpacity>
                </View>
                <View style = {unselctedEvent}>
                    <TouchableOpacity onPress = {() => this.setState({menuSellorBuy : this.setActiveMenu(index)})}><Text style = {style.ColumnTextStyle}>SATIŞ</Text></TouchableOpacity>
                </View>
            </View>
        );
    }

    setActiveMenu(index: number) : Array<boolean>{
        let menuSellorBuy : Array<boolean> = this.state.menuSellorBuy;
        if(menuSellorBuy[index] == true){
            menuSellorBuy[index] = false;  
        }
        else{
            menuSellorBuy[index] = true;
        }
        console.log(menuSellorBuy);
        return menuSellorBuy;
    }


    renderMaxMinSellPrice(goldList : Array<GoldLines>){
        let minSellPrice : number = 0;
        let maxSellPrice : number = 0;
        let priceType : string = 'Satış Fiyatınız';
        goldList.map((item) => {
            minSellPrice += item.minSellPrice;
            maxSellPrice += item.maxSellPrice;
        })
        return(
            this.displayPrices(priceType , minSellPrice , maxSellPrice)
        );

    }


    renderMaxMinBuyPrice(goldList : Array<GoldLines>){
        let minBuyPrice : number = 0;
        let maxBuyPrice : number = 0;
        let priceType : string = 'Alış Fiyatınız';
        goldList.map((item) => {
            minBuyPrice += item.minBuyPrice;
            maxBuyPrice += item.maxBuyPrice;
        })

        return(
            this.displayPrices(priceType , minBuyPrice , maxBuyPrice)
        );

        
    }

    displayPrices(priceType : string , minPrice : number , maxPrice : number){
        return(
            <View style = {style.Price}>
                <Text style = {style.PriceDesc}>{priceType}</Text>
                <Text style = {style.PriceText}>{minPrice.toFixed(2)}TL</Text>
                <Text style = {style.PriceText}>{maxPrice.toFixed(2)}TL</Text>
            </View>
        );
    }


    renderPriceHeader(){
        return(
            <View style = {style.PriceHeaderView}>
                            {
                                <Text style = {style.PriceHeader} >Tavsiye edilen alış ve satış fiyat aralığı</Text>
                                /*this.renderSellOrBuy(0)*/
                            }
            </View>

        );
    }


    render(){
        return(
            <View>
                    <View style = {[style.PriceView,{borderStyle : 'solid' , borderWidth : 1 , borderRadius : 10 , margin : 5}]}>                            
                            {this.displayPrices('Total Alış Fiyatınız' , this.state.totalBuyPrice[0] , this.state.totalBuyPrice[1])}
                            {this.displayPrices('Total Satış Fiyatınız' , this.state.totalSellPrice[0], this.state.totalSellPrice[1])}     
                    </View>    
                <Acordion title = 'İŞÇİLİKLİ ÜRÜNLER(14K,18K...)'>
                    <View style = {{flexDirection : 'column'}}>
                        {this.renderPriceHeader()}             
                        <View style = {style.PriceView}>
                            
                                {this.renderMaxMinBuyPrice(this.state.carats)}
                                {this.renderMaxMinSellPrice(this.state.carats)}     
                        </View>    
                        <View style = {style.Lines}>
                            {this.renderMenuContents(this.state.carats , this.calculate_carat.bind(this))}
                        </View>
                    </View>   
                </Acordion>
                <Acordion title = 'GRAM ALTINLAR' >
                    <View style = {{flexDirection : 'column'}}>
                        {this.renderPriceHeader()}
                        <View style = {style.PriceView}>    
                                {this.renderMaxMinBuyPrice(this.state.gramgold)}
                                {this.renderMaxMinSellPrice(this.state.gramgold)}     
                        </View>         
                        <View style = {style.Lines}>
                            {this.renderMenuContents(this.state.gramgold , this.calculate_gramgold.bind(this))}
                        </View>   
                    </View>
                </Acordion>
                <Acordion title = 'ZİYNETLER(ÇEYREK,YARIM...)'>
                <View style = {{flexDirection : 'column'}}>
                        {this.renderPriceHeader()}
                        <View style = {style.PriceView}>    
                                {this.renderMaxMinBuyPrice(this.state.officialgold)}
                                {this.renderMaxMinSellPrice(this.state.officialgold)}     
                        </View>         
                        <View style = {style.Lines}>
                            {this.renderMenuContents(this.state.officialgold , this.calculate_officialgold.bind(this))}
                        </View>   
                    </View>
                </Acordion>
            </View>
            
        );
    }
}


const style = StyleSheet.create({
    TextInput : {borderWidth : 1 , borderStyle : 'solid' , borderRadius : 10 , flex : 1 },
    Lines : {flexDirection : 'column'},
    Row : {flexDirection : 'row' , marginBottom : 10},
    Column : {flex : 1 , flexDirection : 'row' , alignItems : 'center'},
    TextStyle : {},
    SelectedEvent : {borderWidth : 2 , height : 30 , borderStyle : 'solid' , borderRadius : 10 ,flex : 1 ,alignItems : 'center' , borderColor : 'gold'},
    UnselectedEvent : {flex : 1 ,alignItems : 'center'},
    RowContainer : {flexDirection : 'row' , flex : 1},
    ColumnTextStyle : {fontSize : 16},
    PriceView : {flexDirection : 'row'  , marginTop : 10 , marginBottom : 10},
    Price : {alignItems : 'center' , flex : 1 , flexDirection : 'column'},
    PriceHeaderView : {flexDirection : 'row' , alignSelf : 'center'},
    PriceHeader : { fontSize : 16 , alignSelf : 'center' ,textDecorationLine : 'underline' },
    PriceDesc : {fontSize : 16 , alignItems : 'center'},
    PriceText : { fontSize : 18  , fontWeight : 'bold' , alignItems : 'center'},
    ContentView : {},
    ContentNameText : {},
    TotalContainer : {borderStyle : 'solid' , borderWidth : 2 }
});