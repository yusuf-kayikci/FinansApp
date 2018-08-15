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
        tabBarLabel : 'Simulator'  
      }
    },
    Prices : { 
      screen : GoldPriceTab,
      navigationOptions:{
        tabBarLabel : 'Prices'
      }
    },
    MyCurrency : { 
        screen : GoldStockTab,
        navigationOptions:{
          tabBarLabel : 'My Money'  
        }
      }
  },{
    swipeEnabled : true,  
    tabBarPosition : 'bottom',
    tabBarOptions : {
      activeTintColor : 'yellow'
    }
  
  })



export default class GoldMenu extends React.Component{
render() : any{
    return(
        <GoldTabNavigator></GoldTabNavigator>
    );
}

}
