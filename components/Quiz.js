import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FlashCard from './FlashCard';

class Quiz extends Component {
  componentDidMount() {
    // fetch cards for deck
    const { deckname } = this.props.navigation.state.params;

    fetch(`http://127.0.0.1:3000/decks/${deckname}`)
      .then(res => res.json())
      .then(cards => {
        console.log(cards);
        // this.setState({ decks });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.counterText}>Card 1 of some number</Text>
        </View>

        <FlashCard question={'Will this work?'} answer={'Hopefully'} />

        <View>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'green' }]}
          >
            <Text style={[styles.buttonText]}>CORRECT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]}>
            <Text style={styles.buttonText}>WRONG</Text>
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
    backgroundColor: 'white'
  },
  button: {
    margin: 5,
    padding: 20,
    width: 200,
    borderRadius: 10,
    justifyContent: 'center'
  },
  counterText: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'left'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default Quiz;
