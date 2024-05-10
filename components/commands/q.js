import { useState, useEffect } from 'react';
import Grid from '../gridWithDrag';
import Modal from 'react-modal';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

const Q = (props) => {
    const [absRel, setAbsRel] = useState("q");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [hover, setHover] = useState({sub: false, can: false, q:false});
    const [firstPoint, setFirstPoint] = useState({x:25, y:50})
    const [secondPoint, setSecondPoint] = useState({x:50, y:0})

    function openModal(){
        setModalIsOpen(true)
        setFirstPoint({x:25, y:50})
        setSecondPoint({x:50, y:0})
        props.toggle()
    }
    function closeModal(){
        setModalIsOpen(false)
    }
    function addToPath(){
        const newPath = `${props.path} q${firstPoint.x},${firstPoint.y} ${secondPoint.x},${secondPoint.y}`
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
        if (props.type==="relative"){
            setAbsRel("q")
        } else {
            setAbsRel("Q")
        }
    })

    return (
        <View className="command">
            <button onClick={openModal} onMouseOver={()=>{setHover({sub: false, can:false, q: true})}} onMouseLeave={()=>{setHover({sub: false, can:false, q: false})}} style={hover.q?styles.hover:styles.button}>{absRel}</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
                style={styles.modal}
                >
                <View style={styles.row}>
                    <View style={styles.container}>
                        <Grid size="200" type="Q" firstPoint={firstPoint} setFirstPoint={setFirstPoint} secondPoint={secondPoint} setSecondPoint={setSecondPoint} />
                        <Text>Full Path: "{props.path} q{firstPoint.x},{firstPoint.y} {secondPoint.x},{secondPoint.y}"</Text>
                    </View>
                    <View>
                        <table style={styles.table}>
                            <tbody>
                                <tr>
                                    <th style={styles.th}>dx</th>
                                    <td style={styles.td}>{firstPoint.x}</td>
                                </tr>
                                <tr>
                                    <th style={styles.th}>dy</th>
                                    <td style={styles.td}>{firstPoint.y}</td>
                                </tr>
                                <tr>
                                    <th style={styles.th}>x</th>
                                    <td style={styles.td}>{secondPoint.x}</td>
                                </tr>
                                <tr>
                                    <th style={styles.th}>y</th>
                                    <td style={styles.td}>{secondPoint.y}</td>
                                </tr>
                            </tbody>
                        </table>
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
    table: {
        backgroundColor: '#dadada',
        color: '#fff',
        width: 90,
        height: 100,
        margin: 45
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
        width: 65,
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
      width:30,
      height:30,    
      color:'#4e4e4e',
      backgroundColor: '#888888',
      textAlign: 'center',
      textShadow: '-1 1 1 #ffffff',
      fontSize: 20,
      textJustify: 'center'
    },
    hover: {
        width:30,
        height:30,    
        color:'#ffffff',
        backgroundColor: '#4e4e4e',
        textAlign: 'center',
        textShadow: '-1 1 1 #ffffff',
        fontSize: 20,
        textJustify: 'center',
        cursor: 'pointer',
        boxShadow: '-1 -1 1 1 #ffffff, -1 1 1 1 #ffffff, 1 1 1 1 #ffffff, 1 -1 1 1 #ffffff'
    },
    submitButton: {
        width:'fit-content',
        height:20,    
        color:'#4e4e4e',
        backgroundColor: '#fff',
        textAlign: 'center',
        textShadow: '-1 1 1 #ffffff',
        fontSize: '15px',
        textJustify: 'center',
        borderColor: '#4e4e4e',
        borderStyle: 'solid',
        borderWidth: '1.5px',
        borderRadius: '12px'
      },
      submitHover: {
        width:'fit-content',
        height:20,    
        color:'#ffffff',
        borderRadius: '12px',
        border: 'none',
        backgroundColor: '#4e4e4e',
        textAlign: 'center',
        textShadow: '-1 1 1 #ffffff',
        fontSize: '15px',
        textJustify: 'center',
        cursor: 'pointer',
        boxShadow: '-1 -1 1 1 #ffffff, -1 1 1 1 #ffffff, 1 1 1 1 #ffffff, 1 -1 1 1 #ffffff'
      },
    cancelButton: {
        width:'fit-content',
        height:20,    
        color:'#f00',
        backgroundColor: '#fff',
        textAlign: 'center',
        textShadow: '-1 1 1 #ffffff',
        fontSize: '15px',
        textJustify: 'center',
        borderColor: '#f00',
        borderStyle: 'solid',
        borderWidth: '1.5px',
        borderRadius: '12px'
      },
      cancelHover: {
        width:'fit-content',
        height:20,    
        color:'#ffffff',
        borderRadius: '12px',
        border: 'none',
        backgroundColor: '#f00',
        textAlign: 'center',
        textShadow: '-1 1 1 #ffffff',
        fontSize: '15px',
        textJustify: 'center',
        cursor: 'pointer',
        boxShadow: '-1 -1 1 1 #ffffff, -1 1 1 1 #ffffff, 1 1 1 1 #ffffff, 1 -1 1 1 #ffffff'
      }
})

 

const Command1s = styled.View`
    align-items: center;
    justify-content: space-evenly;
    display:none;
    margin: 5px;
`