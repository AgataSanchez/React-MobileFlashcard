import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Dashboard from './components/Dashboard.js'
import NewDeck from './components/NewDeck.js'
import AddCard from './components/AddCard.js';
import Deck from './components/Deck.js';
import Quiz from './components/Quiz.js';

export default class App extends React.Component {
    render(){
      //const store = createStore(reducer)
      return (
       // <Provider store={store}>
          <View style={{flex:1}}>
          <AddCard />
          </View>
       // </Provider>    
      );
    }
  }

