import React from 'react'
import {createBottomTabNavigator} from 'react-navigation-tabs'

export default function Tabs(){
    return createBottomTabNavigator({
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
}