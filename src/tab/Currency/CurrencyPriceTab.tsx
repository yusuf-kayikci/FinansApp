import React from 'react'
import { Component } from 'react';
import { Text,View,StyleSheet,ScrollView,RefreshControl } from 'react-native'

import apiCaller from '../../api/apicalller'
import ApiCaller from '../../api/apicalller';
import Data from '../../model/Data'

import DataTable from '../../component/DataTable'


interface State {
    TableItems: Data[]
    // Make all state optional! See Hack below
}

export default class CurrencyPriceTab extends Component<{},State>{
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
        let heads : string[] = ['İsim','Alış','Satış','Fark'];
        return(
            <View>
                <DataTable heads = {heads} rows = {this.state.TableItems}></DataTable>
            </View>
        );
    }


}

