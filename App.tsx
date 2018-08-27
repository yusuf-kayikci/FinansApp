import React from 'react'
import { Component } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import Data from './src/model/Data'


import CurrencyMenu from './src/menu/CurrencyMenu'
import GoldMenu from './src/menu/GoldMenu'
import "promise/polyfill"
import "whatwg-fetch"
import  {createMaterialTopTabNavigator}  from 'react-navigation';






var MainScreenNavigator = createMaterialTopTabNavigator({
  Currency : { 
    screen : CurrencyMenu,
    navigationOptions:{
      tabBarLabel : 'DOVİZ'  
    }
  },
  Gold : { 
    screen : GoldMenu,
    navigationOptions:{
      tabBarLabel : 'ALTIN'
    }
  }
},{
  swipeEnabled : true,
  tabBarPosition : 'top',
  tabBarOptions : {
    activeTintColor : 'yellow',
    style : {
      ...Platform.select({
        ios: {
          top : 0,
        },
        android: {
          top : 24,
        },
      })    
    }
  }

})



MainScreenNavigator.navigationOptions = {
  title:'App'
};

export default MainScreenNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
