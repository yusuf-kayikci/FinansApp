import React from 'react'
import {Component} from 'react'
import {Acordion} from '../../model/Acordion'
import AcordionMenu from '../../component/AcordionMenu'
import {View,Text, ScrollView , StyleSheet} from 'react-native'

import {GoldCalculator} from '../../component/GoldCalculator'
const carats_content : Array<string> = [
    '8 Ayar',
    '14 Ayar',
    '18 Ayar',
    '22 Ayar',
    '24 Ayar'
]
const gramgolds_content : Array<string> = [
    '1 Gram Altın',
    '2.5 Gram Altın',
    '5 Gram Altın',
    '10 Gram Altın',
    '20 Gram Altın',
    '50 Gram Altın'
]

const golds_content : Array<string> = [
    'Çeyrek Altın',
    'Yarım Altın',
    'Ziynet Altın',
    'Cumhuriyet Altın',
    'İkibuçuk Altın',
    'Gremse Altın'
]


const menuData : Acordion[] = [
    new Acordion('AYARLAR',carats_content,0),
    new Acordion('ZİYNET ALTIN',golds_content,0),
    new Acordion('GRAM ALTIN',gramgolds_content,0)
]



export default class GoldSimulatorTab extends React.Component{
  
    constructor(props : any){
        super(props);
    }
    render(){
        return(
            <ScrollView style = {styles.container}>
                <GoldCalculator/>
            </ScrollView>

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
