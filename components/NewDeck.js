import React, {Component} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import {FontAwesome} from '@expo/vector-icons'
import {getDecks} from '../utils/helpers.js'

function CreateBtn({onPress, disabled}){
    return(
    <TouchableOpacity onPress={onPress} disabled={disabled}>
        <Text><FontAwesome name="question-circle-o" size={24} color="black" />Create Deck</Text>
    </TouchableOpacity>
    )
}
export default class NewDeck extends Component {
    state={
        value:'',
    }
    handleChange =(text)=>{
        this.setState({
            value:text
        })
    }
    createDeck=()=>{
        const decks = Object.keys(getDecks())
        
        if(decks.includes(this.state.value))
            alert('This title of deck already exists')
        else{
            //submit to AsyncStorage
            //Navigate to  'Deck'
        }
    }
    render(){
      return (        
          <KeyboardAvoidingView behavior='padding' style={{flex:1, paddingTop:30, justifyContent: 'center'}}>
            <Text>What is the title of your new deck <FontAwesome name="question" size={20} color="black" /> </Text>
            <TextInput placeholder='Deck Title' onChangeText={text=>this.handleChange(text)} value={this.state.value} />
            <CreateBtn onPress={this.createDeck} disabled={this.state.value===''}/>
          </KeyboardAvoidingView>
       
      );
    }
  }

