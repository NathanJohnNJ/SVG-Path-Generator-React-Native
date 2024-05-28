import { StyleSheet, View, Modal, Pressable, Text } from 'react-native';
import { useState } from 'react';
import FieldSet from 'react-native-fieldset';
import Q from './commands/q';
import C from './commands/c';

const SidePanel = (props) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [hover, setHover] = useState({x: false, change: false});

    function hoverFunc(i){
        const newHover = { ...hover, [i]: true}
        setHover(newHover)
    }
    function resetHover(){
        setHover({x: false, change: false})
    }
    function openModal(){
        setModalIsOpen(true)
    }
    function closeModal(){
        setModalIsOpen(false)
    }

    const ControlTable = () => {
        let headerArr = [];
        let dataArr = [];
        props.info.controlPoints.map((point, i) =>{
            headerArr.push(point.key)
            dataArr.push(point.value)
        })
        return(
            <FieldSet label="Control Points" labelColor="#00f" labelStyle={styles.label} mainStyle={styles.fieldSet}>
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
            
            <Pressable style={hover.change?styles.  hover:styles.button} onPress={openModal} onMouseOver={() => hoverFunc('change')} onMouseLeave={resetHover}>
                <Text style={hover.change?styles.textHover:styles.buttonText}>
                    Change
                </Text>
            </Pressable>
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalIsOpen}
            onRequestClose={closeModal}
            >
                <Pressable style={hover.x?styles.closeHover:styles.close} onPress={closeModal} onMouseOver={() => hoverFunc('x')} onMouseLeave={resetHover}>
                    <Text style={hover.x?styles.closeTextHover:styles.closeText}>
                        X
                    </Text>
                </Pressable>
                <View style={styles.change}>
                    <Text style={styles.title}>Change command</Text>
                    <Text style={styles.normalText}>Please select from one of the following commands:</Text>
                    <Text style={styles.smallText}>(Please beware that doing so will remove the command you had selected from the path and replace it with this new one.)</Text>
                </View>
                <View style={styles.commandSelection}>
                    <C relative={props.relative} path={props.path} setPath={props.setPath} pathID={props.pathID} setPathID={props.setPathID} startPoints={props.startPoints} setStartPoints={props.setStartPoints} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} iinfo={props.info} setInfo={props.setInfo} endPoint={props.endPoint} setEndPoint={props.setEndPoint} firstCtrl={props.firstCtrl} setFirstCtrl={props.setFirstCtrl} secondCtrl={props.secondCtrl} setSecondCtrl={props.setSecondCtrl} controlCol={props.controlCol} ctrlOpacity={props.ctrlOpacity} controlSize={props.controlSize} endCol={props.endCol} endOpacity={props.endOpacity}  endSize={props.endSize} highlight={props.highlight}  />
                    <Q relative={props.relative} path={props.path} setPath={props.setPath} pathID={props.pathID} setPathID={props.setPathID} startPoints={props.startPoints} setStartPoints={props.setStartPoints} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} info={props.info} setInfo={props.setInfo} endPoint={props.endPoint} setEndPoint={props.setEndPoint} firstCtrl={props.firstCtrl} setFirstCtrl={props.setFirstCtrl} controlCol={props.controlCol} ctrlOpacity={props.ctrlOpacity} controlSize={props.controlSize} endCol={props.endCol} endOpacity={props.endOpacity}  endSize={props.endSize} highlight={props.highlight}  />
                </View>
            </Modal>
        </View>
    )
}

export default SidePanel;

const styles = StyleSheet.create({
    sidePanel:{
        backgroundColor: '#ddd',
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
        marginTop: -60
    },
    titleSection: {
        display: 'flex',
        flexDirection: 'row',
    },
    title: {
        fontFamily: 'Quicksand-Bold',
        fontSize: 20,
        marginTop: 5,
        marginBottom: 5
    },
    modalTitle: {
        fontFamily: 'Quicksand-Bold',
        fontSize: 35,
    },
    gridAndTables: {
        display: 'flex',
        flexDirection:'row'
    },
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
        color:'#4e4e4e',
        backgroundColor: '#6c6c6c',
        textShadow: '-1px 1px 1px #4e4e4e',
        fontFamily: 'Quicksand-Regular',
        fontSize: 18,
        borderColor: '#4e4e4e',
        borderWidth: 2,
        borderRadius: 6,
        margin: 5,
        textAlign: 'center',
        padding: 3,
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
        cursor: 'pointer',
        margin: 5,
        padding: 3,
        
      },
    buttonText: {
        textAlign: 'center',
        fontFamily: 'Quicksand-Regular',
        fontSize: 18,
        color:'#4e4e4e',
    },
    textHover: {
        textAlign: 'center',
        fontFamily: 'Quicksand-Medium',
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
        fontFamily: 'Quicksand-Regular',
        fontSize: 18,
        color:'#681402',
        textShadow: '-1px 1px 1px #681402'
    },
    closeTextHover: {
        textAlign: 'center',
        fontFamily: 'Quicksand-Medium',
        fontSize: 18,
        color:'#fff',
        textShadow: '-1px 1px 1px #fff',
    },
    tableSection: {
        margin: 10
    },
    fieldSet:{
        backgroundColor: '#a2a2a2',
        height: 80,
        width: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 20
    },
    label: {
        fontFamily: 'Quicksand-Bold',
        fontSize: 17,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 6,
        marginBottom: 10,
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
        padding:2
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
        padding:2,
        margin:1
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
        padding: 2,
        margin: 1
    },
})