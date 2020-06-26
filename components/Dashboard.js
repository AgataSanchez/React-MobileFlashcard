import React, {Component} from 'react'
import { StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native'
import {getDecks} from '../utils/helpers.js'
import { connect } from 'react-redux'
import {receiveDecks} from '../actions/decks.js'

class Dashboard extends Component {
    
    componentDidMount(){
        getDecks().then((decks)=> {
            this.props.dispatch(receiveDecks(decks))
        })
       
    }
    handlePress(title){
        //Navigate to 'Deck'
        this.props.navigation.navigate('Deck', {title:title})
    }
    render(){
      const decks=this.props.decks
      return (        
          <ScrollView contentContainerStyle={{flex:1, paddingTop:20}}>
            {Object.keys(decks).map((deckT)=>{
                return(
                    <TouchableOpacity value={deckT} key={deckT} onPress={()=>this.handlePress(deckT)}  style={{paddingBottom:20, alignItems:'center'}}>
                        <Text style={{fontSize:25}}>{deckT}</Text>
                        <Text style={{color: '#72BFE1', fontSize:15}}>{decks[deckT].questions!==undefined ? decks[deckT].questions.length: 0} cards</Text>
                    </TouchableOpacity>
                )
            })}
          </ScrollView>
       
      );
    }
  }
function mapStateToProps(decks){
    return{
        decks
    }
}
export default connect(mapStateToProps)(Dashboard)