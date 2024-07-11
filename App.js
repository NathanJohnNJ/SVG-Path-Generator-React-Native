import { StyleSheet, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import React, { useState } from 'react';
import Main from './components/main';
import * as Font from 'expo-font';
import { inject } from '@vercel/analytics';
import Header from './components/header';
import Footer from './components/footer';
import Opening from './components/openingModal';

 
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

  const blank = {
    type: '',
    absType: '',
    id: '',
    absX: '50',
    absY: '50',
    startPoint: {x: '50', y: '50'},
    controlPoints: [{key: '', value:''}],
    endPoint: {x: '50', y: '50'},
    absControlPoints: [{key: '', value:''}],
    absEndPoint: {x: '50', y: '50'},
    command: '',
    absCommand: '',
    fullCommand: 'M50,50',
    fullAbsCommand: 'M50,50'
  }
  const [path, setPath] = useState([blank]);
  const [pathID, setPathID] = useState(0);


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
      'Geologica-Black': require('./assets/fonts/Geologica-Black.ttf'),
    });
  }
  loadFonts();
    return (
      <ScrollView>
        <Header />
        <SafeAreaView style={styles.container}>
          <Opening setPath={setPath} path={path} setPathID={setPathID} pathID={pathID} />
          <Main path={path} setPath={setPath} stroke={stroke} setStroke={setStroke} strokeWidth={strokeWidth} setStrokeWidth={setStrokeWidth} strokeOpacity={strokeOpacity} setStrokeOpacity={setStrokeOpacity} fill={fill} setFill={setFill} fillOpacity={fillOpacity} setFillOpacity={setFillOpacity} controlCol={controlCol} setControlCol={setControlCol} ctrlOpacity={ctrlOpacity} setCtrlOpacity={setCtrlOpacity} controlSize={controlSize} setControlSize={setControlSize} endCol={endCol} setEndCol={setEndCol} endOpacity={endOpacity} setEndOpacity={setEndOpacity} endSize={endSize} setEndSize={setEndSize} highlight={highlight} setHighlight={setHighlight} setPathID={setPathID} pathID={pathID} />
          
        </SafeAreaView>
        <Footer />
      </ScrollView>
      
    );
}

const styles = StyleSheet.create({
  container: {
    margin:-20,
    scale: 0.8,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
