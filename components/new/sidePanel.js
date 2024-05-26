import { StyleSheet, View, Modal, Pressable, Text, TextInput } from 'react-native';
import { useState } from 'react';
import FieldSet from 'react-native-fieldset';
import GridWithDrag from '../web/commands/gridWithDrag';


const SidePanel = (props) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [hover, setHover] = useState({x: false, change: false, edit: false});
    const [endX, setEndX] = useState();
    const [endY, setEndY] = useState();


    function hoverFunc(i){
        const newHover = { ...hover, [i]: true}
        setHover(newHover)
    }
    function resetHover(){
        setHover({x: false, change: false, edit: false})
    }
    function openModal(){
        setModalIsOpen(true)
        setEndX(props.endPoint.x)
        setEndY(props.endPoint.y)
    }
    function closeModal(){
        setModalIsOpen(false)
        // props.setEndPoint({x: endX, y: endY})
        // console.log(`${endX}, ${endY}`)
        // document.getElementById('pathGroup').removeChild(document.getElementById(`${props.path.id}`))
        // drawPath()
    }
    // function drawPath(){
    //     const svgns = "http://www.w3.org/2000/svg"
    //     const grid = document.getElementById('pathGroup');
    //     const currentPath = document.createElementNS(svgns, 'path');
    //     currentPath.setAttributeNS(null, "id", props.path.id);
    //     currentPath.setAttributeNS(null, 'stroke', props.stroke);
    //     currentPath.setAttributeNS(null, 'stroke-width', props.strokeWidth);
    //     currentPath.setAttributeNS(null, 'stroke-opacity', props.strokeOpacity);
    //     currentPath.setAttributeNS(null, 'fill', props.fill);
    //     currentPath.setAttributeNS(null, 'fill-opacity', props.fillOpacity);
    //     if(props.path.type==='Q'){
    //         currentPath.setAttributeNS(null, 'd', `M${props.path.startPoint.x},${props.path.startPoint.y}q${props.firstCtrl.x},${props.firstCtrl.y} ${props.endPoint.x},${props.endPoint.y}`)
    //     }else if(props.path.type==='C'){
    //         currentPath.setAttributeNS(null, 'd', `M${props.path.startPoint.x},${props.path.startPoint.y}c${props.firstCtrl.x},${props.firstCtrl.y} ${props.secondCtrl.x},${props.secondCtrl.y} ${props.path.endPoint.x},${props.path.endPoint.y}`)
    //     }
    //     grid.appendChild(currentPath)
    // }
    
    function changeCommand(){

    }

    const ControlTable = () => {
        let headerArr = [];
        let dataArr = [];
        props.path.controlPoints.map((point, i) =>{
            headerArr.push(point.key)
            dataArr.push(point.value)
        })
        return(
            <FieldSet label="Control Points" labelColor="#00f" labelFontSize='17.5px' labelStyle={styles.label} mainStyle={styles.fieldSet}>
                <table style={styles.table}>
                    <tbody style={styles.tbody}>
                        <tr style={styles.tr}>
                            {headerArr.map((header, i) => {
                                return(
                                    <th style={styles.th} key={i}>{header}</th>
                                )
                            })}
                        </tr>
                        <tr style={styles.tr}>
                            {dataArr.map((data, i) => {
                                return(
                                    <td style={styles.td} key={i}>{data}</td>
                                )
                            })}
                        </tr>
                    </tbody>
                </table>
            </FieldSet>
        )
    }

    return(
        <View style={styles.sidePanel}>
            <View style={styles.top}>
                <Text style={styles.title}>
                    More Info
                </Text>
                    <Pressable onPress={openModal} style={hover.edit?styles.hover:styles.button} onMouseOver={() => hoverFunc('edit')} onMouseLeave={resetHover}>
                        <Text style={hover.edit?styles.textHover:styles.buttonText}>
                            Edit
                        </Text>
                    </Pressable>
            </View>
            <View style={styles.bottom}>
                <Text style={styles.title}>Command: {props.path.type}</Text>
                <Text style={styles.title}>Path ID: {props.path.id}</Text>
                <View style={styles.tableSection}>
                    <ControlTable />
                </View>
                <View style={styles.tableSection}>
                    <FieldSet label="End Point" labelColor="#f00" labelFontSize='17.5px' labelStyle={styles.label} mainStyle={styles.fieldSet}>
                        <table style={styles.table}>
                            <tbody style={styles.tbody}>
                                <tr style={styles.tr}>
                                    <th style={styles.th}>x</th>
                                    <th style={styles.th}>y</th>
                                </tr>
                                <tr style={styles.tr}>
                                    <td style={styles.end}>{props.path.endPoint.x}</td>
                                    <td style={styles.end}>{props.path.endPoint.y}</td>
                                </tr>
                            </tbody>
                        </table>
                    </FieldSet>
                </View>
            </View>
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalIsOpen}
            onRequestClose={closeModal}
            >
                <View style={styles.edit}>

                    <View style={styles.titleSection}>

                        <Text style={styles.modalTitle}>
                            Edit
                        </Text>
                        <Pressable style={hover.x?styles.closeHover:styles.close} onPress={closeModal} onMouseOver={() => hoverFunc('x')} onMouseLeave={resetHover}>
                            <Text style={hover.x?styles.closeTextHover:styles.closeText}>
                                X
                            </Text>
                        </Pressable>
                    </View>

                    <View style={styles.bottom}>
                    
                        <View style={styles.commandSection}>
                            <Text style={styles.title}>
                                Command: {props.path.type}
                            </Text>
                            <Pressable style={hover.change?styles.hover:styles.button} onPress={changeCommand} onMouseOver={() => hoverFunc('change')} onMouseLeave={resetHover}>
                                <Text style={hover.change?styles.textHover:styles.buttonText}>
                                    Change
                                </Text>
                            </Pressable>
                        </View>

                        <View style={styles.gridAndTables}>
                            <View style={styles.gridSection}>
                                <GridWithDrag size="200" path={props.path} relative={props.relative} firstCtrl={props.firstCtrl} setFirstCtrl={props.setFirstCtrl} endPoint={props.endPoint} setEndPoint={props.setEndPoint} strokeWidth={props.strokeWidth} stroke={props.stroke} fill={props.fill} fillOpacity={props.fillOpacity} strokeOpacity={props.strokeOpacity} startPoints={props.startPoints}/>
                            </View>
                        
                            <View style={styles.tableSection}>
                                <ControlTable />
                            </View>
                        
                            <View style={styles.tableSection}>
                                <FieldSet label="End Point" labelColor="#f00" labelFontSize='17.5px' labelStyle={styles.label} mainStyle={styles.fieldSet}>
                                    <table style={styles.table}>
                                        <tbody style={styles.tbody}>
                                            <tr style={styles.tr}> 
                                                <th style={styles.th}>x</th>
                                                <th style={styles.th}>y</th>
                                            </tr>
                                            <tr style={styles.tr}>
                                                {/* <td style={styles.end}>{}
                                                    <TextInput
                                                    onChangeText={setEndX}
                                                    value={String(endX)}
                                                    inputMode="number"
                                                    style={styles.textInput} />
                                                </td>
                                                <td style={styles.end}>
                                                    <TextInput
                                                    onChangeText={setEndY}
                                                    value={String(endY)}
                                                    inputMode="number"
                                                    style={styles.textInput} />
                                                </td> */}
                                                <td style={styles.end}>{props.path.endPoint.x}</td>
                                                <td style={styles.end}>{props.path.endPoint.y}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </FieldSet>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default SidePanel;

const styles = StyleSheet.create({
    sidePanel:{
        backgroundColor: '#eee',
        borderColor: '#fdb',
        borderWidth: 3,
        borderRadius: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 22,
        boxShadow: '-2px 2px 8px #9c9c9c',
        margin: 10,                                                
    },
    top: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    titleSection: {
        display: 'flex',
        flexDirection: 'row',
    },
    title: {
        fontFamily: 'Quicksand-Bold',
        fontSize: 20,
    },
    modalTitle: {
        fontFamily: 'Quicksand-Bold',
        fontSize: 40,
    },
    gridAndTables: {
        display: 'flex',
        flexDirection:'row'
    },
    tableSection: {},
    edit: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: 'rgba(200, 200, 200, 0.95)',
        marginTop: 100
    },
    commandSection: {
        display: 'flex',
        flexDirection: 'row'
    },
    button: {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height:25,
        width: 'fit-content',
        backgroundColor: '#6c6c6c',
        borderRadius: 5,
        margin: 5,
        padding: 3,
        borderColor: '#4e4e4e',
        borderStyle: 'solid',
        borderWidth: 2,
        textAlign: 'center',
        fontFamily: 'Quicksand-Regular',
        fontSize: 18,
        color:'#4e4e4e',
      },
    hover: {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:'fit-content',
        height:25,
        backgroundColor: '#4e4e4e',
        borderRadius: 5,
        margin: 5,
        padding: 3,
        borderColor: '#fff',
        borderStyle: 'solid',
        borderWidth: 2,
        textAlign: 'center',
      },
    buttonText: {
        textAlign: 'center',
        fontFamily: 'Quicksand-Regular',
        fontSize: 18,
        color:'#4e4e4e',
    },
    textHover: {
        textAlign: 'center',
        fontFamily: 'Quicksand-Regular',
        fontSize: 18,
        color:'#ffffff',
    },
    close: {
      display:'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height:25,
      width: 'fit-content',
      backgroundColor: '#6c6c6c',
      borderRadius: 5,
      margin: 15,
      padding: 5,
      borderColor: '#681402',
      borderStyle: 'solid',
      borderWidth: 2,
      textAlign: 'center',
      fontFamily: 'Quicksand-Regular',
      fontSize: 18,
      color:'#681402',
    },
  closeHover: {
      display:'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width:'fit-content',
      height:25,
      backgroundColor: '#681402',
      borderRadius: 5,
      margin: 15,
      padding: 5,
      borderColor: '#fff',
      borderStyle: 'solid',
      borderWidth: 2,
      textAlign: 'center',
    },
    closeText: {
        textAlign: 'center',
        fontFamily: 'Quicksand-Bold',
        fontSize: 18,
        color:'#681402',
    },
    closeTextHover: {
        textAlign: 'center',
        fontFamily: 'Quicksand-Bold',
        fontSize: 18,
        color:'#fff',
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
        fontFamily: 'Quicksand-Bold',
        fontSize: 17.5,
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
    },
    table: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
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
    },
    th: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1.8px solid black',
        borderRadius: 5,
        fontFamily: 'Quicksand-Medium',
        fontSize: 18,
        flex:1,
        width: 40,
        height: 25,
        marginTop: -5,
    },
    td: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        border: '1.5px dashed grey',
        fontFamily: 'Quicksand-Regular',
        fontSize: 18,
        color: '#12f',
        flex:1,
        width: 40,
        height: 25,
        padding:2
    },
    end: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        border: '1.5px dashed grey',
        fontFamily: 'Quicksand-Regular',
        fontSize: 18,
        color: '#f00',
        flex:1,
        width: 40,
        height: 25,
    },
})