import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { clearLocalNotification, setLocalNotification } from '../utils/helpers';
import { receiveCards, updateScore } from '../actions';
import IosFlashcard from './IosFlashcard';
import AndroidFlashcard from './AndroidFlashcard';

class Quiz extends Component {
  state = {
    currentCard: 1,
    correct: 0,
    wrong: 0
  };

  componentWillMount() {
    // fetch cards for deck
    const { deck } = this.props.navigation.state.params;

    fetch(`https://udaci-flashcards.herokuapp.com/decks/${deck.deckname}`)
      .then(res => res.json())
      .then(cards => {
        this.props.receiveCards(cards);
      })
      .catch(err => console.log(err));
  }

  markAnswer(result) {
    const { currentCard } = this.state;
    const { cards } = this.props;

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

  // Run when quiz finished, updates score in db and also resets daily notifications
  updateScore() {
    const { deckname, id } = this.props.navigation.state.params.deck;
    const score = this.calculatePercent();

    clearLocalNotification().then(setLocalNotification);

    fetch(`https://udaci-flashcards.herokuapp.com/decks/${deckname}`, {
      method: 'PUT',
      body: JSON.stringify({ id, score }),
      headers: {
        'content-type': 'application/json'
      }
    }).then(() => {
      this.props.updateScore({ deckId: id, score });
    });
  }

  resetDeck() {
    this.setState({
      currentCard: 1,
      correct: 0,
      wrong: 0
    });

    this.props.cards = _.shuffle(this.props.cards);
  }

  render() {
    const { currentCard, correct, wrong } = this.state;
    const { deck } = this.props.navigation.state.params;
    const { cards } = this.props;
    console.log(this.state);

    return (
      <View style={styles.container}>
        {cards &&
          (currentCard <= cards.length ? (
            <View style={styles.container}>
              <View style={styles.cardCount}>
                <Text style={styles.counterText}>
                  Card {currentCard} / {cards.length}
                </Text>
              </View>

              {Platform.OS === 'ios' ? (
                <IosFlashcard
                  question={cards[currentCard - 1].card_front}
                  answer={cards[currentCard - 1].card_back}
                  currentCard={currentCard}
                />
              ) : (
                <AndroidFlashcard
                  question={cards[currentCard - 1].card_front}
                  answer={cards[currentCard - 1].card_back}
                  currentCard={currentCard}
                />
              )}

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
              <View style={[styles.container, { flex: 2 }]}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}
                >
                  Finished!
                </Text>
                <Text>
                  You completed {deck.deckname} with a score of{' '}
                  {this.calculatePercent()}%
                </Text>
              </View>
              <View style={styles.container}>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: 'blue' }]}
                  onPress={() => this.resetDeck()}
                >
                  <Text style={[styles.buttonText]}>RETRY</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: 'blue' }]}
                  onPress={() => this.props.navigation.goBack()}
                >
                  <Text style={styles.buttonText}>BACK</Text>
                </TouchableOpacity>
              </View>
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
  },
  cardCount: {
    marginTop: 10,
    marginLeft: 30,
    alignItems: 'flex-start',
    alignSelf: 'stretch'
  }
});

const mapStateToProps = (state, ownProps) => {
  const { deck } = ownProps.navigation.state.params;

  let cards = [];

  state.decks.byId[deck.id].cardIds.forEach(cardId => {
    const card = state.cards.byId[cardId];
    if (card) {
      cards.push(card);
    }
  });

  cards = _.shuffle(cards);

  return { cards };
};

const mapDispatchToProps = dispatch => {
  return {
    receiveCards: cards => dispatch(receiveCards(cards)),
    updateScore: deckId => dispatch(updateScore(deckId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
