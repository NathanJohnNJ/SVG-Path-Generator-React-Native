import { StyleSheet, View, Modal, Pressable, Text } from 'react-native';
import { useState } from 'react';
import FieldSet from '@njtd/react-native-fieldset';
import GridWithDrag from './commands/gridWithDrag';

const Edit = (props) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [hover, setHover] = useState({sub: false, can: false, edit:false, change:false, com:false, dx1: false, dy1: false, dx2: false, dy2: false,  x: false, y:false});
    const startPoint = {x:50, y:50};

    function openModal(){
        if(props.info.type==="q"||props.info.type==="c"){
            props.setFirstCtrl({x:props.info.controlPoints[0].value, y:props.info.controlPoints[1].value})
        }
        if(props.info.type==='c'){
            props.setSecondCtrl({x:props.info.controlPoints[2].value, y:props.info.controlPoints[3].value})
        }
        props.setEndPoint(props.info.endPoint)
        setModalIsOpen(true)
    }

    function closeModal(){
        setModalIsOpen(false)
    }

    function hoverFunc(i){
        const newHover = { ...hover, [i]: true}
        setHover(newHover)
    }
    function resetHover(){
        setHover({sub: false, can: false, edit:false, change:false, com:false, dx1: false, dy1: false, x: false, y:false, dx2: false, dy2: false,})
    }

// Need to construct new object to add into path instead of just adding in the command
    function addToPath(){
        let thisPath;
        if(props.info.type==='c'){
            thisPath = `M${props.info.startPoint.x},${props.info.startPoint.y}${props.info.type}${props.firstCtrl.x},${props.firstCtrl.y} ${props.secondCtrl.x},${props.secondCtrl.y} ${props.endPoint.x},${props.endPoint.y}`
        } else if(props.info.type === 'q'){
            thisPath = `M${props.info.startPoint.x},${props.info.startPoint.y}${props.info.type}${props.firstCtrl.x},${props.firstCtrl.y} ${props.endPoint.x},${props.endPoint.y}`
        } else {
            thisPath = `M${props.info.startPoint.x},${props.info.startPoint.y}${props.info.type}${props.endPoint.x},${props.endPoint.y}`
        }
        let newPath = [];
        props.path.map((command, i)=> {
            if(i===props.info.id){
                console.log('match!')
                newPath.push(thisPath)
            }else{
                newPath.push(command)
            }
        })
        console.log(newPath)
        props.setPath(newPath)
        setModalIsOpen(false) 
    }

    const ControlTable = () => {
        return(
            <FieldSet label="Control Points" labelColor={props.controlCol} labelStyle={styles(props).label} mainStyle={styles(props).fieldSet}>
                <table style={styles(props).table}>
                    <tbody style={styles(props).tbody}>
                        <tr style={styles(props).tr}>
                            {props.info.controlPoints.map((point, i) => {
                                return(
                                    <th style={styles(props).th} key={i}>{point.key}</th>
                                )
                            })}
                        </tr>
                        <tr style={styles(props).trWide}> 
                            <th style={styles(props).ctrlWide}>Relative</th>
                        </tr>
                        <tr style={styles(props).tr}>
                            {props.info.controlPoints.map((point, i) => {
                                return(
                                    <td style={(hover[point.key])?styles(props).hoverTd:styles(props).td} key={i} onMouseEnter={()=>hoverFunc(point.key)} onMouseLeave={resetHover}>{point.value}</td>
                                )
                            })}
                        </tr>
                        <tr style={styles(props).trWide}> 
                            <th style={styles(props).ctrlWide}>Absolute</th>
                        </tr>
                        <tr style={styles(props).tr}>
                            {props.info.absControlPoints.map((point, i) => {
                                return(
                                    <td style={(hover[point.key])?styles(props).hoverTd:styles(props).td} key={i} onMouseEnter={()=>hoverFunc(point.key)} onMouseLeave={resetHover}>{point.value}</td>
                                )
                            })}
                        </tr>
                    </tbody>
                </table>
            </FieldSet>
        )
    }
    function displayCtrlTables(){
        if(props.info.type==='v'||props.info.type==='h'||props.info.type==='l'||props.info.type===''){
            return(
                <></>
            )
        }else {
            return(
                <View style={styles(props).tableSection}>
                    <ControlTable />
                </View>
            )
        }
        
    }
    

    return(
        <View style={styles(props).outerContainer}>
            <Text onClick={openModal} onMouseOver={() => hoverFunc('edit')} onMouseLeave={resetHover} style={hover.edit?styles(props).hover:styles(props).button}>
                Edit
            </Text>
            <Modal
            animationType="slide"
            transparent={false}
            visible={modalIsOpen}
            onRequestClose={closeModal}
            >
                <View style={styles(props).titleSection}>
                    <Text style={styles(props).title}>
                        Edit
                    </Text>
                </View>

                <View style={styles(props).bottom}>
                
                    <View style={styles(props).commandSection}>
                        <Text style={styles(props).title}>
                            Command: {props.info.type}
                        </Text>
                    </View>
                    <View style={styles(props).gridAndTables}>
                        <View style={styles(props).gridSection}>
                            <GridWithDrag size="350" command={props.info.type} path={props.info} setPath={props.setPath} relative={props.relative} firstCtrl={props.firstCtrl} setFirstCtrl={props.setFirstCtrl} secondCtrl={props.secondCtrl} setSecondCtrl={props.setSecondCtrl} endPoint={props.endPoint} setEndPoint={props.setEndPoint} startX={props.info.startPoint.x} startY={props.info.startPoint.y} strokeWidth={props.strokeWidth} stroke={props.stroke} fill={props.fill} fillOpacity={props.fillOpacity} strokeOpacity={props.strokeOpacity} resetHover={resetHover} controlCol={props.controlCol} ctrlOpacity={props.ctrlOpacity} controlSize={props.controlSize} endCol={props.endCol} endOpacity={props.endOpacity} endSize={props.endSize} highlight={props.highlight} hoverFunc={hoverFunc}/>
                        </View>
                    
                        <View style={styles(props).tableSection}>
                        {displayCtrlTables()}
                    </View>
                        
                    <View style={styles(props).tableSection}>
                    <FieldSet label="End Point" labelColor={props.endCol}  borderColor="#000" labelStyle={styles(props).label} mainStyle={styles(props).fieldSet}>
                    <table style={styles(props).table}>
                        <tbody style={styles(props).tbody}>
                            <tr style={styles(props).tr}> 
                                <th style={styles(props).endTh}>x</th>
                                <th style={styles(props).endTh}>y</th>
                            </tr>
                            <tr style={styles(props).trWide}> 
                                    <th style={styles(props).thWide}>Relative</th>
                                </tr>
                            <tr style={styles(props).tr}>
                                <td style={hover.x?styles(props).hoverEnd:styles(props).end} onMouseEnter={()=>{hoverFunc('x')}} onMouseLeave={resetHover}>{props.info.endPoint.x}</td>
                                <td style={hover.y?styles(props).hoverEnd:styles(props).end} onMouseEnter={()=>{hoverFunc('y')}} onMouseLeave={resetHover}>{props.info.endPoint.y}</td>
                            </tr>
                            <tr style={styles(props).trWide}> 
                                <th style={styles(props).thWide}>Absolute</th>
                            </tr>
                            <tr style={styles(props).tr}>
                                <td style={hover.x?styles(props).hoverEnd:styles(props).end} onMouseEnter={()=>{hoverFunc('x')}} onMouseLeave={resetHover}>{props.info.absEndPoint.x}</td>
                                <td style={hover.y?styles(props).hoverEnd:styles(props).end} onMouseEnter={()=>{hoverFunc('y')}} onMouseLeave={resetHover}>{props.info.absEndPoint.y}</td>
                            </tr>
                        </tbody>
                    </table>
                </FieldSet>
                    </View>
                </View>
                <View style={styles(props).subCan}>
                    <Text onClick={addToPath} onMouseOver={() => hoverFunc('sub')} onMouseLeave={resetHover} style={hover.sub?styles(props).submitHover:styles(props).submitButton}>Add to path!</Text>
                    <Text onClick={closeModal} onMouseOver={() => hoverFunc('can')} onMouseLeave={resetHover} style={hover.can?styles(props).cancelHover:styles(props).cancelButton}>Cancel</Text>
                </View>
            </View>
        </Modal>
    </View>
    )
}

export default Edit;

const styles = (props) => StyleSheet.create({
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
      tableSection: {
        margin: 2
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
        marginLeft: 30,
        marginRight: -4,
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
        marginLeft: 30,
        marginRight: -4,
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
        backgroundColor: '#ddd',
        height:50,
        width: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 20
    },
    label: {
        fontFamily: 'Quicksand-Bold',
        fontSize: 15.5,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 6,
    },
    table: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        borderRadius: 6,
    },
    tbody:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tr: {
        display: 'flex',
        flexDirection: 'row',
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
        fontSize: 15,
        width: 40,
        height: 20,
        marginTop: 5,
        padding:2,
        backgroundColor: props.controlCol,
    },
    
    endTh: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1.8px solid black',
        borderRadius: 5,
        fontFamily: 'Quicksand-Medium',
        fontSize: 15,
        flex:1,
        width: 40,
        height: 20,
        marginTop: 5,
        padding:2,
        backgroundColor: props.endCol,
    },
    td: {
        display: 'flex',
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        border: '1.5px dashed grey',
        borderRadius: 5,
        fontFamily: 'Quicksand-Regular',
        fontSize: 15,
        color: props.controlCol,
        width: 40,
        height: 20,
        padding: 2
    },
    hoverTd: {
        display: 'flex',
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        border: '1.5px dashed grey',
        borderRadius: 5,
        fontFamily: 'Quicksand-Bold',
        fontSize: 14,
        color: props.controlCol,
        flex:1,
        width: 40,
        height: 20,
        padding: 2
    },
    trWide:{
        // flex: 1,
        display: 'flex',
        marginTop:2.5
    },
    thWide: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1.8px solid black',
      borderRadius: 5,
      fontFamily: 'Quicksand-Bold',
      fontSize: 14,
    //   flex:1,
      width: 80,
      height: 20,
      marginTop: 0.5,
      padding:2,
      backgroundColor: props.endCol,
    },
    ctrlWide: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1.8px solid black',
        borderRadius: 5,
        fontFamily: 'Quicksand-Bold',
        fontSize: 14,
        flex:1,
        width: 80,
        height: 20,
        marginTop: 1,
        padding:2,
        backgroundColor: props.controlCol,
      },
    end: {
        display: 'flex',
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        border: '1.5px dashed grey',
        borderRadius: 5,
        fontFamily: 'Quicksand-Regular',
        fontSize: 15,
        color: props.endCol,
        width: 40,
        height: 20,
        padding: 2
    },
    hoverEnd: {
        display: 'flex',
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        border: '1.5px dashed grey',
        borderRadius: 5,
        fontFamily: 'Quicksand-Bold',
        fontSize: 15,
        color: props.endCol,
        flex:1,
        width: 40,
        height: 20,
        padding: 2
    },
})