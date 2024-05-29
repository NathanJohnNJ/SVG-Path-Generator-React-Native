import { useState } from 'react';
import GridWithDrag from './gridWithDrag';
import { StyleSheet, Text, View, Modal } from 'react-native';
import React from 'react';
import Tables from './tables';
import { Svg, Path, Rect, G } from 'react-native-svg';

const Q = (props) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [hover, setHover] = useState({sub: false, can: false, q: false, dx1: false, dy1: false, x: false, y:false});
    

    const startX = props.path[props.pathID].absX;
    const startY = props.path[props.pathID].absY;
    

    function openModal(){
        props.setFirstCtrl({x:25, y:50})  
        props.setEndPoint({x:50, y:0})
        setModalIsOpen(true)
    }
    function closeModal(){
        setModalIsOpen(false)
        props.setFirstCtrl({})  
        props.setEndPoint({})
    }
    function hoverFunc(i){
        const newHover = { ...hover, [i]: true}
        setHover(newHover)
    }
    function resetHover(){
        setHover({sub: false, can: false, q: false, dx1: false, dy1: false, x: false, y:false})
    }

    const defaultPath = {
        type: 'q',
        absType: 'Q',
        id: props.pathID+1,
        absX: 100,
        absY: 50,
        startPoint: {x: 50, y: 50},
        controlPoints: [{key: 'dx1', value:25}, {key: 'dy1', value:50}],
        absControlPoints: [{key: 'dx1', value:75}, {key: 'dy1', value:100}],
        endPoint: {x:50, y: 0},
        absEndPoint: {x: 100, y: 50},
        command: 'q25,50 50,0',
        absCommand: 'Q75,100 100,50',
        fullCommand: 'M50,50q25,50 50,0',
        fullAbsCommand: 'M50,50Q75,100 100,50'
    }
    // const secondDefault = {
    //     type: 'q',
    //     absType: 'Q',
    //     id: props.pathID+1,
    //     absX: 100,
    //     absY: 50,
    //     startPoint: {x: 50, y: 50},
    //     controlPoints: [{key: 'dx1', value:25}, {key: 'dy1', value:-50}],
    //     absControlPoints: [{key: 'dx1', value:75}, {key: 'dy1', value:0}],
    //     endPoint: {x:50, y: 0},
    //     absEndPoint: {x: 100, y: 50},
    //     command: 'q25,-50 50,0',
    //     absCommand: 'Q75,0 100,50',
    //     fullCommand: 'M50,50q25,-50 50,0',
    //     fullAbsCommand: 'M50,50Q75,0 100,50'
    // }
    // const thirdDefault = {
    //     type: 'q',
    //     absType: 'Q',
    //     id: props.pathID+1,
    //     absX: 50,
    //     absY: 100,
    //     startPoint: {x: 50, y: 50},
    //     controlPoints: [{key: 'dx1', value:50}, {key: 'dy1', value:-25}],
    //     absControlPoints: [{key: 'dx1', value:100}, {key: 'dy1', value:25}],
    //     endPoint: {x:0, y: 50},
    //     absEndPoint: {x: 50, y: 100},
    //     command: 'q50,-25 0,50',
    //     absCommand: '100,25 50,100',
    //     fullCommand: 'M50,50q50,-25 0,50',
    //     fullAbsCommand: 'M50,50Q100,25 50,100'
    // }
    // const fourthDefault = {
    //     type: 'q',
    //     absType: 'Q',
    //     id: props.pathID+1,
    //     absX: 75,
    //     absY: 150,
    //     startPoint: {x: 50, y: 50},
    //     controlPoints: [{key: 'dx1', value:-50}, {key: 'dy1', value:-50}],
    //     absControlPoints: [{key: 'dx1', value:75}, {key: 'dy1', value:100}],
    //     endPoint: {x:25, y: 100},
    //     absEndPoint: {x: 75, y: 150},
    //     command: 'q-50,-50 25,100',
    //     absCommand: 'Q0,0 75,150',
    //     fullCommand: 'M50,50q-50,-50 25,100',
    //     fullAbsCommand: 'M50,50Q0,0 75,150'
    // }
    // // setDefaultPath(firstDefault)
    // const [defaultPath, setDefaultPath] = useState(firstDefault)


    
    function addToPath(){
        const startX = props.path[props.pathID].absX;
        const startY = props.path[props.pathID].absY;
        const qPath = {
            type: 'q',
            absType:'Q',
            id: props.pathID+1,
            absX: props.endPoint.x+startX,
            absY: props.endPoint.y+startY,
            startPoint: {x: startX, y: startY},
            controlPoints: [{key: 'dx1', value:`${props.firstCtrl.x}`}, {key: 'dy1', value:`${props.firstCtrl.y}`}],
            absControlPoints: [{key: 'dx1', value:`${props.firstCtrl.x}+${startX}`}, {key: 'dy1', value:`${props.firstCtrl.y}+${startY}`}],
            endPoint: {x: props.endPoint.x,y: props.endPoint.y},
            absEndPoint: {x: props.endPoint.x+startX,y: props.endPoint.y+startY},
            command: `q${props.firstCtrl.x},${props.firstCtrl.y} ${props.endPoint.x},${props.endPoint.y}`,
            absCommand: `Q${startX+props.firstCtrl.x},${startY+props.firstCtrl.y} ${startX+props.endPoint.x},${startY+props.endPoint.y}`,
            fullCommand: `M${startX},${startY}q${props.firstCtrl.x},${props.firstCtrl.y} ${props.endPoint.x},${props.endPoint.y}`,
            fullAbsCommand: `M${startX},${startY}Q${startX+props.firstCtrl.x},${startY+props.firstCtrl.y} ${startX+props.endPoint.x},${startY+props.endPoint.y}`
        } 
        const newPath = [...props.path, qPath]
        props.setPath(newPath)
        props.setPathID(props.pathID+1)
        setModalIsOpen(false)
    }
   

    return (
        <View style={styles(props).outerContainer}>
            <Text onClick={openModal} onMouseOver={() => hoverFunc('q')} onMouseLeave={resetHover} style={hover.q?styles(props).hover:styles(props).button}>Q</Text>
            <Modal
            animationType="slide"
            transparent={false}
            visible={modalIsOpen}
            onRequestClose={closeModal}
            >
                <Text style={styles(props).title}>New Q Command</Text>
                
                <View style={styles(props).row}>
                   {/* <View style={styles(props).defaultSection}>
                    <Svg height="100" width="100" viewBox='0 0 100 100'>
                    <G>
                    <Rect height="100" width="100" fill="none" stroke="#bbb" strokeWidth="3">
                        <Path d={defaultPath.fullCommand} height="100" width="100" viewBox='0 0 300 300' fill="none" stroke="#f00" /> 
                    </Rect>
                    </G>
                    </Svg>
                    <Svg height="100" width="100" viewBox='0 0 100 100'>
                    <G>
                    <Rect height="100" width="100" fill="none" stroke="#bbb" strokeWidth="3">
                        <Path d={secondDefault.fullCommand} height="100" width="100" viewBox='0 0 300 300' fill="none" stroke="#f00" /> 
                    </Rect>
                    </G>
                    </Svg>
                    <Svg height="100" width="100" viewBox='0 0 100 100'>
                    <G>
                    <Rect height="100" width="100" fill="none" stroke="#bbb" strokeWidth="3">
                        <Path d={thirdDefault.fullCommand} height="100" width="100" viewBox='0 0 300 300' fill="none" stroke="#f00" /> 
                    </Rect>
                    </G>
                    </Svg>
                    <Svg height="100" width="100" viewBox='0 0 100 100'>
                    <G>
                    <Rect height="100" width="100" fill="none" stroke="#bbb" strokeWidth="3">
                        <Path d={fourthDefault.fullCommand} height="100" width="100" viewBox='0 0 300 300' fill="none" stroke="#f00" /> 
                    </Rect>
                    </G>
                    </Svg>
                   </View> */}
                    <View style={styles(props).container}>
                        <GridWithDrag size="250" path={defaultPath} firstCtrl={props.firstCtrl} setFirstCtrl={props.setFirstCtrl} endPoint={props.endPoint} setEndPoint={props.setEndPoint} strokeWidth={props.strokeWidth} stroke={props.stroke} fill={props.fill} fillOpacity={props.fillOpacity} strokeOpacity={props.strokeOpacity} controlCol={props.controlCol} ctrlOpacity={props.ctrlOpacity} controlSize={props.controlSize} endCol={props.endCol} endOpacity={props.endOpacity} endSize={props.endSize} highlight={props.highlight} startX={startX} startY={startY} resetHover={resetHover} hoverFunc={hoverFunc} />
                    </View>
                   
                    <View style={styles(props).container}>
                        <Tables path={defaultPath} firstCtrl={props.firstCtrl} setFirstCtrl={props.setFirstCtrl} endPoint={props.endPoint} setEndPoint={props.setEndPoint} controlCol={props.controlCol} ctrlOpacity={props.ctrlOpacity} controlSize={props.controlSize} endCol={props.endCol} endOpacity={props.endOpacity} endSize={props.endSize} highlight={props.highlight} resetHover={resetHover} hoverFunc={hoverFunc} startX={startX} startY={startY} hover={hover} />
                    </View>
                
                </View>
                
                <View style={styles(props).subCan}>
                    <Text onClick={addToPath} onMouseOver={() => hoverFunc('sub')} onMouseLeave={resetHover} style={hover.sub?styles(props).submitHover:styles(props).submitButton}>Add to path!</Text>
                    <Text onClick={closeModal} onMouseOver={() => hoverFunc('can')} onMouseLeave={resetHover} style={hover.can?styles(props).cancelHover:styles(props).cancelButton}>Cancel</Text>
                </View>

            </Modal>
        </View>
    )
};

export default Q;

const styles = (props) => StyleSheet.create({
    outerContainer:{
    display: 'flex',
    alignItems: 'center',
    flexDirection:'column',
    justifyContent: 'center'
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
        justifyContent: 'center'
    },
    title:{
        fontFamily:'Quicksand-Bold',
        fontSize: 30,
        textAlign: 'center',
        margin: 15
    },
    subCan: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: 'center',
        marginTop: -150,
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