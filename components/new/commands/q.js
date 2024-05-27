import { useState, useEffect } from 'react';
import GridWithDrag from './gridWithDrag';
import { StyleSheet, Text, View, Modal } from 'react-native';
import React from 'react';
import Tables from './tables';

const Q = (props) => {
    const [absRel, setAbsRel] = useState("q");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [hover, setHover] = useState({sub: false, can: false, q:false});
    const [firstCtrl, setFirstCtrl] = useState({x:25, y:50})
    const [endPoint, setEndPoint] = useState({x:50, y:0})

    function openModal(){
        setFirstCtrl({x:25, y:50})  
        setEndPoint({x:50, y:0})
        setModalIsOpen(true)
    }
    function closeModal(){
        setModalIsOpen(false)
    }

    const defaultPath = {
        type: props.relative?'q':'Q',
        id: props.pathID+1,
        dx1: {key: 'dx', value: props.relative?25:75},
        dy1: {key: 'dy', value: props.relative?50:100},
        x:  {key: 'x',value: props.relative?50:100},
        y: {key: 'y', value: props.relative?0:50},
        absX: {value: 100},
        absY: {value: 50},
        startPoint: {x: 50, y: 50},
        controlPoints: props.relative?[{key: 'dx1', value:25}, {key: 'dy1', value:50}]:[{key: 'dx1', value:75}, {key: 'dy1', value:100}],
        endPoint: props.relative?{x:50, y: 0}:{x: 100, y: 50},
        command: props.relative?'q25,50 50,0':'Q75,100 100,50',
        absCommand: 'Q75,100 100,50',
        relCommand: 'q25,50 50,0'
    }
    
    function addToPath(){
        const startX = props.path[props.pathID].absX.value;
        const startY = props.path[props.pathID].absY.value;
        const qPath = {
            type: props.relative?'q':'Q',
            id: props.pathID+1,
            absX: {value: endPoint.x+startX},
            absY: {value: endPoint.y+startY},
            startPoint: {x: startX, y: startY},
            controlPoints: props.relative?[{key: 'dx1', value:`${firstCtrl.x}`}, {key: 'dy1', value:`${firstCtrl.y}`}]:[{key: 'dx1', value:`${firstCtrl.x}+${startX}`}, {key: 'dy1', value:`${firstCtrl.y}+${startY}`}],
            endPoint: props.relative?{x: endPoint.x,y: endPoint.y}:{x: endPoint.x+startX,y: endPoint.y+startY},
            command: props.relative?`q${firstCtrl.x},${firstCtrl.y} ${endPoint.x},${endPoint.y}`:`Q${startX+firstCtrl.x},${startY+firstCtrl.y} ${startX+endPoint.x},${startY+endPoint.y}`,
            absCommand: `Q${startX+firstCtrl.x},${startY+firstCtrl.y} ${startX+endPoint.x},${startY+endPoint.y}`,
            relCommand: `q${firstCtrl.x},${firstCtrl.y} ${endPoint.x},${endPoint.y}`,
            fullCommand: `M${startX},${startY}Q${startX+firstCtrl.x},${startY+firstCtrl.y} ${startX+endPoint.x},${startY+endPoint.y}`
        } 
        const newPath = [...props.path, qPath]
        props.setPath(newPath)
        props.setPathID(props.pathID+1)  
        setModalIsOpen(false)
    }
    useEffect(()=>{
        if (props.relative){
            setAbsRel("q")
        } else {
            setAbsRel("Q")
        }
    }, [props.relative])

    return (
        <View style={styles.outerContainer}>
            <Text onClick={openModal} onMouseOver={()=>{setHover({sub: false, can:false, q: true})}} onMouseLeave={()=>{setHover({sub: false, can:false, q: false})}} style={hover.q?styles.hover:styles.button}>{absRel}</Text>
            <Modal
            animationType="slide"
            transparent={false}
            visible={modalIsOpen}
            onRequestClose={closeModal}
            >
                <Text style={styles.title}>New {absRel} Command</Text>
                
                <View style={styles.row}>
                   
                    <View style={styles.container}>
                        <GridWithDrag size="250" command="Q" path={defaultPath}  relative={props.relative} firstCtrl={firstCtrl} setFirstCtrl={setFirstCtrl} endPoint={endPoint} setEndPoint={setEndPoint} strokeWidth={props.strokeWidth} stroke={props.stroke} fill={props.fill} fillOpacity={props.fillOpacity} strokeOpacity={props.strokeOpacity} />
                    </View>
                   
                    <View style={styles.container}>
                        <Tables path={defaultPath} firstCtrl={firstCtrl} setFirstCtrl={setFirstCtrl} endPoint={endPoint} setEndPoint={setEndPoint} />
                    </View>
                
                </View>
                
                <View style={styles.subCan}>
                    <Text onClick={addToPath} onMouseOver={()=>{setHover({sub: true, can:false, q: false})}} onMouseLeave={()=>{setHover({sub: false, can:false, q: false})}} style={hover.sub?styles.submitHover:styles.submitButton}>Add to path!</Text>
                    <Text onClick={closeModal} onMouseOver={()=>{setHover({sub: false, can:true, q: false})}} onMouseLeave={()=>{setHover({sub: false, can:false, q: false})}} style={hover.can?styles.cancelHover:styles.cancelButton}>Cancel</Text>
                </View>

            </Modal>
        </View>
    )
};

export default Q;

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
      }
})