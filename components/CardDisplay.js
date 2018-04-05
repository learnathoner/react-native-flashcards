import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import FlashCard from './FlashCard'
import TextButton from './TextButton'

class CardDisplay extends Component {
  render () {
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <Text>Menu</Text>
        </View>

        <FlashCard style={{flex: 4}}/>

        <View style={styles.quizButtons}>
          <TextButton onPress={() => {}}> Correct </TextButton>
          <TextButton onPress={() => {}}> Incorrect </TextButton>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  quizButtons: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  }
})

export default CardDisplay