import React  from 'react'
import {Component} from 'react';
import {StyleSheet,Text,View,Image,TouchableHighlight,Animated} from 'react-native'; //Step 1

const icons = {     //Step 2
    'up'    : require("../asset/img/up.png"),
    'down'  : require("../asset/img/down.png")
};


interface State {
    title : string;
    expanded : boolean;
    animation : Animated.Value;
    maxHeight : number
    minHeight : number
}

interface Props{
    title : string
}


export class Acordion extends React.Component<Props, State>{
    constructor(props : Props){
        super(props);
        this.state = {       //Step 3
            title       : props.title,
            expanded    : false,
            animation   : new Animated.Value(40),
            maxHeight   : 0,
            minHeight   : 0
        };

    }

    _setMaxHeight(event : any){
        this.setState({
            maxHeight   : event.nativeEvent.layout.height
        });
    }

    _setMinHeight(event : any){
        this.setState({
            minHeight   : event.nativeEvent.layout.height
        });
    }



    toggle(){
        //Step 1
        let initialValue    = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
        finalValue      = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

        this.setState({
            expanded : !this.state.expanded  //Step 2
        });

        this.state.animation.setValue(initialValue);  //Step 3
        Animated.spring(     //Step 4
            this.state.animation,
            {
                toValue: finalValue
            }
        ).start();  //Step 5    
    }





    render(){
        let icon = icons['down'];

        if(this.state.expanded){
            icon = icons['up'];   //Step 4
        }
        //Step 5
        return ( 
            <Animated.View style={[styles.container,{height: this.state.animation}]}>
                <View style={styles.container} >        
                <TouchableHighlight  onPress={this.toggle.bind(this)} underlayColor = 'white'> 
                    <View style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)}>
                        <Text style={styles.title}>{this.state.title}</Text>
                        <View style={styles.button}>
                            <Image
                                style={styles.buttonImage}
                                source={icon}
                            ></Image>
                        </View>
                    </View>
                    </TouchableHighlight>
                    <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
                        {this.props.children}
                    </View>
                </View>
            </Animated.View>
        );
    }
}



var styles = StyleSheet.create({
    container   : {
        backgroundColor: '#fff',
        margin:5,
        overflow:'hidden'
    },
    titleContainer : {
        flexDirection: 'row'
    },
    title       : {
        flex    : 1,
        padding : 10,
        color   :'#2a2f43',
        fontWeight:'bold',
        fontSize : 20
    },
    button      : {
        alignSelf : 'center'
    },
    buttonImage : {
        width   : 30,
        height  : 25
    },
    body        : {
        padding     : 10
    }
});