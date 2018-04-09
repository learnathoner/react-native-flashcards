import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import DeckLI from './DeckLI';

import { receiveDecks } from '../actions';

class HomeScreen extends React.Component {
  state = {
    selectedDeck: '',
    cards: []
  };

  componentDidMount() {
    this.updateDecks();
  }

  updateDecks = () => {
    fetch('https://udaci-flashcards.herokuapp.com')
      .then(res => res.json())
      .then(decks => {
        const allDecks = new Set();

        // Reduces decks structure from DB to match store structure
        const flattenedDecks = decks.reduce((flatDecks, deck) => {
          const deckCard = deck.card_id;

          allDecks.add(deck.id);

          flatDecks[deck.id]
            ? flatDecks[deck.id].cardIds.push(deck.card_id)
            : (flatDecks[deck.id] = {
                id: deck.id,
                deckname: deck.deckname,
                score: deck.score,
                cardIds: deckCard !== null ? [deckCard] : []
              });

          return flatDecks;
        }, {});

        const deckStore = {
          byId: flattenedDecks,
          allDecks
        };

        this.props.receiveDecks(deckStore);
      })
      .catch(err => console.log(err));
  };

  render() {
    const { decks } = this.props;
    const { decksContainer } = styles;

    return (
      <View style={{ flex: 1 }}>
        {decks && (
          <List
            containerStyle={{
              marginTop: 20,
              borderTopWidth: 1,
              borderBottomWidth: 1
            }}
          >
            <FlatList
              data={[...decks]}
              renderItem={({ item }) => (
                <DeckLI
                  deck={item}
                  navigation={this.props.navigation}
                  updateDecks={this.updateDecks}
                />
              )}
              keyExtractor={(item, index) => index}
            />
            <ListItem
              title={'Add a new Deck'}
              rightIcon={
                <MaterialIcons
                  name={'create-new-folder'}
                  size={25}
                  titleStyle={{ padding: 20 }}
                />
              }
              onPress={() =>
                this.props.navigation.navigate('NewDeck', {
                  updateDecks: this.updateDecks
                })
              }
            />
          </List>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const decks = state.decks.allDecks
    ? [...state.decks.allDecks].map(id => {
        return state.decks.byId[id];
      })
    : [];

  return {
    decks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    receiveDecks: decks => dispatch(receiveDecks(decks))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  decksContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
