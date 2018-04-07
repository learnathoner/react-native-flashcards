import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class Deck extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.deck}`
  });

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Text>Card info</Text>
        </View>
        <View style={styles.container}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Add Cards</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Delete Deck</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'tan'
  },
  button: {
    margin: 10,
    padding: 10,
    width: 150,
    backgroundColor: 'purple',
    borderRadius: 10,
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default Deck;
