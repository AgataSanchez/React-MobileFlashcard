import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native'
import Dashboard from './components/Dashboard.js'
import NewDeck from './components/NewDeck.js'
import Deck from './components/Deck.js'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers/decks.js'
import middlweare from './middleware'
import { createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import {MaterialIcons} from '@expo/vector-icons'
import Constants  from 'expo-constants'

function DeckStatusBar({backgroundColor, ...props}){
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}
const Tabs=createBottomTabNavigator({
  Decks:{
    screen: Dashboard,
    navigationOptions:{
      tabBarIcon: ()=>
      <MaterialIcons name="dashboard" size={24} color="black" />,
      tabBarLabel:'Decks'
    } 
  },
  AddDeck: { 
    screen: NewDeck,
    navigationOptions:{
      tabBarIcon: ()=>
      <MaterialIcons name="add-box" size={24} color="black" />,
      tabBarLabel:'Add Deck'
      
    }
  }

},{
  navigationOptions: {
    header: Dashboard
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? '#72BFE1' : 'white',
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? 'white' : '#72BFE1',
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const Stack = createStackNavigator({
  Decks:{
    screen: Tabs
  },
  DeckView:{
    screen: Deck,
    navigationOptions:{
      headerTiniColor: 'white',
      headersStyle:{
        backgroundColor: '#72BFE1'
      },
    }
  },
})

const TabsNav=createAppContainer(Stack)
export default class App extends Component {
    render(){
      const store = createStore(reducer, middlweare)
      return (
        
       <Provider store={store}>
          <View style={{flex:1}}>
            <DeckStatusBar backgroundColor='#72BFE1' barStyle='light-content'/>
          <TabsNav/>
          </View>
        </Provider>    
        
      );
    }
  }

