import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
// import { purple } from '../utils/colors'

export default function TextButton ({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity style={styles.quizButton} onPress={onPress}>
      <Text style={[styles.reset, style]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  quizButton: {
    backgroundColor: 'red',
    width: 200,
    padding: 10,
    margin: 5,
    borderRadius: 10
  },
  reset: {
    textAlign: 'center',
    color: 'white',
  }
})