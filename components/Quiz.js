import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import {Ionicons, Fontisto, FontAwesome} from '@expo/vector-icons'
import {getDecks} from '../utils/helpers.js'
import { connect } from 'react-redux'

function CustomBtn({onPress, textBtn}){
    return(
        <TouchableOpacity onPress={onPress}>
        <Text>{textBtn}</Text>
    </TouchableOpacity>
    )
}
class Quiz extends Component {
    state={
        numberQ:1,
        textQorA:this.props.questions.length===0 ? '' : this.props.questions[0].question,
        correct:0,
        textBtn:'Answer'
    }

    handlePressBtn=()=>{
        let text, textQorA
        const currentQ=this.props.questions[this.state.numberQ-1]
        console.log(currentQ)
        if(this.state.textBtn==='Answer'){
            text='Question'
            textQorA=currentQ.answer
        }
        else{
            text='Answer'
            textQorA=currentQ.question
        }
        this.setState({
            textBtn: text,
            textQorA
        })
    }

    handleCorrectIncorrect=(correct)=>{
        let numberQ=this.state.numberQ
        numberQ++
        let numberCorrect=this.state.correct
        
        if(correct)
            numberCorrect++
        this.setState({
            correct:numberCorrect, 
            numberQ,
            textQorA: numberQ>this.props.questions.length ? '' : this.props.questions[numberQ-1].question
        })
        
    }
    render(){
        const {questions} = this.props
        const total=questions.length
        let percentage=((this.state.correct/total)*100).toFixed(0)
       
        if(this.props.questions.length===0){
            return (
                <View style={{flex:1, paddingTop:30, justifyContent: 'center', alignItems:'center'}}>
                    <Fontisto name="confused" size={100} color="black" />
                    <Text>Sorry, you cannot take a quiz because there are no cards in the deck</Text>
                </View>
            )
        }
        if(this.state.numberQ>questions.length){//Finished the quiz
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
                <CustomBtn onPress={()=>this.handleCorrectIncorrect(true)} value={true} textBtn='Correct'/>
                <CustomBtn onPress={()=>this.handleCorrectIncorrect(false)} value={false} textBtn='Incorrect'/>
            </View>
       
        );
    }
  }

function mapStateToProps(deck, params){
    const {title}=params.route.params
    return{
        title,
        questions: deck[title].questions
    }
}

export default connect(mapStateToProps)(Quiz)