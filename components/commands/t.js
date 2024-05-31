import { useState } from 'react';
import GridWithDrag from './gridWithDrag';
import { StyleSheet, Text, View, Modal } from 'react-native';
import React from 'react';
import Tables from './tables';
import Presets from '../presetPaths/t';

const T = (props) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [hover, setHover] = useState({sub: false, can: false, t: false, x: false, y:false});
    

    const startX = props.path[props.pathID].absX;
    const startY = props.path[props.pathID].absY;
    

    function openModal(){ 
        props.setEndPoint({x:50, y:0})
        setModalIsOpen(true)
    }
    function closeModal(){
        setModalIsOpen(false)
        props.setEndPoint({})
    }
    function hoverFunc(i){
        if (i==='x'||i==='y'){
            const newHover = { ...hover, x:true, y:true}
            setHover(newHover)
        }else{
        const newHover = { ...hover, [i]: true}
        setHover(newHover)
        }
    }
    function resetHover(){
        setHover({sub: false, can: false, t: false, dx1: false, dy1: false, x: false, y:false})
    }

    const defaultPath = {
        type: 't',
        absType: 'T',
        id: props.pathID+1,
        absX: 100,
        absY: 50,
        startPoint: {x: 50, y: 50},
        endPoint: {x:50, y: 0},
        absEndPoint: {x: 100, y: 50},
        command: 't50,0',
        absCommand: 'T100,50',
        fullCommand: 'M50,50t50,0',
        fullAbsCommand: 'M50,50T100,50'
    }

    function addToPath(){
        const startX = props.path[props.pathID].absX;
        const startY = props.path[props.pathID].absY;
        const tPath = {
            type: 't',
            absType:'T',
            id: props.pathID+1,
            absX: props.endPoint.x+startX,
            absY: props.endPoint.y+startY,
            startPoint: {x: startX, y: startY},
            endPoint: {x: props.endPoint.x,y: props.endPoint.y},
            absEndPoint: {x: props.endPoint.x+startX,y: props.endPoint.y+startY},
            command: `t${props.endPoint.x},${props.endPoint.y}`,
            absCommand: `T${startX+props.endPoint.x},${startY+props.endPoint.y}`,
            fullCommand: `M${startX},${startY}t${props.endPoint.x},${props.endPoint.y}`,
            fullAbsCommand: `M${startX},${startY}T${startX+props.endPoint.x},${startY+props.endPoint.y}`
        } 
        const newPath = [...props.path, sPath]
        props.setPath(newPath)
        props.setPathID(props.pathID+1)
        setModalIsOpen(false)
    }
   

    return (
        <View style={styles(props).outerContainer}>
            <Text onClick={openModal} onMouseOver={() => hoverFunc('t')} onMouseLeave={resetHover} style={hover.t?styles(props).hover:styles(props).button}>T</Text>
            <Modal
            animationType="slide"
            transparent={false}
            visible={modalIsOpen}
            onRequestClose={closeModal}
            >
                <View style={styles(props).row}>
                   <Presets stroke={props.stroke} fill={props.fill} fillOpacity={props.fillOpacity} />
                   <View style={styles(props).middleSection}>
                   <View style={styles.titleContainer}>
                    <Text style={styles(props).title}>New T Command</Text>
                    </View>
                    <View style={styles(props).container}>
                        <GridWithDrag size="250" path={defaultPath} endPoint={props.endPoint} setEndPoint={props.setEndPoint} strokeWidth={props.strokeWidth} stroke={props.stroke} fill={props.fill} fillOpacity={props.fillOpacity} strokeOpacity={props.strokeOpacity} controlCol={props.controlCol} ctrlOpacity={props.ctrlOpacity} controlSize={props.controlSize} endCol={props.endCol} endOpacity={props.endOpacity} endSize={props.endSize} highlight={props.highlight} startX={startX} startY={startY} resetHover={resetHover} hoverFunc={hoverFunc} />
                    </View>
                    </View>
                    <View style={styles(props).container}>
                        <Tables path={defaultPath} endPoint={props.endPoint} setEndPoint={props.setEndPoint} controlCol={props.controlCol} ctrlOpacity={props.ctrlOpacity} controlSize={props.controlSize} endCol={props.endCol} endOpacity={props.endOpacity} endSize={props.endSize} highlight={props.highlight} resetHover={resetHover} hoverFunc={hoverFunc} startX={startX} startY={startY} hover={hover} />
                    </View>
                
                </View>
                
                <View style={styles(props).subCan}>
                    <Text onClick={addToPath} onMouseOver={() => hoverFunc('sub')} onMouseLeave={resetHover} style={hover.tub?styles(props).submitHover:styles(props).submitButton}>Add to path!</Text>
                    <Text onClick={closeModal} onMouseOver={() => hoverFunc('can')} onMouseLeave={resetHover} style={hover.can?styles(props).cancelHover:styles(props).cancelButton}>Cancel</Text>
                </View>

            </Modal>
        </View>
    )
};

export default T;

const styles = (props) => StyleSheet.create({
    outerContainer:{
    display: 'flex',
    alignItems: 'center',
    flexDirection:'column',
    justifyContent: 'center',
    },
    container: {
      display: 'flex',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    row: {
        display:'flex',
        flexDirection: "row",
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    middleSection: {
        margin: 10
    },
    titleContainer:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        width: 'fit-content',
        marginTop: 10
      },
    title:{
        fontFamily: 'Geologica-Bold',
        fontSize:30,
        marginTop: 10,
        textShadow: '-2px 2px 4px gray, 2px 2px 2px gray',
        textAlign: 'center'
      },
    subCan: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        alignSelf: 'center',
        marginTop: -150,
        marginLeft: -75,
        width: 350
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
        textShadow: '-1px 1px 1px #4e4e4e',
        fontFamily: 'Quicksand-Regular',
        fontSize: 18,
        borderColor: '#4e4e4e',
        borderWidth: 2,
        borderRadius: 6,
        paddingBottom: 5,
        margin: 5,
        textAlign: 'center',
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
        textShadow: '-1px 1px 1px #ffffff',
        fontSize: 18,
        cursor: 'pointer',
        textAlign: 'center',
        paddingBottom: 5,
        margin: 5,   
        color:'#ffffff',
        fontFamily: 'Quicksand-Medium',
      },
        submitButton: {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:'fit-content',
        height:25,
        padding:3,
        color:'#4e4e4e',
        backgroundColor: '#6c6c6c',
        textShadow: '-1px 1px 1px #4e4e4e',
        fontFamily: 'Quicksand-Regular',
        fontSize: 18,
        borderColor: '#4e4e4e',
        borderWidth: 2,
        borderRadius: 6,
        margin: 5,
        textAlign: 'center'
      },
      submitHover: {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:'fit-content',
        height:25,
        padding:3, 
        color:'#ffffff',
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 6,
        backgroundColor: '#4e4e4e',
        textShadow: '-1px 1px 1px #ffffff',
        fontFamily: 'Quicksand-Medium',
        fontSize: 18,
        cursor: 'pointer',
        margin:5,
        textAlign: 'center'
      },
    cancelButton: {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:'fit-content',
        height:25,
        padding:3,  
        color:'#681402',
        backgroundColor: '#6c6c6c',
        textShadow: '-1px 1px 1px #681402',
        fontFamily: 'Quicksand-Regular',
        fontSize: 18,
        borderColor: '#681402',
        borderWidth: 2,
        borderRadius: 6,
        margin:5,
        textAlign: 'center'
      },
      cancelHover: {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:'fit-content',
        height:25,
        padding:3, 
        color:'#fff',
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 6,
        backgroundColor: '#681402',
        textShadow: '-1px 1px 1px #fff',
        fontFamily: 'Quicksand-Medium',
        fontSize: 18,
        cursor: 'pointer',
        margin:5,
        textAlign: 'center'
      },
      defaultSection:{
        width: 150,
        backgroundColor: '#ddd',
        borderColor: '#fdb',
        borderWidth: 3,
        borderRadius: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 22,
        boxShadow: '-2px 2px 8px #9c9c9c',
        margin: 8,
        height: 450,
      }
})