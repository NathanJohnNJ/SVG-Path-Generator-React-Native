import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import FinalPathPreview from '../finalPathPreview';
import Grid from '../grid';
import React from 'react';
import Help from '../help';

const Z = (props) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [hover, setHover] = useState({sub: false, can: false, z:false});
    const zPath = {
        type: 'z',
        id: props.pathID + 1,
        startPoint: {x:'', y: ''},
        endPoint: {x:'', y:''}
    }
    
    function openModal(){ 
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
        setHover({export: false, back: false, z:false})
    }
    
    function addToPath(){
        const newPath = props.path
        newPath.push(zPath)
        props.setPath(newPath) 
        setModalIsOpen(false)
    }
    
    return (
        <View style={styles(props).outerContainer}>
            <Pressable onPress={addToPath}>
                <Text onClick={openModal}  onMouseOver={() => hoverFunc('z')} onMouseLeave={resetHover} style={hover.z?styles(props).hover:styles(props).button}>
                    Z
                </Text>
            </Pressable>

            <Modal
            animationType="slide"
            transparent={false}
            visible={modalIsOpen}
            onReluestClose={closeModal}
            >
                <Text style={styles(props).title}>Z Command - Close Path</Text>
                <Text style={styles(props).text}>
                    Are you sure you want to add the 'Z' command. This will close your current path - connect the end of the path to the beginning with a direct, straight line. Below is a preview of how this will look...
                </Text>
                
                  <Grid size="400" mainWidth="500" id="zGrid" children={<FinalPathPreview size="400" stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} controlCol={props.controlCol} ctrlOpacity={props.ctrlOpacity} controlSize={props.controlSize} endCol={props.endCol} endOpacity={props.endOpacity} endSize={props.endSize} highlight={props.highlight} fullCommand={props.fullCommand} /> } />

                <View style={styles(props).subCan}>
                    <Text onClick={addToPath} onMouseOver={() => hoverFunc('sub')} onMouseLeave={resetHover} style={hover.sub?styles(props).submitHover:styles(props).submitButton}>Add to path!</Text>

{/* <Help url="https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths" /> */}

                    <Text onClick={closeModal} onMouseOver={() => hoverFunc('can')} onMouseLeave={resetHover} style={hover.can?styles(props).cancelHover:styles(props).cancelButton}>Cancel</Text>
                </View>
            </Modal>
        </View>
    )
};

export default Z;

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
    title:{
        fontFamily:'Geologica-Bold',
        fontSize: 30,
        textAlign: 'center',
        margin: 15
    },
    text:{
        fontFamily:'Quicksand',
        fontSize: 25,
        textAlign: 'center',
        margin: 5
    },
    subCan: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: 'center',
        marginTop: -150,
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
      mainContainer: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#ddd',
        padding: 22,
        borderRadius: 18,
        borderWidth: 3,
        borderColor: '#abd',
        height: 300
        }
})