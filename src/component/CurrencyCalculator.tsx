import React, { CSSProperties }  from 'react'
import {Component} from 'react';
import {TouchableHighlight , TouchableOpacity , StyleSheet , Text , Button , Picker , View, TextInput } from 'react-native' 
import Data from '../model/Data'


interface Props {
    Currencies : Data[]}

interface State{
    Result : number,
    FromCurrency : string,
    ToCurrency : string,
    Amount : number,
    buyorSell : boolean
}




export default class CurrencyCalculator extends React.Component<Props,State>{
    constructor(props : Props){
        super(props);
        this.state = {
            Result : 0,
            FromCurrency : 'USD',
            ToCurrency : 'TL',
            Amount : 0,
            buyorSell : true
        
        }
    }

    listPickerItems(){
        return(
            this.props.Currencies.map((currency) => {
               return <Picker.Item label = {currency.name} value = {currency.code}/>
            })
        );
        
    }


    Calculate(){
        let unitprice : number = 0;
        console.log(this.state.buyorSell);
        if(this.state.buyorSell == true ){
            unitprice = this.GetSellPice();
        }
        else
        {
            unitprice = this.GetBuyPrice();
        }
        let result : number = this.state.Amount * unitprice
        this.setState({
            Result : result
        })

    }

    GetBuyPrice() : number{
        let fromCurrencyPrice : number = 0;
        let toCurrencyPrice : number = 0;
        this.props.Currencies.map((currency) =>{
            if(this.state.FromCurrency === currency.code){
                fromCurrencyPrice = currency.buying;
            }
            if(this.state.ToCurrency === currency.code){
                toCurrencyPrice = currency.buying;
            }
        })
        return fromCurrencyPrice / toCurrencyPrice;
    }

    GetSellPice() : number{
        let fromCurrencyPrice : number = 0;
        let toCurrencyPrice : number = 0;
        this.props.Currencies.map((currency) =>{
            if(this.state.FromCurrency === currency.code){
                fromCurrencyPrice = currency.selling;
            }
            if(this.state.ToCurrency === currency.code){
                toCurrencyPrice = currency.selling;
            }
        })
        return fromCurrencyPrice / toCurrencyPrice;
    }


    displayResult(){
        if(this.state.Result != 0){
            return(
                this.state.Result.toFixed(2) + ' ' + this.state.ToCurrency
            );
        }

    }



    renderSellOrBuy(){
        let selectedEvent = null; 
        let unselctedEvent = null;
        if(this.state.buyorSell == true) // represent buy is active
        {
            selectedEvent = styles.SelectedEvent;
            unselctedEvent = styles.UnselectedEvent;
        }
        else
        {
            selectedEvent = styles.UnselectedEvent;
            unselctedEvent = styles.SelectedEvent;
        }


        return(
            <View style = {styles.RowContainer}>
                <View style = {selectedEvent}>
                    <TouchableOpacity onPress = {() => this.setState({buyorSell : true})}><Text style = {styles.ColumnTextStyle}>ALIŞ</Text></TouchableOpacity>
                </View>
                <View style = {unselctedEvent}>
                    <TouchableOpacity onPress = {() => this.setState({buyorSell : false})}><Text style = {styles.ColumnTextStyle}>SATIŞ</Text></TouchableOpacity>
                </View>
            </View>

        );
    }

    renderFromCurrency(){
        return(
            <View style = {styles.RowContainer}>
            <View style = {styles.ColumnContainer}>
                <Text style = {styles.ColumnTextStyle}>Para Biriminden</Text>
            </View> 
            <View style = {styles.ColumnContainer}>
                <Picker 
                    selectedValue={this.state.FromCurrency}
                    onValueChange={(itemValue, itemIndex) => this.setState({FromCurrency: itemValue})}>
                    {this.listPickerItems()}
                </Picker>
            </View>       
            </View>
        );

    }
    
    renderToCurrency(){
        return(
            <View style = {styles.RowContainer}>
            <View style = {styles.ColumnContainer}>
                <Text style = {styles.ColumnTextStyle} >Para Birimine</Text>
            </View> 
            <View style = {styles.ColumnContainer}>
                <Picker 
                    selectedValue={this.state.ToCurrency}
                    onValueChange={(itemValue, itemIndex) => this.setState({ToCurrency: itemValue})}>
                    {this.listPickerItems()}
                </Picker>
            </View>       
            </View>
        );
    }

    renderTextInput(){
        return(
            <View style = {styles.ColumnContainer}>
            <View style = {styles.TextInputView}>
                <TextInput style = {styles.TextInputStyle} placeholder = 'Kaç paran var?' placeholderTextColor = 'black' keyboardType = 'numeric' underlineColorAndroid = 'white' onChange={(value) => this.setState({Amount: parseFloat(value.nativeEvent.text)})}/>                
            </View>
            </View>
        );
    }
    renderButton(){
        return(
            <View style = {styles.ColumnContainer}>
            <TouchableHighlight underlayColor = 'white' style = {styles.ButtonStyle}  onPress = {() => this.Calculate()}>
                <Text style = {styles.ButtonTextStyle}>ÇEVİR</Text>
            </TouchableHighlight>
            </View>

        );
    }



    render(){
        return(
            <View style = {styles.Container}>
                {this.renderSellOrBuy()}
                {this.renderFromCurrency()}    
                {this.renderToCurrency()}
                <View style = {styles.RowContainer}>
                    {this.renderTextInput()}
                    {this.renderButton()}
                </View>
                <View style = {styles.RowContainer}>
                    <Text style = {styles.ResultText} >
                    {
                        this.displayResult()
                    }
                    </Text>
                </View>
            </View>
        );
    }
}
 
const styles = StyleSheet.create({
    Container : {margin : 5 , flexDirection : 'column'},
    RowContainer : {flexDirection : 'row' , marginTop : 10 , flex : 1},
    ButtonContainer : {flexDirection : 'row' , marginTop : 10 , flex : 1 , alignItems : 'stretch'},
    ButtonStyle : {backgroundColor : 'gold' ,  borderStyle : 'solid' , height : 30 , marginLeft : 10 , marginRight : 10 , marginTop : 0 , marginBottom : 0 ,  borderRadius : 10 , borderWidth : 2},
    ButtonTextStyle : {color : 'black' , fontSize : 18 , alignSelf : 'center'},
    ColumnContainer : {flex : 1 , alignSelf : 'center'},
    ResultText : {fontSize : 20 , fontWeight : 'bold'},
    TextInputStyle : {fontSize : 16},
    TextInputView : {borderStyle : 'solid' , borderRadius : 10 , borderWidth : 2 , marginRight : 10},
    SelectedEvent : {borderWidth : 2 , height : 30 , borderStyle : 'solid' , borderRadius : 10 ,flex : 1 ,alignItems : 'center' , borderColor : 'gold'},
    UnselectedEvent : {flex : 1 ,alignItems : 'center'},
    ColumnTextStyle : {fontSize : 16}

})