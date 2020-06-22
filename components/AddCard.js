import React, {Component} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; 
import {getDecks} from '../utils/helpers.js'

function SubmitBtn({onPress, disabled}){
    return(
    <TouchableOpacity onPress={onPress} disabled={disabled}>
        <Text>Submit</Text>
    </TouchableOpacity>
    )
}
export default class AddCard extends Component {
    state={
        question:'',
        answer:'',
    }
    handleChange =(text, input)=>{
        if(input==='q'){
            this.setState({
                question:text
            })
        }else{
            this.setState({
                answer:text
            })
        }
    }
    submitCard=()=>{
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
          <KeyboardAvoidingView  behavior='padding' style={{flex:1, paddingTop:30, justifyContent: 'center'}}>
            <Text> <MaterialCommunityIcons name="cards" size={24} color="black" /> Add a new card to the {/*Add deck's name*/} deck</Text>
            <MaterialIcons name="question-answer" size={24} color="black" />
            <TextInput placeholder='Question' onChangeText={text=>this.handleChange(text, 'q')} value={this.state.question} />
            <TextInput placeholder='Answer' onChangeText={text=>this.handleChange(text, 'a')} value={this.state.answer} />
            <SubmitBtn onPress={this.createDeck} disabled={this.state.question==='' || this.state.answer===''}/>
          </KeyboardAvoidingView>
       
      );
    }
  }

