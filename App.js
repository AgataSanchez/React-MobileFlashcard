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
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs'
import { createStackNavigator} from '@react-navigation/stack'

import {MaterialIcons, Ionicons} from '@expo/vector-icons'
import Constants  from 'expo-constants'


const Tab=createBottomTabNavigator()

const Stack = createStackNavigator()


function DeckStatusBar({backgroundColor, ...props}){
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} width={20}/>
    </View>
  )
}

function Home(){
  return(
    <Tab.Navigator 
      tabBarOptions={{ 
        activeTintColor: '#72BFE1',
        inactiveTintColor: 'black',
      }} 
        >
      <Tab.Screen name='Decks' component={Dashboard} options={{
        tabBarIcon:({color})=><MaterialIcons name="dashboard" size={24} color={color} /> }}/>
      <Tab.Screen name='Add Deck' component={NewDeck} options={{
        tabBarIcon:({color})=><Ionicons name="ios-add" size={24} color={color} /> }}/>
    </Tab.Navigator>
  )
}



export default class App extends Component {
    render(){
      const store = createStore(reducer, middlweare)
      return (
        
       <Provider store={store}>
          <View style={{flex:1}}>
            <DeckStatusBar backgroundColor='#72BFE1' barStyle='light-content'/>
            <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name='Home' component={Home}/>
              <Stack.Screen name='Deck' component={Deck}/>
              <Stack.Screen name='Add Card' component={AddCard}/>
              <Stack.Screen name='Quiz' component={Quiz}/>       
              </Stack.Navigator>
            </NavigationContainer>
          </View>
        </Provider>    
        
      );
    }
  }

