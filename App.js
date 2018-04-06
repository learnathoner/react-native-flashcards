import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import CardDisplay from './components/CardDisplay'
import Deck from './components/Deck'

export default class App extends React.Component {

  state = {
    decks: [],
    selectedDeck: '',
    cards: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/')
      .then(res => res.json())
      .then(decks => this.setState({ decks }))
      .catch(err => console.log(err))
  }

  render() {
    const { decks } = this.state;
    const { decksContainer } = styles

    return (
      <View style={{flex: 1}}>
        <CardDisplay />
        {decks.length > 0 && (
          <View style={decksContainer}>
            <FlatList
              data={[ ...decks ]}
              renderItem={({ item }) => {
                return <Deck deck={item} />}
              }
            />
          </View>
        )}
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
})