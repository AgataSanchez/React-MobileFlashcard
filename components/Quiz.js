import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import {Ionicons, Fontisto, FontAwesome} from '@expo/vector-icons'
import {getDecks} from '../utils/helpers.js'

function CustomBtn({onPress, textBtn}){
    return(
        <TouchableOpacity onPress={onPress}>
        <Text>{textBtn}</Text>
    </TouchableOpacity>
    )
}
export default class Quiz extends Component {
    state={
        numberQ:1,
        textQorA:'P1'/*this.props.questions[0].question */,
        correct:0,
        textBtn:'Answer'
    }

    handlePressBtn=()=>{
        let text, textQorA
        //const currentQ=this.props.questions[this.state.numberQ-1]
        if(this.state.textBtn==='Answer'){
            text='Question'
            textQorA='A1'/*currentQ.answer */
        }
        else{
            text='Answer'
            textQorA='Q1'/*currentQ.question */
        }
        this.setState({
            textBtn: text,
            textQorA
        })
    }

    handleCorrectIncorrect=(e)=>{
        let numberQ=this.state.numberQ
        numberQ++
        let correct=this.state.correct
        if(e.value)
            correct++
        this.setState({
            correct, 
            numberQ,
            textQorA:'Q2'/*this.props.questions[numberQ-1].question*/
        })
        
    }
    render(){
        /*const {questions} = this.props*/
        const total=2/*questions.length*/
        const percentage=20/*((this.state.correct/total)*100).toFixed(0)*/
        if(false/*this.props.questions.length===0 */){
            return (
                <View style={{flex:1, paddingTop:30, justifyContent: 'center', alignItems:'center'}}>
                    <Fontisto name="confused" size={100} color="black" />
                    <Text>Sorry, you cannot take a quiz because there are no cards in the deck</Text>
                </View>
            )
        }
        if(this.state.numberQ>2/*this.state.numberQ>questions.length*/){//Finished the quiz
            return(
                <View style={{flex:1, paddingTop:30, justifyContent: 'center'}}>
                    <Text>Congratulations! You have finished the quiz. Its percentage of correct answers
                        has been of a:</Text>
                    <Text> {percentage}<FontAwesome name="percent" size={24} color="black" /></Text>
                    {percentage<40 ? <Ionicons name="ios-sad" size={24} color="black" />: percentage>50 ? <Ionicons name="ios-happy" size={24} color="black" />:<FontAwesome name="meh-o" size={24} color="black" />}
                </View>
            )
        }
        return (        
            <View style={{flex:1, paddingTop:30, justifyContent: 'center'}}>
                <Text>{this.state.numberQ}/{total}</Text>
                <Text>{this.state.textQorA}</Text>
                <CustomBtn onPress={this.handlePressBtn} textBtn={this.state.textBtn}/>
                <CustomBtn onPress={(e)=>this.handleCorrectIncorrect(e)} value={true} textBtn='Correct'/>
                <CustomBtn onPress={(e)=>this.handleCorrectIncorrect(e)} value={false} textBtn='Incorrect'/>
            </View>
       
        );
    }
  }

