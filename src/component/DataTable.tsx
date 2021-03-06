import React, { CSSProperties }  from 'react'
import {Component} from 'react';

import {View,Text,StyleSheet,ListView} from 'react-native'
import { types } from 'util';
import Data from '../model/Data'
import {Menu ,MenuOptions,MenuOption,MenuTrigger , MenuProvider} from 'react-native-popup-menu'; // 0.8.0


type Props = {
    rows : Data[]
}

export default class DataTable extends Component<Props>{
    public oldChangeRate : Array<number> = [];
    constructor(props : Props){
        super(props);
        this.state = {
            RowStyle : styles.Row
        };
    }

    assignColorText(row : Data){
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

    assignRowStyle(row : Data , index : number){
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


    renderRow(row : Data, index : number) {
        let TextStyle = this.assignColorText(row); 
        let RowStyle = this.assignRowStyle(row , index);
        return (      
                <View key = {index + 1} style={RowStyle}>
                    <View style={styles.CodeColumn}>
                        <Text style = {styles.CodeColumnText}>{row.code}</Text>
                        <View style = {styles.NameColumnView}>
                            <Text style = {styles.NameColumnText}>{row.name}</Text>
                        </View>
                    </View> 
                    <View style={styles.Column}><Text style= {TextStyle}>{row.selling}</Text></View>
                    <View style={styles.Column}><Text style= {TextStyle}>{row.buying}</Text></View>
                    <View style={styles.Column}><Text style= {TextStyle}>%{row.change_Rate}</Text></View>
                </View>
        );
    }


    getTime(){
        return new Date().toLocaleTimeString();
    }


    render() {
        return ( 
                <View style = {styles.Container}>
                    <View key = {0} style={styles.TableHeader}>
                        <View style={styles.DateColumn}><Text>{this.getTime()}</Text></View> 
                        <View style={[styles.Column , {marginStart : 40}]}><Text>Alış</Text></View>
                        <View style={[styles.Column , {marginStart : 40}]}><Text>Satış</Text></View>
                        <View style={[styles.Column , {marginStart : 40}]}><Text>Fark</Text></View>
                    </View>

                    {
                        this.props.rows.map((row , index) => { // This will render a row for each data element.
                            return (                                    
                                        this.renderRow(row,index)
                            );
                        })
                    }
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
    CodeColumn : {flex : 1.7 ,alignSelf : 'center' , width : 100 , flexDirection : 'column'},
    CodeColumnText : {fontSize : 14 },
    NameColumnView : {marginBottom : 0, alignSelf : 'baseline' },
    NameColumnText : {fontSize : 12 , marginBottom : 0},
    DateColumn : {flex : 1.7 ,alignSelf : 'center' , width : 100 , flexDirection : 'column'},
    Column : { flex: 1.2, alignSelf: 'center', flexDirection: 'column',marginStart : 20 },
    IncreaseText : {color : 'green' , fontSize : 18},
    DecreaseText :{color : 'red' , fontSize : 18},
    StaticText :{color : 'yellow' , fontSize : 18},
    MenuStyle : {borderWidth : 1 , borderStyle : 'solid'}
  });
  
  
  /*
  
          <View style={styles.Container}>
              <View style={styles.Row}>
                  <View style={styles.Box}>
                      <Text></Text>
                  </View>
                  <View style={styles.Box}>
                      <Text>Alış</Text>
                  </View>
                  <View style={styles.Box}>
                      <Text>Satış</Text>
                  </View>
                  <View style={styles.Box}>
                      <Text>Fark</Text>
                  </View>
              </View>
              {
                this.props.rows.map((row) => {
                    <View style={styles.Row}>
                        <View style={styles.Box}>
                            <Text>{row.name}</Text>
                        </View>
                        <View style={styles.Box}>
                            <Text>{row.buying}</Text>
                        </View>
                        <View style={styles.Box}>
                            <Text>{row.selling}</Text>
                        </View>
                        <View style={styles.Box}>
                            <Text>{row.change_Rate}</Text>
                        </View>
                    </View>              
                    })
                }
                </View>

  */