import { useState } from 'react';
import GridWithDrag from './gridWithDrag';
import { StyleSheet, Text, View, Modal } from 'react-native';
import React from 'react';
import FieldSet from '@njtd/react-native-fieldset';
import Help from '../help';
import Presets from '../presetPaths/l';

const L = (props) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [hover, setHover] = useState({sub: false, can: false, l:false, x:false, y:false});

    const startX = props.path[props.pathID].endPoint.x + props.path[props.pathID].startPoint.x;
    const startY = props.path[props.pathID].endPoint.y + props.path[props.pathID].startPoint.y;

    function openModal(){ 
        props.setEndPoint({x:50, y:50})
        setModalIsOpen(true)
    }
    function closeModal(){
        setModalIsOpen(false)
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
        setHover({sub: false, can: false, l:false, x:false, y:false})
    }

    const first = {
        type: 'l',
        id: props.pathID+1,
        startPoint: {x: 50, y: 50},
        endPoint: {x:50, y: 50}
    }
    const [defaultPath, setDefaultPath] = useState(first);
    
    function addToPath(){
        
        const lPath = {
            type: 'l',
            id: props.pathID+1,
            startPoint: {x: startX, y: startY},
            endPoint: {x: props.endPoint.x, y: props.endPoint.y}
        } 
        const newPath = [...props.path, lPath]
        props.setPath(newPath)
        props.setPathID(props.pathID+1)  
        setModalIsOpen(false)
    }

    return (
        <View style={styles(props).outerContainer}>
            <Text onClick={openModal}  onMouseOver={() => hoverFunc('l')} onMouseLeave={resetHover} style={hover.l?styles(props).hover:styles(props).button}>L</Text>
            <Modal
            animationType="slide"
            transparent={false}
            visible={modalIsOpen}
            onReluestClose={closeModal}
            >
                <View style={styles(props).row}>
                    <Presets pathID={props.pathID} defaultPath={defaultPath} setDefaultPath={setDefaultPath} stroke={props.stroke} strokeWidth={props.strokeWidth} setFirstCtrl={props.setFirstCtrl} setEndPoint={props.setEndPoint} firstCtrl={props.firstCtrl} endPoint={props.endPoint} fill={props.fill} fillOpacity={props.fillOpacity} strokeOpacity={props.strokeOpacity} />
                    <View style={styles(props).middleSection}>
                        <View style={styles(props).titleContainer}>
                            <Text style={styles(props).title}>
                                New L Command
                            </Text>
                        </View>
                        <View style={styles(props).container}>
                            <GridWithDrag size="250" path={defaultPath} endPoint={props.endPoint} setEndPoint={props.setEndPoint} strokeWidth={props.strokeWidth} stroke={props.stroke} fill={props.fill} fillOpacity={props.fillOpacity} strokeOpacity={props.strokeOpacity} endCol={props.endCol} endOpacity={props.endOpacity} endSize={props.endSize} highlight={props.highlight} startX={startX} startY={startY} resetHover={resetHover} hoverFunc={hoverFunc}   />
                        </View>
                    </View>
                    <View style={styles(props).mainContainer}>
                        <Help url="https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths" />
                        <View style={styles(props).tableContainer}>
                            <FieldSet label="End Point" labelColor={props.endCol} labelStyle={styles(props).label} mainStyle={styles(props).fieldSet}>
                                <table style={styles(props).table}>
                                    <tbody style={styles(props).tbody}>
                                        <tr style={styles(props).tr}> 
                                            <th style={styles(props).endTh}>x</th>
                                            <th style={styles(props).endTh}>y</th>
                                        </tr>
                                        <tr style={styles(props).trWide}> 
                                            <th style={styles(props).thWide}>Relative</th>
                                        </tr>
                                        <tr style={styles(props).tr}>
                                            <td style={hover.x?styles(props).hoverEnd:styles(props).end} onMouseEnter={()=>{hoverFunc('x')}} onMouseLeave={resetHover}>{props.endPoint.x}</td>
                                            <td style={hover.y?styles(props).hoverEnd:styles(props).end} onMouseEnter={()=>{hoverFunc('y')}} onMouseLeave={resetHover}>{props.endPoint.y}</td>
                                        </tr>
                                        <tr style={styles(props).trWide}> 
                                            <th style={styles(props).thWide}>Absolute</th>
                                        </tr>
                                        <tr style={styles(props).tr}>
                                            <td style={hover.x?styles(props).hoverEnd:styles(props).end} onMouseEnter={()=>{hoverFunc('x')}} onMouseLeave={resetHover}>{props.endPoint.x+startX}</td>
                                            <td style={hover.y?styles(props).hoverEnd:styles(props).end} onMouseEnter={()=>{hoverFunc('y')}} onMouseLeave={resetHover}>{props.endPoint.y+startY}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </FieldSet>
                        </View>
                        
                    </View>
                </View>
                
                <View style={styles(props).subCan}>
                    <Text onClick={addToPath}  onMouseOver={() => hoverFunc('sub')} onMouseLeave={resetHover} style={hover.sub?styles(props).submitHover:styles(props).submitButton}>
                        Add to path!
                    </Text>
                    <Text onClick={closeModal}  onMouseOver={() => hoverFunc('can')} onMouseLeave={resetHover} style={hover.can?styles(props).cancelHover:styles(props).cancelButton}>
                        Cancel
                    </Text>
                </View>
            </Modal>
        </View>
    )
};

export default L;

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
      mainContainer: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#ddd',
        padding: 22,
        borderRadius: 18,
        borderWidth: 3,
        borderColor: '#abd',
        height: 300
        },
        tableContainer: {
            display: "flex",
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flex:1
        },
        fieldSet:{
            height: 80,
            width: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            borderRadius: 6
        },
        label: {
            fontFamily: 'Quicksand-Bold',
            fontSize: 17.5,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius:6
        },
        table: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            flex:1,
            borderRadius: 6,
            marginTop: 5
        },
        tbody:{
            flex:1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        tr: {
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        trWide:{
            flex: 1,
            display: 'flex',
            marginTop:5
        },
        thWide: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1.8px solid black',
          borderRadius: 5,
          fontFamily: 'Quicksand-Bold',
          fontSize: 16,
          flex:1,
          width: 80,
          height: 25,
          marginTop: 1,
          padding:4,
          backgroundColor: props.endCol,
        },
        endTh: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1.8px solid black',
          borderRadius: 5,
          fontFamily: 'Quicksand-Medium',
          fontSize: 16,
          flex:1,
          width: 40,
          height: 25,
          marginTop: 1,
          padding:2,
          backgroundColor: props.endCol,
      },
      end: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          border: '1.5px dashed grey',
          borderRadius: 5,
          fontFamily: 'Quicksand-Regular',
          fontSize: 16,
          color: props.endCol,
          flex:1,
          width: 40,
          height: 25,
          padding: 2
      },
      hoverEnd: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          border: '1.5px dashed grey',
          borderRadius: 5,
          fontFamily: 'Quicksand-Bold',
          fontSize: 18,
          color: props.endCol,
          flex:1,
          width: 40,
          height: 25,
          padding: 2
      },
})