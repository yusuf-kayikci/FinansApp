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
  /*
  public apiCaller : ApiCaller = new ApiCaller(ApiUri.CURRENCY_API_URI);
  public interval : any = null;

  constructor(props : any){
    super(props);
    this.state = {
      refreshing : true,
      CurrencyInfo : [],
      seconds : 0
    }
  }

  tick() {
    this.getData();
    this.setState(prevState => ({
      seconds: prevState.seconds + 5
    }));
}

  componentWillMount(){
    this.getData();
    
  }

  componentDidMount() {
      this.interval = setInterval(() => this.tick(), 5000);
  }

  getData(){
    this.apiCaller.callCurrencyApi().then((items) => {
        items.push(new Data('TL','TL', 1 , 1 , 1));
        this.setState({
            CurrencyInfo : items
        })
    }).catch((err)=>{
        console.log(err);
    });
  }
  */
  



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
    return(
      <CurrencyTabNavigator/>
    );
  }

}
