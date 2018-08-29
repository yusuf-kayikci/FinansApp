import React, { CSSProperties }  from 'react'
import {Component} from 'react';

import { TextInput , View , Text , StyleSheet, SectionList } from 'react-native';


import Accordion from 'react-native-collapsible/Accordion';


type Props = {
    Header : Array<string>,
    Content : Array<TextInput>,
    SectionTitle : string
}





export class AcordionMenu extends React.Component{
    constructor(props : any){
        super(props);
    }
    _renderSectionTitle(section : any) {
        return (   
          <View style={styles.content}>
            <Text>{}</Text>
          </View>
        );
      }
     
      _renderHeader(section : any) {
        return (
          <View style={styles.header}>
            <Text style={styles.HeaderText}>{section.title}</Text>
          </View>
        );
      }
     
      _renderContent(section : any) {
        return (
          <View style={styles.content}>
          {section.content}
          </View>
        );
      }

      render(){
          return(
            <Accordion
                underlayColor = 'silver'
                sections={SECTIONS}
                renderSectionTitle={this._renderSectionTitle}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
          />
          );
      }
}


const styles = StyleSheet.create({
    content:{},
    HeaderView : { backgroundColor : 'silver' , flexDirection : 'row' , alignSelf : 'center', height : 40 , borderWidth : 1 , borderRadius : 7 , borderStyle : 'solid'},
    HeaderText : { fontSize : 20 , marginLeft : 5},
    MenuDetail : {margin : 10},
    ContentItemText : { fontSize : 14 , flex : 2},
    header : {alignSelf : 'flex-start'}
})


const TakiAltin = [
  <View><Text>8 ayar</Text><TextInput> </TextInput></View>,
  <View><Text>14 Ayar</Text><TextInput></TextInput></View>,
  <View><Text>18 Ayar</Text><TextInput></TextInput></View>,
  <View><Text>22 Ayar</Text><TextInput></TextInput></View>,
  <View><Text>24 Ayar</Text><TextInput></TextInput></View>
]

const SECTIONS = [
  {
    title: <View style = {styles.HeaderView}><Text style = {styles.HeaderText}>TAKILAR</Text></View>,
    content:<View style = {styles.MenuDetail}>{TakiAltin}</View> 
  },
  {
    title: <View style = {styles.HeaderView}><Text style = {styles.HeaderText}>ZİYNETLER</Text></View>,
    content: TakiAltin
  },
  {
    title: <View style = {styles.HeaderView}><Text style = {styles.HeaderText}>GRAM ALTINLAR</Text></View>,
    content: TakiAltin
  }
];
