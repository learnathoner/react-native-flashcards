import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

import DeckLI from './DeckLI';

class HomeScreen extends React.Component {
  state = {
    decks: [],
    selectedDeck: '',
    cards: []
  };

  componentDidMount() {
    this.updateDecks();
  }

  updateDecks = () => {
    fetch('http://127.0.0.1:3000')
      .then(res => res.json())
      .then(decks => {
        this.setState({ decks });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { decks } = this.state;
    const { decksContainer } = styles;

    return (
      <View style={{ flex: 1 }}>
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

export default HomeScreen;

const styles = StyleSheet.create({
  decksContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
