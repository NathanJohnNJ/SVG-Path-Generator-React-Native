import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Modal from 'react-modal';
import EditGrid from './editGrid';
import FieldSet from 'react-native-fieldset';  

const Grid = (props) => {
    const viewbox = `0 0 ${props.size} ${props.size}`
    const [command, setCommand] = useState({});
    const [hover, setHover] = useState({sub: false, can: false});
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [firstCtrl, setFirstCtrl] = useState({x:props.path[0].dx1.value, y:props.path[0].dy1.value});
    const [secondCtrl, setSecondCtrl] = useState({x:props.path[0].dx2.value, y:props.path[0].dy2.value});
    const [endPoint, setEndPoint] = useState({x:props.path[0].x.value, y:props.path[0].y.value});

    function createGrid(){
        let num = props.size/10
        const svgns = "http://www.w3.org/2000/svg"
        const grid = document.getElementById('grid')
        for(let i=0; i<num+1; i++){
            const horizLine = document.createElementNS(svgns, 'path')
            const vertLine = document.createElementNS(svgns, 'path')
            horizLine.setAttributeNS(null, 'd', `M 0 ${i*10} h${props.size}`)
            horizLine.setAttributeNS(null, 'stroke', "#bbbbbb")
            vertLine.setAttributeNS(null, 'd', `M ${i*10} 0 v${props.size}`)
            vertLine.setAttributeNS(null, 'stroke', "#bbbbbb")
            grid.appendChild(horizLine)
            grid.appendChild(vertLine)
        }
        for(let i=0; i<num+1; i+=5){
            const horizLine = document.createElementNS(svgns, 'path')
            const vertLine = document.createElementNS(svgns, 'path')
            horizLine.setAttributeNS(null, 'd', `M 0 ${i*10} h${props.size}`)
            horizLine.setAttributeNS(null, 'stroke', "#bbbbbb")
            horizLine.setAttributeNS(null, 'stroke-width', 2)
            vertLine.setAttributeNS(null, 'd', `M ${i*10} 0 v${props.size}`)
            vertLine.setAttributeNS(null, 'stroke', "#bbbbbb")
            vertLine.setAttributeNS(null, 'stroke-width', 2)
            grid.appendChild(horizLine)
            grid.appendChild(vertLine)
        }

    }
    function hoverFunc(path){
        path.style.strokeWidth = props.strokeWidth*2;
        path.style.stroke = '#0000ff';
    }
    function leaveFunc(path){
        path.style.strokeWidth = props.strokeWidth;
        path.style.stroke = props.stroke;
    }
    function clickFunc(path){
        setCommand(path)
        props.setEditModalIsOpen(true)

    }

    function drawPath(){
            const svgns = "http://www.w3.org/2000/svg"
            const grid = document.getElementById('grid')
            props.setStartPoints([...props.startPoints, {sx: 200, sy:50}])
            const currentPath = document.createElementNS(svgns, 'path')
            currentPath.setAttributeNS(null, 'stroke', props.stroke);
            currentPath.setAttributeNS(null, 'stroke-width', props.strokeWidth);
            currentPath.setAttributeNS(null, 'fill', props.fill);
            currentPath.setAttributeNS(null, 'id', 'path0');
            currentPath.setAttributeNS(null, 'stroke-opacity', props.strokeOpacity);
            currentPath.setAttributeNS(null,'fill-opacity', props.fillOpacity);
            currentPath.setAttributeNS(null, 'd', `M${props.path[0].sx.value},${props.path[0].sy.value}${props.path[0].command}`)
            grid.appendChild(currentPath)
            let thisPath = document.getElementById('path0')
            thisPath.addEventListener('mouseover', ()=>hoverFunc(thisPath))
            thisPath.addEventListener('mouseleave', ()=>leaveFunc(thisPath))
            thisPath.addEventListener('click', ()=>clickFunc(props.path[0]))
        }

    useEffect(() => {
        createGrid()
        drawPath()
    }, [])

    function updatePath(path){
        const changingPath = props.path;
        const newPath = changingPath.splice(props.pathID, 1, path)
        const grid = document.getElementById('grid')
        const svgns = "http://www.w3.org/2000/svg"
        const currentPath = document.createElementNS(svgns, 'path')
        currentPath.setAttributeNS(null, 'd', path)
        currentPath.setAttributeNS(null, 'stroke', props.stroke)
        currentPath.setAttributeNS(null, 'stroke-width', props.strokeWidth)
        currentPath.setAttributeNS(null, 'fill', 'none')
        grid.removeChild(grid.lastChild)
        grid.appendChild(currentPath)
        setModalIsOpen(false)
    }
    function closeModal(){
        setModalIsOpen(false)
    }
    function writePath(){
        let fullPath = "M50,50"
        let path = ""
        props.path.map((command, i) =>{
            if(props.relative){
                path = command.relCommand
            } else{
                path = command.absCommand
            }
            fullPath = fullPath + path
        })
        return fullPath;
    }

    function showTables(){
        return(
            <View>
                <View style={styles.tableContainer}>
                    <FieldSet label="First Control Point" labelColor="#00f" labelFontSize='17.5px' labelStyle={styles.label} mainStyle={styles.fieldSet}>
                        <table style={styles.table}>
                            <tbody style={styles.tbody}>
                                <tr style={styles.tr}>
                                    <th style={styles.th}>dx1</th>
                                    <td style={styles.td}>{props.path[0].dx1.value}</td>
                                </tr>
                                <tr style={styles.tr}>
                                    <th style={styles.th}>dy1</th>
                                    <td style={styles.td}>{props.path[0].dy1.value}</td>
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
                                    <td style={styles.td}>{props.path[0].dx2.value}</td>
                                </tr>
                                <tr style={styles.tr}>
                                    <th style={styles.th}>dy2</th>
                                    <td style={styles.td}>{props.path[0].dy2.value}</td>
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
                                    <td style={styles.end}>{props.path[0].x.value}</td>
                                </tr>
                                <tr style={styles.tr}>
                                    <th style={styles.th}>y</th>
                                    <td style={styles.end}>{props.path[0].y.value}</td>
                                </tr>
                            </tbody>
                        </table>
                    </FieldSet>
                </View>
            </View>
        )
    }

    function editFunc(path){
        props.setEditModalIsOpen(true)
        setEditPath(path)
    }   

    return(
        <View style={styles.container}>
            <svg id='grid' height={props.size} width={props.size} viewBox={viewbox} />
            <Text style={styles.position}>Current Path: {writePath()}</Text>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
                style={styles.modal}
                >
                <View style={styles.row}>
                    <View style={styles.container}>
                        <EditGrid size="200" command={command.type} relative={props.relative} path={props.path} firstCtrl={firstCtrl} setFirstCtrl={setFirstCtrl} secondCtrl={secondCtrl} setSecondCtrl={setSecondCtrl} endPoint={endPoint} setEndPoint={setEndPoint} pathID={props.pathID} strokeWidth={props.strokeWidth} stroke={props.stroke} fill={props.fill} fillOpacity={props.fillOpacity} strokeOpacity={props.strokeOpacity} />
                    </View>
                    <View style={styles.container}>
                        {showTables()}
                    </View>
                </View>
                <View style={styles.subCan}>
                    <button onClick={() => updatePath()} onMouseOver={()=>{setHover({sub: true, can:false})}} onMouseLeave={()=>{setHover({sub: false, can:false})}} style={hover.sub?styles.submitHover:styles.submitButton}>Add to path!</button>
                    <button onClick={closeModal} onMouseOver={()=>{setHover({sub: false, can:true})}} onMouseLeave={()=>{setHover({sub: false, can:false})}} style={hover.can?styles.cancelHover:styles.cancelButton}>Cancel</button>
                </View>
            </Modal>
        </View>
    )
};

export default Grid;

// All below checked, all are being used
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
    },
    position: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 5,
      fontFamily: 'Quicksand-Light',
      fontSize: 15
    },
    path:{
        cursor: 'move'
    },
    modal: {
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
          fontFamily: 'Quicksand-Medium',
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
          fontFamily: 'Quicksand-Regular',
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
          fontFamily: 'Quicksand-Medium',
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
          fontFamily: 'Quicksand-Regular',
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
          fontFamily:'Quicksand-Medium',      
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
          color:'#4e4e4e',
          backgroundColor: '#6c6c6c',
          textShadow: '-1px 1px 1px #4e4e4e',
          fontFamily: 'Quicksand-Regular',
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
          width:25,
          height:25,   
          color:'#ffffff',
          backgroundColor: '#4e4e4e',
          textShadow: '-1px 1px 1px #ffffff',
          fontFamily: 'Quicksand-Regular',
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
          width:'auto',
          height:22,
          padding:'2px',    
          color:'#4e4e4e',
          backgroundColor: '#fff',
          textShadow: '-1px 1px 1px #4e4e4e',
          fontFamily: 'Quicksand-Regular',
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
          width:'auto',
          height:22,
          padding:'2px', 
          color:'#ffffff',
          borderRadius: '5px',
          border: 'none',
          backgroundColor: '#4e4e4e',
          textShadow: '-1px 1px 1px #ffffff',
          fontFamily: 'Quicksand-Regular',
          fontSize: 15,
          cursor: 'pointer',
          boxShadow: '-1px -1px 1px 2px #4e4e4e, -1px 1px 1px 2px #4e4e4e, 1px 1px 1px 2px #4e4e4e, 1px -1px 1px 2px #4e4e4e'
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
          backgroundColor: '#fff',
          textShadow: '-1px 1px 1px #ffffff',
          fontFamily: 'Quicksand-Regular',
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
          width:'auto',
          height:22,
          padding:'2px', 
          color:'#fff',
          borderRadius: '5px',
          border: 'none',
          backgroundColor: '#f00',
          textShadow: '-1px 1px 1px #fff',
          fontFamily: 'Quicksand-Regular',
          fontSize: 15,
          cursor: 'pointer',
          boxShadow: '-1px -1px 1px 2px #f00, -1px 1px 1px 2px #f00, 1px 1px 1px 2px #f00, 1px -1px 1px 2px #f00'
        }
})