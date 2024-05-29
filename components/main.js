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
        absX: 200,
        absY: 50,
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
      absX: '-',
      absY: '-',
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
        <View style={styles(props).titleContainer}>
          <Text style={styles(props).title}>SVG Path Generator</Text>  
        </View>
            
            <View style={styles(props).gridArea}>
              <View style={styles(props).mainCont}>
                <View style={styles(props).configCommands}>
                  
                  <ConfigPanel stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} setStroke={props.setStroke} setStrokeWidth={props.setStrokeWidth} setStrokeOpacity={props.setStrokeOpacity} setFill={props.setFill} setFillOpacity={props.setFillOpacity} controlCol={props.controlCol} setControlCol={props.setControlCol} ctrlOpacity={props.ctrlOpacity} setCtrlOpacity={props.setCtrlOpacity} controlSize={props.controlSize} setControlSize={props.setControlSize} endCol={props.endCol} setEndCol={props.setEndCol} endOpacity={props.endOpacity} setEndOpacity={props.setEndOpacity} endSize={props.endSize} setEndSize={props.setEndSize} highlight={props.highlight} setHighlight={props.setHighlight}/>
                 
                  <CommandPanel path={path} setPath={setPath} relative={relative} setRelative={setRelative} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} pathID={pathID} setPathID={setPathID} info={info} setInfo={setInfo} setEndPoint={setEndPoint} setFirstCtrl={setFirstCtrl} setSecondCtrl={setSecondCtrl} endPoint={endPoint} firstCtrl={firstCtrl} secondCtrl={secondCtrl} controlCol={props.controlCol} ctrlOpacity={props.ctrlOpacity} controlSize={props.controlSize} endCol={props.endCol} endOpacity={props.endOpacity} endSize={props.endSize} highlight={props.highlight}  />
                </View>
                <View style={styles(props).container}>
                  <Grid size="450" id="grid" children={<PathFromArray path={path} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} setInfo={setInfo} setEndPoint={setEndPoint} setFirstCtrl={setFirstCtrl} setSecondCtrl={setSecondCtrl} controlCol={props.controlCol} ctrlOpacity={props.ctrlOpacity} controlSize={props.controlSize} endCol={props.endCol} endOpacity={props.endOpacity} endSize={props.endSize} highlight={props.highlight}/>} />
                  
                  <View style={styles(props).fullPath}>
                  <Text numberOfLines={10} style={styles(props).fullPathText} >Relative path: "M50,50{path.map((command, i) => {
                    return(
                      <Text key={i}>{command.command}</Text>
                    )
                  })}"</Text>
                  <Text numberOfLines={10} style={styles(props).fullPathText} >Absolute path: "M50,50{path.map((command, i) => {
                    return(
                      <Text key={i}>{command.absCommand}</Text>
                    )
                  })}"</Text>
                  </View>
                </View>
                <View style={styles(props).configCommands}>
                <View style={styles(props).switcher}>
                      <Pressable onPress={() => setRelative(relative => !relative)} disabled={!relative} style={!relative?styles(props).selected:styles(props).switch}><Text style={!relative?styles(props).selectedText:styles(props).switchText}>Absolute</Text></Pressable>
                      <Pressable onPress={() => setRelative(relative => !relative)} disabled={relative} style={relative?styles(props).selected:styles(props).switch}><Text style={relative?styles(props).selectedText:styles(props).switchText}>Relative</Text></Pressable>
                </View>
                <SidePanel info={info} setInfo={setInfo} firstCtrl={firstCtrl} setFirstCtrl={setFirstCtrl} secondCtrl={secondCtrl} setSecondCtrl={setSecondCtrl} endPoint={endPoint} setEndPoint={setEndPoint} relative={relative} path={path} setPath={setPath} pathID={pathID} setPathID={setPathID} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} controlCol={props.controlCol} ctrlOpacity={props.ctrlOpacity} controlSize={props.controlSize} endCol={props.endCol} endOpacity={props.endOpacity} endSize={props.endSize} highlight={props.highlight} />
                </View>
              </View>
            </View>
        </View>
    )
};

export default Main;

//All below checked, all are being used
const styles = (props) => StyleSheet.create({
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
    titleContainer:{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      width: 'fit-content',
      textShadow: '-2px 2px 4px gray, 2px 2px 2px gray',
      marginTop: 10
    },
    title:{
      fontFamily: 'Geologica-Bold',
      fontSize:36,
      marginTop: -20
    },
    gridArea:{
      marginTop: -5
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
      width:225,
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
      padding: 4,
      boxShadow: '-2px 2px 8px #9c9c9c',
      margin: 10,
      width: 600
    },
    fullPathText: {
      fontFamily: 'Geologica-Medium',
      fontSize: 13,
      width:450,
      flex:1,
    }
      
})

