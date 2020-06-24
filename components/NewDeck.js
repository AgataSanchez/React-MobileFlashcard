import React, {Component} from 'react'
import {connect} from 'react-redux'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, AsyncStorage } from 'react-native'
import {FontAwesome} from '@expo/vector-icons'
import {saveDeckTitle, getDeck} from '../utils/helpers.js'
import {addDeck, receiveDecks} from '../actions/decks.js'

function CreateBtn({onPress, disabled}){
    return(
    <TouchableOpacity onPress={onPress} disabled={disabled}>
        <Text><FontAwesome name="question-circle-o" size={24} color="black" />Create Deck</Text>
    </TouchableOpacity>
    )
}
class NewDeck extends Component {
    state={
        value:'',
    }
    handleChange =(text)=>{
        this.setState({
            value:text
        })
    }
    createDeck= async()=>{
      
        const title=this.state.value
        await getDeck(title).then((result)=>{
            if(result===undefined){
                this.props.dispatch(addDeck(title))
            //submit to AsyncStorage
                saveDeckTitle(title)
                
            //Navigate to  'Deck'
            this.props.navigation.navigate('Deck', {title:title})
            }else 
                alert('This title of deck already exists')
            this.setState({value:''})
        })
        
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


  export default connect()(NewDeck)