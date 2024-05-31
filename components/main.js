import { useState } from 'react';
import Grid from './grid';
import SidePanel from './panels/sidePanel';
import ConfigPanel from './panels/configPanel';
import CommandPanel from './panels/commandPanel';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import PathFromArray from './pathFromArray';

const Main = (props) => {
    // const [showNodes, setShowNodes] = useState(true);
    const [pathID, setPathID] = useState(0);

    const firstCMD = {
        type: 'c',
        absType: 'C',
        id: pathID,
        absX: 200,
        absY: 100,
        startPoint: {x: 50, y: 100},
        controlPoints: [{key: 'dx1', value:50}, {key: 'dy1', value:50}, {key: 'dx2', value:100}, {key: 'dy2', value:-50}],
        absControlPoints: [{key: 'dx1', value:100}, {key: 'dy1', value:150}, {key: 'dx2', value:150}, {key: 'dy2', value:50}],
        endPoint: {x: 150,y: 0},
        absEndPoint:{x: 200,y: 100},
        command:'c50,50 100,-50 150,0',
        absCommand: 'C100,150 200,50 200,100',
        fullCommand: 'M50,100c50,50 100,-50 150,0',
        fullAbsCommand: 'M50,100C100,150 150,50 200,100'
    };  
    const blank = {
      type: '-',
      absType: '-',
      id: '-',
      absX: '-',
      absY: '-',
      startPoint: {x: '-', y: '-'},
      controlPoints: [{key: '-', value:'-'}],
      endPoint: {x: '-', y: '-'},
      absControlPoints: [{key: '-', value:'-'}],
      absEndPoint: {x: '-', y: '-'},
      command: '-',
      absCommand: '-',
      fullCommand: '-',
      fullAbsCommand: '-'
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
                </View>

                <View style={styles(props).container}>
                  <Grid size="450" mainWidth="530" id="grid" children={<PathFromArray path={path} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} setInfo={setInfo} setEndPoint={setEndPoint} setFirstCtrl={setFirstCtrl} setSecondCtrl={setSecondCtrl} controlCol={props.controlCol} ctrlOpacity={props.ctrlOpacity} controlSize={props.controlSize} endCol={props.endCol} endOpacity={props.endOpacity} endSize={props.endSize} highlight={props.highlight}/>} />
                  {/* <Grid size="450" id="grid" children={<Path path={path} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} setInfo={setInfo} setEndPoint={setEndPoint} setFirstCtrl={setFirstCtrl} setSecondCtrl={setSecondCtrl} controlCol={props.controlCol} ctrlOpacity={props.ctrlOpacity} controlSize={props.controlSize} endCol={props.endCol} endOpacity={props.endOpacity} endSize={props.endSize} highlight={props.highlight} showNodes={showNodes}/>} />                   */}
                </View>

                <View style={styles(props).configCommands}>
                  <CommandPanel path={path} setPath={setPath} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} pathID={pathID} setPathID={setPathID} info={info} setInfo={setInfo} setEndPoint={setEndPoint} setFirstCtrl={setFirstCtrl} setSecondCtrl={setSecondCtrl} endPoint={endPoint} firstCtrl={firstCtrl} secondCtrl={secondCtrl} controlCol={props.controlCol} ctrlOpacity={props.ctrlOpacity} controlSize={props.controlSize} endCol={props.endCol} endOpacity={props.endOpacity} endSize={props.endSize} highlight={props.highlight}  />
                  <SidePanel info={info} setInfo={setInfo} firstCtrl={firstCtrl} setFirstCtrl={setFirstCtrl} secondCtrl={secondCtrl} setSecondCtrl={setSecondCtrl} endPoint={endPoint} setEndPoint={setEndPoint} path={path} setPath={setPath} pathID={pathID} setPathID={setPathID} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} controlCol={props.controlCol} ctrlOpacity={props.ctrlOpacity} controlSize={props.controlSize} endCol={props.endCol} endOpacity={props.endOpacity} endSize={props.endSize} highlight={props.highlight} />
                </View>
              </View>
            </View>
            <View style={styles(props).fullPath}>
              <Text numberOfLines={10} style={styles(props).fullPathText} >Relative path: "M50,100{path.map((command, i) => {
                return(
                  <Text key={i}>{command.command}</Text>
                )
              })}"</Text>
              <Text numberOfLines={10} style={styles(props).fullPathText} >Absolute path: "M50,100{path.map((command, i) => {
                return(
                  <Text key={i}>{command.absCommand}</Text>
                )
              })}"</Text>
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
      marginTop: 10
    },
    title:{
      fontFamily: 'Geologica-Bold',
      fontSize:36,
      marginTop: -20,
      textShadow: '-2px 2px 4px gray, 2px 2px 2px gray',
      borderColor: '#dff',
      borderWidth: 3,
      borderRadius: 18,
      paddingLeft: 15,
      paddingRight: 15,
      paddingTop: 3,
      paddingBottom:8,
      boxShadow: '-2px 2px 8px #9c9c9c',
      backgroundColor: '#fefefe',
      margin: 5
    },
    gridArea:{
      marginTop: -5
    },
    fullPath: {
      backgroundColor: '#eee',
      borderColor: '#dff',
      borderWidth: 3,
      borderRadius: 18,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 4,
      boxShadow: '-2px 2px 8px #9c9c9c',
      height: 80,
      margin: 5
    },
    fullPathText: {
      fontFamily: 'Geologica-Medium',
      fontSize: 13,
      width:"85%",
      flex:1,
      marginTop: 8,
      paddingLeft:4,
      paddingTop: 4,
      borderRadius: 6,
      backgroundColor: 'rgba(255, 255, 255, 0.75)',
      height: 'fit-content'
    },
})

