import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated
} from 'react-native';

class AndroidFlashcard extends Component {
  state = {
    front: true
  };

  componentWillReceiveProps() {
    this.setState({
      front: true
    });
  }

  flipCard() {
    this.setState({
      front: !this.state.front
    });
  }

  render() {
    const { question, answer } = this.props;
    const { front } = this.state;

    const heading = front ? 'Question:' : 'Answer:';
    const content = front ? question : answer;

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => this.flipCard()}>
          <View style={[styles.flashCard]}>
            <Text style={styles.text}>{heading}</Text>
            <Text style={styles.cardText}>{content}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  flashCard: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    alignSelf: 'stretch',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#d6d7da',
    padding: 5,
    margin: 40,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: 'black',
    shadowOpacity: 1.0,
    backgroundColor: '#e9ea7c'
  },
  flashCardBack: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  cardText: {
    fontSize: 20
  }
});

export default AndroidFlashcard;
