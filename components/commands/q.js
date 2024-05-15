import { useState, useEffect } from 'react';
import GridWithDrag from '../gridWithDrag';
import Modal from 'react-modal';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FieldSet from 'react-native-fieldset';

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
        props.toggle()
    }
    function closeModal(){
        setModalIsOpen(false)
    }
    function hoverFunc(path){
        path.style.strokeWidth = props.strWidth*2;
        path.style.stroke = '#0000ff';
    }
    function leaveFunc(path){
        path.style.strokeWidth = props.strWidth;
        path.style.stroke = '#444444';
    }
    function clickFunc(path){
        // setModalIsOpen(true)
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
            dx: {key: 'dx', value: firstCtrl.x, absoluteValue: firstCtrl.x+startX},
            dy: {key: 'dy', value: firstCtrl.y, absoluteValue: firstCtrl.y+startY},
            x:  {key: 'x',value: endPoint.x, absoluteValue: endPoint.x+startX},
            y: {key: 'y', value: endPoint.y, absoluteValue: endPoint.y+startY},
            relCommand: `q${firstCtrl.x},${firstCtrl.y} ${endPoint.x},${endPoint.y}`,
            absCommand: `Q${startX+firstCtrl.x},${startY+firstCtrl.y} ${startX+endPoint.x},${startY+endPoint.y}`
        } 
        const newPath = [...props.path, qPath]
        props.setPath(newPath)
        const newStartPoints = [...props.startPoints, {sx: startX+endPoint.x, sy: startY+endPoint.y}]
        props.setStartPoints(newStartPoints)
        const grid = document.getElementById('grid')
        grid.removeChild(grid.lastChild)
        const svgns = "http://www.w3.org/2000/svg"
        newPath.map((path, i) => {
            console.log(path)
            const currentPath = document.createElementNS(svgns, 'path')
            const fullPath = `M${path.sx.value},${path.sy.value}${path.relCommand}`
            currentPath.setAttributeNS(null, 'd', fullPath)
            currentPath.setAttributeNS(null, 'stroke', "#444444")
            currentPath.setAttributeNS(null, 'stroke-width', props.strWidth)
            currentPath.setAttributeNS(null, 'fill', 'none')
            currentPath.setAttributeNS(null, 'style', 'styles.path')
            currentPath.setAttributeNS(null, 'id', `path${path.id}`)
            grid.appendChild(currentPath)
            let thisPath = document.getElementById(`path${path.id}`)
            thisPath.addEventListener('mouseover', ()=>hoverFunc(thisPath))
            thisPath.addEventListener('mouseleave', ()=>leaveFunc(thisPath))
            thisPath.addEventListener('click', ()=>clickFunc(props.path))
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
    }, [])
    function showTables(){

    console.log()
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
            <button onClick={openModal} onMouseOver={()=>{setHover({sub: false, can:false, q: true})}} onMouseLeave={()=>{setHover({sub: false, can:false, q: false})}} style={hover.q?styles.hover:styles.button}>{absRel}</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
                style={styles.modal}
                >
                <View style={styles.row}>
                    <View style={styles.container}>
                        <GridWithDrag size="200" command="Q" relative={props.relative} firstCtrl={firstCtrl} setFirstCtrl={setFirstCtrl} endPoint={endPoint} setEndPoint={setEndPoint} strWidth={props.strWidth} setStrWidth={props.setStrWidth}  />
                    </View>
                    <View style={styles.container}>
                        {showTables()}
                    </View>
                </View>
                <View style={styles.subCan}>
                    <button onClick={addToPath} onMouseOver={()=>{setHover({sub: true, can:false, q: false})}} onMouseLeave={()=>{setHover({sub: false, can:false, q: false})}} style={hover.sub?styles.submitHover:styles.submitButton}>Add to path!</button>
                    <button onClick={closeModal} onMouseOver={()=>{setHover({sub: false, can:true, q: false})}} onMouseLeave={()=>{setHover({sub: false, can:false, q: false})}} style={hover.can?styles.cancelHover:styles.cancelButton}>Cancel</button>
                </View>
            </Modal>
        </View>
    )
};

export default Q;

const styles = StyleSheet.create({
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
        width: 'fit-content',
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
    start: {
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1.5px dashed grey',
        fontFamily: 'Geologica',
        fontWeight: 400,
        fontSize: 18,
        color: '#159c06',
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
    path:{
        cursor: 'pointer'
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
        width:'fit-content',
        height:25,   
        color:'#4e4e4e',
        backgroundColor: '#6c6c6c',
        textShadow: '-1px 1px 1px #4e4e4e',
        fontFamily: 'Poppins-Medium',
        fontSize: 18,
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
        textShadow: '-1px 1px 1px #ffffff',
        fontFamily: 'Poppins-Medium',
        fontSize: 18,
        cursor: 'pointer',
        boxShadow: '-1px -1px 1px 1px #ffffff, -1px 1px 1px 1px #ffffff, 1px 1px 1px 1px #ffffff, 1px -1px 1px 1px #ffffff',
        border: 'none',
        borderRadius: '5px',
        margin: 5
      },
        submitButton: {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:'fit-content',
        height:22,
        padding:'2px',    
        color:'#4e4e4e',
        backgroundColor: '#fff',
        textShadow: '-1px 1px 1px #4e4e4e',
        fontFamily: 'Poppins-Medium',
        fontSize: 15,
        borderColor: '#4e4e4e',
        borderStyle: 'solid',
        borderWidth: '1.5px',
        borderRadius: '5px'
      },
      submitHover: {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:'fit-content',
        height:22,
        padding:'2px', 
        color:'#ffffff',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#4e4e4e',
        textShadow: '-1px 1px 1px #ffffff',
        fontFamily: 'Poppins-Medium',
        fontSize: 15,
        cursor: 'pointer',
        boxShadow: '-1px -1px 1px 2px #4e4e4e, -1px 1px 1px 2px #4e4e4e, 1px 1px 1px 2px #4e4e4e, 1px -1px 1px 2px #4e4e4e'
      },
    cancelButton: {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:'fit-content',
        height:22,
        padding:'2px',  
        color:'#f00',
        backgroundColor: '#fff',
        textShadow: '-1px 1px 1px #ffffff',
        fontFamily: 'Poppins-Medium',
        fontSize: 15,
        borderColor: '#f00',
        borderStyle: 'solid',
        borderWidth: '1.5px',
        borderRadius: '5px'
      },
      cancelHover: {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:'fit-content',
        height:22,
        padding:'2px', 
        color:'#fff',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#f00',
        textShadow: '-1px 1px 1px #fff',
        fontFamily: 'Poppins-Medium',
        fontSize: 15,
        cursor: 'pointer',
        boxShadow: '-1px -1px 1px 2px #f00, -1px 1px 1px 2px #f00, 1px 1px 1px 2px #f00, 1px -1px 1px 2px #f00'
      }
})