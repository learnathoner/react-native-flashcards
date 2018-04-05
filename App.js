import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FlashCard from './components/FlashCard'

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <FlashCard />
        <View style={{flex: 1}}></View>
      </View>
    );
  }
}
