import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CardDisplay from './components/CardDisplay'

export default class App extends React.Component {

  render() {
    
    fetch('http://localhost:3000/')
      .then(res => res.text())
      .then(resJson => console.log(resJson))
      .catch(err => console.log(err))

    return (
      <View style={{flex: 1}}>
        <CardDisplay />
      </View>
    );
  }
}
