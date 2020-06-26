import React, {Component} from 'react'
import {connect} from 'react-redux'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import {FontAwesome, MaterialIcons, Ionicons} from '@expo/vector-icons'
import {saveDeckTitle, getDeck} from '../utils/helpers.js'
import {addDeck} from '../actions/decks.js'

function CreateBtn({onPress, disabled}){
    return(
    <TouchableOpacity onPress={onPress} disabled={disabled} style={[styles.Buttons, {opacity: disabled? 0.3 : 1}]}>
        <Text style={styles.ButtonTexts}>{Platform.OS==='ios' 
        ? <MaterialIcons name="library-add" size={24} color="white" />
        : <Ionicons name="md-albums" size={24} color="white" />}Create Deck</Text>
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
            
                saveDeckTitle(title)
                
                this.props.navigation.navigate('Deck', {title:title})
            }else 
                alert('This title of deck already exists')

            this.setState({value:''})
        })
        
    }
    render(){
      return (        
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <KeyboardAvoidingView  behavior= {Platform.OS==='ios' ? 'padding' : null} style={styles.ViewContent}>
            <Text style={styles.Texts}>What is the title of your new deck {Platform.OS==='ios' 
            ? <FontAwesome name="question" size={40} color="black" />
            : <Ionicons name="md-help" size={24} color="black" />} </Text>
            <View style={{alignItems:'center'}}>
                <TextInput style={styles.InputTexts}placeholder='Deck Title' onChangeText={text=>this.handleChange(text)} value={this.state.value} />
            </View>
            <View style={styles.ViewButtons}>
                <CreateBtn onPress={this.createDeck} disabled={this.state.value===''}/>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
       
      );
    }
  }


const styles=StyleSheet.create({
    ViewContent:{
        flex:1, 
        paddingTop:30, 
        justifyContent: 'space-between'
    },
    Texts:{
        paddingBottom: 30,
        fontSize:30,
        alignItems:'center',
        textAlign: 'center'
    },
    InputTexts:{
        borderWidth:2,
        borderRadius:3,
        fontSize:20,
        width:300,
        textAlign:'center'
    },  
    ViewButtons:{
       justifyContent:'flex-end',
       alignItems:'center',
       paddingBottom:20,
    },
    Buttons:{ 
        marginTop:5,
        marginBottom: 10,
        borderWidth:2,
        borderColor:'#44A7D6',
        backgroundColor:'#44A7D6',
        width:250,
        alignItems: 'center',
        borderRadius:10
    },
    ButtonTexts:{
        color:'white',
        fontSize:20,
    }
})


  export default connect()(NewDeck)