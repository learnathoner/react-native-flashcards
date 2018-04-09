import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';
import t from 'tcomb-form-native';

import { connect } from 'react-redux';
import { addDeck } from '../actions';

/**** FORM CREATION AND STYLING *****/

const Form = t.form.Form;

const DeckInfo = t.struct({
  name: t.String
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
    name: {
      label: 'Enter a Deck Name:',
      error: 'Name cannot be blank'
    }
  },
  styleSheet: formStyles
};

/***** Deck Creation Component holding form  *****/

class NewDeck extends Component {
  state = {
    value: ''
  };

  handleSubmit = () => {
    const value = this._form.getValue();
    const { name: deckname } = value;
    const { updateDecks } = this.props.navigation.state.params;

    this.setState({ value: '' });

    fetch('http://127.0.0.1:3000/decks', {
      method: 'POST',
      body: JSON.stringify({ deckname }),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(newDeck => {
        newDeck.cardIds = [];
        console.log('newDeck', newDeck);
        this.props.addDeck(newDeck);
        this.props.navigation.dispatch(NavigationActions.back());
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Form
          value={this.state.value}
          type={DeckInfo}
          ref={c => (this._form = c)}
          options={options}
        />
        <Button title="Create Deck" onPress={this.handleSubmit} />
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

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    addDeck: deck => dispatch(addDeck(deck))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck);
