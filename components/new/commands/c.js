import { useState, useEffect } from 'react';
import GridWithDrag from './gridWithDrag';
import { StyleSheet, Text, View, Modal} from 'react-native';
import React from 'react';
import Tables from './tables';

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

    //onMouseOver={() => hoverFunc('edit')} onMouseLeave={resetHover}
    //function hoverFunc(i){
    //     const newHover = { ...hover, [i]: true}
    //     setHover(newHover)
    // }
    // function resetHover(){
    //     setHover({x: false, change: false, edit: false})
    // }
    function clickFunc(path){
        props.setEditPath(path)
        props.setEdit2ModalIsOpen(true)
    }

    const defaultPath = {
        type: 'C',
        id: props.pathID+1,
        sx: {key: 'Start x', value: 50},
        sy: {key: 'Start y', value: 50},
        dx1: {key: 'dx1', value: props.relative?25:75},
        dy1: {key: 'dy1', value: props.relative?50:100},
        dx2: {key: 'dx2', value: props.relative?75:125},
        dy2: {key: 'dy2', value: props.relative?50:100},
        x:  {key: 'x',value: props.relative?100:150},
        y: {key: 'y', value: props.relative?0:50},
        absX: {value: 150},
        absY: {value: 50},
        command: props.relative?'c25,50 75,50 100,0':'C75,100 125,100 150,50',
        absCommand: 'C75,100 125,100 150,50',
        relCommand: 'c25,50 75,50 100,0'
    }
    
    function addToPath(){
        const i = props.pathID+1
        const startX = props.path[i-1].absX.value;
        const startY = props.path[i-1].absY.value;
        const cPath = {
        type: 'C',
        id: props.pathID+1,
        sx: {key: 'Start x', value: startX},
        sy: {key: 'Start y', value: startY},
        dx1: {key: 'dx1', value: props.relative?firstCtrl.x:firstCtrl.x+startX},
        dy1: {key: 'dy1', value: props.relative?firstCtrl.y:firstCtrl.y+startY},
        dx2: {key: 'dx2', value: props.relative?secondCtrl.x:secondCtrl.x+startX},
        dy2: {key: 'dy2', value: props.relative?secondCtrl.y:secondCtrl.y+startY},
        x:  {key: 'x',value: props.relative?endPoint.x:endPoint.x+startX},
        y: {key: 'y', value: props.relative?endPoint.y:endPoint.y+startY},
        absX: {value: endPoint.x+startX},
        absY: {value: endPoint.y+startY},
        command: props.relative?`c${firstCtrl.x},${firstCtrl.y} ${secondCtrl.x},${secondCtrl.y} ${endPoint.x},${endPoint.y}`:`C${startX+firstCtrl.x},${startY+firstCtrl.y} ${startX+secondCtrl.x},${startY+secondCtrl.y} ${startX+endPoint.x},${startY+endPoint.y}`,
        absCommand: `C${startX+firstCtrl.x},${startY+firstCtrl.y} ${startX+secondCtrl.x},${startY+secondCtrl.y} ${startX+endPoint.x},${startY+endPoint.y}`,
        relCommand: `c${firstCtrl.x},${firstCtrl.y} ${secondCtrl.x},${secondCtrl.y} ${endPoint.x},${endPoint.y}`
        }
        const newPath = [...props.path, cPath]
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
            thisPath.addEventListener('click', ()=>clickFunc(path))
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

    return (
        <View style={styles.outerContainer}>
            <Text onClick={openModal} onMouseOver={()=>{setHover({sub: false, can:false, c: true})}} onMouseLeave={()=>{setHover({sub: false, can:false, c: false})}} style={hover.c?styles.hover:styles.button}>{absRel}</Text>
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
                        <GridWithDrag size="200" command="C" relative={props.relative} firstCtrl={firstCtrl} setFirstCtrl={setFirstCtrl} secondCtrl={secondCtrl} setSecondCtrl={setSecondCtrl} endPoint={endPoint} setEndPoint={setEndPoint} strokeWidth={props.strokeWidth} stroke={props.stroke} fill={props.fill} fillOpacity={props.fillOpacity} strokeOpacity={props.strokeOpacity} startPoints={props.startPoints} />
                    </View>
                   
                    <View style={styles.container}>
                        <Tables path={defaultPath} firstCtrl={firstCtrl} setFirstCtrl={setFirstCtrl} secondCtrl={secondCtrl} setSecondCtrl={setSecondCtrl} endPoint={endPoint} setEndPoint={setEndPoint} />
                    </View>
                
                </View>
                
                <View style={styles.subCan}>
                    <Text onClick={addToPath} onMouseOver={()=>{setHover({sub: true, can:false, c: false})}} onMouseLeave={()=>{setHover({sub: false, can:false, c: false})}} style={hover.sub?styles.submitHover:styles.submitButton}>Add to path!</Text>
                    <Text onClick={closeModal} onMouseOver={()=>{setHover({sub: false, can:true, c: false})}} onMouseLeave={()=>{setHover({sub: false, can:false, c: false})}} style={hover.can?styles.cancelHover:styles.cancelButton}>Cancel</Text>
                </View>

            </Modal>
        </View>
    )
};

export default C;

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
        fontFamily: 'Quicksand-Medium',
        fontSize: 18,
        border: 'none',
        borderRadius: '5px',
        paddingBottom: 5
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
        fontFamily: 'Quicksand-Medium',
        fontSize: 18,
        cursor: 'pointer',
        boxShadow: '-1px -1px 1px 1px #ffffff, -1px 1px 1px 1px #ffffff, 1px 1px 1px 1px #ffffff, 1px -1px 1px 1px #ffffff',
        border: 'none',
        borderRadius: '5px',
        paddingBottom: 5
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
        width:'auto',
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
        width:'auto',
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
        width:'auto',
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