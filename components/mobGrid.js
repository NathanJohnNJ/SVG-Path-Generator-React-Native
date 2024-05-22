import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import Svg, { Path, Rect, Defs, Pattern, Line } from "react-native-svg";
import EditGrid from './editGrid';


const Grid = (props) => {
    const pathRef = useRef();

    function theGrid(){
        const size = Number(props.size)
        const viewBox = `0 0 ${size+20} ${size+20}`
        return(
            <Svg ref={props.gridRef} width={size+20} height={size+20} viewBox={viewBox} x="0" y="0" style={styles.grid}>
                <Defs>
                    <Pattern
                    id="LinePattern"
                    patternUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10">
                        <Line x1="0" y1="0" x2="0" y2="200" stroke='#bbb'  />
                        <Line x1="0" y1="0" x2="200" y2="0" stroke='#bbb'  />
                    </Pattern>
                </Defs>
                <Rect fill="url(#LinePattern)" stroke="#bbb" strokeWidth="2" x="0" y="0" width={size} height={size}  />
            </Svg>
        )
    }
    
    //The next 2 functions will be the interaction for each section of path when back on the main screen. The user will tap a section and it will highlight in blue and become thicker. A second tap will open the 'Edit modal'.
    function pressFunc(){
        pathRef.current.style.stroke = '#00f'
        pathRef.current.style.strokeWidth = props.strWidth*2
        pathRef.current.removeEventListener('press', pressFunc)
        pathRef.current.addEventListener('press', secondPress)
    }
    function secondPress(){
        pathRef.current.style.stroke = '#444'
        pathRef.current.style.strokeWidth = props.strWidth
        pathRef.current.removeEventListener('press', secondPress)
        pathRef.current.addEventListener('press', pressFunc)
        setEditModalIsOpen(true)
    }

    // Draw the initial path on the grid and assign press function
    function drawPath(){ 
        const size = Number(props.size)
        const viewBox = `0 0 ${size+20} ${size+20}`
        let path = ``;
        let fullPath = "M50,50"
        props.path.map((command, i) =>{
            if(props.relative){
                path = command.relCommand
            } else{
                path = command.absCommand
            }
            fullPath = fullPath + path  
        })
        return(
            <Svg width={size+20} height={size+20} viewBox={viewBox} x="0" y="0" style={styles.grid}>
                <Path ref={pathRef} id="path0" d={fullPath} x="0" y="0" stroke={props.stroke} strokeWidth={props.strWidth} fill={props.fill} onPress={pressFunc}/>
            </Svg>
        )
    }

    // Written path to be displayed below the grid
    function writePath(){
        let fullPath = "M50,50"
        let path = ""
        props.path.map((command, i) =>{
            if(props.relative){
                path = command.relCommand
            } else{
                path = command.absCommand
            }
            fullPath = fullPath + path  
        })
        return fullPath;
    }

    return(
        <View style={styles.container}>
            <Svg style={styles.svgContainer} >
                {theGrid()}
                {drawPath()}
            </Svg>
            <Text style={styles.position}>Current Path: {writePath()}</Text>
            <Modal 
            animationType="slide"
            transparent={true}
            visible={props.editModalIsOpen}
            onRequestClose={() => {props.setEditModalIsOpen(false);}}
            >
                <View>
                    <EditGrid strWidth={props.strWidth} setStrWidth={props.setStrWidth} size="200" path={props.path} relative={props.relative} startPoints={props.startPoints} setStartPoints={props.setStartPoints} pathID={props.pathID} setPathID={props.setPathID} stroke={props.stroke} setStroke={props.setStroke} fill={props.fill} setFill={props.setFill} />
                </View>
            </Modal>
        </View>
    )
};

export default Grid;

// All below checked, all are being used.
const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: 50,
      marginTop: 30,
      marginLeft: 60
    },
    svgContainer:{
        display: 'flex',
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    // grid:{
    //     marginTop: 50,
    //     marginBottom: 30,
    //     marginLeft: 30,
    //     marginRight: 10
    // },
    position:{
        fontFamily: 'Geologica-Light',
        fontSize: 15
    }
})