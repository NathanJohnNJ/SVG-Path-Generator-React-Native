import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import Main from './components/main';
import Toolbar from './components/toolbar';
import * as Font from 'expo-font';

export default function App() {
  async function loadFonts() {
    await Font.loadAsync({
      
      'Quicksand-Light': require('./assets/fonts/Quicksand-Light.ttf'),
      'Quicksand-Regular': require('./assets/fonts/Quicksand-Regular.ttf'),
      'Quicksand-Medium': require('./assets/fonts/Quicksand-Medium.ttf'),
      'Quicksand-SemiBold': require('./assets/fonts/Quicksand-SemiBold.ttf'),
      'Quicksand-Bold': require('./assets/fonts/Quicksand-Bold.ttf'),
      
    });
  }
  loadFonts();
  
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        {/* <Toolbar /> */}
        <Main />
      </SafeAreaView>
    </ScrollView>
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
