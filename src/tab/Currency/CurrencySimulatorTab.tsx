import React from 'react'
import {Component} from 'react'
import {View,Text,StyleSheet,Button,RefreshControl, TouchableHighlight , Picker , TextInput, ScrollView} from 'react-native'
import CurrencyPriceTab from './CurrencyPriceTab'
import Data from '../../model/Data'

import ApiCaller from '../../api/apicalller'
import ApiUri from '../../api/apiuri'
import CurrencyMenu from '../../menu/CurrencyMenu';
import SimulatorData from '../../model/SimulatorData'
import SimulatorDataTable from '../../component/SimulatorDataTable'
import DataTable from '../../component/DataTable';


interface State {
    SelectedCurrency : string,
    CurrencyInfo: Data[],
    MyCurrencyInfo : SimulatorData[],
    refreshing : boolean,
    seconds : number,
    Amount  : number // because onChangeText event parameter is string value???

    // Make all state optional! See Hack below
}



export default class CurrencySimulatorTab extends React.Component<{} ,State>{

    public apiCaller : ApiCaller = new ApiCaller(ApiUri.CURRENCY_API_URI);
    public interval : any = null;


    constructor(props : any){
        super(props);
        this.state = {
            SelectedCurrency : 'USD',
            CurrencyInfo : [],
            MyCurrencyInfo : [],
            refreshing : true,
            seconds : 0,
            Amount : 0
        }
    }
    _onRefresh = () => {
        this.setState({refreshing : true})
        this.getData();
      }


    _refreshControl(){
        return (
          <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}/>
        )
      }

    tick() {
        this.getData();
        this.setState(prevState => ({
          seconds: prevState.seconds + 5
        }));
    }
    getData(){
        this.apiCaller.callCurrencyApi().then((items) => {
            this.setState({
                refreshing : false,
                CurrencyInfo : items
            })
        }).then(()=>{
            this.refreshTotalPrices();
        }).catch((err)=>{
            console.log(err);
        });
    }
    
    refreshTotalPrices(){
        this.state.CurrencyInfo.map((currency) => {
            this.UpdatePrices(currency);
        })

    }

    componentWillMount(){
        this.getData();
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 5000);
    }

    fillPickerItems(){
        return (
            this.state.CurrencyInfo.map((currency)=>{
                return <Picker.Item label = {currency.code } value = {currency.code}/>
            })
        );
    }

    renderSimulator(){
        return(
            <View style = {styles.SimulatorContainer}>
                <View style = {styles.InputContainer}>
                    <TextInput placeholder = 'Type amount' keyboardType  = 'decimal-pad' onChange={(value) => this.setState({Amount: parseFloat(value.nativeEvent.text)})}  placeholderTextColor = 'black' alignItems = 'center' underlineColorAndroid = 'white' style = {styles.Input}/>
                </View> 
                <View style = {styles.PickerContainer}>
                    <Picker 
                    selectedValue={this.state.SelectedCurrency}
                    onValueChange={(itemValue, itemIndex) => this.setState({SelectedCurrency: itemValue})}
                    >
                        {this.fillPickerItems()}
                    </Picker>
                </View>
                <View style = {styles.ButtonContainer}>
                    <Button
                        onPress={this.Calculate}
                        title="Hesapla"
                        color="#00BFFF" // #01A9EB
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
            </View>
        );
    }


    isExistMyMoney(temp : SimulatorData) : boolean {
        let result : boolean = false;
        this.state.MyCurrencyInfo.map((myMoney)=>{
            if(myMoney.code == temp.code){
                result = true
            }
        })
        return result;
    }

    UpdatePrices(currency : Data){
        this.state.MyCurrencyInfo.map((myMoney) => {
            if(myMoney.code === currency.code){
                console.log(currency.code);
                console.log(currency.buying + ' ' + currency.selling);
                myMoney.buying = currency.buying * (myMoney.amount);
                myMoney.selling = currency.selling * (myMoney.amount);
                myMoney.change_Rate = currency.change_Rate; 
            }
        })
    }

    UpdateInfos(currency : Data){
        this.state.MyCurrencyInfo.map((myMoney) => {
            if(myMoney.code === this.state.SelectedCurrency){
                let updatedAmount = myMoney.amount + this.state.Amount;
                myMoney.amount = updatedAmount;
                myMoney.buying = currency.buying * (updatedAmount);
                myMoney.selling = currency.selling * (updatedAmount);
                myMoney.change_Rate = currency.change_Rate; 
            }
        })
    }


    Calculate = () => { 
        let tempMyMoney : SimulatorData = new SimulatorData(this.state.SelectedCurrency,this.state.Amount,0,0,0);
        this.state.CurrencyInfo.map((currency) => {
            if(currency.code == this.state.SelectedCurrency){
                console.log(this.state.Amount);
                if(!this.isExistMyMoney(tempMyMoney)){
                    this.state.MyCurrencyInfo.push(new SimulatorData(currency.code , this.state.Amount,currency.buying * (this.state.Amount),currency.selling * (this.state.Amount),currency.change_Rate))                    
                }
                else{
                    this.UpdateInfos(currency);
                }
                
            }
        })

        console.log(this.state.MyCurrencyInfo);
    }

    renderSimulatorDataTable(){
        if(this.state.MyCurrencyInfo.length == 0){
            return(
                <View style = {styles.WarningView}>
                    <Text>Paranızın değerini görmek için yukarıdaki simulatorü kullanın.</Text>
                </View>
            );
        }
        else{
            return(
                <SimulatorDataTable rows = {this.state.MyCurrencyInfo}/>
            );

        }
    }



    render(){
        return(
            <ScrollView style = {styles.Container} refreshControl = {this._refreshControl()}>
                {this.renderSimulator()}
                {this.renderSimulatorDataTable()}
                
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    Container : {marginTop : 30 },
    SimulatorContainer : {flexDirection : 'row' , margin : 5},
    InputContainer : {flex : 1 ,margin : 5},
    PickerContainer : { flex : 1},
    ButtonContainer : {flex : 1 ,margin : 5},
    Input : {borderStyle : 'solid' , height : 35 , borderWidth : 1},
    WarningView : {margin : 5}


})