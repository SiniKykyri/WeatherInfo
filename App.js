import { Text, View, TextInput } from 'react-native';
import React from 'react'
import Position from './components/Position'
import { StyleSheet } from 'react-native';

export default function App() {

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Current Weather</Text>
      <Position />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 32,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});


