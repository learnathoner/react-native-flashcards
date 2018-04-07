import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Deck extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.deck}`
  });

  render() {
    return (
      <View style={styles.container}>
        <Text />
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
  }
});

export default Deck;
