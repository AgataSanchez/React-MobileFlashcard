import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons'
import {removeADeck} from '../actions/decks.js'
import {removeDeck} from '../utils/helpers.js'
import { connect } from 'react-redux'

function AddCard({props}){
    return(
    <TouchableOpacity onPress={()=>props.navigation.navigate('Add Card', {title: props.route.params.title})}>
        <Text><MaterialCommunityIcons name="cards" size={24} color="black" />Add Card</Text>
    </TouchableOpacity>
    )
}
function StartQuiz({props}){
    return(
        <TouchableOpacity onPress={()=>props.navigation.navigate('Quiz', {title: props.route.params.title})}>
            <Text><MaterialIcons name="question-answer" size={24} color="black" />Start Quiz</Text>
        </TouchableOpacity>
    )
}

function RemoveDeck({onPress}){
    return(
    <TouchableOpacity onPress={onPress}>
        <Text><MaterialIcons name="delete" size={24} color="black" />Remove Deck</Text>
    </TouchableOpacity>
    )
}
class Deck extends Component {
    
   
   setNavigationOptions=(title)=>{
        this.props.navigation.setOptions({
            title: title
        });
   }
    removeDeck=async(title)=>{
        this.props.dispatch(removeADeck(title))
        await removeDeck(title)
        this.props.navigation.navigate('Home')
    }
    render(){
        const {title}= this.props
        const {questions}=this.props
        this.setNavigationOptions(title)
        
      return (        
          <View style={{flex:1, paddingTop:30, justifyContent: 'center', alignItems:'center'}}>
            <Text>{title}</Text>
            <Text>{questions.length} cards</Text>
            <AddCard props={this.props}/>
            <StartQuiz props={this.props}/>
            <RemoveDeck onPress={()=>this.removeDeck(title)}/>
          </View>
       
      );
    }
}
function mapStateToProps(questions, params){
   
    const {title}=params.route.params
    return{
        title,
        questions: questions[title]!==undefined && questions[title].questions!==undefined 
        ? questions[title].questions 
        : []
    }
}

export default connect(mapStateToProps)(Deck)