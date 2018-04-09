import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  KeyboardAvoidingView
} from 'react-native';
import t from 'tcomb-form-native';

import { connect } from 'react-redux';
import { addCard } from '../actions';

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
    const { cardFront, cardBack } = value;
    const { id: deckId, deckname } = this.props.navigation.state.params.deck;
    const { updateDecks } = this.props.navigation.state.params;

    this.setState({ value: '' });

    fetch(`https://udaci-flashcards.herokuapp.com/decks/${deckname}`, {
      method: 'POST',
      body: JSON.stringify({ cardFront, cardBack, deckId }),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(card => {
        this.props.addCard(card);
      });
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Form
          value={this.state.value}
          type={CardInfo}
          ref={c => (this._form = c)}
          options={options}
        />
        <Button title="Add Card" onPress={this.handleSubmit} />
        <Button title="Back to Deck" onPress={this.goBack} />
      </KeyboardAvoidingView>
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

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    addCard: card => dispatch(addCard(card))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);
