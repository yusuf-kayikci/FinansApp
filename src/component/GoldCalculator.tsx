import {Acordion} from './Acordion'
import React  from 'react'
import {Component} from 'react';
import {View,Text,TouchableOpacity , ScrollView , StyleSheet, TextInput} from 'react-native'
import ApiCaller from '../api/apicalller'
import ApiUri from '../api/apiuri'
import {GoldLines} from '../model/GoldLines'

const carats : Array<GoldLines> = [
    new GoldLines('8 Ayar' ,0.6,0.7,0.275,0.333,0,0,0,0,0,1),
    new GoldLines('14 Ayar',0.7,0.9,0.550,0.575,0,0,0,0,0,1),
    new GoldLines('18 Ayar',0.9,1,0.700,0.730,0,0,0,0,0,1),
    new GoldLines('22 Ayar',0.93,1.1,0.900,0.910,0,0,0,0,0,1),
    new GoldLines('24 Ayar',1.05,1.2,0.985,0.995,0,0,0,0,0,1),
]
/*
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
*/
const gramgold : Array<GoldLines> = [
    new GoldLines('Gram Altın(14K)',0.550,0.575,0.585,0.600,0,0,0,0,1,0),
    new GoldLines('Gram Altın(22K)',0.900,0.916,0.930,0.945,0,0,0,0,1,0),
    new GoldLines('Gram Altın(24K)',0.985,0.995,1010,1050,0,0,0,0,1,0)
]




interface State{
    buyUnitPrice : number,
    sellUnitPrice : number,
    menuSellorBuy : Array<boolean>
    carats : Array<GoldLines>
    gramgold : Array<GoldLines>
    totalSellorBuy : boolean
}

export class GoldCalculator extends React.Component<{},State>{
    public caratsPrice : Array<GoldLines> = carats;
    public gramgoldPrice : Array<GoldLines> = gramgold;
    public apiCaller : ApiCaller = new ApiCaller();
    constructor(props : any){
        super(props);
        this.state = {
            buyUnitPrice      : 0,
            sellUnitPrice    : 0,
            carats            : this.caratsPrice,
            gramgold          : this.gramgoldPrice,
            menuSellorBuy     : [true,true,true],  //true means sell for each menu false is buy
            totalSellorBuy    : true               // true means sell when calculate total price false is buy
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
                            <TextInput keyboardType = 'decimal-pad'  onChangeText = {(amount) => {calculateFunc(index,parseFloat(amount))}}   underlineColorAndroid = 'white'/>
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
        this.state.carats[index].minBuyPrice = _minBuyCarat * gram *     this.state.buyUnitPrice; //* price
        this.state.carats[index].maxBuyPrice = _maxBuyCarat * gram *     this.state.buyUnitPrice;
        this.state.carats[index].minSellPrice = _minSellCarat * gram *   this.state.sellUnitPrice;
        this.state.carats[index].maxSellPrice = _maxSellCarat * gram *   this.state.sellUnitPrice;        
        this.setState({
            carats : this.state.carats
        })


    }

    calculate_gramgold(index : number , amount : number){
        amount = (!isNaN(amount)) ? amount : 0;
        let _minBuyCarat : number = this.state.gramgold[index].minBuyCarat;
        let _maxBuyCarat : number = this.state.gramgold[index].maxBuyCarat;
        let _minSellCarat : number = this.state.gramgold[index].minSellCarat;
        let _maxSellCarat : number = this.state.gramgold[index].maxSellCarat;
        this.state.gramgold[index].minBuyPrice = _minBuyCarat *   amount * this.state.buyUnitPrice; //* price
        this.state.gramgold[index].maxBuyPrice = _maxBuyCarat *   amount * this.state.buyUnitPrice;
        this.state.gramgold[index].minSellPrice = _minSellCarat * amount * this.state.sellUnitPrice;
        this.state.gramgold[index].maxSellPrice = _maxSellCarat * amount * this.state.sellUnitPrice;
        this.setState({
            gramgold : this.state.gramgold
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
        goldList.map((item) => {
            minSellPrice += item.minSellPrice;
            maxSellPrice += item.maxSellPrice;
        })
        
        return(
            <View style = {style.Price}>
                <Text style = {style.PriceDesc}>Satış Fiyatınız</Text>
                <Text style = {style.PriceText}>{minSellPrice.toFixed(2)}TL</Text>
                <Text style = {style.PriceText}>{maxSellPrice.toFixed(2)}TL</Text>
            </View>
        );
    }


    renderMaxMinBuyPrice(goldList : Array<GoldLines>){
        let minBuyPrice : number = 0;
        let maxBuyPrice : number = 0;
        goldList.map((item) => {
            minBuyPrice += item.minBuyPrice;
            maxBuyPrice += item.maxBuyPrice;
        })
        
        return(
            <View style = {style.Price}>
                <Text style = {style.PriceDesc}>Alış Fiyatınız</Text>
                <Text style = {style.PriceText}>{minBuyPrice.toFixed(2)}TL</Text>
                <Text style = {style.PriceText}>{maxBuyPrice.toFixed(2)}TL</Text>
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
                <Acordion title = 'İŞÇİLİKLİ ÜRÜNLER(14K,18K...)' >
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
                    <View style = {style.Lines}>
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
    ContentNameText : {}
});