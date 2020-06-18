import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Dashboard from './components/Dashboard.js'

export default class App extends React.Component {
    render(){
      //const store = createStore(reducer)
      return (
       // <Provider store={store}>
          <View style={{flex:1}}>
          <Dashboard />
          </View>
       // </Provider>    
      );
    }
  }

