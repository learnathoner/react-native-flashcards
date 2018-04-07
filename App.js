import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import CardDisplay from './components/CardDisplay';
import Deck from './components/Deck';

export default class App extends React.Component {
  state = {
    decks: [],
    selectedDeck: '',
    cards: []
  };

  componentDidMount() {
    fetch('https://udaci-flashcards.herokuapp.com/')
      .then(res => res.json())
      .then(decks => {
        console.log(decks);
        this.setState({ decks });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { decks } = this.state;
    const { decksContainer } = styles;

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }} />

        {decks.length > 0 && (
          <List
            containerStyle={{
              marginTop: 20,
              borderTopWidth: 1,
              borderBottomWidth: 1
            }}
          >
            <FlatList
              data={[...decks]}
              renderItem={({ item }) => <Deck deck={item} />}
              keyExtractor={(item, index) => index}
            />
          </List>
        )}

        <View style={{ flex: 1 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  decksContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
