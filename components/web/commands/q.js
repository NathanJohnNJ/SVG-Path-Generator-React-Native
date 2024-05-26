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
    function hoverFunc(path){
        path.style.strokeWidth = props.strokeWidth*2;
        path.style.stroke = '#0000ff';
    }
    function leaveFunc(path){
        path.style.strokeWidth = props.strokeWidth;
        path.style.stroke = props.stroke;
    }
    function clickFunc(path){
        props.setEditPath(path)
        props.setEditModalIsOpen(true)
    }

    const defaultPath = {
        type: 'Q',
        id: props.pathID+1,
        sx: {key: 'Start x', value: 50},
        sy: {key: 'Start y', value: 50},
        dx1: {key: 'dx', value: props.relative?25:75},
        dy1: {key: 'dy', value: props.relative?50:100},
        x:  {key: 'x',value: props.relative?50:100},
        y: {key: 'y', value: props.relative?0:50},
        absX: {value: 100},
        absY: {value: 50},
        command: props.relative?'q25,50 50,0':'Q75,100 100,50',
        absCommand: 'Q75,100 100,50',
        relCommand: 'q25,50 50,0'
    }
    
    function addToPath(){
        const i = props.pathID+1
        const startX = props.path[i-1].absX.value;
        const startY = props.path[i-1].absY.value;
        const qPath = {
            type: 'Q',
            id: props.pathID+1,
            sx: {key: 'Start x', value: startX},
            sy: {key: 'Start y', value: startY},
            dx1: {key: 'dx', value: props.relative?firstCtrl.x:firstCtrl.x+startX},
            dy1: {key: 'dy', value: props.relative?firstCtrl.y:firstCtrl.y+startY},
            x:  {key: 'x',value: props.relative?endPoint.x:endPoint.x+startX},
            y: {key: 'y', value: props.relative?endPoint.y:endPoint.y+startY},
            absX: {value: endPoint.x+startX},
            absY: {value: endPoint.y+startY},
            command: props.relative?`q${firstCtrl.x},${firstCtrl.y} ${endPoint.x},${endPoint.y}`:`Q${startX+firstCtrl.x},${startY+firstCtrl.y} ${startX+endPoint.x},${startY+endPoint.y}`,
            absCommand: `Q${startX+firstCtrl.x},${startY+firstCtrl.y} ${startX+endPoint.x},${startY+endPoint.y}`,
            relCommand: `q${firstCtrl.x},${firstCtrl.y} ${endPoint.x},${endPoint.y}`
        } 
        const newPath = [...props.path, qPath]
        props.setPath(newPath)
        const grid = document.getElementById('grid')
        grid.removeChild(grid.lastChild)
        const svgns = "http://www.w3.org/2000/svg"
        newPath.map((path, i) => {
            const currentPath = document.createElementNS(svgns, 'path')
            const fullPath = `M${path.sx.value},${path.sy.value}${path.command}`
            currentPath.setAttributeNS(null, 'd', fullPath);
            currentPath.setAttributeNS(null, 'stroke', props.stroke);
            currentPath.setAttributeNS(null, 'stroke-width', props.strokeWidth);
            currentPath.setAttributeNS(null, 'stroke-opacity', props.strokeOpacity);
            currentPath.setAttributeNS(null, 'fill', props.fill);
            currentPath.setAttributeNS(null, 'fill-opacity', props.fillOpacity);
            currentPath.setAttributeNS(null, 'style', 'styles.path');
            currentPath.setAttributeNS(null, 'id', `path${path.id}`);
            grid.appendChild(currentPath);
            let thisPath = document.getElementById(`path${path.id}`);
            thisPath.addEventListener('mouseover', ()=>hoverFunc(thisPath))
            thisPath.addEventListener('mouseleave', ()=>leaveFunc(thisPath))
            thisPath.addEventListener('click', () =>clickFunc(path))
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
    

    return (
        <View style={styles.outerContainer}>
            <Text onClick={openModal} onMouseOver={()=>{setHover({sub: false, can:false, q: true})}} onMouseLeave={()=>{setHover({sub: false, can:false, q: false})}} style={hover.q?styles.hover:styles.button}>{absRel}</Text>
            <Modal
            animationType="slide"
            transparent={false}
            visible={modalIsOpen}
            onRequestClose={closeModal}
            style={styles.modal}
            >
                <Text style={styles.title}>{absRel} Command</Text>
                
                <View style={styles.row}>
                   
                    <View style={styles.container}>
                        <GridWithDrag size="200" command="Q" relative={props.relative} firstCtrl={firstCtrl} setFirstCtrl={setFirstCtrl} endPoint={endPoint} setEndPoint={setEndPoint} strokeWidth={props.strokeWidth} stroke={props.stroke} fill={props.fill} fillOpacity={props.fillOpacity} strokeOpacity={props.strokeOpacity} startPoints={props.startPoints}/>
                    </View>
                   
                    <View style={styles.container}>
                        <Tables path={defaultPath} />
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
    modal: {
      display: 'flex',
      flexDirection:'column',
      marginTop: 40,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
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
        justifyContent: 'center',
        marginTop: 10,
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
        fontFamily: 'Quicksand-Medium',
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
        fontFamily: 'Quicksand-Medium',
        backgroundColor: '#4e4e4e',
        textShadow: '-1px 1px 1px #ffffff',
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
        fontFamily: 'Quicksand-light',
        fontSize: 15,
        borderColor: '#4e4e4e',
        borderStyle: 'solid',
        borderWidth: '1.5px',
        borderRadius: '5px',
        margin: 10
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
        fontFamily: 'Quicksand-Bold',
        fontSize: 15,
        cursor: 'pointer',
        boxShadow: '-1px -1px 1px 2px #4e4e4e, -1px 1px 1px 2px #4e4e4e, 1px 1px 1px 2px #4e4e4e, 1px -1px 1px 2px #4e4e4e',
        margin:10
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
        fontFamily: 'Quicksand-Medium',
        fontSize: 15,
        borderColor: '#f00',
        borderStyle: 'solid',
        borderWidth: '1.5px',
        borderRadius: '5px',
        margin:10
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
        fontFamily: 'Quicksand-Bold',
        fontSize: 15,
        cursor: 'pointer',
        boxShadow: '-1px -1px 1px 2px #f00, -1px 1px 1px 2px #f00, 1px 1px 1px 2px #f00, 1px -1px 1px 2px #f00',
        margin:10
      }
})