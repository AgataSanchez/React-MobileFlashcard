import React, {Component, useRef} from 'react'
import { Animated, Text, ScrollView, TouchableOpacity, View } from 'react-native'
import {getDecks} from '../utils/helpers.js'
import { connect } from 'react-redux'
import {receiveDecks} from '../actions/decks.js'


function CustomOptions({onPress, deckT, bounceValue, length}){
    
    return(
    <TouchableOpacity value={deckT} onPress={onPress} style={{paddingBottom:20, alignItems:'center'}}>
        <Animated.Text style={ {fontSize: 25, transform:[{scale:bounceValue}]}}>{deckT}</Animated.Text>
        <Animated.Text style={{color: '#72BFE1', fontSize:15, transform:[{scale:bounceValue}]}}>
        {length} cards</Animated.Text>
    </TouchableOpacity>
    )
}
class Dashboard extends Component {
    
    
    componentDidMount(){
        getDecks().then((decks)=> {
            this.props.dispatch(receiveDecks(decks))
        })
       
    }
    handlePress(title, bounceValue){
        Animated.sequence([
            Animated.timing(bounceValue, {toValue:1.04, duration:200}),
            Animated.spring(bounceValue, {toValue:1, friction:4})]).start(({finished})=>{
            //Navigate to 'Deck'
            this.props.navigation.navigate('Deck', {title:title})
        })
        
    }
    render(){
      const decks=this.props.decks
     
      return (        
          <ScrollView contentContainerStyle={{flex:1, paddingTop:20}}>
              {Object.keys(decks).length===0 && (
              <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                  <Text style={{fontSize:25}}>There are no decks. Add one!</Text>
              </View>)
              }
            {Object.keys(decks).map((deckT)=>{
                 const bounceValue= new Animated.Value(1)
                return(
                    <CustomOptions 
                    key={deckT}
                    deckT={deckT}
                    onPress={()=>this.handlePress(deckT, bounceValue)} 
                    bounceValue={bounceValue}
                    length={decks[deckT].questions!==undefined ? decks[deckT].questions.length: 0}
                    />
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