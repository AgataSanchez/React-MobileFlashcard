import React, {Component} from 'react'
import {connect} from 'react-redux'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons'
import {addCardToDeck} from '../utils/helpers.js'
import {addCardDeck} from '../actions/decks.js'

function SubmitBtn({onPress, disabled}){
    return(
    <TouchableOpacity onPress={onPress} disabled={disabled} style={[styles.Buttons, {opacity: disabled? 0.3 : 1}]}>
        <Text style={styles.ButtonTexts}><FontAwesome name="save" size={24} color="white" /> Submit</Text>
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
        await addCardToDeck(card, title)
        this.props.navigation.goBack()            
        
    }

    render(){
        const {title}=this.props.route.params
      return (        
          <KeyboardAvoidingView  behavior='padding' style={styles.ViewContent}>
              <View style={styles.ViewContentTexts}>
                  <MaterialCommunityIcons name="cards" size={40} color="black" /> 
                  <Text style={styles.Texts}> Add a new card to the {title} deck</Text>
              </View>
              <View style={styles.ViewContentTexts}>
                  <MaterialIcons style={{marginRight:10, marginTop: 5}}name="question-answer" size={50} color="black" />
                  <View style={styles.ViewTexts}>
                    <TextInput style={styles.InputTexts} placeholder='Question' onChangeText={text=>this.handleChange(text, 'q')} value={this.state.question} />
                    <TextInput style={styles.InputTexts} placeholder='Answer' onChangeText={text=>this.handleChange(text, 'a')} value={this.state.answer} />
                  </View>
              </View>
              <SubmitBtn onPress={this.submitCard} disabled={this.state.question==='' || this.state.answer===''}/>
          </KeyboardAvoidingView>
       
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
    Texts:{
        paddingBottom: 30,
        fontSize:30,
        alignItems:'center',
        textAlign: 'center'
    },
    ViewContentTexts:{
        flexDirection:'row',
    },
    InputTexts:{
        borderWidth:2,
        borderRadius:3,
        fontSize:20,
        width:300,
        textAlign:'center',
        marginBottom:10
    },
    ViewButtons:{
       justifyContent:'flex-end'
    },
    Buttons:{ 
        marginBottom: 30,
        borderWidth:2,
        borderColor:'#227CA7',
        backgroundColor:'#227CA7',
        width:250,
        alignItems: 'center',
        borderRadius:10
    },
    ButtonTexts:{
        color:'white',
        fontSize:20,
    }
})



export default connect()(AddCard)