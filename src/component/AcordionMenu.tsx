import React, { CSSProperties, SyntheticEvent }  from 'react'
import {Component} from 'react';

import { TextInput , View , Text , Animated , TouchableHighlight , StyleSheet, SectionList } from 'react-native';

import { Acordion } from '../model/Acordion'

type Props = {
    menuItems : Acordion[]
}
interface State {
    expanded    : boolean,
    animation   : any,
    maxHeight   : any
    minHeight   : any
}


export default class AcordionMenu extends React.Component<Props,State>{

    constructor(props : Props){
        super(props);
        this.state = {
            expanded : true,
            animation : new Animated.Value(0),
            maxHeight : 0,
            minHeight : 0
        }
    }

    _setMaxHeight(event : any){
        
        this.setState({
            maxHeight   : event.nativeEvent.layout.height
        }); 

        console.log('height : ' + this.state.maxHeight);
    }


    _setMinHeight(event : any){
        this.setState({
            minHeight   : event.nativeEvent.layout.height
        });
    }
    toggle(index : number){
                console.log(this);
                let isExpanded : boolean = !this.state.expanded;

                let value : number = !isExpanded ? 500 : 0;
        
                this.setState({
                    expanded : isExpanded  //Step 2
                });
                this.state.animation.setValue(0);


                Animated.spring(
                    this.state.animation,
                    {
                        toValue: value
                    }
                ).start(); 
    }

    componentDidMount(){
        //this.toggle();
    }




    renderItems(){
        return(
            this.props.menuItems.map((menu ,index) => {
                return(

                        <View style = {styles.MenuItems} >
                                <TouchableHighlight key = {index + 100} onPress={this.toggle.bind(this,index)}>
                                    <View style = {styles.HeaderView}>
                                        <View style = {{flex : 3,alignSelf : 'center'}}><Text style = {styles.HeaderText}>{menu.header}</Text></View>
                                        <View style = {{flex : 1,alignSelf : 'center'}}><Text style = {[styles.HeaderText , {alignSelf : 'flex-end' , marginRight : 5}]}>{menu.price} TL</Text></View>
                                    </View>
                                </TouchableHighlight>
                            <Animated.View key = {index} style={[styles.AnimationContainer,{height: this.state.animation}]}>
                                <View key = {index + 10} style = {styles.MenuDetail} onLayout={this._setMinHeight.bind(this)} >
                                    {
                                        this.renderContent(menu)
                                    }
                                </View>
                            </Animated.View>    
                        </View>

                )
            })
        );
    }

    renderContent(menu : Acordion){
        return(
            menu.content.map((item )=> {
                return (<View style = {styles.ContentItemView}> 
                    <View style = {styles.View1}>
                        <View style = {styles.View4}>
                            <Text style = {styles.ContentItemText}>{item}</Text>
                        </View>
                        <View style = {styles.View5}>
                            <TextInput keyboardType  = 'numeric' placeholderTextColor = 'black' alignItems = 'center' underlineColorAndroid = 'white'/>

                        </View>

                    </View>
                </View>);
            })
        )
    }
    render(){
 
        return(
            <View style = {styles.Container}>
                {this.renderItems()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Container : { margin : 5 , flexDirection : 'column' , paddingTop : 25 },
    HeaderView : { backgroundColor : 'silver' , flexDirection : 'row' , alignSelf : 'center', height : 40 , borderWidth : 1 , borderRadius : 7 , borderStyle : 'solid'},
    HeaderText : { fontSize : 20 , marginLeft : 5},
    ContentItemView : {flexDirection : 'row', fontSize : 14 , marginBottom : 20},
    View5 : {flex : 1.5 ,  borderStyle : 'solid' , borderWidth : 2 , marginTop : 10 , borderRadius : 6},
    View4 : {flex : 1.5  },
    View1 : {flex : 3 , flexDirection : 'column' , height : 60},
    View2 :{flex : 2},
    View3 :{flex : 2},
    ContentItemText : { fontSize : 16 , flex : 2},
    MenuItems : {marginTop : 5},
    MenuDetail : {margin : 10},
    AnimationContainer : { backgroundColor: '#fff', margin:10 , overflow:'hidden'},
    TextInputStyle : {borderWidth : 1 ,borderStyle :'solid'}

})