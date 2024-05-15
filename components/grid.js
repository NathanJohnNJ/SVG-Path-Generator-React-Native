import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Modal from 'react-modal';
import EditGrid from './editGrid';

const Grid = (props) => {
    const viewbox = `0 0 ${props.size} ${props.size}`
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [command, setCommand] = useState({})
    const [hover, setHover] = useState({sub: false, can: false});
    const [firstPoint, setFirstPoint] = useState({})
    const [secondPoint, setSecondPoint] = useState({})

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
        path.style.strokeWidth = props.strWidth*2;
        path.style.stroke = '#0000ff';
    }
    function leaveFunc(path){
        path.style.strokeWidth = props.strWidth;
        path.style.stroke = '#444444';
    }
    function clickFunc(path){
        setCommand(path)
        setSecondPoint({x:path.x,y:path.y})
        setModalIsOpen(true)
    }

    function drawPath(){
            const svgns = "http://www.w3.org/2000/svg"
            const grid = document.getElementById('grid')
            for (let i=0; i<1; i++){
                const startX = props.path[i].sx
                const startY = props.path[i].sy
                props.setStartPoints([...props.startPoints, {sx: props.path[i].x.absoluteValue, sy:props.path[i].y.absoluteValue}])
                let start = {
                    x: props.path[i].x,
                    y: props.path[i].y
                }
                const currentPath = document.createElementNS(svgns, 'path')
                currentPath.setAttributeNS(null, 'stroke', "#444444");
                currentPath.setAttributeNS(null, 'stroke-width', 3);
                currentPath.setAttributeNS(null, 'fill', 'none');
                currentPath.setAttributeNS(null, 'style', 'styles.path')
                currentPath.setAttributeNS(null, 'id', `path${i}`);
                (props.relative)?currentPath.setAttributeNS(null, 'd', `M${props.path[i].sx.value},${props.path[i].sy.value}${props.path[i].relCommand}`):currentPath.setAttributeNS(null, 'd', `M${props.path[i].sx.value},${props.path[i].sy.value}${props.path[i].absCommand}`)
                grid.appendChild(currentPath)
                let thisPath = document.getElementById(`path${i}`)
                thisPath.addEventListener('mouseover', ()=>hoverFunc(thisPath))
                thisPath.addEventListener('mouseleave', ()=>leaveFunc(thisPath))
                thisPath.addEventListener('click', ()=>clickFunc(props.path[i]))
            }
        }

    useEffect(() => {
        createGrid()
        drawPath()
    }, [])
    function updatePath(){
        const grid = document.getElementById('grid')
        const svgns = "http://www.w3.org/2000/svg"
        const currentPath = document.createElementNS(svgns, 'path')
        currentPath.setAttributeNS(null, 'd', `${newPath}`)
        currentPath.setAttributeNS(null, 'stroke', "#444444")
        currentPath.setAttributeNS(null, 'stroke-width', props.strWidth)
        currentPath.setAttributeNS(null, 'fill', 'none')
        grid.removeChild(grid.lastChild)
        grid.appendChild(currentPath)
        setModalIsOpen(false)
    }
    function closeModal(){
        setModalIsOpen(false)
    }
    function makeTable(command){
        command.points.map((point, i) => {
            return(
                <tr>
                    <th style={styles.startTh}>{point.key}</th> 
                    <td style={styles.start}>{point.value}</td>
                </tr>
            )
        })
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
                        <EditGrid size="200" command={command.type} relative={props.relative} path={props.path} firstPoint={firstPoint} setFirstPoint={setFirstPoint} secondPoint={secondPoint} setSecondPoint={setSecondPoint} />
                    </View>
                    {/* <View style={styles.container}>
                    <View style={styles.tableContainer}>
                        <table style={styles.table}>
                            <tbody>
                                {makeTable()}
                            </tbody>
                        </table>
                    </View>
                    </View> */}
                    <View style={styles.container}>
                    <View style={styles.tableContainer}>
                        {/* <table style={styles.table}>
                            <tbody>
                                <tr>
                                    <th style={styles.startTh}>Start x</th>
                                    <td style={styles.start}>{command.points.x}</td>
                                </tr>
                                <tr>
                                    <th style={styles.startTh}>Start y</th>
                                    <td style={styles.start}>{command.points.y}</td>
                                </tr>
                            </tbody>
                        </table> */}
                        <table style={styles.table}>
                            <tbody>
                                <tr>
                                    <th style={styles.th}>dx</th>
                                    <td style={styles.td}>{command.dx}</td>
                                </tr>
                                <tr>
                                    <th style={styles.th}>dy</th>
                                    <td style={styles.td}>{command.dy}</td>
                                </tr>
                            </tbody>
                        </table>
                        </View>
                        <View style={styles.tableContainer}>
                        <table style={styles.table}>
                            <tbody>
                                <tr>
                                    <th style={styles.th}>x</th>
                                    <td style={styles.end}>{command.x}</td>
                                </tr>
                                <tr>
                                    <th style={styles.th}>y</th>
                                    <td style={styles.end}>{command.y}</td>
                                </tr>
                            </tbody>
                        </table>
                    </View>
                    </View>
                </View>
                <View style={styles.subCan}>
                    <button onClick={updatePath} onMouseOver={()=>{setHover({sub: true, can:false})}} onMouseLeave={()=>{setHover({sub: false, can:false})}} style={hover.sub?styles.submitHover:styles.submitButton}>Add to path!</button>
                    <button onClick={closeModal} onMouseOver={()=>{setHover({sub: false, can:true})}} onMouseLeave={()=>{setHover({sub: false, can:false})}} style={hover.can?styles.cancelHover:styles.cancelButton}>Cancel</button>
                </View>
            </Modal>
        </View>
    )
};

export default Grid;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
    },
    position: {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 15,
      fontFamily: 'Geologica',
      fontWeight:500,
      fontSize: 16
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
    th: {
        border: '1.5px solid black',
        fontFamily: 'Geologica',
        fontWeight: 500,
        width: 25,
    },
    startTh: {
        border: '1.5px solid black',
        fontFamily: 'Geologica',
        fontWeight: 500,
        width: 65,
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