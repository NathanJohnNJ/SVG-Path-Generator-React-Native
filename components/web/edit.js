import React, { useState } from 'react';
import EditGrid from './editGrid';
import { StyleSheet, Text, View, Modal} from 'react-native';
import Tables from './commands/tables';

const Edit = (props) => {
    const [hover, setHover] = useState({sub: false, can: false, c:false});
    const [firstCtrl, setFirstCtrl] = useState({x:props.editPath.dx1.value, y:props.editPath.dy1.value})
    const [endPoint, setEndPoint] = useState({x:props.editPath.x.value, y:props.editPath.y.value})

    function closeModal(){
        props.setEditModalIsOpen(false)
    }
    function hoverFunc(path){
        path.style.strokeWidth = props.strokeWidth*2;
        path.style.stroke = '#0000ff';
    }
    function leaveFunc(path){
        path.style.strokeWidth = props.strokeWidth;
        path.style.stroke = '#444444';
    }

    function confirmChanges(){
        
        const grid = document.getElementById('grid')
        const oldPath = document.getElementById(`path${props.editPath.id}`)
        grid.removeChild(oldPath)
        const svgns = "http://www.w3.org/2000/svg"
        const currentPath = document.createElementNS(svgns, 'path')
        const fullPath = `M${props.editPath.sx.value},${props.editPath.sy.value}${props.editPath.command}`
        currentPath.setAttributeNS(null, 'd', fullPath)
        currentPath.setAttributeNS(null, 'stroke', props.stroke)
        currentPath.setAttributeNS(null, 'stroke-width', props.strokeWidth)
        currentPath.setAttributeNS(null, 'fill', props.fill)
        currentPath.setAttributeNS(null, 'style', 'styles.path')
        currentPath.setAttributeNS(null, 'stroke-opacity', props.strokeOpacity)
        currentPath.setAttributeNS(null, 'fill-opacity', props.fillOpacity)
        currentPath.setAttributeNS(null, 'id', `path${props.editPath.id}`)
        currentPath.addEventListener('mouseover', ()=>hoverFunc(thisPath))
        currentPath.addEventListener('mouseleave', ()=>leaveFunc(thisPath))
        currentPath.addEventListener('click', ()=>props.editFunc(props.editPath)) 
        grid.appendChild(currentPath)
        props.setEditModalIsOpen(false) 
    }

    return (
        <View className="command">
            <Modal
            animationType="slide"
            transparent={false}
            visible={props.editModalIsOpen}
            onRequestClose={closeModal}
            style={styles.modal}
            >
                    <Text style={styles.title}>{`${props.editPath.type} Command`}</Text>
                <View style={styles.row}>
                    <View style={styles.container}>
                        <EditGrid size="300" relative={props.relative} firstCtrl={firstCtrl} setFirstCtrl={setFirstCtrl} endPoint={endPoint} setEndPoint={setEndPoint} strokeWidth={props.strokeWidth} stroke={props.stroke} fill={props.fill} fillOpacity={props.fillOpacity} strokeOpacity={props.strokeOpacity} path={props.editPath}/>
                    </View>
                    <View style={styles.container}>
                        <Tables path={props.editPath} />
                    </View>
                </View>
                <View style={styles.subCan}>
                    <Text onClick={confirmChanges} onMouseOver={()=>{setHover({sub: true, can:false, c: false})}} onMouseLeave={()=>{setHover({sub: false, can:false, c: false})}} style={hover.sub?styles.submitHover:styles.submitButton}>Confirm</Text>
                    <Text onClick={closeModal} onMouseOver={()=>{setHover({sub: false, can:true, c: false})}} onMouseLeave={()=>{setHover({sub: false, can:false, c: false})}} style={hover.can?styles.cancelHover:styles.cancelButton}>Cancel</Text>
                </View>
            </Modal>
        </View>
    )
};

export default Edit;

const styles = StyleSheet.create({
    modal: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    title:{
        fontFamily:'Quicksand-Bold',
        fontSize: 25,
        textDecorationLine: 'underline'
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
        fontFamily: 'Quicksand-Medium',
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
        fontFamily: 'Quicksand-Medium',
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
        fontFamily: 'Quicksand-Medium',
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
        width:25,
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