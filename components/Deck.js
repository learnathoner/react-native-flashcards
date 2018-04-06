import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Deck extends Component {
  render() {
    const { deck } = this.props

    return (
      <View style={styles.container}>
        <Text>Deck: {deck.deckname}</Text>
        <Text>Cards: {deck.cardCount}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50'
  },
});

export default Deck;