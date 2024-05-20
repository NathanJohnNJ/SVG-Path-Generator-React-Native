import { StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import Main from './components/main';
import Toolbar from './components/toolbar';
import * as Font from 'expo-font';

export default function App() {
  async function loadFonts() {
    await Font.loadAsync({
      'Geologica-Thin': require('./assets/fonts/Geologica-Thin.ttf'),
      'Geologica-ExtraLight': require('./assets/fonts/Geologica-ExtraLight.ttf'),
      'Geologica-Light': require('./assets/fonts/Geologica-Light.ttf'),
      'Geologica-Regular': require('./assets/fonts/Geologica-Regular.ttf'),
      'Geologica-Medium': require('./assets/fonts/Geologica-Medium.ttf'),
      'Geologica-SemiBold': require('./assets/fonts/Geologica-SemiBold.ttf'),
      'Geologica-Bold': require('./assets/fonts/Geologica-Bold.ttf'),
      'Geologica-ExtraBold': require('./assets/fonts/Geologica-ExtraBold.ttf'),
      'Geologica-Black': require('./assets/fonts/Geologica-Black.ttf'),
      'Poppins-ExtraLight': require('./assets/fonts/Poppins-ExtraLight.ttf'),
      'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
      'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
      'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
      'NJTD-Regular': require('./assets/fonts/NJTD-Regular.ttf'),
      'NJTD-Bold': require('./assets/fonts/NJTD-Bold.ttf'),
    });
  }
  loadFonts();
  
  return (
    <SafeAreaView style={styles.container}>
      {/* <Toolbar /> */}
      <Main />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
    margin:50,
    flex: 1,
    display: 'flex',
    // backgroundColor: '#7b7b7b',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
