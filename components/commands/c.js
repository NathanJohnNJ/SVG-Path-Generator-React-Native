import { useState, useEffect } from 'react';
import GridWithDrag from '../gridWithDrag';
import Modal from 'react-modal';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FieldSet from 'react-native-fieldset';

const C = (props) => {
    const [absRel, setAbsRel] = useState("c");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [hover, setHover] = useState({sub: false, can: false, c:false});
    const [firstCtrl, setFirstCtrl] = useState({x:25, y:50})
    const [secondCtrl, setSecondCtrl] = useState({x:75, y:50})
    const [endPoint, setEndPoint] = useState({x:100, y:0})

    function openModal(){
        setModalIsOpen(true)
        setFirstCtrl({x:25, y:50})
        setSecondCtrl({x:75, y:50})
        setEndPoint({x:100, y:0})
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
        // props.setModalIsOpen(true)
    }

    function addToPath(){
        const i = props.pathID
        const startX = props.startPoints[i-1].sx;
        const startY = props.startPoints[i-1].sy;
        const cPath = {
        type: 'C',
        sx: {key: 'Start x', value: startX},
        sy: {key: 'Start y', value: startY},
        dx1: {key: 'dx1', value: firstCtrl.x, absoluteValue: firstCtrl.x+startX},
        dy1: {key: 'dy1', value: firstCtrl.y, absoluteValue: firstCtrl.y+startY},
        dx2: {key: 'dx2', value: secondCtrl.x, absoluteValue: secondCtrl.x+startX},
        dy2: {key: 'dy2', value: secondCtrl.y, absoluteValue: secondCtrl.y+startY},
        x:  {key: 'x',value: endPoint.x, absoluteValue: endPoint.x+startX},
        y: {key: 'y', value: endPoint.y, absoluteValue: endPoint.y+startY},
        relCommand: `c${firstCtrl.x},${firstCtrl.y} ${secondCtrl.x},${secondCtrl.y} ${endPoint.x},${endPoint.y}`,
        absCommand: `C${startX+firstCtrl.x},${startY+firstCtrl.y} ${startX+secondCtrl.x},${startY+secondCtrl.y}  ${startX+endPoint.x},${startY+endPoint.y}`,
        }
        const newPath = [...props.path, cPath]
        props.setPath(newPath)
        const newStartPoints = [...props.startPoints, {sx: startX+endPoint.x, sy: startY+endPoint.y}]
        props.setStartPoints(newStartPoints)
        const grid = document.getElementById('grid')
        grid.removeChild(grid.lastChild)
        const svgns = "http://www.w3.org/2000/svg"
        newPath.map((path, i) => {
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
            setAbsRel("c")
        } else {
            setAbsRel("C")
        }
    })

    function showTables(){
        if(!props.relative){
            return(
                <View>
                    <View style={styles.tableContainer}>
                        <FieldSet label="First Control Point" labelColor="#00f" labelFontSize='17.5px' labelStyle={styles.label} mainStyle={styles.fieldSet}>
                            <table style={styles.table}>
                                <tbody style={styles.tbody}>
                                    <tr style={styles.tr}>
                                        <th style={styles.th}>dx1</th>
                                        <td style={styles.td}>{firstCtrl.x+props.path[props.pathID-1].x.absoluteValue}</td>
                                    </tr>
                                    <tr style={styles.tr}>
                                        <th style={styles.th}>dy1</th>
                                        <td style={styles.td}>{firstCtrl.y+props.path[props.pathID-1].y.absoluteValue}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </FieldSet>
                    </View>
                    <View style={styles.tableContainer}>
                        <FieldSet label="Second Control Point" labelColor="#00f" labelFontSize='17.5px' labelStyle={styles.label} mainStyle={styles.fieldSet}>
                            <table style={styles.table}>
                                <tbody style={styles.tbody}>
                                    <tr style={styles.tr}>
                                        <th style={styles.th}>dx2</th>
                                        <td style={styles.td}>{secondCtrl.x+props.path[props.pathID-1].x.absoluteValue}</td>
                                    </tr>
                                    <tr style={styles.tr}>
                                        <th style={styles.th}>dy2</th>
                                        <td style={styles.td}>{secondCtrl.y+props.path[props.pathID-1].y.absoluteValue}</td>
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
                        <FieldSet label="First Control Point" labelColor="#00f" labelFontSize='17.5px' labelStyle={styles.label} mainStyle={styles.fieldSet}>
                            <table style={styles.table}>
                                <tbody style={styles.tbody}>
                                    <tr style={styles.tr}>
                                        <th style={styles.th}>dx1</th>
                                        <td style={styles.td}>{firstCtrl.x}</td>
                                    </tr>
                                    <tr style={styles.tr}>
                                        <th style={styles.th}>dy1</th>
                                        <td style={styles.td}>{firstCtrl.y}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </FieldSet>
                    </View>
                    <View style={styles.tableContainer}>
                        <FieldSet label="Second Control Point" labelColor="#00f" labelFontSize='17.5px' labelStyle={styles.label} mainStyle={styles.fieldSet}>
                            <table style={styles.table}>
                                <tbody style={styles.tbody}>
                                    <tr style={styles.tr}>
                                        <th style={styles.th}>dx2</th>
                                        <td style={styles.td}>{secondCtrl.x}</td>
                                    </tr>
                                    <tr style={styles.tr}>
                                        <th style={styles.th}>dy2</th>
                                        <td style={styles.td}>{secondCtrl.y}</td>
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
        <View className="command">
            <button onClick={openModal} onMouseOver={()=>{setHover({sub: false, can:false, c: true})}} onMouseLeave={()=>{setHover({sub: false, can:false, c: false})}} style={hover.c?styles.hover:styles.button}>{absRel}</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
                style={styles.modal}
                >
                <View style={styles.row}>
                    <View style={styles.container}>
                        <GridWithDrag size="200" command="C" relative={props.relative} firstCtrl={firstCtrl} setFirstCtrl={setFirstCtrl} secondCtrl={secondCtrl} setSecondCtrl={setSecondCtrl} endPoint={endPoint} setEndPoint={setEndPoint} strWidth={props.strWidth} setStrWidth={props.setStrWidth} stroke={props.stroke} setStroke={props.setStroke} fill={props.fill} setFill={props.setFill}/>
                    </View>
                    <View style={styles.container}>
                        {showTables()}
                    </View>
                </View>
                <View style={styles.subCan}>
                    <button onClick={addToPath} onMouseOver={()=>{setHover({sub: true, can:false, c: false})}} onMouseLeave={()=>{setHover({sub: false, can:false, c: false})}} style={hover.sub?styles.submitHover:styles.submitButton}>Add to path!</button>
                    <button onClick={closeModal} onMouseOver={()=>{setHover({sub: false, can:true, c: false})}} onMouseLeave={()=>{setHover({sub: false, can:false, c: false})}} style={hover.can?styles.cancelHover:styles.cancelButton}>Cancel</button>
                </View>
            </Modal>
        </View>
    )
};

export default C;

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