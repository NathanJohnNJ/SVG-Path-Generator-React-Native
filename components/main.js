import { useState } from 'react';
import Grid from './grid';
import SidePanel from './panels/sidePanel';
import ConfigPanel from './panels/configPanel';
import CommandPanel from './panels/commandPanel';
import { StyleSheet, Text, View } from 'react-native';
// import PathFromArray from './pathWithNodes';
import PathFromArray from './pathFromArray';
import NodePanel from './panels/nodePanel';
import Test from './panels/testDrag';
const Main = (props) => {

    const blank = {
      type: '',
      id: '',
      startPoint: {x: '', y: ''},
      endPoint: {x: '', y: ''}
    }
   
    const [info, setInfo] = useState(blank);
    const [showBtn, setShowBtn] = useState(false);
    const [firstCtrl, setFirstCtrl] = useState({});
    const [secondCtrl, setSecondCtrl] = useState({});
    const [endPoint, setEndPoint] = useState({});
    const size = 450

    const commandFromMap = props.path.map((command, i) => {
      if(command.type==="c"){
        return(
          `${command.type}${command.controlPoints[0].value},${command.controlPoints[1].value} ${command.controlPoints[2].value},${command.controlPoints[3].value} ${command.endPoint.x},${command.endPoint.y}`
        )
      } else if(command.type==="q" || command.type==="s"){
        return(
          `${command.type}${command.controlPoints[0].value},${command.controlPoints[1].value} ${command.endPoint.x},${command.endPoint.y}`
        )
      } else if(command.type==="t" || command.type==="l"){
        return(
          `${command.type}${command.endPoint.x},${command.endPoint.y}`
        )
      } else if(command.type==="v"){
        return(
          `${command.type}${command.endPoint.y}`
        )
      } else if(command.type==="h"){
        return(
          `${command.type}${command.endPoint.x}`
        )
      }
    });

    const fullCommand = `M50,50${commandFromMap}`;

    const absoluteCommandFromMap = props.path.map((command, i) => {
      if(command.type==="c"){
        return(
          `${command.type.toUpperCase()}${command.controlPoints[0].value+command.startPoint.x},${command.controlPoints[1].value+command.startPoint.y} ${command.controlPoints[2].value+command.startPoint.x},${command.controlPoints[3].value+command.startPoint.y} ${command.endPoint.x+command.startPoint.x},${command.endPoint.y+command.startPoint.y}`
        )
      } else if(command.type==="q" || command.type==="s"){
        return(
          `${command.type.toUpperCase()}${command.controlPoints[0].value+command.startPoint.x},${command.controlPoints[1].value+command.startPoint.y} ${command.endPoint.x+command.startPoint.x},${command.endPoint.y+command.startPoint.y}`
        )
      } else if(command.type==="t" || command.type==="l"){
        return(
          `${command.type.toUpperCase()}${command.endPoint.x+command.startPoint.x},${command.endPoint.y+command.startPoint.y}`
        )
      } else if(command.type==="v"){
        return(
          `${command.type.toUpperCase()}${command.endPoint.y+command.startPoint.y}`
        )
      } else if(command.type==="h"){
        return(
          `${command.type.toUpperCase()}${command.endPoint.x+command.startPoint.x}`
        )
      }
    });

    const fullAbsCommand= `M50,50${absoluteCommandFromMap}`;

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
                  <Grid size={size} mainWidth="530" id="grid" children={<PathFromArray size={size} path={props.path} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} setInfo={setInfo} setEndPoint={setEndPoint} setFirstCtrl={setFirstCtrl} setSecondCtrl={setSecondCtrl} controlCol={props.controlCol} ctrlOpacity={props.ctrlOpacity} controlSize={props.controlSize} endCol={props.endCol} endOpacity={props.endOpacity} endSize={props.endSize} highlight={props.highlight} setShowBtn={setShowBtn} endPoint={endPoint} firstCtrl={firstCtrl} secondCtrl={secondCtrl} /> } />
                </View>

                <View style={styles(props).configCommands}>
                  <View style={styles(props).boxRow}>
                    <CommandPanel path={props.path} setPath={props.setPath} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} pathID={props.pathID} setPathID={props.setPathID} info={info} setInfo={setInfo} setEndPoint={setEndPoint} setFirstCtrl={setFirstCtrl} setSecondCtrl={setSecondCtrl} endPoint={endPoint} firstCtrl={firstCtrl} secondCtrl={secondCtrl} controlCol={props.controlCol} ctrlOpacity={props.ctrlOpacity} controlSize={props.controlSize} endCol={props.endCol} endOpacity={props.endOpacity} endSize={props.endSize} highlight={props.highlight} fullCommand={fullCommand}/>
                    <NodePanel path={props.path} fullAbsCommand={fullAbsCommand} controlCol={props.controlCol} endCol={props.endCol} fill={props.fill} fillOpacity={props.fillOpacity} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity}/>
                  </View>
                  <SidePanel info={info} setInfo={setInfo} firstCtrl={firstCtrl} setFirstCtrl={setFirstCtrl} secondCtrl={secondCtrl} setSecondCtrl={setSecondCtrl} endPoint={endPoint} setEndPoint={setEndPoint} path={props.path} setPath={props.setPath} pathID={props.pathID} setPathID={props.setPathID} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} controlCol={props.controlCol} ctrlOpacity={props.ctrlOpacity} controlSize={props.controlSize} endCol={props.endCol} endOpacity={props.endOpacity} endSize={props.endSize} highlight={props.highlight} showBtn={showBtn} />
                </View>
              </View>
            </View>
            
            <View style={styles(props).fullPath}>
              <Text numberOfLines={10} style={styles(props).fullPathText} >Relative path: "{fullCommand}"</Text>
              <Text numberOfLines={10} style={styles(props).fullPathText} >Absolute path: "{fullAbsCommand}"</Text>
              </View>
              <Test />
        </View>
    )
};

export default Main;

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
    boxRow:{
      display: 'flex',
      flexDirection: 'row',
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
      paddingBottom: 10,
      boxShadow: '-2px 2px 8px #9c9c9c',
      height: 120,
      margin: 5,
      
    },
    fullPathText: {
      fontFamily: 'Geologica-Medium',
      fontSize: 13,
      width:"95%",
      flex:1,
      marginTop: 8,
      paddingLeft:4,
      paddingTop: 4,
      borderRadius: 6,
      backgroundColor: 'rgba(255, 255, 255, 0.75)',
      height: 40,
      overflow: 'scroll'
    },
})

