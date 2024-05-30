import { Text, Pressable, Linking, StyleSheet } from 'react-native';
import React, {useCallback, useState} from 'react';

const OpenURLButton = (url) => {
  const [hover, setHover] = useState(false);
    const handlePress = useCallback( async ()=> {
        await Linking.openURL(url)
    }, [url])
    return( 
    <Pressable onPress={handlePress} style={hover?styles.hover:styles.button} onMouseOver={() => setHover(hover => !hover)} onMouseOut={() => setHover(hover => !hover)}>
        <Text style={hover?styles.hoverText:styles.buttonText}>?</Text>
    </Pressable>
    );
  };
const Help = (props) =>{
    const Url = "https://developer.mozilla.org/en-US/docs/Web/SVG"
    return(
        <OpenURLButton url={props.url?props.url:Url}/>
    )
}

export default Help;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:25,
        height:25,   
        backgroundColor: '#6c6c6c',
        borderColor: '#4e4e4e',
        borderWidth: 2,
        borderRadius: 6,
        marginLeft: 10,
        margin: 5,
        marginRight: -15
      },
      buttonText:{
        textAlign: 'center',
        color:'#4e4e4e',
        textShadow: '-1px 1px 1px #4e4e4e',
        fontFamily: 'Quicksand-Medium',
        fontSize: 18,
      },
    hover: {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:25,
        height:25,
        backgroundColor: '#4e4e4e',
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 6,
        cursor: 'pointer',
        margin: 5,
        marginLeft: 10,
        marginRight: -15,
      },
      hoverText:{
        color:'#ffffff',
        textAlign: 'center',
        fontFamily: 'Quicksand-Medium',
        textShadow: '-1px 1px 1px #ffffff',
        fontSize: 18,
      }
  });