import React from 'react'
import { Component } from 'react';
import { Text,View,StyleSheet,ScrollView,RefreshControl } from 'react-native'

import ApiCaller from '../../api/apicalller';
import Data from '../../model/Data'

import ApiUri from '../../api/apiuri';
import DataTable from '../../component/DataTable'

interface State {
    TableItems: Data[]
    // Make all state optional! See Hack below
}

export default class GoldPriceTab extends Component<{},State>{
    constructor(props : any){
        let tableComponent;
        super(props);
        this.state = {
            TableItems : []
        }
    }

    getData(){
        let apiCaller : ApiCaller = new ApiCaller(ApiUri.GOLD_API_URI);
        apiCaller.callGoldApi().then((items) => {
            console.log(items);
            
            this.setState({
                TableItems : items
            })
             
            console.log(this.state.TableItems);   
        });  
    }
    componentWillMount(){
        this.getData();
    }

    render(){
        
        return(
            <ScrollView>
                <DataTable rows = {this.state.TableItems}/>
            </ScrollView>
        );
    }


}

