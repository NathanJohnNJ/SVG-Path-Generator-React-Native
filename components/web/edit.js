import { StyleSheet, View, Modal, Pressable, Text } from 'react-native';
import { useState } from 'react';
import FieldSet from 'react-native-fieldset';
import GridWithDrag from './commands/gridWithDrag';
import Change from './change';


const SidePanel = (props) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [hover, setHover] = useState({sub: false, can: false, edit:false, change:false, x:false});

    function openModal(){
        setModalIsOpen(true)
        props.setFirstCtrl({x:props.info.controlPoints[0].value, y:props.info.controlPoints[1].value})
        props.setSecondCtrl({x:props.info.controlPoints[2].value, y:props.info.controlPoints[3].value})
    }

    function closeModal(){
        setModalIsOpen(false)
    }
    function hoverFunc(i){
        const newHover = { ...hover, [i]: true}
        setHover(newHover)
    }
    function resetHover(){
        setHover({sub: false, can: false, edit:false, change:false, x:false})
    }


    function addToPath(){
        const thisPath = `M${props.info.startPoint.x},${props.info.startPoint.y}${props.info.command}`
        const oldPath = props.path
        const index = props.info.pathID
        oldPath[index] = thisPath
        console.log(oldPath)
        props.setPath(oldPath)
        setModalIsOpen(false) 
    }

    return(
        <View style={styles.outerContainer}>
            <Text onClick={openModal} onMouseOver={() => hoverFunc('edit')} onMouseLeave={resetHover} style={hover.edit?styles.hover:styles.button}>Edit</Text>
            <Modal
            animationType="slide"
            transparent={false}
            visible={modalIsOpen}
            onRequestClose={closeModal}
            >
                    <View style={styles.titleSection}>
                        <Text style={styles.title}>
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
                                Command: {props.info.type}
                            </Text>
                           <Change relative={props.relative} path={props.path} setPath={props.setPath} pathID={props.pathID} setPathID={props.setPathID} startPoints={props.startPoints} setStartPoints={props.setStartPoints} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} iinfo={props.info} setInfo={props.setInfo} endPoint={props.endPoint} setEndPoint={props.setEndPoint} firstCtrl={props.firstCtrl} setFirstCtrl={props.setFirstCtrl} secondCtrl={props.secondCtrl} setSecondCtrl={props.setSecondCtrl} />
                        </View>
                        <View style={styles.gridAndTables}>
                            <View style={styles.gridSection}>
                                <GridWithDrag size="350" command={props.info.type} path={props.info} setPath={props.setPath} relative={props.relative} firstCtrl={props.firstCtrl} setFirstCtrl={props.setFirstCtrl} secondCtrl={props.secondCtrl} setSecondCtrl={props.setSecondCtrl} endPoint={props.endPoint} setEndPoint={props.setEndPoint} strokeWidth={props.strokeWidth} stroke={props.stroke} fill={props.fill} fillOpacity={props.fillOpacity} strokeOpacity={props.strokeOpacity} startPoints={props.startPoints}/>
                            </View>
                        
                            <View style={styles.tableSection}>
                            <FieldSet label="Control Points" labelColor="#00f" labelStyle={styles.label} mainStyle={styles.fieldSet}>
                <table style={styles.table}>
                    <tbody style={styles.tbody}>
                        <tr style={styles.tr}>
                                    <th style={styles.th}>dx1</th>
                                    <th style={styles.th}>dy1</th>
                                    {(props.info.type.toUpperCase()==="C")
                                    ?
                                    <>
                                    <th style={styles.th}>dx2</th>
                                    <th style={styles.th}>dy2</th>
                                    </>
                                    :
                                    <></>
                                    }
                        </tr>
                        <tr style={styles.tr}>
                            <td style={styles.td}>{props.firstCtrl.x}</td>
                            <td style={styles.td}>{props.firstCtrl.y}</td>
                                    {(props.info.type.toUpperCase()==="C")
                                    ?
                                    <>
                                    <td style={styles.td}>{props.secondCtrl.x}</td>
                                    <td style={styles.td}>{props.secondCtrl.y}</td>
                                    </>
                                    :
                                    <></>
                                    }
                        </tr>
                    </tbody>
                </table>
            </FieldSet>
                            </View>
                        
                            <View style={styles.tableSection}>
                                <FieldSet label="End Point" labelColor="#f00" labelStyle={styles.label} mainStyle={styles.fieldSet}>
                                    <table style={styles.table}>
                                        <tbody style={styles.tbody}>
                                            <tr style={styles.tr}> 
                                                <th style={styles.th}>x</th>
                                                <th style={styles.th}>y</th>
                                            </tr>
                                            <tr style={styles.tr}>
                                                {/* <td style={styles.end}>{}
                                                    <TextInput
                                                    onChangeText={value => props.setEndPoint({...endPoint, x:Number(value)})}
                                                    value={props.endPoint.x}
                                                    inputMode="number"
                                                    style={styles.textInput} />
                                                </td>
                                                <td style={styles.end}>
                                                    <TextInput
                                                    onChangeText={value => props.setEndPoint({...endPoint, y:value})}
                                                    value={props.endPoint.y}
                                                    inputMode="number"
                                                    style={styles.textInput} />
                                                </td> */}
                                                <td style={styles.end}>{props.endPoint.x}</td>
                                                <td style={styles.end}>{props.endPoint.y}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </FieldSet>
                            </View>
                        </View>
                        <View style={styles.subCan}>
                            <Text onClick={addToPath} onMouseOver={() => hoverFunc('sub')} onMouseLeave={resetHover} style={hover.sub?styles.submitHover:styles.submitButton}>Add to path!</Text>
                            <Text onClick={closeModal} onMouseOver={() => hoverFunc('can')} onMouseLeave={resetHover} style={hover.can?styles.cancelHover:styles.cancelButton}>Cancel</Text>
                        </View>
                    </View>
                {/* </View> */}
            </Modal>
        </View>
    )
}

export default SidePanel;

const styles = StyleSheet.create({
    outerContainer:{
    display: 'flex',
    alignItems: 'center',
    flexDirection:'column',
    justifyContent: 'center'
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
    titleSection:{
        display: 'flex',
        alignItems:'center',
        justifyContent: 'space-evenly',
    },
    title:{
        fontFamily:'Quicksand-Bold',
        fontSize: 30,
        textAlign: 'center',
        margin: 15
    },
    commandSection:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    subCan: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: 'center',
        width: 350
      },
      gridAndTables: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
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
        fontFamily: 'Quicksand-Regular',
        fontSize: 18,
        borderColor: '#4e4e4e',
        borderWidth: 2,
        borderRadius: 6,
        padding: 5,
        margin: 5,
        marginLeft: 10,
        textAlign: 'center',
      },
    hover: {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:'fit-content',
        height:25,
        backgroundColor: '#4e4e4e',
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 6,
        textShadow: '-1px 1px 1px #ffffff',
        fontSize: 18,
        cursor: 'pointer',
        textAlign: 'center',
        padding: 5,
        margin: 5,
        marginLeft: 10,
        color:'#ffffff',
        fontFamily: 'Quicksand-Medium',
      },
        submitButton: {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:'fit-content',
        height:25,
        padding:3,
        color:'#4e4e4e',
        backgroundColor: '#6c6c6c',
        textShadow: '-1px 1px 1px #4e4e4e',
        fontFamily: 'Quicksand-Regular',
        fontSize: 18,
        borderColor: '#4e4e4e',
        borderWidth: 2,
        borderRadius: 6,
        margin: 5,
        textAlign: 'center'
      },
      submitHover: {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:'fit-content',
        height:25,
        padding:3, 
        color:'#ffffff',
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 6,
        backgroundColor: '#4e4e4e',
        textShadow: '-1px 1px 1px #ffffff',
        fontFamily: 'Quicksand-Medium',
        fontSize: 18,
        cursor: 'pointer',
        margin:5,
        textAlign: 'center'
      },
    cancelButton: {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:'fit-content',
        height:25,
        padding:3,  
        color:'#681402',
        backgroundColor: '#6c6c6c',
        textShadow: '-1px 1px 1px #681402',
        fontFamily: 'Quicksand-Regular',
        fontSize: 18,
        borderColor: '#681402',
        borderWidth: 2,
        borderRadius: 6,
        margin:5,
        textAlign: 'center'
      },
      cancelHover: {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:'fit-content',
        height:25,
        padding:3, 
        color:'#fff',
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 6,
        backgroundColor: '#681402',
        textShadow: '-1px 1px 1px #fff',
        fontFamily: 'Quicksand-Medium',
        fontSize: 18,
        cursor: 'pointer',
        margin:5,
        textAlign: 'center'
      },
      close: {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height:25,
        width: 'fit-content',
        backgroundColor: '#6c6c6c',
        borderRadius: 6,
        margin: 15,
        padding: 5,
        borderColor: '#681402',
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
          borderRadius: 6,
          margin: 15,
          padding: 5,
          borderColor: '#fff',
          borderWidth: 2,
          textAlign: 'center',
          textShadow: '-1px 1px 1px #fff',
      },
      closeText: {
          textAlign: 'center',
          fontFamily: 'Quicksand-Bold',
          fontSize: 18,
          color:'#681402',
          textShadow: '-1px 1px 1px #681402'
      },
      closeTextHover: {
          textAlign: 'center',
          fontFamily: 'Quicksand-Bold',
          fontSize: 18,
          color:'#fff',
          textShadow: '-1px 1px 1px #fff',
      },
      fieldSet:{
        backgroundColor: '#a2a2a2',
        height: 80,
        width: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 6
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
        flex:1,
        backgroundColor: '#a2a2a2',
        borderRadius: 6,
        marginTop: 5
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
        padding:2,
        backgroundColor: '#a2a2a2',
    },
    td: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        border: '1.5px dashed grey',
        borderRadius: 5,
        fontFamily: 'Quicksand-Regular',
        fontSize: 18,
        color: '#12f',
        flex:1,
        width: 40,
        height: 25,
        padding: 2
    },
    hoverTd: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        border: '1.5px dashed grey',
        borderRadius: 5,
        fontFamily: 'Quicksand-Bold',
        fontSize: 18,
        color: '#12f',
        flex:1,
        width: 40,
        height: 25,
        padding: 2
    },
    end: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        border: '1.5px dashed grey',
        borderRadius: 5,
        fontFamily: 'Quicksand-Regular',
        fontSize: 18,
        color: '#f00',
        flex:1,
        width: 40,
        height: 25,
        padding: 2
    },
    hoverEnd: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        border: '1.5px dashed grey',
        borderRadius: 5,
        fontFamily: 'Quicksand-Bold',
        fontSize: 18,
        color: '#f00',
        flex:1,
        width: 40,
        height: 25,
        padding: 2
    },
})