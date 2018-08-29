import React, { CSSProperties }  from 'react'
import {Component} from 'react';

import {View , Text , StyleSheet , TouchableOpacity , Image} from 'react-native'
import { types } from 'util';
import Data from '../model/Data'
import {Menu ,MenuOptions,MenuOption,MenuTrigger , MenuProvider} from 'react-native-popup-menu'; // 0.8.0
import SimulatorData  from '../model/SimulatorData'



type Props = {
    rows : SimulatorData[],
    deleteRow : any,
    setAlarm : any
}

export default class DataTable extends Component<Props>{
    public oldChangeRate : Array<number> = [];
    constructor(props : Props){
        super(props);
        this.state = {
            RowStyle : styles.Row
        };
    }

    assignColorText(row : SimulatorData){
        let style;
        if(row.change_Rate > 0){
            style = styles.IncreaseText;
        }
        else if(row.change_Rate < 0){
            style = styles.DecreaseText;
        }
        else{
            style = styles.StaticText;
        }
        return style;
    }

    assignRowStyle(row : SimulatorData , index : number){
        let style;
        if(this.oldChangeRate[index]==null){
            this.oldChangeRate[index] == row.change_Rate;
        }

        if(row.change_Rate != this.oldChangeRate[index]){
            style = styles.ChangeRateRow;
            this.oldChangeRate[index] = row.change_Rate;
        }
        else{
            style = styles.Row;
        }
        return style;
    }    


    renderRow(row : SimulatorData, index : number) {
        let TextStyle = this.assignColorText(row); 
        let RowStyle = this.assignRowStyle(row , index);
        let selling : string = row.selling.toFixed(2);
        let buying : string = row.buying.toFixed(2);
        let rate : string = row.change_Rate.toFixed(2);
        console.log(rate);
        return (      
                <View key = {index + 1} style={RowStyle}>
                    <View style={styles.CodeColumn}>
                        <Text style = {styles.CodeColumnText}>{row.amount}</Text>
                        <View style = {styles.NameColumnView}>
                            <Text style = {styles.NameColumnText}>{row.code}</Text>
                        </View>
                    </View> 
                    <View style={styles.ToConvertCurrencyColumn}><Text style={styles.ToConvertCurrencyText}>{row.toConvertCurrency}</Text></View>
                    <View style={styles.Column}><Text style= {TextStyle}>{selling}</Text></View>
                    <View style={styles.Column}><Text style= {TextStyle}>{buying}</Text></View>
                    <View style = {styles.ButtonColumn}>
                           <TouchableOpacity onPress = {() => this.props.setAlarm(row)}>
                               <Image  style = {{width : 30 , height : 30}} source = {require("../asset/img/alarm.png")}/>
                           </TouchableOpacity>
                    </View>
                    <View style = {styles.ButtonColumn}>
                        <TouchableOpacity onPress = {() => this.props.deleteRow(row)}>
                                <Image style = {{width : 30 , height : 30}} source = {require("../asset/img/delete.png")}  />
                        </TouchableOpacity>
                    </View>
                </View>
        );
    }

/*
    getTime(){
        return new Date().toLocaleTimeString();
    }
*/  


    render() {
        return ( 
                <View style = {styles.Container}>
                    <View key = {0} style={styles.TableHeader}>
                        <View style={styles.DateColumn}><Text >Paranız</Text></View> 
                        <View style={styles.ToConvertCurrencyColumn}><Text>Para</Text></View>
                        <View style={styles.Column}><Text>Alış</Text></View>
                        <View style={styles.Column}><Text>Satış</Text></View>
                        <View style={styles.Column}><Text></Text></View>
                    </View>
                    <MenuProvider>
                    {
                        this.props.rows.map((row , index) => { // This will render a row for each data element.
                            return (                                    
                                        this.renderRow(row,index)
                            );
                            

                        })
                    }
                    </MenuProvider>
                    
                </View>
            
        );
      }
}
const styles = StyleSheet.create({
    Container : {paddingTop :25 , margin : 5},
    RowContainer : {},
    TableHeader : {flexDirection: 'row' ,height : 45 , borderBottomWidth : 1 , borderStyle : 'solid'},
    Row : { flexDirection: 'row' ,height : 55 , borderWidth : 1 ,borderTopWidth : 0, borderStyle : 'solid' },
    ChangeRateRow : {flexDirection: 'row' , height : 55  , borderWidth : 1 , backgroundColor : 'silver' , borderTopWidth : 0, borderStyle : 'solid' },
    CodeColumn : {flex : 1 ,alignSelf : 'center' , width : 100 , flexDirection : 'column'},
    CodeColumnText : {fontSize : 16 },
    NameColumnView : {marginBottom : 0, alignSelf : 'baseline' },
    NameColumnText : {fontSize : 12 , marginBottom : 0},
    ToConvertCurrencyColumn : {alignSelf : 'center' , flex : 1},
    ToConvertCurrencyText : {fontSize : 14 , alignSelf : 'center'},
    DateColumn : {flex : 1.4 ,alignSelf : 'center' , width : 100 , flexDirection : 'column'},
    Column : { flex: 1.8, alignSelf: 'center', flexDirection: 'column' , marginStart : 20 },
    ButtonColumn : {flex : 1 , alignSelf : 'center'},
    RateColumn : { flex : 1 , alignSelf: 'center', flexDirection: 'column' },
    IncreaseText : {color : 'green' , fontSize : 14},
    DecreaseText :{color : 'red' , fontSize : 14},
    StaticText :{color : 'yellow' , fontSize : 14},
  });

  const popupMenu = StyleSheet.create({
      MenuStyle : {borderWidth : 1 , borderStyle : 'solid'}
  })
  
  
/*
                    <Menu>
                                <MenuTrigger text="Action" />
                                <MenuOptions optionsContainerStyle = {popupMenu.MenuStyle}>
                                    <MenuOption onSelect={() => alert(`Save`)} text="Alarm" />
                                    <MenuOption onSelect={() => this.props.deleteRow(row)}>
                                        <Text style={{ color: 'red' }}>Delete</Text>
                                    </MenuOption>
                                </MenuOptions>
                            </Menu>
                     */
