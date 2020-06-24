import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons'
import {getDeck} from '../utils/helpers.js'


function AddCard({navigation}){
    return(
    <TouchableOpacity onPress={navigation.navigate('Add Card')}>
        <Text><MaterialCommunityIcons name="cards" size={24} color="black" />Add Card</Text>
    </TouchableOpacity>
    )
}
function StartQuiz({navigation}){
    return(
        <TouchableOpacity onPress={navigation.navigate('Quiz')}>
            <Text><MaterialIcons name="question-answer" size={24} color="black" />Start Quiz</Text>
        </TouchableOpacity>
    )
}
export default class Deck extends Component {
    state={
        questions:[]
    }
    componentDidMount(){
        getDeck(this.props.route.params.title).then((questionsDeck)=>{
            this.setState({
                questions:questionsDeck.questions
            })
        }
        )
    }
   setNavigationOptions=(title)=>{
        this.props.navigation.setOptions({
            title: title
        });
   }
   
    render(){
        const {title}= this.props.route.params
        const {questions}=this.state
        this.setNavigationOptions(title)

      return (        
          <View style={{flex:1, paddingTop:30, justifyContent: 'center', alignItems:'center'}}>
            <Text>{title}</Text>
            <Text>{questions.length} cards</Text>
            <AddCard navigation={this.props.navigation}/>
            <StartQuiz navigation={this.props.navigation}/>
          </View>
       
      );
    }
}

