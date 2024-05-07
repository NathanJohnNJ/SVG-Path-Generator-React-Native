import { useState, useEffect } from 'react';
import Q from './commands/q';
import Grid from './grid';
import styled from 'styled-components/native';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Draw = () => {
    const [type, setType] = useState('relative');
    // const [path, setPath] = useState("M50,50 q25,50 50,0 q25,-50 50,0");
    const [path, setPath] = useState("M50,50 q25,50 50,0 q25,-50 50,0 q24,34 91,1 q25,50 55,93");
    const [hover, setHover] = useState(false);
    
    
    function toggle(){
        const rel = document.getElementById('relative');
        const abs = document.getElementById('absolute');
        if (type==='absolute'){
            setType("relative")
        } else {
            setType("absolute")
        }
    }
    function commandToggle(){
        const buttons = document.getElementById("commandBtns")
        const button = document.getElementById("commandBtn")
        if (buttons.style.display==="none"){
            button.style.display = "none"
            buttons.style.display = "flex"
        }else{
            buttons.style.display = "none"
            button.style.display = "flex"
        }
    }
    function buttonHover(){
        setHover(true)
    }
    function buttonLeave(){
        setHover(false)
    }

    return (
        <View style={styles.container}>
            <TypeSwitcher>
                <Text onClick={()=>toggle()} style={type==='absolute'?styles.selected:styles.switch}>Absolute</Text>
                <Text onClick={()=>toggle()} style={type==='relative'?styles.selected:styles.switch}>Relative</Text>
            </TypeSwitcher>
            <button id="commandBtn" className="cmdBtn" onClick={() => commandToggle()} onMouseOver={buttonHover} onMouseLeave={buttonLeave} style={hover?styles.hover:styles.button}>
                <Text>?</Text>
            </button>
            <CommandButtons id="commandBtns">
                <Q type={type} toggle={commandToggle} path={path} setPath={setPath} />
                <View onClick={() => commandToggle()}>
                <button id="close" onMouseOver={buttonHover} onMouseLeave={buttonLeave}  style={hover?styles.hover:styles.button}><Text>X</Text></button>
                </View>
            </CommandButtons>
            <View>
                <Grid size="400" path={path} />
            </View>
        </View>
    )
};

export default Draw;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    button: {
        width:'30px',
        height:'30px',    
        color:'#4e4e4e',
        backgroundColor: '#6c6c6c',
        textAlign: 'center',
        textShadow: '-1px 1px 1px #4e4e4e',
        fontSize: '20px',
        textJustify: 'center',
        border: 'none',
        borderRadius: '5px',
      },
      hover: {
          width:'30px',
          height:'30px',    
          color:'#ffffff',
          backgroundColor: '#4e4e4e',
          textAlign: 'center',
          textShadow: '-1px 1px 1px #ffffff',
          fontSize: '20px',
          textJustify: 'center',
          cursor: 'pointer',
          boxShadow: '-1px -1px 1px 1px #ffffff, -1px 1px 1px 1px #ffffff, 1px 1px 1px 1px #ffffff, 1px -1px 1px 1px #ffffff',
          border: 'none',
          borderRadius: '5px'
      },
      switch:{
        width:'fit-content',
        height:'20px',
        color:'#6c6c6c',
        backgroundColor: '#0e0e0e',
        cursor: 'pointer'
      },
      selected:{
        width:'fit-content',
        height:'20px',
        cursor: 'pointer',
        boxShadow: '-1px -1px 1px 1px #ffffff, -1px 1px 1px 1px #ffffff, 1px 1px 1px 1px #ffffff, 1px -1px 1px 1px #ffffff',
        color: '#ffffff',
        backgroundColor: '#6c6c6c'
      },
})

const CommandButtons = styled.View`
    align-items: center;
    justify-content: space-evenly;
    display:none;
    margin: 5px;
`

const TypeSwitcher = styled.View`
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    width:105px;
    height: 20px;
`
