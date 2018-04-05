import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CardDisplay from './components/CardDisplay'

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <CardDisplay />
      </View>
    );
  }
}
