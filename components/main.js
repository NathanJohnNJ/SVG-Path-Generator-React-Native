import { useState, useRef, useEffect } from 'react';
import Commands from './commands';
import WebGrid from './webGrid';
import MobileGrid from './mobGrid';
import Edit from './edit';
import Config from './configurations';
import styled from 'styled-components/native';
import { StyleSheet, Text, View, Platform, Pressable, Modal } from 'react-native';
import React from 'react';

const Main = (props) => {
    const [startPoints, setStartPoints] = useState([]);
    const [pathID, setPathID] = useState(1);
    const [relative, setRelative] = useState(true);
    const [visible, setVisible] = useState(false);
    const [strokeWidth, setStrokeWidth] = useState(3);
    const [stroke, setStroke] = useState('#444');
    const [fill, setFill] = useState('none');
    const [strokeOpacity, setStrokeOpacity] = useState(1);
    const [fillOpacity, setFillOpacity] = useState(1);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const gridRef = useRef();
    const firstCMD = {
        type: 'C',
        id:pathID,
        sx: {key: 'Start x', value: 50},
        sy: {key: 'Start y', value: 50},
        dx1: {key: 'dx1', value: relative?50:100},
        dy1: {key: 'dy1', value: relative?50:100},
        dx2: {key: 'dx2', value: relative?100:150},
        dy2: {key: 'dy2', value: relative?-50:0},
        x:  {key: 'x',value: relative?150:200},
        y: {key: 'y', value: relative?0:50},
        command: relative?'c50,50 100,-50 150,0':'C100,100 150,0 200,50',
        absCommand: 'C100,100 150,0 200,50',
        relCommand: 'c50,50 100,-50 150,0',
        editCommand: 'M50,100c50,50 100,-50 150,0'
    }
    const [path, setPath] = useState([firstCMD]);
    const [editPath, setEditPath] = useState(firstCMD);
    const [hover, setHover] = useState(false);

    function buttonHover(){
        setHover(true)
    }
    function buttonLeave(){
        setHover(false)
    }
    
    // function displayGrid(){
    //   if (Platform.OS !== 'web'){
    //     return(
    //       <MobileGrid size="400" path={path} relative={relative} startPoints={startPoints} setStartPoints={setStartPoints} pathID={pathID} setPathID={setPathID} stroke={stroke} setStroke={setStroke} strokeWidth={strokeWidth} setStrokeWidth={setStrokeWidth} fill={fill} setFill={setFill} fillOpacity={fillOpacity} setFillOpacity={setFillOpacity} strokeOpacity={setStrokeOpacity} setStrokeOpacity={setStrokeOpacity} gridRef={gridRef} setEditModalIsOpen={setEditModalIsOpen} editModalIsOpen={editModalIsOpen} editPath={editPath} setEditPath={setEditPath} />
    //     )
    //   }else{
    //     return(
    //       <WebGrid strokeWidth={strokeWidth} setStrokeWidth={setStrokeWidth} size="500" path={path} relative={relative} startPoints={startPoints} setStartPoints={setStartPoints} pathID={pathID} setPathID={setPathID} stroke={stroke} setStroke={setStroke} fill={fill} fillOpacity={fillOpacity} strokeOpacity={strokeOpacity} gridRef={gridRef} setEditModalIsOpen={setEditModalIsOpen} editModalIsOpen={editModalIsOpen}  editPath={editPath} setEditPath={setEditPath}/>
    //     )
    //   }
    // }
    function editFunc(path){
      setEditPath(path)
      setEditModalIsOpen(true)
    }

    return (
      <View>
        <View style={styles.container}>
          
          <Text style={styles.title}>SVG Path Generator</Text>

            <TypeSwitcher>
                <Pressable onPress={() => setRelative(relative => !relative)} disabled={!relative} style={!relative?styles.selected:styles.switch}><Text style={!relative?styles.selectedText:styles.switchText}>Absolute</Text></Pressable>
                <Pressable onPress={() => setRelative(relative => !relative)} disabled={relative} style={relative?styles.selected:styles.switch}><Text style={relative?styles.selectedText:styles.switchText}>Relative</Text></Pressable>
            </TypeSwitcher>

            <View style={styles.buttonsRow}>
              <Pressable id="commandBtn" onPress={() => setVisible(visible => !visible)} onMouseOver={buttonHover} onMouseLeave={buttonLeave} style={[hover?styles.hover:styles.button, !visible?styles.visible:styles.hidden]}><Text>+</Text></Pressable>
            
                <View style={[styles.commands, visible?styles.visible:styles.hidden]} id="commandBtns">
                    <Commands strokeWidth={strokeWidth} relative={relative} path={path} setPath={setPath} pathID={pathID} setPathID={setPathID} startPoints={startPoints} setStartPoints={setStartPoints} stroke={stroke} fill={fill} gridRef={gridRef} strokeOpacity={strokeOpacity} fillOpacity={fillOpacity}/>
                    
                    <Pressable id="close" onPress={() => setVisible(visible => !visible)} onMouseOver={buttonHover} onMouseLeave={buttonLeave} style={[hover?styles.hoverClose:styles.close, Platform.OS==='web'?styles.web:styles.mobile, visible?styles.visible:styles.hidden]}><Text style={styles.closeBtn}>X</Text></Pressable>
                </View>

                
             </View>
             </View>
             <View style={styles.optionsContainer}>
             <View style={styles.options} id="options">
                  <Config stroke={stroke} setStroke={setStroke} path={path} fill={fill} setFill={setFill} strokeWidth={strokeWidth} setStrokeWidth={setStrokeWidth} strokeOpacity={strokeOpacity} setStrokeOpacity={setStrokeOpacity} fillOpacity={fillOpacity} setFillOpacity={setFillOpacity} />
                </View>
              </View>
            
            <View style={styles.gridArea}>
              {/* {displayGrid()} */}
              <WebGrid strokeWidth={strokeWidth} setStrokeWidth={setStrokeWidth} size="500" path={path} relative={relative} startPoints={startPoints} setStartPoints={setStartPoints} pathID={pathID} setPathID={setPathID} stroke={stroke} setStroke={setStroke} fill={fill} fillOpacity={fillOpacity} strokeOpacity={strokeOpacity} gridRef={gridRef} setEditModalIsOpen={setEditModalIsOpen} editModalIsOpen={editModalIsOpen}  editPath={editPath} setEditPath={setEditPath} editFunc={editFunc}/>
            </View>

            <View>
              <Text>
                Stroke: {stroke}
                Width: {strokeWidth}
              </Text>
            </View>
              <Edit path={editPath} strokeWidth={strokeWidth} size="300" relative={relative} startPoints={startPoints} setStartPoints={setStartPoints} pathID={pathID} setPathID={setPathID} stroke={stroke} fill={fill} fillOpacity={fillOpacity} strokeOpacity={strokeOpacity} gridRef={gridRef} setEditModalIsOpen={setEditModalIsOpen} editModalIsOpen={editModalIsOpen}  editPath={editPath} editFunc={editFunc}/>
        </View>
    )
};

export default Main;

//All below checked, all are being used
const styles = StyleSheet.create({
    container: {
      display:'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    optionsContainer:{
      flex:1,
      display:'flex',
      flexDirection: 'row',
      alignContent: 'left'
    },
    options:{
      flex:1,
      display: 'flex',
      alignSelf: 'flex-start',
      position: 'fixed',
      left: 20
    },
    buttonsRow: {
      display: 'flex',
      flexDirection: 'row'
    },
    title:{
      fontFamily: 'Quicksand-Bold',
      fontSize:36,
      marginTop: -20
    },
    visible:{
      display:'flex'
    },
    hidden:{
      display:'none'
    },
    closeBtn:{
      width: 25,
      color: '#fff',
      textAlign: 'center',
      fontFamily: 'Quicksand-Medium'
    },
    gridArea:{
      marginTop: -5
    },
    position: {
      marginTop: -250,
      fontFamily: 'Quicksand-Bold',
      fontSize: 16
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
        textAlign: 'center',
        fontFamily: 'Quicksand-Bold',
        fontSize: 18,
        borderRadius: 5,
        margin: 5
      },
      mobile:{
        textShadowOffset: {x:'-1px', y:'-1px'},
        textShadowColor: '#4e4e4e',
        textShadowRadius: 1,
      },
      web:{ 
        textShadow: '-1px 1px 1px #4e4e4e',
        cursor: 'pointer',
        color:'red' 
      },
      hover: {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:'auto',
        height:25,
        width: 25,
        color:'#ffffff',
        backgroundColor: '#4e4e4e',
        textAlign: 'center',
        fontFamily: 'Quicksand-Regular',
        fontSize: 18,
        borderRadius: 5,
        margin: 5
      },
      close: {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:'auto',
        height:25,   
        color:'#4e4e4e',
        backgroundColor: '#200000',
        textAlign: 'center',
        textShadow: '-1px 1px 1px #4e4e4e',
        textShadowOffset: {x:'-1px', y:'-1px'},
        textShadowColor: '#4e4e4e',
        textShadowRadius: 1,
        fontFamily: 'Quicksand-Regular',
        fontSize: 18,
        borderRadius: 5,
        margin: 5
      },
      hoverClose: {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:'auto',
        height:25,   
        color:'#200000',
        backgroundColor: '#4e4e4e',
        textAlign: 'center',
        textShadow: '-1px -1px 1px #200000',
        fontFamily: 'Quicksand-Regular',
        fontSize: 18,
        borderRadius: 5,
        margin: 5
      },
      switch:{
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:'auto',
        height:25,
        backgroundColor: '#0e0e0e',
        borderRadius: 5,
        borderColor: '#6c6c6c',
        borderWidth: 2,
        marginTop: 10,
      },
      switchText:{
        textAlign:'center',
        color:'#6c6c6c',
        fontFamily: 'Quicksand-Regular',
        fontSize: 15,
      },
      selected:{
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:'auto',
        height:25,
        borderRadius: 5,
        backgroundColor: '#6c6c6c',
        marginTop: 10,
      },
      selectedText:{
        textAlign:'center',
        color: '#ffffff',
        fontFamily: 'Quicksand-Regular',
        fontSize: 15,
        textShadowOffset: {x:'-2px', y:'2px'},
        textShadowColor: '#0e0e0e',
        textShadowRadius: 3,
      },
      commands:{
        display: 'flex',
        alignIems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        margin: 5
      },
      
})



const TypeSwitcher = styled.View`
    display:flex;
    flex-direction: row;
    width:'auto'; 
    height: 20px;
    margin: 20px
`

