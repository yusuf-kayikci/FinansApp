import React, { CSSProperties }  from 'react'
import {Component} from 'react';

import {Text} from 'react-native'
import { types } from 'util';
import Data from '../model/Data'

type Props = {
    heads : string[],
    rows : Array<Data>
}

export default class DataTable extends Component<Props>{
    constructor(props : Props){
        super(props)
    }

    
    displayHeaders(){
        return(
            this.props.heads.forEach(head => {
                <td><Text>{head}</Text></td>
            })
        );
    }

    displayRows(){
        return (
            this.props.rows.map((row) => {
                <tr>
                    <td>{row.name}</td>
                    <td>{row.buying}</td>
                    <td>{row.selling}</td>
                    <td>{row.change_Rate}</td>
                </tr>
            })
        );
    }


    render(){
        return(
            <table>
                <thead>{this.displayHeaders}</thead>
                <tbody>{this.displayRows}</tbody>
            </table>

            


        )
    }

}