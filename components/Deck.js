import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons'
import {getDeck} from '../utils/helpers.js'


function AddCard({onPress}){
    return(
    <TouchableOpacity onPress={onPress}>
        <Text><MaterialCommunityIcons name="cards" size={24} color="black" />Add Card</Text>
    </TouchableOpacity>
    )
}
function StartQuiz({onPress}){
    return(
        <TouchableOpacity onPress={onPress}>
            <Text><MaterialIcons name="question-answer" size={24} color="black" />Start Quiz</Text>
        </TouchableOpacity>
    )
}
export default class Deck extends Component {
   static navigationOptions=({navigation})=>{
    const {title}=navigation.state.params
    return {
        titlte: title
    }
   }
   
    handleAddCard=()=>{
        //Navigate to 'Add Card'
    }
    handleStart=()=>{
        //Navigate to 'Start Quiz'
    }
    render(){
        const {title, questions}= getDeck('JavaScript')
        
      return (        
          <View style={{flex:1, paddingTop:30, justifyContent: 'center', alignItems:'center'}}>
            <Text>{title}</Text>
            <Text>{questions.length} cards</Text>
            <AddCard onPress={this.handleAddCard()}/>
            <StartQuiz onPress={this.handleStart()}/>
          </View>
       
      );
    }
}

