import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import Expo from 'expo';

class Deck extends Component {
  render() {
    const { deck } = this.props;
    const { navigate } = this.props.navigation;

    return (
      <ListItem
        rightIcon={<FontAwesome name={'arrow-circle-right'} size={50} />}
        title={deck.deckname}
        titleStyle={styles.title}
        subtitle={
          <View>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Cards: </Text>{' '}
              {deck.cardcount},
            </Text>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>Quiz Average:</Text>{' '}
              {deck.score}
            </Text>
          </View>
        }
        onPress={() => navigate('Card')}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    margin: 10,
    padding: 10
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    marginLeft: 0,
    color: 'blue'
  }
});

export default Deck;
