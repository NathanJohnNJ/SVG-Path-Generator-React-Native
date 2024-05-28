import React, { useState } from 'react';
import Grid from './grid';
import PathFromArray from './pathFromArray';
import SidePanel from './panels/sidePanel';
import ConfigPanel from './panels/configPanel';
import CommandPanel from './panels/commandPanel';
import { StyleSheet, Text, View, Pressable } from 'react-native';

const Main = (props) => {
    const [relative, setRelative] = useState(true);
    const [pathID, setPathID] = useState(0);

    const firstCMD = {
        type: relative?'c':'C',
        id: pathID,
        absX: {value: 200},
        absY: {value: 50},
        startPoint: {x: 50, y: 50},
        controlPoints: relative?[{key: 'dx1', value:50}, {key: 'dy1', value:50}, {key: 'dx2', value:100}, {key: 'dy2', value:-50}]:[{key: 'dx1', value:100}, {key: 'dy1', value:100}, {key: 'dx2', value:100}, {key: 'dy2', value:-50}],
        endPoint: relative?{x: 150,y: 0}:{x: 200,y: 50},
        command: relative?'c50,50 100,-50 150,0':'C100,100 150,0 200,50',
        absCommand: 'C100,100 150,0 200,50',
        relCommand: 'c50,50 100,-50 150,0',
        fullCommand: relative?'M50,50c50,50 100,-50 150,0':'M50,50C100,100 150,0 200,50'
    };  
    const blank = {
      type: '-',
      id: '-',
      absX: {value: '-'},
      absY: {value: '-'},
      startPoint: {x: '-', y: '-'},
      controlPoints: [{key: '-', value:'-'}],
      endPoint: {x: '-', y: '-'},
      command: '-',
      absCommand: '-',
      relCommand: '-',
      fullCommand: '-'
    }
    const [path, setPath] = useState([firstCMD]);
    const [info, setInfo] = useState(blank);
    const [firstCtrl, setFirstCtrl] = useState({});
    const [secondCtrl, setSecondCtrl] = useState({});
    const [endPoint, setEndPoint] = useState({});

    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.title}>SVG Path Generator</Text>  
        </View>
            
            <View style={styles.gridArea}>
              <View style={styles.mainCont}>
                <View style={styles.configCommands}>
                  
                  <ConfigPanel stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} setStroke={props.setStroke} setStrokeWidth={props.setStrokeWidth} setStrokeOpacity={props.setStrokeOpacity} setFill={props.setFill} setFillOpacity={props.setFillOpacity} controlCol={props.controlCol} setControlCol={props.setControlCol} ctrlOpacity={props.ctrlOpacity} setCtrlOpacity={props.setCtrlOpacity} controlSize={props.controlSize} setControlSize={props.setControlSize} endCol={props.endCol} setEndCol={props.setEndCol} endOpacity={props.endOpacity} setEndOpacity={props.setEndOpacity} endSize={props.endSize} setEndSize={props.setEndSize} highlight={props.highlight} setHighlight={props.setHighlight}/>
                  <CommandPanel path={path} setPath={setPath} relative={relative} setRelative={setRelative} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} pathID={pathID} setPathID={setPathID} info={info} setInfo={setInfo} setEndPoint={setEndPoint} setFirstCtrl={setFirstCtrl} setSecondCtrl={setSecondCtrl} endPoint={endPoint} firstCtrl={firstCtrl} secondCtrl={secondCtrl} controlCol={props.controlCol} setControlCol={props.setControlCol} ctrlOpacity={props.ctrlOpacity} setCtrlOpacity={props.setCtrlOpacity} controlSize={props.controlSize} setControlSize={props.setControlSize} endCol={props.endCol} setEndCol={props.setEndCol} endOpacity={props.endOpacity} setEndOpacity={props.setEndOpacity} endSize={props.endSize} setEndSize={props.setEndSize} highlight={props.highlight} setHighlight={props.setHighlight} />
                </View>
                <View style={styles.container}>
                  <Grid size="450" id="grid" children={<PathFromArray path={path} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} setInfo={setInfo} setEndPoint={setEndPoint} setFirstCtrl={setFirstCtrl} setSecondCtrl={setSecondCtrl} controlCol={props.controlCol} setControlCol={props.setControlCol} ctrlOpacity={props.ctrlOpacity} setCtrlOpacity={props.setCtrlOpacity} controlSize={props.controlSize} setControlSize={props.setControlSize} endCol={props.endCol} setEndCol={props.setEndCol} endOpacity={props.endOpacity} setEndOpacity={props.setEndOpacity} endSize={props.endSize} setEndSize={props.setEndSize} highlight={props.highlight} setHighlight={props.setHighlight} />} />
                  <View style={styles.fullPath}>
                  <Text style={styles.fullPathText} >Full path command: "M50,50{path.map((command, i) => {
                    return(
                      <Text key={i}>{command.command}</Text>
                    )
                  })}"</Text>
                  </View>
                </View>
                <View style={styles.configCommands}>
                <View style={styles.switcher}>
                      <Pressable onPress={() => setRelative(relative => relative)} disabled={!relative} style={!relative?styles.selected:styles.switch}><Text style={!relative?styles.selectedText:styles.switchText}>Absolute</Text></Pressable>
                      <Pressable onPress={() => setRelative(relative => !relative)} disabled={relative} style={relative?styles.selected:styles.switch}><Text style={relative?styles.selectedText:styles.switchText}>Relative</Text></Pressable>
                </View>
                <SidePanel info={info} setInfo={setInfo} firstCtrl={firstCtrl} setFirstCtrl={setFirstCtrl} secondCtrl={secondCtrl} setSecondCtrl={setSecondCtrl} endPoint={endPoint} setEndPoint={setEndPoint} relative={relative} path={path} setPath={setPath} pathID={pathID} setPathID={setPathID} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} controlCol={props.controlCol} setControlCol={props.setControlCol} ctrlOpacity={props.ctrlOpacity} setCtrlOpacity={props.setCtrlOpacity} controlSize={props.controlSize} setControlSize={props.setControlSize} endCol={props.endCol} setEndCol={props.setEndCol} endOpacity={props.endOpacity} setEndOpacity={props.setEndOpacity} endSize={props.endSize} setEndSize={props.setEndSize} highlight={props.highlight} setHighlight={props.setHighlight} />
                </View>
              </View>
            </View>
        </View>
    )
};

export default Main;

//All below checked, all are being used
const styles = StyleSheet.create({
  mainCont:{
    display: 'flex',
    flexDirection: 'row'
  },
    container: {
      display:'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    optionsContainer:{
      flex:1,
      display:'flex',
      flexDirection: 'row',
      alignContent: 'left'
    },
    configCommands: {
      display:'flex',
      flexDirection:'column'
    },
    options:{
      flex:1,
      display: 'flex',
      alignSelf: 'flex-start',
      position: 'fixed',
      left: 20
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
      commands:{
        display: 'flex',
        alignIems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        margin: 5
      },
    switch:{
      display:'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width:'fit-content',
      height:25,
      backgroundColor: '#6c6c6c',
      borderRadius: 6,
      borderColor: '#4e4e4e',
      borderWidth: 2,
      margin: 2,
      padding: 5
    },
    switchText:{
      textAlign:'center',
      color:'#4e4e4e',
      fontFamily: 'Quicksand-Regular',
      fontSize: 18,
    },
    selected:{
      display:'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width:'fit-content',
      height:25,
      borderColor: '#fff',
      borderWidth: 2,
      borderRadius: 6,
      backgroundColor: '#4e4e4e',
      margin: 2,
      padding: 5
    },
    selectedText:{
      textAlign:'center',
      color: '#ffffff',
      fontFamily: 'Quicksand-Medium',
      fontSize: 18,
      textShadow: '-1px 1px 1px #ffffff',
    },
    switcher:{
      display:'flex',
      flexDirection: 'row',
      width:250,
      height: 70,
      backgroundColor: '#eaeaea',
      borderColor: '#dbf',
      borderWidth: 3,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 22,
      boxShadow: '-2px 2px 8px #9c9c9c',
      margin: 10,
    },
    fullPath: {
      backgroundColor: '#ddd',
      borderColor: '#dff',
      borderWidth: 3,
      borderRadius: 18,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 22,
      boxShadow: '-2px 2px 8px #9c9c9c',
      margin: 10,
    },
    fullPathText: {
      fontFamily: 'Geologica-Medium',
      fontSize: 18
    }
      
})
