import React, { useState } from 'react';
import Commands from './commands';
import WebGrid from './webGrid';
import Grid from '../new/grid';
import PathFromArray from '../new/pathFromArray';
import SidePanel from '../new/sidePanel';
import ConfigPanel from '../new/configPanel';
import CommandPanel from '../new/commandPanel';
import Edit from './edit';
import Edit2CP from './edit2CP';
import styled from 'styled-components/native';
import { StyleSheet, Text, View, Platform, Pressable } from 'react-native';

const Main = (props) => {
    const [relative, setRelative] = useState(true);
    const [startPoints, setStartPoints] = useState([]);
    const [pathID, setPathID] = useState(0);
    const [visible, setVisible] = useState(false);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [edit2ModalIsOpen, setEdit2ModalIsOpen] = useState(false);
    const firstCMD = {
        type: 'C',
        id:`path${pathID}`,
        sx: {key: 'Start x', value: 50},
        sy: {key: 'Start y', value: 50},
        dx1: {key: 'dx1', value: relative?50:100},
        dy1: {key: 'dy1', value: relative?50:100},
        dx2: {key: 'dx2', value: relative?100:150},
        dy2: {key: 'dy2', value: relative?-50:0},
        x:  {key: 'x',value: relative?150:200},
        y: {key: 'y', value: relative?0:50},
        absX: {value: 200},
        absY: {value: 50},
        startPoint: {x: 50, y: 50},
        controlPoints: relative?[{key: 'dx1', value:50}, {key: 'dy1', value:50}, {key: 'dx2', value:100}, {key: 'dy2', value:-50}]:[{key: 'dx1', value:100}, {key: 'dy1', value:100}, {key: 'dx2', value:100}, {key: 'dy2', value:-50}],
        endPoint: relative?{x: 150,y: 0}:{x: 200,y: 50},
        command: relative?'c50,50 100,-50 150,0':'C100,100 150,0 200,50',
        absCommand: 'C100,100 150,0 200,50',
        relCommand: 'c50,50 100,-50 150,0'
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
      relCommand: '-'
    }
    const [path, setPath] = useState([firstCMD]);
    const [editPath, setEditPath] = useState(firstCMD);
    const [hover, setHover] = useState(false);
    const [info, setInfo] = useState(blank);
    const [firstCtrl, setFirstCtrl] = useState({});
    const [secondCtrl, setSecondCtrl] = useState({});
    const [endPoint, setEndPoint] = useState({});

    function buttonHover(){
        setHover(true)
    }
    function buttonLeave(){
        setHover(false)
    }

    return (
      <View>
        <View style={styles.container}>
          
          <Text style={styles.title}>SVG Path Generator</Text>

            <TypeSwitcher>
                <Pressable onPress={() => setRelative(relative => !relative)} disabled={!relative} style={!relative?styles.selected:styles.switch}><Text style={!relative?styles.selectedText:styles.switchText}>Absolute</Text></Pressable>
                <Pressable onPress={() => setRelative(relative => !relative)} disabled={relative} style={relative?styles.selected:styles.switch}><Text style={relative?styles.selectedText:styles.switchText}>Relative</Text></Pressable>
            </TypeSwitcher>
            </View>
            
            <View style={styles.gridArea}>
              <View style={styles.mainCont}>
                <View style={styles.configCommands}>
                  <ConfigPanel stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} setStroke={props.setStroke} setStrokeWidth={props.setStrokeWidth} setStrokeOpacity={props.setStrokeOpacity} setFill={props.setFill} setFillOpacity={props.setFillOpacity} />
                  <CommandPanel path={path} setPath={setPath} relative={relative}/>
                </View>
                <Grid size="450" id="grid" children={<PathFromArray id={path.id} path={path} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} setInfo={setInfo} firstCtrl={firstCtrl} setFirstCtrl={setFirstCtrl} secondCtrl={secondCtrl} setSecondCtrl={setSecondCtrl} endPoint={endPoint} setEndPoint={setEndPoint} />} />
                <SidePanel path={info} firstCtrl={firstCtrl} setFirstCtrl={setFirstCtrl} secondCtrl={secondCtrl} setSecondCtrl={setSecondCtrl} endPoint={endPoint} setEndPoint={setEndPoint} />
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
      // justifyContent: 'center',
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

