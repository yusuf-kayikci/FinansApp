import {createMaterialTopTabNavigator} from 'react-navigation'
import React from 'react';
import {Component} from 'react'
import CurrencyPriceTab from '../tab/Currency/CurrencyPriceTab'
import CurrencySimulatorTab from '../tab/Currency/CurrencySimulatorTab'
import CurrencyStockTab from '../tab/Currency/CurrencyStockTab'
import Data from '../model/Data'
import ApiCaller from '../api/apicalller'
import ApiUri from '../api/apiuri'



interface State {
  CurrencyInfo : Data[],
  refreshing : boolean,
  seconds : number
}

export default class CurrencyMenu extends React.Component{
  render() : any{
    let CurrencyTabNavigator = createMaterialTopTabNavigator({
      Simulator : { 
        screen : CurrencySimulatorTab,
        navigationOptions:{
          tabBarLabel : 'HESAP'  
        }
      },
      Prices : { 
        screen : CurrencyPriceTab,
        navigationOptions:{
          tabBarLabel : 'FİYATLAR',
        }
      }
    },{
      swipeEnabled : true,  
      tabBarPosition : 'bottom',
      tabBarOptions : {
        style : {
          backgroundColor : '#F7BE06' ,
        },
        inactiveBackgroundColor : 'white',
        labelStyle : {fontSize : 16 , fontWeight : 'bold'},
        activeTintColor : 'black',
        indicatorStyle : {backgroundColor : 'black' },
      }
    
    })
    return(
      <CurrencyTabNavigator/>
    );
  }

}
