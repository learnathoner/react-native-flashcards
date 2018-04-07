import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';
import t from 'tcomb-form-native';

/**** FORM CREATION AND STYLING *****/

const Form = t.form.Form;

const CardInfo = t.struct({
  cardFront: t.String,
  cardBack: t.String
});

const formStyles = {
  ...Form.stylesheet,
  controlLabel: {
    normal: {
      color: 'blue',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    }
  }
};

const options = {
  fields: {
    cardFront: {
      label: 'Question:',
      error: 'Question cannot be blank'
    },
    cardBack: {
      label: 'Answer:',
      error: 'Answer cannot be blank'
    }
  },
  styleSheet: formStyles
};

/***** Deck Creation Component holding form  *****/

class AddCard extends Component {
  state = {
    value: ''
  };

  handleSubmit = () => {
    const value = this._form.getValue();
    const { cardFront: card_front, cardBack: card_back } = value;
    const { id: deck_id, deckname } = this.props.navigation.state.params.deck;

    this.setState({ value: '' });
    console.log(card_front, card_back, deck_id);

    fetch(`http://127.0.0.1:3000/decks/${deckname}`, {
      method: 'POST',
      body: JSON.stringify({ card_front, card_back, deck_id }),
      headers: {
        'content-type': 'application/json'
      }
    }).then(() => {
      // TODO: Update specific deck
      updateDecks();
    });
  };

  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back());
  };

  render() {
    return (
      <View style={styles.container}>
        <Form
          value={this.state.value}
          type={CardInfo}
          ref={c => (this._form = c)}
          options={options}
        />
        <Button title="Add Card" onPress={this.handleSubmit} />
        <Button title="Back to Deck" onPress={this.goBack} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 40,
    padding: 20,
    backgroundColor: '#ffffff'
  }
});

export default AddCard;
