import { useState } from 'react';
import GridWithDrag from './gridWithDrag';
import { StyleSheet, Text, View, Modal } from 'react-native';
import Tables from './tables';
import Presets from '../presetPaths/q';
import Help from '../help';

const Q = (props) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [hover, setHover] = useState({sub: false, can: false, q: false, dx1: false, dy1: false, x: false, y:false});
    
    const startX = props.path[props.pathID].endPoint.x + props.path[props.pathID].startPoint.x;
    const startY = props.path[props.pathID].endPoint.y + props.path[props.pathID].startPoint.y;    

    function openModal(){
        props.setFirstCtrl({x:25, y:50})  
        props.setEndPoint({x:50, y:0})
        setModalIsOpen(true)
    }
    function closeModal(){
        setModalIsOpen(false)
    }
    function hoverFunc(i){
        if (i==='dx1'||i==='dy1'){
            const newHover = { ...hover, dx1:true, dy1:true}
            setHover(newHover)
        }else if (i==='x'||i==='y'){
            const newHover = { ...hover, x:true, y:true}
            setHover(newHover)
        }else{
        const newHover = { ...hover, [i]: true}
        setHover(newHover)
        }
    }
    function resetHover(){
        setHover({sub: false, can: false, q: false, dx1: false, dy1: false, x: false, y:false})
    }

    const first = {
        type: 'q',
        id: props.pathID+1,
        startPoint: {x: 50, y: 50},
        controlPoints: [{key: 'dx1', value:25}, {key: 'dy1', value:50}],
        endPoint: {x:50, y: 0}
    }
    const [defaultPath, setDefaultPath] = useState(first);

    function addToPath(){
        const qPath = {
            type: 'q',
            id: props.pathID+1,
            startPoint: {x: startX, y: startY},
            controlPoints: [{key: 'dx1', value:props.firstCtrl.x}, {key: 'dy1', value:props.firstCtrl.y}],
            endPoint: {x: props.endPoint.x,y: props.endPoint.y}
        } 
        const newPath = [...props.path, qPath]
        props.setPath(newPath)
        props.setPathID(props.pathID+1)
        setModalIsOpen(false)
    }

    return (
        <View style={styles(props).outerContainer}>
            <Text onClick={openModal} onMouseOver={() => hoverFunc('q')} onMouseLeave={resetHover} style={hover.q?styles(props).hover:styles(props).button}>
                Q
            </Text>
            <Modal
            animationType="slide"
            transparent={false}
            visible={modalIsOpen}
            onRequestClose={closeModal}
            >
                <View style={styles(props).row}>
                    <Presets pathID={props.pathID} defaultPath={defaultPath} setDefaultPath={setDefaultPath} stroke={props.stroke} strokeWidth={props.strokeWidth} setFirstCtrl={props.setFirstCtrl} setEndPoint={props.setEndPoint} firstCtrl={props.firstCtrl} endPoint={props.endPoint} fill={props.fill} fillOpacity={props.fillOpacity} strokeOpacity={props.strokeOpacity} />
                    <View style={styles(props).middleSection}>
                        <View style={styles(props).titleContainer}>
                            <Text style={styles(props).title}>
                                New Q Command
                            </Text>
                        </View>
                        <View style={styles(props).container}>
                            <GridWithDrag size="250" path={defaultPath} firstCtrl={props.firstCtrl} setFirstCtrl={props.setFirstCtrl} endPoint={props.endPoint} setEndPoint={props.setEndPoint} strokeWidth={props.strokeWidth} stroke={props.stroke} fill={props.fill} fillOpacity={props.fillOpacity} strokeOpacity={props.strokeOpacity} controlCol={props.controlCol} ctrlOpacity={props.ctrlOpacity} controlSize={props.controlSize} endCol={props.endCol} endOpacity={props.endOpacity} endSize={props.endSize} highlight={props.highlight} startX={startX} startY={startY} resetHover={resetHover} hoverFunc={hoverFunc} />
                        </View>
                    </View>
                    <View style={styles(props).container}>
                        <Help url="https://svgwg.org/svg2-draft/paths.html#PathDataQuadraticBezierCommands" />
                        <Tables type="q" firstCtrl={props.firstCtrl} endPoint={props.endPoint} controlCol={props.controlCol} endCol={props.endCol} endSize={props.endSize} resetHover={resetHover} hoverFunc={hoverFunc} startX={startX} startY={startY} hover={hover} />
                    </View>
                
                </View>
                
                <View style={styles(props).subCan}>
                    <Text onClick={addToPath} onMouseOver={() => hoverFunc('sub')} onMouseLeave={resetHover} style={hover.sub?styles(props).submitHover:styles(props).submitButton}>Add to path!</Text>
                    <Text onClick={closeModal} onMouseOver={() => hoverFunc('can')} onMouseLeave={resetHover} style={hover.can?styles(props).cancelHover:styles(props).cancelButton}>Cancel</Text>
                </View>

            </Modal>
        </View>
    )
};

export default Q;

const styles = (props) => StyleSheet.create({
    outerContainer:{
    display: 'flex',
    alignItems: 'center',
    flexDirection:'column',
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
        justifyContent: 'center',
        marginTop: 20
    },
    middleSection: {
        margin: 10
    },
    titleContainer:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        width: 'fit-content',
        marginTop: 10
      },
    title:{
        fontFamily: 'Geologica-Bold',
        fontSize:30,
        marginTop: 10,
        textShadow: '-2px 2px 4px gray, 2px 2px 2px gray',
        textAlign: 'center'
      },
    subCan: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        alignSelf: 'center',
        marginTop: -150,
        marginLeft: -75,
        width: 350
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
        fontFamily: 'Quicksand-Regular',
        fontSize: 18,
        borderColor: '#4e4e4e',
        borderWidth: 2,
        borderRadius: 6,
        paddingBottom: 5,
        margin: 5,
        textAlign: 'center',
      },
    hover: {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:25,
        height:25,
        backgroundColor: '#4e4e4e',
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 6,
        textShadow: '-1px 1px 1px #ffffff',
        fontSize: 18,
        cursor: 'pointer',
        textAlign: 'center',
        paddingBottom: 5,
        margin: 5,   
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
})