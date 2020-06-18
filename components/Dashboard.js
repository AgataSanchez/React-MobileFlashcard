import React, {Component} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {IonIcons} from '@expo/vector-icons'
import {getDecks} from '../utils/helpers.js'

export default class Dashboard extends Component {
    state={
        decks:{}
    }
    componentDidMount(){
        const decksObj= getDecks();
        this.setState({
            decks:decksObj
        })
    }
    render(){
      const {decks}=this.state
      return (        
          <View style={{flex:1, paddingTop:30, justifyContent: 'center'}}>
            {Object.keys(decks).map((key)=>{
                return(
                    <View key={key}>
                        <Text>{decks[key].title}</Text>
                        <Text>{decks[key].questions.length}</Text>
                    </View>
                )
            })}
          </View>
       
      );
    }
  }

