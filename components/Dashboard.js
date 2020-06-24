import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import {IonIcons} from '@expo/vector-icons'
import {getDecks} from '../utils/helpers.js'
import { connect } from 'react-redux'
import {removeDeck} from '../actions/decks.js'
class Dashboard extends Component {
    state={
        decks:{}
    }
    componentDidMount(){
        
         getDecks().then((result)=>{
            if(result!==null){
                this.setState({
                    decks:result
                })
            }
         })
       
    }
    handlePress(title){
        console.log('Dashboard')
        //Navigate to 'Deck'
        this.props.navigation.navigate('Deck', {title:title} )
    }
    render(){
      const {decks}=this.state
      return (        
          <View style={{flex:1, paddingTop:30, justifyContent: 'space-between', alignItems:'center'}}>
            {Object.keys(decks).map((deckT)=>{
                return(
                    <TouchableOpacity value={deckT} key={deckT} onPress={()=>this.handlePress(deckT)}  style={{paddingBottom:10, alignItems:'center'}}>
                        <Text>{deckT}</Text>
                        <Text>{decks[deckT].questions.length} cards</Text>
                    </TouchableOpacity>
                )
            })}
          </View>
       
      );
    }
  }

export default connect()(Dashboard)