import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class Deck extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.deck.deckname}`
  });

  render() {
    const { deck, updateDecks } = this.props.navigation.state.params;
    console.log(deck);

    return (
      <View style={styles.container}>
        <View style={styles.quizContainer}>
          <Text style={styles.deckTitle}>{deck.deckname}</Text>
          <Text>This deck currently has {deck.cardcount} cards</Text>
          <TouchableOpacity
            style={[styles.button, { marginTop: 40 }]}
            onPress={() =>
              this.props.navigation.navigate('Quiz', {
                deckname: deck.deckname
              })
            }
          >
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.quizOptionsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              this.props.navigation.navigate('AddCard', { deck, updateDecks })
            }
          >
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
    borderWidth: 1,
    borderColor: 'black'
  },
  deckTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    margin: 5
  },
  quizContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'tan',
    margin: 30,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20
  },
  quizOptionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black'
  },
  button: {
    margin: 5,
    padding: 20,
    width: 200,
    backgroundColor: 'purple',
    borderRadius: 10,
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default Deck;
