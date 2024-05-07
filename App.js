import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Main from './components/main';


export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.poppinsRegular}>
        This text uses a Poppins font
      </Text>
      <Text style={styles.geologicaLight}>
        This text uses a Geologica light font
      </Text>
      <Text style={styles.geologicaBlack}>
        This text uses a heavy Geologica black font.
      </Text>
      <Main />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d2d2d',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  poppinsRegular: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
  },
  geologicaLight: {
    fontFamily: 'Geologica_Cursive-Light',
    fontSize: 20,
  },
  geologicaThin: {
    fontFamily: 'Geologica_Cursive-Thin',
    fontSize: 20,
  },
  geologicaBlack: {
    fontFamily: 'Geologica_Cursive-Black',
    fontSize: 20,
  }
});
