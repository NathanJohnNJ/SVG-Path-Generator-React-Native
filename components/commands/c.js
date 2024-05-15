import { useState, useEffect } from 'react';
import GridWithDrag from '../gridWithDrag';
import Modal from 'react-modal';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const C = (props) => {
    const [absRel, setAbsRel] = useState("c");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [hover, setHover] = useState({sub: false, can: false, c:false});
    const [firstPoint, setFirstPoint] = useState({x:25, y:50})
    const [secondPoint, setSecondPoint] = useState({x:75, y:50})
    const [thirdPoint, setThirdPoint] = useState({x:100, y:0})

    // const pathArr = props.path.split(/[A-Z]/g)
    // const nextArr = pathArr[1].split(/[a-z]/g)
    // let numbers = [nextArr[0]]
    // let x = 0
    // let y = 0
    // for (let i=1; i<nextArr.length; i++){
    //     const newArr = nextArr[i].split(" ")
    //     const toUse = newArr[newArr.length-1]
    //     numbers.push(toUse) 
    // }
    // for (let i=0; i<numbers.length; i++){
    //     const coOrds = numbers[i].split(",")
    //     x += Number(coOrds[0])
    //     y += Number(coOrds[1])
    // }
    // const startingPoint = {
    //     x: x,
    //     y: y
    // }
    // const cCMD = {
    //     type: 'C',
    //     sx: {key: 'Start x', value: 50},
    //     sy: {key: 'Start y', value: 50},
    //     dx1: {key: 'dx1', value: firstCtrl.x, absoluteValue: firstCtrl.dx+props.sx},
    //     dy1: {key: 'dy1', value: firstCtrl.y, absoluteValue: firstCtrl.dy+props.sy},
    //     dx2: {key: 'dx2', value: secondCtrl.x, absoluteValue: secondCtrl.dx+props.sx},
    //     dy2: {key: 'dy2', value: secondCtrl.y, absoluteValue: secondCtrl.dy+props.sy},
    //     x:  {key: 'x',value: endPoint.x, absoluteValue: endPoint.x+props.sx},
    //     y: {key: 'y', value: endPoint.y, absoluteValue: endPoint.y+props.sy},
    //     relCommand: `q${firstCtrl.x},${firstCtrl.y} ${endPoint.x},${endPoint.y}`,
    //     absCommand: `Q${props.sx+firstCtrl.x},${props.sy+firstCtrl.y} ${props.sx+endPoint.x},${props.sy+endPoint.y}`,
    //     }

    function openModal(){
        setModalIsOpen(true)
        setFirstPoint({x:25, y:50})
        setSecondPoint({x:75, y:50})
        setThirdPoint({x:100, y:0})
        props.toggle()
    }
    function closeModal(){
        setModalIsOpen(false)
    }
    function addToPath(){
        const newPath = `${props.path}c${firstPoint.x},${firstPoint.y} ${secondPoint.x},${secondPoint.y} ${thirdPoint.x},${thirdPoint.y}`
        props.setPath(newPath)
        const grid = document.getElementById('grid')
        const svgns = "http://www.w3.org/2000/svg"
        const currentPath = document.createElementNS(svgns, 'path')
        currentPath.setAttributeNS(null, 'd', `${newPath}`)
        currentPath.setAttributeNS(null, 'stroke', "#0000ff")
        currentPath.setAttributeNS(null, 'strokeWidth', 0.5)
        currentPath.setAttributeNS(null, 'fill', 'none')
        grid.removeChild(grid.lastChild)
        grid.appendChild(currentPath)
        setModalIsOpen(false)
    }

    useEffect(()=>{
        if (props.relative){
            setAbsRel("c")
        } else {
            setAbsRel("C")
        }
    })

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
                        <GridWithDrag size="200" command="C" relative={props.relative} firstPoint={firstPoint} setFirstPoint={setFirstPoint} secondPoint={secondPoint} setSecondPoint={setSecondPoint} thirdPoint={thirdPoint} setThirdPoint={setThirdPoint}/>
                        {/* startingPoint={startingPoint}  */}
                    </View>
                    <View style={styles.container}>
                    <View style={styles.tableContainer}>
                        {/* <table style={styles.table}>
                            <tbody>
                                <tr>
                                    <th style={styles.startTh}>Start x</th>
                                    <td style={styles.start}>{startingPoint.x}</td>
                                </tr>
                                <tr>
                                    <th style={styles.startTh}>Start y</th>
                                    <td style={styles.start}>{startingPoint.y}</td>
                                </tr>
                            </tbody>
                        </table> */}
                        <table style={styles.table}>
                            <tbody>
                                <tr>
                                    <th style={styles.th}>dx1</th>
                                    <td style={styles.td}>{firstPoint.x}</td>
                                </tr>
                                <tr>
                                    <th style={styles.th}>dy1</th>
                                    <td style={styles.td}>{firstPoint.y}</td>
                                </tr>
                            </tbody>
                        </table>
                    </View>
                    <View style={styles.tableContainer}>
                        <table style={styles.table}>
                            <tbody>
                                <tr>
                                    <th style={styles.th}>dx2</th>
                                    <td style={styles.td}>{secondPoint.x}</td>
                                </tr>
                                <tr>
                                    <th style={styles.th}>dy2</th>
                                    <td style={styles.td}>{secondPoint.y}</td>
                                </tr>
                                </tbody>
                        </table>
                        <table style={styles.table}>
                            <tbody>
                                <tr>
                                    <th style={styles.th}>x</th>
                                    <td style={styles.end}>{thirdPoint.x}</td>
                                </tr>
                                <tr>
                                    <th style={styles.th}>y</th>
                                    <td style={styles.end}>{thirdPoint.y}</td>
                                </tr>
                            </tbody>
                        </table>
                    </View>
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    table: {
        backgroundColor: '#dadada',
        color: '#fff',
        width: 110,
        height: 70,
        marginRight: 45,
        marginBottom: 5
    },
    startTh: {
        border: '1.5px solid black',
        fontFamily: 'Geologica',
        fontWeight: 500,
        width: 65,
    },
    th: {
        border: '1.5px solid black',
        fontFamily: 'Geologica',
        fontWeight: 500,
        width: 25,
    },
    td: {
        textAlign: 'center',
        border: '1.5px dashed black',
        fontFamily: 'Geologica',
        fontWeight: 200,
        width: 45,
        color: '#12f'
    },
    start: {
        textAlign: 'center',
        border: '1.5px dashed black',
        fontFamily: 'Geologica',
        fontWeight: 200,
        width: 45,
        color: '#159c06'
    },
    end: {
        textAlign: 'center',
        border: '1.5px dashed black',
        fontFamily: 'Geologica',
        fontWeight: 200,
        color: '#f00',
        width: 45,
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