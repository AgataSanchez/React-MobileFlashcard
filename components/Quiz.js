import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native'
import {Ionicons, MaterialCommunityIcons, FontAwesome} from '@expo/vector-icons'
import { connect } from 'react-redux'
import {clearLocalNotification, setLocalNotification} from '../utils/helpers.js'

function CustomBtn({onPress, textBtn}){
    return(
        <TouchableOpacity onPress={onPress} style={[textBtn==='Answer' || textBtn==='Question' ? null : styles.Buttons,
        { borderColor: textBtn==='Correct' ? '#6ECD7A': textBtn==='Incorrect' ? '#F04C65' : null ,
        backgroundColor:textBtn==='Correct' ? '#6ECD7A': textBtn==='Incorrect' ? '#F04C65' : null }]}>
        <Text style={[styles.ButtonTexts, {color: textBtn==='Answer' || textBtn==='Question' ? '#4C6AF0' : 'white'}]}>{textBtn}</Text>
    </TouchableOpacity>
    )
}
function Icon(props){
   
    return(
    props.percentage<40 ? (Platform.OS==='ios' 
    ? <Ionicons name="ios-sad" size={100} color={props.color} />
    : <Ionicons name="md-sad" size={100} color={props.color} />): props.percentage<70 
    ? <FontAwesome name="meh-o" size={100} color={props.color} /> 
    : (Platform.OS==='ios' ? <Ionicons name="ios-happy" size={100} color={props.color} />
        : <Ionicons name="md-happy" size={100} color={props.color} />
    )
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
            textQorA: numberQ>this.props.questions.length ? '' : this.props.questions[numberQ-1].question,
            textBtn: 'Answer'
        })
        
    }
    handleNotification=()=>{
        clearLocalNotification().then(setLocalNotification)
    }
    render(){
        const {questions} = this.props
        const total=questions.length
        let percentage=((this.state.correct/total)*100).toFixed(0)
        let color=percentage<40 ? "#F04C65": percentage<70 ? "#6ECDC0" : "#6ECD7A"
        
        if(this.props.questions.length===0){
            return (
                <View style={[styles.ViewContent, {justifyContent: 'center'}]}>
                    {Platform.OS==='ios' ?
                    <MaterialCommunityIcons name="emoticon-sad-outline" size={50} color="#6ECDC0" />
                    :<Ionicons name="md-sad" size={50} color="#6ECDC0" />}
                    <Text style={styles.Texts}>Sorry, you cannot take a quiz because there are no cards in the deck!</Text>
                    <Text style={styles.Texts}> Go back and add it </Text>
                </View>
            )
        }
        if(this.state.numberQ>questions.length){//Finished the quiz
            this.handleNotification()
            return(
                <View style={[styles.ViewContent, {justifyContent: 'center'}]}>
                    <View style={[styles.ViewContentTexts, {justifyContent:'center'}]}>
                        <Text style={styles.Texts}>Congratulations! You have finished the quiz. 
                        Its percentage of correct answers has been of a:</Text>
                        <Text style={[styles.Texts, {fontSize:100, color:color}]}> 
                        {percentage}<FontAwesome name="percent" size={100} color={color}/></Text>
                        <Icon color={color} percentage={percentage}></Icon>
                        
                    </View>
                </View>
            )
        }
        return (        
            <View style={[styles.ViewContent, {justifyContent: 'space-between'}]}>
                <View style={styles.ViewContentTexts}>
                    <Text style={styles.Texts}>{this.state.numberQ}/{total}</Text>
                    <Text style={styles.Texts}>{this.state.textQorA}</Text>
                    <CustomBtn onPress={this.handlePressBtn} textBtn={this.state.textBtn}/>
                </View>
                <View style={styles.ViewButtons}>
                    <CustomBtn onPress={()=>this.handleCorrectIncorrect(true)} value={true} textBtn='Correct'/>
                    <CustomBtn onPress={()=>this.handleCorrectIncorrect(false)} value={false} textBtn='Incorrect'/>
                </View>
            </View>
       
        );
    }
  }

  
const styles=StyleSheet.create({
    ViewContent:{
        flex:1, 
        paddingTop:30, 
        alignItems:'center'
    },
    Texts:{
        paddingBottom: 30,
        padding:'auto',
        fontSize:30,
        alignItems:'center',
        textAlign: 'center'
    },
    ViewContentTexts:{
        justifyContent:'center',
        alignItems:'center'
    },
    ViewButtons:{
       justifyContent:'flex-end'
    },
    Buttons:{ 
        marginBottom: 30,
        borderWidth:2,
        width:250,
        alignItems: 'center',
        borderRadius:10
    },
    ButtonTexts:{
        color:'white',
        fontSize:25,
    }
})


function mapStateToProps(deck, params){
    const {title}=params.route.params
    return{
        title,
        questions: deck[title].questions
    }
}

export default connect(mapStateToProps)(Quiz)