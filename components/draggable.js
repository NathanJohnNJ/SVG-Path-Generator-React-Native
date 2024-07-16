// import React, {useRef} from 'react';
// import {Animated, PanResponder, StyleSheet, View} from 'react-native-web';
// import { Circle, ForeignObject } from 'react-native-svg';
// import { useState } from 'react';

// const Draggable = (props) => {
//   const pan = useRef(new Animated.ValueXY()).current;

//   const panResponder = PanResponder.create({
//     onStartShouldSetPanResponder: () => true,
//     onPanResponderMove: Animated.event([
//       null,
//       {
//         dx: pan.x,
//         dy: pan.y,
//       },
//     ]),
//     onPanResponderRelease: () => true,
//   });

//   return (
//     <ForeignObject>
//     <Animated.View style={styles.container}>
//       <Animated.View
//         {...panResponder.panHandlers}
//         style={[pan.getLayout(), styles.box]}
//       />
//     </Animated.View>
//     </ForeignObject>
//   );
// };

// export default Draggable;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   box: {
//     backgroundColor: '#61dafb',
//     width: 80,
//     height: 80,
//     borderRadius: 4,
//   },
// });