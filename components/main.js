import { useState, useEffect } from 'react';
import Q from './commands/q';
import Grid from './grid';
import styled from 'styled-components/native';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Draw = () => {
    const [type, setType] = useState('relative');
    const [path, setPath] = useState("M100,100 q25,50 50,0 q25,-50 50,0");
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
        const button = document.getElementById("commandBtn")
        const buttons = document.getElementById("commandBtns")
        if (button.style.display==="flex"){
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
            <button id="commandBtn" onClick={() => commandToggle()} onMouseOver={buttonHover} onMouseLeave={buttonLeave} style={hover?styles.hover:styles.button}>Commands</button>
            <CommandButtons id="commandBtns">
                <Q type={type} toggle={commandToggle} path={path} setPath={setPath} />
                <button id="close" onClick={() => commandToggle()} onMouseOver={buttonHover} onMouseLeave={buttonLeave} style={hover?styles.hover:styles.button}>X</button>
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
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:'fit-content',
        height:25,   
        color:'#4e4e4e',
        backgroundColor: '#6c6c6c',
        textAlign: 'center',
        textShadow: '-1px 1px 1px #4e4e4e',
        fontFamily: 'Poppins-Medium',
        fontSize: 18,
        textJustify: 'center',
        border: 'none',
        borderRadius: '5px',
        margin: 5
      },
      hover: {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:'fit-content',
        height:25,   
        color:'#ffffff',
        backgroundColor: '#4e4e4e',
        textAlign: 'center',
        textShadow: '-1px 1px 1px #ffffff',
        fontFamily: 'Poppins-Medium',
        fontSize: 18,
        textJustify: 'center',
        cursor: 'pointer',
        boxShadow: '-1px -1px 1px 1px #ffffff, -1px 1px 1px 1px #ffffff, 1px 1px 1px 1px #ffffff, 1px -1px 1px 1px #ffffff',
        border: 'none',
        borderRadius: '5px',
        margin: 5
      },
      switch:{
        width:'fit-content',
        height:22,
        padding: 2,
        textAlign:'center',
        textJustify:'center',
        color:'#2d2d2d',
        backgroundColor: '#0e0e0e',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: 10,
        fontFamily: 'Poppins-Medium',
        fontSize: 15,
      },
      selected:{
        width:'fit-content',
        height:22,
        padding: 2,
        textAlign:'center',
        textJustify:'center',
        cursor: 'pointer',
        boxShadow: '-1px -1px 1px 1px #ffffff, -1px 1px 1px 1px #ffffff, 1px 1px 1px 1px #ffffff, 1px -1px 1px 1px #ffffff',
        color: '#ffffff',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#6c6c6c',
        marginTop: 10,
        fontFamily: 'Poppins-Medium',
        fontSize: 15,
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
    width:'fit-content';
    height: 20px;
    margin: 20px
`
