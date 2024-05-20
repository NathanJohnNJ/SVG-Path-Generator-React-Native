import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Modal, TextInput } from 'react-native';

const Config = (props) => {
  const [visible, setVisible] = useState(false);


    return (
        <View>
            <Pressable onPress={() => setVisible(visible => !visible)} style={[styles.button, !visible?styles.visible:styles.hidden]}><Text>Config</Text></Pressable>
            <View style={[styles.configSection, visible?styles.visible:styles.hidden]}>
              {/* // Stroke (colour), stroke width, fill */}
              <View style={styles.strokeSection}>
                <Text style={styles.title}>Stroke</Text>
                <View style={styles.input}>
                  <Text style={styles.label}>Width:  </Text>
                  <TextInput
                  onChangeText={props.setStrWidth}
                  value={String(props.strWidth)}
                  inputMode="numeric"
                  style={styles.input} />
                </View>
                <View style={styles.input}>
                  <Text style={styles.label}>Colour:  </Text>
                  <TextInput
                  onChangeText={props.setStroke}
                  value={props.stroke}
                  style={styles.input} />
                </View>
              </View>
              <View style={styles.fillSection}>
                <Text style={styles.title}>Fill</Text>
                <View style={styles.input}>
                  <Text style={styles.label}>Colour:  </Text>
                  <TextInput
                  onChangeText={props.setFill}
                  value={props.fill}
                  style={styles.input} />
                </View>
                <View style={styles.input}>
                  <Text style={styles.label}>Opacity:  </Text>
                  <TextInput
                  onChangeText={props.setFillOpacity}
                  value={String(props.fillOpacity)}
                  inputMode="numeric"
                  style={styles.input} />
                </View>
              </View>

            </View>
        </View>
    )
};

export default Config;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      display:'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    visible:{
      display: 'flex'
    },
    hidden: {
      display: 'none'
    },
    button: {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // width:'auto',  
        width:25,
        height:25,   
        color:'#4e4e4e',
        backgroundColor: '#6c6c6c',
        textAlign: 'center',
        fontFamily: 'Geologica-Medium',
        fontSize: 18,
        borderRadius: 5,
        margin: 5
      },
      mobile:{
        textShadowOffset: {x:'-1px', y:'-1px'},
        textShadowColor: '#4e4e4e',
        textShadowRadius: 1,
      },
      web:{ 
        textShadow: '-1px 1px 1px #4e4e4e',
        cursor: 'pointer',
        color:'red' 
      },
      title:{
        fontFamily: 'Geologica-Bold',
        fontSize: 20
      },
      strokeSection:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      },
      input: {
        display: 'flex',
        flexDirection: "row",
        alignItems: 'center'
      },
      label:{
        fontFamily: 'Poppins-Light',
        fontSize: 16
      },
      input:{
        borderColor: '#4e4e4e',
        borderRadius: 6,
        borderStyle: 'solid',
        borderWidth: 1,
        width: 40,
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
        fontSize: 17
      }
})
