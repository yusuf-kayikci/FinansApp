import React from 'react'
import { Component } from 'react';
import { Text,View,StyleSheet,ScrollView,RefreshControl } from 'react-native'

import apiCaller from '../../api/apicalller'
import ApiCaller from '../../api/apicalller';
import Data from '../../model/Data'

const Table = require('ts-react-json-table');

export default class CurrencyPriceTab extends Component{
    constructor(props : any){
        super(props);
        this.state = {
            TableItems : []
        }
    }

    getData(){
        let apiUrl : string = ''; 
        let apiCaller : ApiCaller = new ApiCaller(apiUrl);
        let items : Data[] = apiCaller.callApi();
        this.setState({
            TableItems : items
        })
    }
    render(){
        return(
            <View>
            </View>
        );
    }


}

