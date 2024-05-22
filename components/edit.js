import { useState, useEffect } from 'react';
import EditGrid from './editGrid';
import { StyleSheet, Text, View} from 'react-native';
import Modal from 'react-modal';
import React from 'react';
import FieldSet from 'react-native-fieldset';

const C = (props) => {
    const [absRel, setAbsRel] = useState(props.path.type);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [hover, setHover] = useState({sub: false, can: false, c:false});
    const [firstCtrl, setFirstCtrl] = useState({x:props.path.dx1.value, y:props.path.dy1.value})
    const [secondCtrl, setSecondCtrl] = useState({x:props.path.dx2.value, y:props.path.dy2.value})
    const [endPoint, setEndPoint] = useState({x:props.path.x.value, y:props.path.y.value})

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

    function addToPath(){
        
        const grid = document.getElementById('grid')
        const svgns = "http://www.w3.org/2000/svg"
            const currentPath = document.createElementNS(svgns, 'path')
            const fullPath = `M${props.path.sx.value},${props.path.sy.value}${props.path.command}`
            currentPath.setAttributeNS(null, 'd', fullPath)
            currentPath.setAttributeNS(null, 'stroke', props.stroke)
            currentPath.setAttributeNS(null, 'stroke-width', props.strokeWidth)
            currentPath.setAttributeNS(null, 'fill', props.fill)
            currentPath.setAttributeNS(null, 'style', 'styles.path')
            currentPath.setAttributeNS(null, 'stroke-opacity', props.strokeOpacity)
            currentPath.setAttributeNS(null, 'fill-opacity', props.fillOpacity)
            currentPath.setAttributeNS(null, 'id', `path${props.path.id}`)
            grid.appendChild(currentPath)
            let thisPath = document.getElementById(`path${props.path.id}`)
            thisPath.addEventListener('mouseover', ()=>hoverFunc(thisPath))
            thisPath.addEventListener('mouseleave', ()=>leaveFunc(thisPath))
            thisPath.addEventListener('click', ()=>props.editFunc(props.path)) 
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
                                        <td style={styles.td}>{props.path.dx1.value}</td>
                                    </tr>
                                    <tr style={styles.tr}>
                                        <th style={styles.th}>dy1</th>
                                        <td style={styles.td}>{props.path.dy1.value}</td>
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
                                        <td style={styles.td}>{props.path.dx2.value}</td>
                                    </tr>
                                    <tr style={styles.tr}>
                                        <th style={styles.th}>dy2</th>
                                        <td style={styles.td}>{props.path.dy2.value}</td>
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
                                        <td style={styles.end}>{props.path.x.value}</td>
                                    </tr>
                                    <tr style={styles.tr}>
                                        <th style={styles.th}>y</th>
                                        <td style={styles.end}>{props.path.y.value}</td>
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
            <Modal
                isOpen={props.editModalIsOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
                style={styles.modal}    
                >
                    <Text style={styles.title}>{`${absRel} Command`}</Text>
                <View style={styles.row}>
                    <View style={styles.container}>
                        <EditGrid size="300" relative={props.relative} firstCtrl={firstCtrl} setFirstCtrl={setFirstCtrl} secondCtrl={secondCtrl} setSecondCtrl={setSecondCtrl} endPoint={endPoint} setEndPoint={setEndPoint} strokeWidth={props.strokeWidth} stroke={props.stroke} fill={props.fill} fillOpacity={props.fillOpacity} strokeOpacity={props.strokeOpacity} path={props.path}/>
                    </View>
                    <View style={styles.container}>
                        {showTables()}
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