import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native'
import Dashboard from './components/Dashboard.js'
import NewDeck from './components/NewDeck.js'
import Deck from './components/Deck.js'
import AddCard from './components/AddCard.js'
import Quiz from './components/Quiz.js'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers/decks.js'
import middlweare from './middleware'
import { NavigationContainer} from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator} from '@react-navigation/stack'

import {MaterialIcons} from '@expo/vector-icons'
import Constants  from 'expo-constants'

function DeckStatusBar({backgroundColor, ...props}){
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} width={20}/>
    </View>
  )
}
const Tab=createBottomTabNavigator()

const Stack = createStackNavigator()

export default class App extends Component {
    render(){
      const store = createStore(reducer, middlweare)
      return (
        
       <Provider store={store}>
          <View style={{flex:1}}>
            <DeckStatusBar backgroundColor='#72BFE1' barStyle='light-content'/>
            <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name='Dashboard' component={Dashboard}/>
              <Stack.Screen name='Deck' component={Deck}/>
              <Stack.Screen name='AddCard' component={AddCard}/>
              <Stack.Screen name='Quiz' component={Quiz}/>
            </Stack.Navigator>
            <Tab.Navigator>
              <Tab.Screen name='Decks' component={Dashboard}/>
              <Tab.Screen name='Add Deck' component={NewDeck}/>
            </Tab.Navigator>
            </NavigationContainer>
          </View>
        </Provider>    
        
      );
    }
  }

