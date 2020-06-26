import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native'
import {MaterialCommunityIcons, MaterialIcons, Ionicons} from '@expo/vector-icons'
import {removeADeck} from '../actions/decks.js'
import {removeDeck} from '../utils/helpers.js'
import { connect } from 'react-redux'

function AddCard({props}){
    return(
    <TouchableOpacity onPress={()=>props.navigation.navigate('Add Card', {title: props.route.params.title})}
    style={[styles.Buttons, {borderColor: '#72BFE1', backgroundColor: '#72BFE1'}]}>
        <Text style={styles.ButtonTexts}>{Platform.OS==='ios' 
        ? <MaterialCommunityIcons name="cards" size={24} color="white" />
        : <Ionicons name="md-images" size={24} color="white" />}Add Card</Text>
    </TouchableOpacity>
    )
}
function StartQuiz({props}){
    return(
        <TouchableOpacity onPress={()=>props.navigation.navigate('Quiz', {title: props.route.params.title})}
        style={[styles.Buttons,  {borderColor: '#59EEAA', backgroundColor: '#59EEAA'}]}>
            <Text style={styles.ButtonTexts}>{Platform.OS==='ios' 
            ? <MaterialIcons name="question-answer" size={24} color="white" />
            : <Ionicons name="md-chatboxes" size={24} color="white" />}Start Quiz</Text>
        </TouchableOpacity>
    )
}

function RemoveDeck({onPress}){
    return(
    <TouchableOpacity onPress={onPress} style={[styles.Buttons,  {borderWidth:0}]}>
        <Text style={{color:'red', fontSize:20}}>{Platform.OS==='ios' 
        ? <MaterialIcons name="delete" size={24} color="red" />
        : <Ionicons name="md-trash" size={24} color="red" />}Delete Deck</Text>
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
          <View style={styles.ViewContent}>
            <View style={{alignItems:'center'}}>
                <Text style={[styles.ViewTexts, {fontWeight:'bold'}]}>{title}</Text>
                <Text style={styles.ViewTexts}>{questions.length} cards</Text>
            </View>
            <View style={styles.ViewButtons}>
                <AddCard props={this.props}/>
                <StartQuiz props={this.props}/>
                <RemoveDeck onPress={()=>this.removeDeck(title)}/>
            </View>
           
          </View>
       
      );
    }
}

const styles=StyleSheet.create({
    ViewContent:{
        flex:1, 
        paddingTop:50, 
        justifyContent: 'space-between', 
        alignItems:'center',
        paddingBottom:20,
    },
    ViewTexts:{
        paddingBottom: 20,
        fontSize:30,
        alignItems:'center'
    },
    ViewButtons:{
       justifyContent:'flex-end'
    },
    Buttons:{ 
        marginBottom: 10,
        borderWidth:2,
        width:250,
        alignItems: 'center',
        borderRadius:10
    },
    ButtonTexts:{
        color:'white',
        fontSize:20,
    }
})

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