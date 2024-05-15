import { useState, useEffect } from 'react';
import Q from './commands/q';
import C from './commands/c';
import Grid from './grid';
import styled from 'styled-components/native';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Main = (props) => {
    const [startPoints, setStartPoints] = useState([]);
    const [pathID, setPathID] = useState(1);
    const [relative, setRelative] = useState(true);
    const [strWidth, setStrWidth] = useState(3);
    const [stroke, setStroke] = useState('#444');
    const [fill, setFill] = useState('none');
    const firstCMD = {
        type: 'C',
        id:pathID,
        sx: {key: 'Start x', value: 50},
        sy: {key: 'Start y', value: 50},
        dx1: {key: 'dx1', value: 50, absoluteValue: 100},
        dy1: {key: 'dy1', value: 50, absoluteValue: 100},
        dx2: {key: 'dx2', value: 75, absoluteValue: 125},
        dy2: {key: 'dy2', value: -50, absoluteValue: 0},
        x:  {key: 'x',value: 125, absoluteValue: 175},
        y: {key: 'y', value: 0, absoluteValue: 50},
        relCommand: 'c50,50 75,-50 125,0',
        absCommand: 'C100,100 125,0 175,50',
    }
    const [path, setPath] = useState([firstCMD]);
    const [hover, setHover] = useState(false);
    function toggle(){
        console.log(relative)
        if (relative){
            setRelative(false)
            console.log(relative, " - should say false")
        } else {
            setRelative(true) 
            console.log(relative, " - should say true")
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
                <button onClick={() => setRelative(relative => !relative)} disabled={!relative} style={!relative?styles.selected:styles.switch}>Absolute</button>
                <button onClick={() => setRelative(relative => !relative)} disabled={relative} style={relative?styles.selected:styles.switch}>Relative</button>
            </TypeSwitcher>
            <button id="commandBtn" onClick={() => commandToggle()} onMouseOver={buttonHover} onMouseLeave={buttonLeave} style={hover?styles.hover:styles.button}>Commands</button>
            <View style={styles.commands} id="commandBtns">
                <Q strWidth={strWidth} setStrWidth={setStrWidth} relative={relative} toggle={commandToggle} path={path} setPath={setPath} pathID={pathID} setPathID={setPathID} startPoints={startPoints} setStartPoints={setStartPoints} stroke={stroke} setStroke={setStroke} fill={fill} setFill={setFill} />
                <C strWidth={strWidth} setStrWidth={setStrWidth} relative={relative} toggle={commandToggle} path={path} setPath={setPath} pathID={pathID} setPathID={setPathID} startPoints={startPoints} setStartPoints={setStartPoints} stroke={stroke} setStroke={setStroke} fill={fill} setFill={setFill} />
                <button id="close" onClick={() => commandToggle()} onMouseOver={buttonHover} onMouseLeave={buttonLeave} style={hover?styles.hoverClose:styles.close}>X</button>
            </View>
            <View>
                <Grid strWidth={strWidth} setStrWidth={setStrWidth} size="400" path={path} relative={relative} startPoints={startPoints} setStartPoints={setStartPoints} pathID={pathID} setPathID={setPathID} stroke={stroke} setStroke={setStroke} fill={fill} setFill={setFill}  />
            </View>
        </View>
    )
};

export default Main;

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
      close: {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:'fit-content',
        height:25,   
        color:'#4e4e4e',
        backgroundColor: '#200000',
        textAlign: 'center',
        textShadow: '-1px 1px 1px #4e4e4e',
        fontFamily: 'Poppins-Medium',
        fontSize: 18,
        textJustify: 'center',
        border: 'none',
        borderRadius: '5px',
        margin: 5
      },
      hoverClose: {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:'fit-content',
        height:25,   
        color:'#200000',
        backgroundColor: '#4e4e4e',
        textAlign: 'center',
        textShadow: '-1px 1px 1px #200000',
        fontFamily: 'Poppins-Medium',
        fontSize: 18,
        textJustify: 'center',
        cursor: 'pointer',
        boxShadow: '-1px -1px 1px 1px #200000, -1px 1px 1px 1px #200000, 1px 1px 1px 1px #200000, 1px -1px 1px 1px #200000',
        border: 'none',
        borderRadius: '5px',
        margin: 5
      },
      switch:{
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
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
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
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
      commands:{
        alignIems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        display:'none',
        margin: 5
      }
})



const TypeSwitcher = styled.View`
    display:flex;
    flex-direction: row;
    width:'fit-content';
    height: 20px;
    margin: 20px
`
