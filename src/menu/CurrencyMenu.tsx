import {createMaterialTopTabNavigator} from 'react-navigation'
import React from 'react';
import {Component} from 'react'
import CurrencyPriceTab from '../tab/Currency/CurrencyPriceTab'
import CurrencySimulatorTab from '../tab/Currency/CurrencySimulatorTab'
import CurrencyStockTab from '../tab/Currency/CurrencyStockTab'


var CurrencyTabNavigator = createMaterialTopTabNavigator({
    Simulator : { 
      screen : CurrencySimulatorTab,
      navigationOptions:{
        tabBarLabel : 'HESAP'  
      }
    },
    Prices : { 
      screen : CurrencyPriceTab,
      navigationOptions:{
        tabBarLabel : 'FİYATLAR'
      }
    },
    MyCurrency : { 
        screen : CurrencyStockTab,
        navigationOptions:{
          tabBarLabel : 'KASA'  
        }
      }
  },{
    swipeEnabled : true,  
    tabBarPosition : 'bottom',
    tabBarOptions : {
      activeTintColor : 'yellow'
    }
  
  })



export default class CurrencyMenu extends React.Component{
render() : any{
    return(
        <CurrencyTabNavigator></CurrencyTabNavigator>
    );
}

}
