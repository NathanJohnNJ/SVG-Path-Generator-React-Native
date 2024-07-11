import { StyleSheet, View, Modal, Text } from 'react-native';
import { useState, useEffect } from 'react';
import GridWithDrag from './commands/gridWithDrag';
import Tables from './commands/tables';

const Edit = (props) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [hover, setHover] = useState({sub: false, can: false, edit:false, change:false, com:false, dx1: false, dy1: false, dx2: false, dy2: false,  x: false, y:false});
    function openModal(){
        if(props.info.type==="q"){
            props.setFirstCtrl({x:props.info.controlPoints[0].value, y:props.info.controlPoints[1].value})
            props.setEndPoint(props.info.endPoint)
        }else if(props.info.type==='c'){
            props.setFirstCtrl({x:props.info.controlPoints[0].value, y:props.info.controlPoints[1].value})
            props.setSecondCtrl({x:props.info.controlPoints[2].value, y:props.info.controlPoints[3].value})
            props.setEndPoint(props.info.endPoint)
        }else if(props.info.type==='s'){
            props.setSecondCtrl({x:props.info.controlPoints[0].value, y:props.info.controlPoints[1].value})
            props.setEndPoint(props.info.endPoint)
        }else {
            props.setEndPoint(props.info.endPoint)
        }
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
   
    function addToPath(){
        let newInfo;
        if(props.info.type==='c'){
            newInfo = {
                type: props.info.type,
                id: props.info.id,
                startPoint: {x: props.info.startPoint.x, y: props.info.startPoint.y},
                controlPoints: [{key: 'dx1', value: props.firstCtrl.x}, {key:'dy1', value: props.firstCtrl.y}, {key: 'dx2', value:props.secondCtrl.x}, {key: 'dy2', value:props.secondCtrl.y}],
                endPoint: {x: props.endPoint.x, y: props.endPoint.y},
            };
        } else if(props.info.type === 'q'){
            newInfo = {
                type: props.info.type,
                id: props.info.id,
                startPoint: {x: props.info.startPoint.x, y: props.info.startPoint.y},
                controlPoints: [{key: 'dx1', value: props.firstCtrl.x}, {key:'dy1', value: props.firstCtrl.y}],
                endPoint: {x: props.endPoint.x, y: props.endPoint.y},
            };
        } else if(props.info.type === 's'){
            newInfo = {
                type: props.info.type,
                id: props.info.id,
                startPoint: {x: props.info.startPoint.x, y: props.info.startPoint.y},
                controlPoints: [{key: 'dx2', value:props.secondCtrl.x}, {key: 'dy2', value:props.secondCtrl.y}],
                endPoint: {x: props.endPoint.x, y: props.endPoint.y},
                command: `t${props.secondCtrl.x},${props.secondCtrl.y} ${props.endPoint.x},${props.endPoint.y}`,
            };
        } else if(props.info.type === 't'){
            newInfo = {
                type: props.info.type,
                id: props.info.id,
                startPoint: {x: props.info.startPoint.x, y: props.info.startPoint.y},
                endPoint: {x: props.endPoint.x, y: props.endPoint.y},
                command: `t${props.endPoint.x},${props.endPoint.y}`,
            };
        } else if(props.info.type==="l"){
            newInfo = {
                type: props.info.type,
                id: props.info.id,
                startPoint: {x: props.info.startPoint.x, y: props.info.startPoint.y},
                endPoint: {x: props.endPoint.x, y: props.endPoint.y},
            };
        } else if(props.info.type === "h"){
            newInfo = {
                type: props.info.type,
                id: props.info.id,
                startPoint: {x: props.info.startPoint.x, y: props.info.startPoint.y},
                endPoint: {x: props.endPoint.x, y: 0},
            };
        } else if(props.info.type === "v"){
            newInfo = {
                type: props.info.type,
                id: props.info.id,
                startPoint: {x: props.info.startPoint.x, y: props.info.startPoint.y},
                endPoint: {x: 0, y: props.endPoint.y},
            };
        } 
        
        let newPath = [];
        props.path.map((command, i)=> {
            const lastCommand = newPath[i-1];
            let newCommand;
            if(i>props.info.id){
                if(command.type==="l" || command.type==="t"){
                    newCommand = {
                        type: command.type,
                        id: command.id,
                        startPoint: {x:lastCommand.endPoint.x + lastCommand.startPoint.x, y:lastCommand.endPoint.y + lastCommand.startPoint.y},
                        endPoint: {x:command.endPoint.x, y:command.endPoint.y}
                    }
                } else if(command.type==="v"){
                    newCommand = {
                        type: command.type,
                        id: command.id,
                        startPoint: {x:lastCommand.endPoint.x + lastCommand.startPoint.x, y:lastCommand.endPoint.y + lastCommand.startPoint.y},
                        endPoint: {x:0, y:command.endPoint.y}
                    }
                } else if(command.type==="h"){
                    newCommand = {
                        type: command.type,
                        id: command.id,
                        startPoint: {x:lastCommand.endPoint.x + lastCommand.startPoint.x, y:lastCommand.endPoint.y + lastCommand.startPoint.y},
                        endPoint: {x:command.endPoint.x, y:0}
                    }
                } else if (command.type==="q"){
                    newCommand = {
                        type: command.type,
                        id: command.id,
                        startPoint: {x:lastCommand.endPoint.x + lastCommand.startPoint.x, y:lastCommand.endPoint.y + lastCommand.startPoint.y},
                        controlPoints: [{key: 'dx1', value:command.controlPoints[0].value}, {key: 'dy1', value:command.controlPoints[1].value}],
                        endPoint: {x:command.endPoint.x, y:command.endPoint.y}
                    }
                } else if (command.type==="s"){
                    newCommand = {
                        type: command.type,
                        id: command.id,
                        startPoint: {x:lastCommand.endPoint.x + lastCommand.startPoint.x, y:lastCommand.endPoint.y + lastCommand.startPoint.y},
                        controlPoints: [{key: 'dx2', value:command.controlPoints[0].value}, {key: 'dy2', value:command.controlPoints[1].value}],
                        endPoint: {x:command.endPoint.x, y:command.endPoint.y}
                    }
                } else if (command.type==="c"){
                    newCommand = {
                        type: command.type,
                        id: command.id,
                        startPoint: {x:lastCommand.endPoint.x + lastCommand.startPoint.x, y:lastCommand.endPoint.y + lastCommand.startPoint.y},
                        controlPoints: [{key: 'dx1', value:command.controlPoints[0].value}, {key: 'dy1', value:command.controlPoints[1].value}, {key: 'dx2', value:command.controlPoints[2].value}, {key: 'dy2', value:command.controlPoints[3].value}],
                        endPoint: {x:command.endPoint.x, y:command.endPoint.y}
                    }
                }
                newPath.push(newCommand)
            } else if (i < props.info.id){
                newPath.push(command)
            } else {
                newPath.push(newInfo)
            }
        });
        props.setPath(newPath)
        setModalIsOpen(false) 
    }
    
    return(
        <View style={styles(props).outerContainer}>
                <Text onClick={openModal} onMouseOver={() => hoverFunc('edit')} onMouseLeave={resetHover} style={!props.showBtn?styles(props).hidden:hover.edit?styles(props).hover:styles(props).button}>
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
                            <GridWithDrag size="350" path={props.info} setPath={props.setPath} fullPath={props.path} pathID={props.info.id-1} relative={props.relative} firstCtrl={props.firstCtrl} setFirstCtrl={props.setFirstCtrl} secondCtrl={props.secondCtrl} setSecondCtrl={props.setSecondCtrl} endPoint={props.endPoint} setEndPoint={props.setEndPoint} startX={props.info.startPoint.x} startY={props.info.startPoint.y} strokeWidth={props.strokeWidth} stroke={props.stroke} fill={props.fill} fillOpacity={props.fillOpacity} strokeOpacity={props.strokeOpacity} resetHover={resetHover} controlCol={props.controlCol} ctrlOpacity={props.ctrlOpacity} controlSize={props.controlSize} endCol={props.endCol} endOpacity={props.endOpacity} endSize={props.endSize} highlight={props.highlight} hoverFunc={hoverFunc}/>
                        </View>
                        <Tables type={props.info.type} firstCtrl={props.firstCtrl} secondCtrl={props.secondCtrl} endPoint={props.endPoint} controlCol={props.controlCol} endCol={props.endCol} resetHover={resetHover} hoverFunc={hoverFunc} startX={props.info.startPoint.x} startY={props.info.startPoint.y} hover={hover} />
                    
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
    hidden:{
        display: 'none'
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
})