import React, { CSSProperties }  from 'react'
import {Component} from 'react';

import {View,Text,StyleSheet,ListView} from 'react-native'
import { types } from 'util';
import Data from '../model/Data'

type Props = {
    rows : Data[]
}

export default class DataTable extends Component<Props>{
    constructor(props : Props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
          dataSource: ds.cloneWithRows(['row 1', 'row 2']),
        };
    }


    renderRow(row : Data, index : number) {
        let TextStyle;
        if(row.change_Rate > 0){
            TextStyle = styles.IncreaseText;
        }
        else if(row.change_Rate < 0){
            TextStyle = styles.DecreaseText;
        }
        else{
            TextStyle = styles.StaticText;
        }


        return (
                
                <View key = {index + 1} style={styles.Row}>
                    <View style={styles.NameColumn}><Text style= {TextStyle}>{row.name}</Text></View> 
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
                    <View key = {0} style={styles.Row}>
                        <View style={styles.NameColumn}><Text>{this.getTime()}</Text></View> 
                        <View style={styles.Column}><Text>Alış</Text></View>
                        <View style={styles.Column}><Text>Satış</Text></View>
                        <View style={styles.Column}><Text>Fark</Text></View>
                    </View>
                    {
                        this.props.rows.map((row , index) => { // This will render a row for each data element.
                            console.log(index);
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
    Container : {paddingTop :15 , margin : 5},
    RowContainer : {},
    TableHeader : {flexDirection: 'row' ,height : 40},
    Row : { flexDirection: 'row' ,height : 40 },
    NameColumn : {flex : 1 ,alignSelf : 'center' , width : 100 , flexDirection : 'column'},
    Column : { flex: 0.7, alignSelf: 'center', flexDirection: 'column',marginStart : 40 },
    IncreaseText : {color : 'green'},
    DecreaseText :{color : 'red'},
    StaticText :{color : 'yellow'}
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