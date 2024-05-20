import React, { useState, useEffect, useRef } from 'react';
import GridWithDrag from './gridWithDrag';
import Svg, { Path, Rect, ForeignObject, Defs, Pattern, Line, Ellipse } from "react-native-svg"
import { StyleSheet, Text, View, Pressable, Modal } from 'react-native';
import FieldSet from 'react-native-fieldset';

const Q = (props) => {
    const [absRel, setAbsRel] = useState("q");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [firstCtrl, setFirstCtrl] = useState({x:25, y:50})
    const [endPoint, setEndPoint] = useState({x:50, y:0})
    const pathRef = useRef();

    function openModal(){
        setFirstCtrl({x:25, y:50})
        setEndPoint({x:50, y:0})
        setModalIsOpen(true)
        props.setVisible(visible => !visible )
    }
    function closeModal(){
        setModalIsOpen(false)
    }

    //The next 2 functions will be the interaction for each section of path when back on the main screen. The user will tap a section and it will highlight in blue and become thicker. A second tap will open the 'Edit modal' so will be passed over with props to the function.
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
        props.setEditModalIsOpen(true)
    }
  
    function addToPath(){
        const i = props.pathID
        const startX = props.startPoints[i-1].sx;
        const startY = props.startPoints[i-1].sy;
        const qPath = {
            type: 'Q',
            id: props.pathID+1,
            sx: {key: 'Start x', value: startX},
            sy: {key: 'Start y', value: startY},
            dx1: {key: 'dx', value: firstCtrl.x, absoluteValue: firstCtrl.x+startX},
            dy1: {key: 'dy', value: firstCtrl.y, absoluteValue: firstCtrl.y+startY},
            x:  {key: 'x',value: endPoint.x, absoluteValue: endPoint.x+startX},
            y: {key: 'y', value: endPoint.y, absoluteValue: endPoint.y+startY},
            relCommand: `q${firstCtrl.x},${firstCtrl.y} ${endPoint.x},${endPoint.y}`,
            absCommand: `Q${startX+firstCtrl.x},${startY+firstCtrl.y} ${startX+endPoint.x},${startY+endPoint.y}`
        } 
        const newPath = [...props.path, qPath]
        props.setPath(newPath)
        const newStartPoints = [...props.startPoints, {sx: startX+endPoint.x, sy: startY+endPoint.y}]
        props.setStartPoints(newStartPoints)
        
        props.gridRef.current.removeChild(grid.lastChild)
        newPath.map((path, i) => {
            const fullPath = `M${path.sx.value},${path.sy.value}${path.relCommand}`
            const id = `path${path.id}`
            const size = 200
            pathRef.current.addEventListener('press', pressFunc)
            return(
                <Svg width={size+20} height={size+20} viewBox={viewBox} x="0" y="0" style={styles.grid}>
                    <Path ref={pathRef} id={id} d={fullPath} x="0" y="0" stroke={props.stroke} strokeWidth={props.strWidth} fill={props.fill} onPress={pressFunc}/>
                </Svg>
            )
        })    
        props.setPathID(props.pathID+1)  
        setModalIsOpen(false)
    }

    useEffect(()=>{
        if (props.relative){
            setAbsRel("q")
        } else {
            setAbsRel("Q")
        }
    })
    function showTables(){
        if(!props.relative){
            return(
                <View>
                    <View style={styles.tableContainer}>
                        <FieldSet label="Control Point" labelColor="#00f" labelFontSize='17.5px' labelStyle={styles.label} mainStyle={styles.fieldSet}>
                            <table style={styles.table}>
                                <tbody style={styles.tbody}>
                                    <tr style={styles.tr}>
                                        <th style={styles.th}>dx</th>
                                        <td style={styles.td}>{firstCtrl.x+props.path[props.pathID-1].x.absoluteValue}</td>
                                    </tr>
                                    <tr style={styles.tr}>
                                        <th style={styles.th}>dy</th>
                                        <td style={styles.td}>{firstCtrl.y+props.path[props.pathID-1].y.absoluteValue}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </FieldSet>
                    </View>
                    <View style={styles.tableContainer}>
                        <FieldSet label="End Point" labelColor="#f00" labelFontSize="17.5px" labelStyle={styles.label} mainStyle={styles.fieldSet}>
                            <table style={styles.table}>
                                <tbody style={styles.tbody}>
                                    <tr style={styles.tr}>
                                        <th style={styles.th}>x</th>
                                        <td style={styles.end}>{endPoint.x+props.path[props.pathID-1].x.absoluteValue}</td>
                                    </tr>
                                    <tr style={styles.tr}>
                                        <th style={styles.th}>y</th>
                                        <td style={styles.end}>{endPoint.y+props.path[props.pathID-1].y.absoluteValue}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </FieldSet>
                    </View>
                </View>
            )
        } else {
            return(
                <View>
                    <View style={styles.tableContainer}>
                        <FieldSet label="Control Point" labelColor="#00f" labelFontSize='17.5px' labelStyle={styles.label} mainStyle={styles.fieldSet}>
                            <table style={styles.table}>
                                <tbody style={styles.tbody}>
                                    <tr style={styles.tr}>
                                        <th style={styles.th}>dx</th>
                                        <td style={styles.td}>{firstCtrl.x}</td>
                                    </tr>
                                    <tr style={styles.tr}>
                                        <th style={styles.th}>dy</th>
                                        <td style={styles.td}>{firstCtrl.y}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </FieldSet>
                    </View>
                    <View style={styles.tableContainer}>
                        <FieldSet label="End Point" labelColor="#f00" labelFontSize="17.5px" labelStyle={styles.label} mainStyle={styles.fieldSet}>
                            <table style={styles.table}>
                                <tbody style={styles.tbody}>
                                    <tr style={styles.tr}>
                                        <th style={styles.th}>x</th>
                                        <td style={styles.end}>{endPoint.x}</td>
                                    </tr>
                                    <tr style={styles.tr}>
                                        <th style={styles.th}>y</th>
                                        <td style={styles.end}>{endPoint.y}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </FieldSet>
                    </View>
                </View>
            )
        }
    }

    return (
        <View>
            <Pressable onPress={openModal} style={styles.button}><Text style={styles.btnText}>{absRel}</Text></Pressable>
            <Modal
                visible={modalIsOpen}
                animationType='slide'
                onRequestClose={closeModal}
                transparent={true}
                style={styles.modal}
                >
                <View style={styles.row}>
                    <View style={styles.container}>
                        <GridWithDrag size="200" command="Q" relative={props.relative} firstCtrl={firstCtrl} setFirstCtrl={setFirstCtrl} endPoint={endPoint} setEndPoint={setEndPoint} strWidth={props.strWidth} stroke={props.stroke} fill={props.fill}  />
                    </View>
                    <View style={styles.container}>
                        {showTables()}
                    </View>
                </View>
                <View style={styles.subCan}>
                    <Pressable onPress={addToPath} style={styles.submitButton}><Text style={styles.btnText}>Add to path!</Text></Pressable>
                    <Pressable onPress={closeModal} style={styles.cancelButton}><Text style={styles.cancelText}>Cancel</Text></Pressable>
                </View>
            </Modal>
        </View>
    )
};

export default Q;

//All checked below, all used.
const styles = StyleSheet.create({
    grid: {
        marginTop: 50,
        marginBottom: 30,
        marginLeft: 30,
        marginRight: 10
    },
    modal: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    row: {
        flex: 1,
        flexDirection: "row",
    },
    tableContainer: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex:1
    },
    fieldSet:{
        backgroundColor: '#a2a2a2',
        height: 80,
        width: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    label: {
        fontFamily: 'Geologica',
        fontWeight: 600,
        fontSize: 17.5
    },
    table: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        marginTop: 5,
        marginLeft: 10,
        flex:1
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
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '5px',
    },
    th: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1.8px solid black',
        fontFamily: 'Geologica',
        fontWeight: 500,
        fontSize: 18,
        flex:1,
        width: 40,
        height: 25,
        marginTop: -5,
        marginBottom: -5,
    },
    td: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        border: '1.5px dashed grey',
        fontFamily: 'Geologica',
        fontWeight: 400,
        fontSize: 18,
        color: '#12f',
        flex:1,
        width: 60,
        height: 25,
        margin: 2
    },
    end: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        border: '1.5px dashed grey',
        fontFamily: 'Geologica',
        fontWeight: 400,
        fontSize: 18,
        color: '#f00',
        flex:1,
        width: 60,
        height: 25,
        margin: 2
    },
    subCan: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 10,
        width: 300
    },
      button: {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:25,
        height:25,   
        backgroundColor: '#6c6c6c',
        border: 'none',
        borderRadius: 6,
        margin: 5
    },
    btnText:{
        textShadow: '-1px 1px 1px #4e4e4e',
        fontFamily: 'Poppins-Medium',
        color:'#4e4e4e',
        fontSize: 18,
    },
    cancelText:{
        textShadow: '-1px 1px 1px #fff',
        fontFamily: 'Poppins-Medium',
        color:'#f00',
        fontSize: 18,
    },
    submitButton: {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:'auto',
        height:22,
        padding:'2px',
        backgroundColor: '#fff',
        borderColor: '#4e4e4e',
        borderStyle: 'solid',
        borderWidth: '1.5px',
        borderRadius: 6
      },
    cancelButton: {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:'auto',
        height:22,
        padding:'2px',  
        color:'#f00',
        backgroundColor: '#f00',
        borderColor: '#f00',
        borderStyle: 'solid',
        borderWidth: '1.5px',
        borderRadius: 6
    },
})