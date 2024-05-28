import { useState, useEffect } from 'react';
import GridWithDrag from './gridWithDrag';
import { StyleSheet, Text, View, Modal } from 'react-native';
import React from 'react';
import FieldSet from 'react-native-fieldset';

const L = (props) => {
    const [absRel, setAbsRel] = useState("l");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [hover, setHover] = useState({sub: false, can: false, l:false, x:false, y:false});
    const [endPoint, setEndPoint] = useState({x:50, y:50})

    function openModal(){ 
        setEndPoint({x:50, y:50})
        setModalIsOpen(true)
    }
    function closeModal(){
        setModalIsOpen(false)
    }

    function hoverFunc(i){
        const newHover = { ...hover, [i]: true}
        setHover(newHover)
    }
    function resetHover(){
        setHover({sub: false, can: false, l:false, x:false, y:false})
    }

    const defaultPath = {
        type: props.relative?'l':'L',
        id: props.pathID+1,
        x:  {key: 'x',value: props.relative?50:100},
        y: {key: 'y', value: props.relative?50:100},
        absX: {value: 100},
        absY: {value: 100},
        startPoint: {x: 50, y: 50},
        endPoint: props.relative?{x:50, y: 0}:{x: 100, y: 50},
        command: props.relative?'l50,50':'L100,100',
        absCommand: 'L100,100',
        relCommand: 'l50,50'
    }
    
    function addToPath(){
        const startX = props.path[props.pathID].absX.value;
        const startY = props.path[props.pathID].absY.value;
        const lPath = {
            type: props.relative?'l':'L',
            id: props.pathID+1,
            absX: {value: endPoint.x+startX},
            absY: {value: endPoint.y+startY},
            startPoint: {x: startX, y: startY},
            endPoint: props.relative?{x: endPoint.x,y: endPoint.y}:{x: endPoint.x+startX,y: endPoint.y+startY},
            command: props.relative?`l${endPoint.x},${endPoint.y}`:`L${startX+endPoint.x},${startY+endPoint.y}`,
            absCommand: `L${startX+endPoint.x},${startY+endPoint.y}`,
            relCommand: `l${endPoint.x},${endPoint.y}`,
            fullCommand: `M${startX},${startY}L${startX+endPoint.x},${startY+endPoint.y}`
        } 
        const newPath = [...props.path, lPath]
        props.setPath(newPath)
        props.setPathID(props.pathID+1)  
        setModalIsOpen(false)
    }
    useEffect(()=>{
        if (props.relative){
            setAbsRel("l")
        } else {
            setAbsRel("L")
        }
    }, [props.relative])

    return (
        <View style={styles.outerContainer}>
            <Text onClick={openModal} onMouseOver={()=>{setHover({sub: false, can:false, l: true})}} onMouseLeave={()=>{setHover({sub: false, can:false, l: false})}} style={hover.l?styles.hover:styles.button}>{absRel}</Text>
            <Modal
            animationType="slide"
            transparent={false}
            visible={modalIsOpen}
            onReluestClose={closeModal}
            >
                <Text style={styles.title}>New {absRel} Command</Text>
                
                <View style={styles.row}>
                   
                    <View style={styles.container}>
                        <GridWithDrag size="250" command="L" path={defaultPath}  relative={props.relative} endPoint={endPoint} setEndPoint={setEndPoint} strokeWidth={props.strokeWidth} stroke={props.stroke} fill={props.fill} fillOpacity={props.fillOpacity} strokeOpacity={props.strokeOpacity} />
                    </View>
                   
                    <View style={styles.tableContainer}>
                    <FieldSet label="End Point" labelColor="#f00" labelStyle={styles.label} mainStyle={styles.fieldSet}>
                        <table style={styles.table}>
                            <tbody style={styles.tbody}>
                                <tr style={styles.tr}> 
                                    <th style={styles.th}>x</th>
                                    <th style={styles.th}>y</th>
                                </tr>
                                <tr style={styles.tr}>
                                    <td style={hover.x?styles.hoverEnd:styles.end} onMouseEnter={()=>{hoverFunc('x')}} onMouseLeave={resetHover}>{props.endPoint.x}</td>
                                    <td style={hover.y?styles.hoverEnd:styles.end} onMouseEnter={()=>{hoverFunc('y')}} onMouseLeave={resetHover}>{props.endPoint.y}</td>
                                </tr>
                            </tbody>
                        </table>
                    </FieldSet>
                </View>
                
                </View>
                
                <View style={styles.subCan}>
                    <Text onClick={addToPath} onMouseOver={()=>{setHover({sub: true, can:false, l: false})}} onMouseLeave={()=>{setHover({sub: false, can:false, l: false})}} style={hover.sub?styles.submitHover:styles.submitButton}>Add to path!</Text>
                    <Text onClick={closeModal} onMouseOver={()=>{setHover({sub: false, can:true, l: false})}} onMouseLeave={()=>{setHover({sub: false, can:false, l: false})}} style={hover.can?styles.cancelHover:styles.cancelButton}>Cancel</Text>
                </View>

            </Modal>
        </View>
    )
};

export default L;

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
        fontFamily:'Luicksand-Bold',
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
        fontFamily: 'Luicksand-Regular',
        fontSize: 18,
        borderColor: '#4e4e4e',
        borderWidth: 2,
        borderRadius: 6,
        // paddingBottom: 5,
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
        // paddingBottom: 5,
        margin: 5,   
        color:'#ffffff',
        fontFamily: 'Luicksand-Medium',
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
        fontFamily: 'Luicksand-Regular',
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
        fontFamily: 'Luicksand-Medium',
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
        fontFamily: 'Luicksand-Regular',
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
        fontFamily: 'Luicksand-Medium',
        fontSize: 18,
        cursor: 'pointer',
        margin:5,
        textAlign: 'center'
      }
})