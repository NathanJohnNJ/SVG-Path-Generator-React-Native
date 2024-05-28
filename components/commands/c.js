import { useState, useEffect } from 'react';
import GridWithDrag from './gridWithDrag';
import { StyleSheet, Text, View, Modal} from 'react-native';
import React from 'react';
import Tables from './tables';

const C = (props) => {
    const [absRel, setAbsRel] = useState("c");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [hover, setHover] = useState({sub: false, can: false, c:false});
    // const [firstCtrl, setFirstCtrl] = useState({x:25, y:50})
    // const [secondCtrl, setSecondCtrl] = useState({x:75, y:50})
    // const [endPoint, setEndPoint] = useState({x:100, y:0})

    function openModal(){
        setModalIsOpen(true)
        props.setFirstCtrl({x:25, y:50})
        props.setSecondCtrl({x:75, y:50})
        props.setEndPoint({x:100, y:0})
    }
    function closeModal(){
        setModalIsOpen(false)
        props.setFirstCtrl({})
        props.setSecondCtrl({})
        props.setEndPoint({})
    }
    function hoverFunc(i){
        const newHover = { ...hover, [i]: true}
        setHover(newHover)
    }
    function resetHover(){
        setHover({x: false, change: false})
    }

    const defaultPath = {
        type: props.relative?'c':'C',
        id: props.pathID+1,
        absX: {value: 150},
        absY: {value: 50},
        startPoint: {x: 50, y: 50},
        controlPoints: props.relative?[{key: 'dx1', value:25}, {key: 'dy1', value:50}, {key: 'dx2', value:75}, {key: 'dy2', value:50}]:[{key: 'dx1', value:75}, {key: 'dy1', value:100}, {key: 'dx2', value:125}, {key: 'dy2', value:100}],
        endPoint: props.relative?{x: 100, y: 0}:{x: 150, y: 50},
        command: props.relative?'c25,50 75,50 100,0':'C75,100 125,100 150,50',
        absCommand: 'C75,100 125,100 150,50',
        relCommand: 'c25,50 75,50 100,0'
    }
    
    function addToPath(){
        const startX = props.path[props.pathID].absX.value;
        const startY = props.path[props.pathID].absY.value;
        const cPath = {
        type: props.relative?'c':'C',
        id: props.pathID+1,
        absX: {value: props.endPoint.x+startX},
        absY: {value: props.endPoint.y+startY},
        startPoint: {x: startX, y: startY},
        controlPoints: props.relative?[{key: 'dx1', value:`${props.firstCtrl.x}`}, {key: 'dy1', value:`${props.firstCtrl.y}`}, {key: 'dx2', value:`${props.secondCtrl.x}`}, {key: 'dy2', value:`${props.secondCtrl.y}`}]:[{key: 'dx1', value:`${props.firstCtrl.x+startX}`}, {key: 'dy1', value:`${props.firstCtrl.y+startY}`}, {key: 'dx2', value:`${props.secondCtrl.x+startX}`}, {key: 'dy2', value:`${props.secondCtrl.y+startY}`}],
        endPoint: props.relative?{x: props.endPoint.x,y: props.endPoint.y}:{x: props.endPoint.x+startX,y: props.endPoint.y+startY},
        command: props.relative?`c${props.firstCtrl.x},${props.firstCtrl.y} ${props.secondCtrl.x},${props.secondCtrl.y} ${props.endPoint.x},${props.endPoint.y}`:`C${startX+props.firstCtrl.x},${startY+props.firstCtrl.y} ${startX+props.secondCtrl.x},${startY+props.secondCtrl.y} ${startX+props.endPoint.x},${startY+props.endPoint.y}`,
        absCommand: `C${startX+props.firstCtrl.x},${startY+props.firstCtrl.y} ${startX+props.secondCtrl.x},${startY+props.secondCtrl.y} ${startX+props.endPoint.x},${startY+props.endPoint.y}`,
        relCommand: `c${props.firstCtrl.x},${props.firstCtrl.y} ${props.secondCtrl.x},${props.secondCtrl.y} ${props.endPoint.x},${props.endPoint.y}`,
        fullCommand: `M${startX},${startY}C${startX+props.firstCtrl.x},${startY+props.firstCtrl.y} ${startX+props.secondCtrl.x},${startY+props.secondCtrl.y} ${startX+props.endPoint.x},${startY+props.endPoint.y}`
        }
        const newPath = [...props.path, cPath]
        props.setPath(newPath)
        props.setPathID(props.pathID+1)  
        setModalIsOpen(false) 
    }

    useEffect(()=>{
        if (props.relative){
            setAbsRel("c")
        } else {
            setAbsRel("C")
        }
    }, [props.relative])

    return (
        <View style={styles.outerContainer}>
            <Text onClick={openModal} onMouseOver={() => hoverFunc('c')} onMouseLeave={resetHover} style={hover.c?styles.hover:styles.button}>{absRel}</Text>
            <Modal
            animationType="slide"
            transparent={false}
            visible={modalIsOpen}
            onRequestClose={closeModal}
            >
                <Text style={styles.title}>New {absRel} Command</Text>
               
                <View style={styles.row}>
                    
                    <View style={styles.container}>
                        <GridWithDrag size="250" command="C" path={defaultPath} relative={props.relative} firstCtrl={props.firstCtrl} setFirstCtrl={props.setFirstCtrl} secondCtrl={props.secondCtrl} setSecondCtrl={props.setSecondCtrl} endPoint={props.endPoint} setEndPoint={props.setEndPoint} strokeWidth={props.strokeWidth} stroke={props.stroke} fill={props.fill} fillOpacity={props.fillOpacity} strokeOpacity={props.strokeOpacity} />
                    </View>
                   
                    <View style={styles.container}>
                        <Tables firstCtrl={props.firstCtrl} setFirstCtrl={props.setFirstCtrl} secondCtrl={props.secondCtrl} setSecondCtrl={props.setSecondCtrl} endPoint={props.endPoint} setEndPoint={props.setEndPoint} />
                    </View>
                
                </View>
                
                <View style={styles.subCan}>
                    <Text onClick={addToPath} onMouseOver={() => hoverFunc('sub')} onMouseLeave={resetHover} style={hover.sub?styles.submitHover:styles.submitButton}>Add to path!</Text>
                    <Text onClick={closeModal} onMouseOver={() => hoverFunc('can')} onMouseLeave={resetHover} style={hover.can?styles.cancelHover:styles.cancelButton}>Cancel</Text>
                </View>

            </Modal>
        </View>
    )
};

export default C;

const styles = StyleSheet.create({
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
            width:350
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
        margin: 5,
        textAlign: 'center',
        paddingBottom: 3,
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
      }
})