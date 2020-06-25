import React, {Component} from 'react'
import {connect} from 'react-redux'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, AsyncStorage } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import {getDecks, getDeck} from '../utils/helpers.js'
import {addCardToDeck} from '../utils/helpers.js'
import {addCardDeck} from '../actions/decks.js'

function SubmitBtn({onPress, disabled}){
    return(
    <TouchableOpacity onPress={onPress} disabled={disabled}>
        <Text>Submit</Text>
    </TouchableOpacity>
    )
}
class AddCard extends Component {
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
    submitCard=async()=>{
       
        const {question,answer}=this.state
        const card={question,answer}
        const {title}=this.props.route.params
       this.props.dispatch(addCardDeck(title, card))
            //submit to AsyncStorage
            await addCardToDeck(card, title).then(this.props.navigation.goBack())
            //Navigate to 'Deck'
            
        
    }
    render(){
      return (        
          <KeyboardAvoidingView  behavior='padding' style={{flex:1, paddingTop:30, justifyContent: 'center'}}>
            <Text> <MaterialCommunityIcons name="cards" size={24} color="black" /> Add a new card to the {/*Add deck's name*/} deck</Text>
            <MaterialIcons name="question-answer" size={24} color="black" />
            <TextInput placeholder='Question' onChangeText={text=>this.handleChange(text, 'q')} value={this.state.question} />
            <TextInput placeholder='Answer' onChangeText={text=>this.handleChange(text, 'a')} value={this.state.answer} />
            <SubmitBtn onPress={this.submitCard} disabled={this.state.question==='' || this.state.answer===''}/>
          </KeyboardAvoidingView>
       
      );
    }
  }


export default connect()(AddCard)