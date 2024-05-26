import { StyleSheet, SafeAreaView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import React, { useState } from 'react';
import WebMain from './components/web/main';
// import MobMain from './components/mob/main';
// import Toolbar from './components/toolbar';
import * as Font from 'expo-font';

export default function App() {
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [stroke, setStroke] = useState('#444');
  const [fill, setFill] = useState('#000');
  const [strokeOpacity, setStrokeOpacity] = useState(1.0);
  const [fillOpacity, setFillOpacity] = useState(0);

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
  if (Platform.OS==='web'){
    return (
      <ScrollView>
        <SafeAreaView style={styles.container}>
          {/* <Toolbar /> */}
          <WebMain stroke={stroke} setStroke={setStroke} strokeWidth={strokeWidth} setStrokeWidth={setStrokeWidth} strokeOpacity={strokeOpacity} setStrokeOpacity={setStrokeOpacity} fill={fill} setFill={setFill} fillOpacity={fillOpacity} setFillOpacity={setFillOpacity} />
        </SafeAreaView>
      </ScrollView>
    );
  }
  // }else{
  //   return (
  //     <ScrollView>
  //       <SafeAreaView style={styles.container}>
  //         <MobMain stroke={stroke} setStroke={setStroke} strokeWidth={strokeWidth} setStrokeWidth={setStrokeWidth} strokeOpacity={strokeOpacity} setStrokeOpacity={setStrokeOpacity} fill={fill} setFill={setFill} fillOpacity={fillOpacity} setFillOpacity={setFillOpacity} />
  //       </SafeAreaView>
  //     </ScrollView>
  //   );
  // }
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 150,
    margin:50,
    flex: 1,
    display: 'flex',
    // backgroundColor: '#7b7b7b',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
