import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Modal, TextInput, Image } from 'react-native';
import Svg, { Path } from "react-native-svg";

const Config = (props) => {
  const [visible, setVisible] = useState(false);

    return (
        <View style={styles.container}>
            <Pressable onPress={() => setVisible(visible => !visible)} style={[styles.button, !visible?styles.visible:styles.hidden]}>
            <Image
            style={styles.icon}
            source={require('../images/config.svg')} />
            </Pressable>

            <View style={[styles.configSection, visible?styles.visible:styles.hidden]}>
              
              <View style={styles.strokeSection}>
                
                <Text style={styles.title}>Stroke</Text>
                <View style={styles.strokeInputSection}>
                  <View style={styles.input}>
                    <Text style={styles.label}>Width:  </Text>
                    <TextInput
                    onChangeText={props.setStrokeWidth}
                    value={String(props.strokeWidth)}
                    inputMode="numeric"
                    style={styles.textInput} />
                  </View>
                
                  <View style={styles.input}>
                    <Text style={styles.label}>Colour:  </Text>
                    <TextInput
                    value={props.stroke} 
                    onChangeText={props.setStroke}
                    style={styles.textInput} />
                    <View style={{backgroundColor: props.stroke, height: 25, width:25, borderRadius: 8, marginLeft: 5}} />
                  </View> 
                  
                  <View style={styles.input}>
                  <Text style={styles.label}>Opacity:  </Text>
                    <TextInput
                    onChangeText={props.setStrokeOpacity}
                    value={props.strokeOpacity}
                    style={styles.textInput} />
                  </View>
                
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
              
              <Pressable id="close" onPress={() => setVisible(visible => !visible)} style={[visible?styles.visible:styles.hidden]}><Text style={styles.closeBtn}>X</Text></Pressable>
            </View>
        </View>
    )
};

export default Config;

const styles = StyleSheet.create({
    container: {
      left: 10
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
      icon:{
        width: 25,
        height: 25
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
      strokeInputSection:{
        display: 'flex',
        flexDirection: 'column'
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
      textInput:{
        borderColor: '#4e4e4e',
        borderRadius: 6,
        borderStyle: 'solid',
        borderWidth: 1,
        width: 'auto',
        maxWidth: 80,
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
        fontSize: 17
      },
      closeBtn: {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:'auto',
        height:25,   
        color:'#4e4e4e',
        backgroundColor: '#200000',
        textAlign: 'center',
        textShadow: '-1px 1px 1px #4e4e4e',
        textShadowOffset: {x:'-1px', y:'-1px'},
        textShadowColor: '#4e4e4e',
        textShadowRadius: 1,
        fontFamily: 'Poppins-Medium',
        fontSize: 18,
        borderRadius: 5,
        margin: 5
      },
      hoverClose: {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:'auto',
        height:25,   
        color:'#200000',
        backgroundColor: '#4e4e4e',
        textAlign: 'center',
        textShadow: '-1px -1px 1px #200000',
        fontFamily: 'Poppins-Medium',
        fontSize: 18,
        borderRadius: 5,
        margin: 5
      },
})
