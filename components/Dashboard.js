import React, {Component} from 'react'
import { Animated, Text, ScrollView, TouchableOpacity } from 'react-native'
import {getDecks} from '../utils/helpers.js'
import { connect } from 'react-redux'
import {receiveDecks} from '../actions/decks.js'

class Dashboard extends Component {
    
    state={
        bounceValue: new Animated.Value(1),
    }
    componentDidMount(){
        getDecks().then((decks)=> {
            this.props.dispatch(receiveDecks(decks))
        })
       
    }
    handlePress(title){
        Animated.sequence([
            Animated.timing(this.state.bounceValue, {toValue:1.04, duration:200}),
            Animated.spring(this.state.bounceValue, {toValue:1, friction:4})]).start(({finished})=>{
            //Navigate to 'Deck'
            this.props.navigation.navigate('Deck', {title:title})
        })
        
    }
    render(){
      const decks=this.props.decks
      return (        
          <ScrollView contentContainerStyle={{flex:1, paddingTop:20}}>
            {Object.keys(decks).map((deckT)=>{
                return(
                    <TouchableOpacity value={deckT} key={deckT} onPress={()=>this.handlePress(deckT)}
                      style={{paddingBottom:20, alignItems:'center'}}>
                        <Animated.Text style={ {fontSize: 25, transform:[{scale:this.state.bounceValue}]}}>{deckT}</Animated.Text>
                        <Animated.Text style={{color: '#72BFE1', fontSize:15, transform:[{scale:this.state.bounceValue}]}}>
                            {decks[deckT].questions!==undefined ? decks[deckT].questions.length: 0} cards</Animated.Text>
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