import { StyleSheet, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import React, { useState } from 'react';
import Main from './components/main';
import * as Font from 'expo-font';
import { inject } from '@vercel/analytics';
import Header from './components/header';
import Footer from './components/footer';
 
inject();

export default function App() {
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [stroke, setStroke] = useState('#444');
  const [fill, setFill] = useState('#000');
  const [strokeOpacity, setStrokeOpacity] = useState(1.0);
  const [fillOpacity, setFillOpacity] = useState(0);
  const [controlCol, setControlCol] = useState('#00f');
  const [ctrlOpacity, setCtrlOpacity] = useState(0.9);
  const [controlSize, setControlSize] = useState(5);
  const [endCol, setEndCol] = useState('#f00');
  const [endOpacity, setEndOpacity] = useState(0.9);
  const [endSize, setEndSize] = useState(5);
  const [highlight, setHighlight] = useState('#00eeff');


  async function loadFonts() {
    await Font.loadAsync({
      'Quicksand-Light': require('./assets/fonts/Quicksand-Light.ttf'),
      'Quicksand-Regular': require('./assets/fonts/Quicksand-Regular.ttf'),
      'Quicksand-Medium': require('./assets/fonts/Quicksand-Medium.ttf'),
      'Quicksand-SemiBold': require('./assets/fonts/Quicksand-SemiBold.ttf'),
      'Quicksand-Bold': require('./assets/fonts/Quicksand-Bold.ttf'),
      'Geologica-Light': require('./assets/fonts/Geologica-Light.ttf'),
      'Geologica-Regular': require('./assets/fonts/Geologica-Regular.ttf'),
      'Geologica-Medium': require('./assets/fonts/Geologica-Medium.ttf'),
      'Geologica-SemiBold': require('./assets/fonts/Geologica-SemiBold.ttf'),
      'Geologica-Bold': require('./assets/fonts/Geologica-Bold.ttf'),
    });
  }
  loadFonts();
    return (
      <ScrollView>
        <Header />
        <SafeAreaView style={styles.container}>
          
          <Main stroke={stroke} setStroke={setStroke} strokeWidth={strokeWidth} setStrokeWidth={setStrokeWidth} strokeOpacity={strokeOpacity} setStrokeOpacity={setStrokeOpacity} fill={fill} setFill={setFill} fillOpacity={fillOpacity} setFillOpacity={setFillOpacity} controlCol={controlCol} setControlCol={setControlCol} ctrlOpacity={ctrlOpacity} setCtrlOpacity={setCtrlOpacity} controlSize={controlSize} setControlSize={setControlSize} endCol={endCol} setEndCol={setEndCol} endOpacity={endOpacity} setEndOpacity={setEndOpacity} endSize={endSize} setEndSize={setEndSize} highlight={highlight} setHighlight={setHighlight} />
          
        </SafeAreaView>
        <Footer />
      </ScrollView>
      
    );
}

const styles = StyleSheet.create({
  container: {
    margin:-20,
    scale: 0.85,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
