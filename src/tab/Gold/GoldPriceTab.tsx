import React from 'react'
import { Component } from 'react';
import { Text,View,StyleSheet,ScrollView,RefreshControl } from 'react-native'

import ApiCaller from '../../api/apicalller';
import Data from '../../model/Data'

import ApiUri from '../../api/apiuri';
import DataTable from '../../component/DataTable'

interface State {
    TableItems: Data[],
    refreshing : boolean,
    seconds : number
    // Make all state optional! See Hack below
}

export default class GoldPriceTab extends Component<{},State>{


    public interval : any = null;
    public apiCaller : ApiCaller = new ApiCaller();
    constructor(props : any){
        super(props);
        this.state = {
            refreshing : false,
            TableItems : [],
            seconds  : 0
        }
    }

    tick() {
        this.getData();
        this.setState(prevState => ({
          seconds: prevState.seconds + 5
        }));
      }


    getData(){

        this.apiCaller.callGoldApi().then((items) => {
            this.setState({
                refreshing : false,
                TableItems : items
            })            
        }).catch((err) => {
            console.log(err);
        });  
    }
    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 5000);
    }

    componentWillMount(){
        this.getData();
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    _onRefresh = () => {
        this.setState({refreshing : true})
        this.getData();
    }

    _refreshControl(){
        return (
          <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}/>
        )
      }



      

    render(){
        
        return(
            <ScrollView refreshControl = {this._refreshControl()}>
                <DataTable rows = {this.state.TableItems}/>
            </ScrollView>
        );
    }


}

