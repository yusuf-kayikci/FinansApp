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




type Props = {

}


interface State {
    SelectedCurrency : string,
    SelectedCurrencytoConvert : string;
    CurrencyInfo: Data[],
    MyCurrencyInfo : SimulatorData[],
    refreshing : boolean,
    seconds : number,
    Amount  : number // because onChangeText event parameter is string value???
    // Make all state optional! See Hack below
}



export default class CurrencySimulatorTab extends React.Component<Props ,State>{

    public apiCaller : ApiCaller = new ApiCaller(ApiUri.CURRENCY_API_URI);
    public interval : any = null;


    constructor(props : Props){
        super(props);
        this.state = {
            SelectedCurrency : 'USD',
            SelectedCurrencytoConvert : 'TL',
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
            items.unshift(new Data('TL','TL', 1 , 1 , 1));
            this.setState({
                CurrencyInfo : items,
                refreshing : false
            })
        }).then(()=>{
            this.refreshTotalPrices();
        }).catch((err)=>{
            console.log(err);
        });
    }

    getConvertCurrency () : Data{
        let tempConvertCurency : Data = this.state.CurrencyInfo[this.state.CurrencyInfo.length - 1];//default return TL
        for (let index = 0; index < this.state.CurrencyInfo.length; index++) {
            if(this.state.CurrencyInfo[index].code == this.state.SelectedCurrencytoConvert)
            {
                tempConvertCurency = this.state.CurrencyInfo[index];
            }
        }
        return tempConvertCurency;
    }

    
    refreshTotalPrices(){
        let convertCurrency : Data = this.getConvertCurrency();
        this.state.CurrencyInfo.map((currency) => {
            this.UpdatePrices(currency , convertCurrency);
        })

    }

    componentWillMount(){
        this.getData();
        
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 5000);
    }

    fillCurrencyPickerItems(){
        return (
            this.state.CurrencyInfo.map((currency) => {
                return <Picker.Item label = {currency.code } value = {currency.code}/>
            })
        );
    }
    filltoConvertCurrencyPickerItems(){
        return (
            this.state.CurrencyInfo.map((currency)=>{
                return <Picker.Item label = {currency.code } value = {currency.code}/>
            })
        );     
    }

    renderSimulator(){
        return(
            <View style = {styles.SimulatorContainer}>
                <View style = {styles.PickerContainer}>
                    <Picker 
                    selectedValue={this.state.SelectedCurrency}
                    onValueChange={(itemValue, itemIndex) => this.setState({SelectedCurrency: itemValue})}
                    >
                        {this.fillCurrencyPickerItems()}
                    </Picker>
                </View>
                <View style = {styles.InputContainer}>
                    <TextInput placeholder = 'Amount' keyboardType  = 'number-pad'  defaultValue = '0' onChange={(value) => this.setState({Amount: parseFloat(value.nativeEvent.text)})}  placeholderTextColor = 'black' alignItems = 'center' underlineColorAndroid = 'white' style = {styles.Input}/>
                </View> 
                <View style = {styles.PickerContainer}>
                    <Picker 
                    selectedValue={this.state.SelectedCurrencytoConvert}
                    onValueChange={(itemValue, itemIndex) => this.setState({SelectedCurrencytoConvert: itemValue})}
                    >
                        {this.filltoConvertCurrencyPickerItems()}
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
            if(myMoney.code == temp.code && myMoney.toConvertCurrency == temp.toConvertCurrency){
                result = true
            }
        })
        return result;
    }

    UpdatePrices(currency : Data , tempConvertCurrency : Data){
        this.state.MyCurrencyInfo.map((myMoney) => {
            if(myMoney.code === currency.code && myMoney.toConvertCurrency === tempConvertCurrency.code){
                myMoney.buying = (currency.buying / tempConvertCurrency.buying ) * (myMoney.amount);
                myMoney.selling =  (currency.selling / tempConvertCurrency.selling ) * (myMoney.amount);
                myMoney.change_Rate = currency.change_Rate / tempConvertCurrency.change_Rate; 
            }
        })
    }

    UpdateInfos(currency : Data , tempConvertCurrency : Data){
        this.state.MyCurrencyInfo.map((myMoney) => {
            if(myMoney.code === this.state.SelectedCurrency && myMoney.toConvertCurrency === tempConvertCurrency.code){
                let updatedAmount = myMoney.amount + this.state.Amount;
                myMoney.amount = updatedAmount;
                myMoney.buying = (currency.buying / tempConvertCurrency.buying ) * (updatedAmount);
                myMoney.selling = (currency.selling / tempConvertCurrency.selling ) * (updatedAmount);
                myMoney.change_Rate = currency.change_Rate / tempConvertCurrency.change_Rate; 
                console.log(myMoney.change_Rate);
            }
        })
    }


    Calculate = () => { 
        let tempMyMoney : SimulatorData = new SimulatorData(this.state.SelectedCurrency,this.state.Amount,0,0,0,this.state.SelectedCurrencytoConvert);
        let tempConvertCurency : Data = this.getConvertCurrency();         //GET CONVERTED CURRENCY INFOS...
        this.state.CurrencyInfo.map((currency) => {
            if(currency.code == this.state.SelectedCurrency){
                console.log(tempConvertCurency);
                if(!this.isExistMyMoney(tempMyMoney)){
                    this.state.MyCurrencyInfo.push(new SimulatorData(currency.code , this.state.Amount,(currency.buying / tempConvertCurency.buying) * (this.state.Amount),(currency.selling / tempConvertCurency.selling) * (this.state.Amount),(currency.change_Rate / tempConvertCurency.change_Rate), this.state.SelectedCurrencytoConvert))                   
                }
                else{
                    this.UpdateInfos(currency,tempConvertCurency);
                }
                this.setState({
                    MyCurrencyInfo : this.state.MyCurrencyInfo
                })
                
            }
        })
        let lastIndex : number = this.state.MyCurrencyInfo.length - 1;
        let startingValue : number = this.state.MyCurrencyInfo[lastIndex].buying;
        alert("Paranızın değeri " + startingValue + " " + this.state.SelectedCurrencytoConvert + " ile başlamıştır.Tablodan takip edebilirsiniz.")

    }

    renderSimulatorDataTable(){
        if(this.state.MyCurrencyInfo.length == 0){
            return(
                <View style = {styles.WarningView}>
                    <Text>xxxParanızın değerini görmek için yukarıdaki simulatorü kullanın.</Text>
                </View>
            );
        }
        else{
            return(
                <SimulatorDataTable rows = {this.state.MyCurrencyInfo} setAlarm = {this.setAlarm.bind(this)} deleteRow  = {this.deleteRow.bind(this)}/>
            );

        }
    }


    getItem(row : SimulatorData) : number{
        let index : number = this.state.MyCurrencyInfo.indexOf(row);
        return index;
    }

    deleteRow(row : SimulatorData){
        let index : number = this.getItem(row)
        this.state.MyCurrencyInfo.splice(index , 1);
        this.setState({
            MyCurrencyInfo : this.state.MyCurrencyInfo
        })
        alert(row.amount + " " + row.code + " canlı takipten kaldırıldı")
    }

    setAlarm(row : SimulatorData){
        let index : number = this.getItem(row);
        //add this row to db
        alert(row.amount + row.code + " paranız için alarm oluşturuldu.")
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


/*


*/

const styles = StyleSheet.create({
    Container : {marginTop : 30 },
    SimulatorContainer : {flexDirection : 'row' , margin : 5},
    InputContainer : {flex : 0.7 ,margin : 5},
    PickerContainer : { flex : 1},
    ButtonContainer : {flex : 1 ,margin : 5},
    Input : {borderStyle : 'solid' , height : 35 , borderWidth : 1},
    WarningView : {margin : 5}


})