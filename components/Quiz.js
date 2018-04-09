import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FlashCard from './FlashCard';

import { connect } from 'react-redux';
import { receiveCards, updateScore } from '../actions';

class Quiz extends Component {
  state = {
    cards: [],
    currentCard: 1,
    correct: 0,
    wrong: 0
  };

  componentWillMount() {
    // fetch cards for deck
    const { deck } = this.props.navigation.state.params;

    fetch(`http://127.0.0.1:3000/decks/${deck.deckname}`)
      .then(res => res.json())
      .then(cards => {
        this.props.receiveCards(cards);
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
    const total = this.props.cards.length;
    return Math.ceil(correct / total * 100);
  }

  updateScore() {
    const { deckname, id } = this.props.navigation.state.params.deck;
    const score = this.calculatePercent();

    fetch(`http://127.0.0.1:3000/decks/${deckname}`, {
      method: 'PUT',
      body: JSON.stringify({ id, score }),
      headers: {
        'content-type': 'application/json'
      }
    }).then(() => {
      this.props.updateScore({ deckId: id, score });
    });
  }

  render() {
    const { currentCard, correct, wrong } = this.state;
    const { deckname } = this.props.navigation.state.params;
    const { cards } = this.props;

    return (
      <View style={styles.container}>
        {cards &&
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

const mapStateToProps = (state, ownProps) => {
  const { deck } = ownProps.navigation.state.params;

  const cards = [];

  state.decks.byId[deck.id].cardIds.forEach(cardId => {
    const card = state.cards.byId[cardId];
    if (card) {
      cards.push(card);
    }
  });

  return { cards };
};

const mapDispatchToProps = dispatch => {
  return {
    receiveCards: cards => dispatch(receiveCards(cards)),
    updateScore: deckId => dispatch(updateScore(deckId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
