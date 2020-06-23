import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Dashboard from './components/Dashboard.js'
import NewDeck from './components/NewDeck.js'
import AddCard from './components/AddCard.js'
import Deck from './components/Deck.js'
import Quiz from './components/Quiz.js'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers/decks.js'
import middlweare from './middleware'

export default class App extends React.Component {
    render(){
      const store = createStore(reducer, middlweare)
      return (
       <Provider store={store}>
          <View style={{flex:1}}>
          <AddCard />
          </View>
        </Provider>    
      );
    }
  }

