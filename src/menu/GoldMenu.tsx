import {createMaterialTopTabNavigator} from 'react-navigation'
import React from 'react';
import {Component} from 'react'
import GoldPriceTab from '../tab/Gold/GoldPriceTab'
import GoldSimulatorTab from '../tab/Gold/GoldSimulatorTab'
import GoldStockTab from '../tab/Gold/GoldStockTab'


var GoldTabNavigator = createMaterialTopTabNavigator({
    Simulator : { 
      screen : GoldSimulatorTab,
      navigationOptions:{
        tabBarLabel : 'HESAP'  
      }
    },
    Prices : { 
      screen : GoldPriceTab,
      navigationOptions:{
        tabBarLabel : 'FİYATLAR'
      }
    }
  },{
    swipeEnabled : true,  
    tabBarPosition : 'bottom',
    tabBarOptions : {
      style : {
        backgroundColor : '#D68910' ,
      },
      inactiveBackgroundColor : 'white',
      labelStyle : {fontSize : 16 , fontWeight : 'bold'},
      activeTintColor : 'black',
      indicatorStyle : {backgroundColor : 'black' },
    }
  
  })



export default class GoldMenu extends React.Component{
render() : any{
    return(
        <GoldTabNavigator></GoldTabNavigator>
    );
}

}
