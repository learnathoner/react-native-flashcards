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

class IosFlashcard extends Component {
  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    });
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg']
    });
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    });
  }

  // Flips card to front each time it receives props
  componentWillReceiveProps() {
    if (this.value >= 90) this.flipCard();
  }

  // Flips card to front / back based on this.value
  flipCard() {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }
  }

  render() {
    // Animation functions
    const frontAnimatedStyle = {
      transform: [{ rotateY: this.frontInterpolate }]
    };
    const backAnimatedStyle = {
      transform: [{ rotateY: this.backInterpolate }]
    };
    // ---------

    const { question, answer } = this.props;

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => this.flipCard()}>
          <Animated.View style={[styles.flashCard, frontAnimatedStyle]}>
            <Text style={styles.text}>Question:</Text>
            <Text style={styles.cardText}>{question}</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.flipCard()}>
          <Animated.View
            style={[styles.flashCard, backAnimatedStyle, styles.flashCardBack]}
          >
            <Text style={styles.text}>Answer:</Text>
            <Text style={styles.cardText}>{answer}</Text>
          </Animated.View>
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

export default IosFlashcard;
