import React from 'react'
import {Component} from 'react'
import {Acordion} from '../../model/Acordion'
import AcordionMenu from '../../component/AcordionMenu'
import {View,Text, ScrollView , StyleSheet , KeyboardAvoidingView } from 'react-native'

import {GoldCalculator} from '../../component/GoldCalculator'

import {GoldLines} from '../../model/GoldLines'


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
    new GoldLines('Gram Altın(24K)',0.985,0.995,1.01,1.05,0,0,0,0,1,0)
]


const officialgolds : Array<GoldLines> = [
    new GoldLines('Çeyrek Altın',0.930,0.935,0.9,0.91,0,0,0,0,1.75,0),
    new GoldLines('Yarım Altın',0.930,0.935,0.9,0.91,0,0,0,0,3.50,0),
    new GoldLines('Ziynet Altın',0.930,0.935,0.9,0.91,0,0,0,0,7,0),
    new GoldLines('Ata Altın',0.930,0.935,0.9,0.91,0,0,0,0,7.20,0),
    new GoldLines('İkibuçuk Altın',0.930,0.935,0.9,0.91,0,0,0,0,17.5,0),
    new GoldLines('İkibuçuk Ata Altın',0.930,0.935,0.9,0.91,0,0,0,0,18,0),
    new GoldLines('Beşli Altın',0.930,0.935,0.9,0.91,0,0,0,0,35,0),
    new GoldLines('Beşli Ata Altın',0.930,0.935,0.9,0.91,0,0,0,0,36,0),
];




export default class GoldSimulatorTab extends React.Component{
  
    constructor(props : any){
        super(props);
    }
    render(){
        return(

                <KeyboardAvoidingView keyboardVerticalOffset={30} behavior="padding" style={{flex: 1}}>
                    <ScrollView style = {styles.container}>
                        <GoldCalculator carats = {carats} gramgold = {gramgold} officialgold = {officialgolds}/>
                    </ScrollView>
                </KeyboardAvoidingView>

        

        )
    }
}

    const styles = StyleSheet.create({
        container : {marginTop : 25 , marginBottom : 25}
    })


/*      
          <View>
<AcordionMenu menuItems = {menuData}/>
</View>
*/
