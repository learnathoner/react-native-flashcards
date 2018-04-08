import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FlashCard from './FlashCard';

class Quiz extends Component {
  state = {
    cards: [],
    currentCard: 1,
    correct: 0,
    wrong: 0
  };

  componentDidMount() {
    // fetch cards for deck
    const { deck } = this.props.navigation.state.params;

    fetch(`http://127.0.0.1:3000/decks/${deck.deckname}`)
      .then(res => res.json())
      .then(cards => {
        this.setState({ cards });
      })
      .catch(err => console.log(err));
  }

  markAnswer(result) {
    const { currentCard, cards } = this.state;

    // Updatescore needs to be in callback, because setState asynchronous
    this.setState(
      {
        [result]: this.state[result] + 1,
        currentCard: this.state.currentCard + 1
      },
      () => {
        if (currentCard >= cards.length) this.updateScore();
      }
    );
  }

  calculatePercent() {
    const { correct } = this.state;
    const total = this.state.cards.length;
    return Math.ceil(correct / total * 100);
  }

  updateScore() {
    const { deckname, id } = this.props.navigation.state.params.deck;
    const score = this.calculatePercent();
    console.log('running updateScore');

    fetch(`http://127.0.0.1:3000/decks/${deckname}`, {
      method: 'PUT',
      body: JSON.stringify({ id, score }),
      headers: {
        'content-type': 'application/json'
      }
    }).then(() => {
      // TODO: Update specific deck
      console.log('updated');
      // updateDecks();
    });
  }

  render() {
    const { currentCard, cards, correct, wrong } = this.state;
    const { deckname } = this.props.navigation.state.params;
    // console.log(cards);

    return (
      <View style={styles.container}>
        {cards.length > 0 &&
          (currentCard <= cards.length ? (
            <View style={styles.container}>
              <View>
                <Text style={styles.counterText}>
                  Card {currentCard} / {cards.length}
                </Text>
              </View>

              <FlashCard
                question={cards[currentCard - 1].card_front}
                answer={cards[currentCard - 1].card_back}
                currentCard={currentCard}
              />

              <View>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: 'green' }]}
                  onPress={() => this.markAnswer('correct')}
                >
                  <Text style={[styles.buttonText]}>CORRECT</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: 'red' }]}
                  onPress={() => this.markAnswer('wrong')}
                >
                  <Text style={styles.buttonText}>WRONG</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View>
              <Text>Finished!</Text>
              <Text>
                You completed {deckname} with a score of{' '}
                {this.calculatePercent()}%
              </Text>
            </View>
          ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    alignSelf: 'stretch'
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
