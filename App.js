import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Main from './components/main';
import * as Font from 'expo-font';

export default function App() {
  async function loadFonts() {
    await Font.loadAsync({
      'Geologica': require('./assets/fonts/Geologica.ttf'),
      'Poppins-ExtraLight': require('./assets/fonts/Poppins-ExtraLight.ttf'),
      'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
      'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
      'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    });
  }
  loadFonts();
  return (
    <View style={styles.container}>
      <Main />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7b7b7b',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
