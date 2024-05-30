import { View, StyleSheet, Text } from "react-native";
import { useState } from 'react';
import { Svg, Path, G } from "react-native-svg";
import Grid from "../grid";

const Presets = (props) => {

    const first = {
        type: 'q',
        absType: 'Q',
        id: props.pathID+1,
        absX: 100,
        absY: 50,
        startPoint: {x: 50, y: 50},
        controlPoints: [{key: 'dx1', value:25}, {key: 'dy1', value:50}],
        absControlPoints: [{key: 'dx1', value:75}, {key: 'dy1', value:100}],
        endPoint: {x:50, y: 0},
        absEndPoint: {x: 100, y: 50},
        command: 'q25,50 50,0',
        absCommand: 'Q75,100 100,50',
        fullCommand: 'M50,50q25,50 50,0',
        fullAbsCommand: 'M50,50Q75,100 100,50'
    }
    const second = {
        type: 'q',
        absType: 'Q',
        id: props.pathID+1,
        absX: 100,
        absY: 50,
        startPoint: {x: 50, y: 50},
        controlPoints: [{key: 'dx1', value:25}, {key: 'dy1', value:-50}],
        absControlPoints: [{key: 'dx1', value:75}, {key: 'dy1', value:0}],
        endPoint: {x:50, y: 0},
        absEndPoint: {x: 100, y: 50},
        command: 'q25,-50 50,0',
        absCommand: 'Q75,0 100,50',
        fullCommand: 'M50,50q25,-50 50,0',
        fullAbsCommand: 'M50,50Q75,0 100,50'
    }
    const third = {
        type: 'q',
        absType: 'Q',
        id: props.pathID+1,
        absX: 50,
        absY: 100,
        startPoint: {x: 50, y: 50},
        controlPoints: [{key: 'dx1', value:50}, {key: 'dy1', value:-25}],
        absControlPoints: [{key: 'dx1', value:100}, {key: 'dy1', value:25}],
        endPoint: {x:0, y: 50},
        absEndPoint: {x: 50, y: 100},
        command: 'q50,-25 0,50',
        absCommand: '100,25 50,100',
        fullCommand: 'M50,50q50,-25 0,50',
        fullAbsCommand: 'M50,50Q100,25 50,100'
    }
    const fourth = {
        type: 'q',
        absType: 'Q',
        id: props.pathID+1,
        absX: 75,
        absY: 150,
        startPoint: {x: 50, y: 50},
        controlPoints: [{key: 'dx1', value:-50}, {key: 'dy1', value:-50}],
        absControlPoints: [{key: 'dx1', value:75}, {key: 'dy1', value:100}],
        endPoint: {x:25, y: 100},
        absEndPoint: {x: 75, y: 150},
        command: 'q-50,-50 25,100',
        absCommand: 'Q0,0 75,150',
        fullCommand: 'M50,50q-50,-50 25,100',
        fullAbsCommand: 'M50,50Q0,0 75,150'
    }
    const presetArray = [first, second, third, fourth]
    // const [defaultPath, setDefaultPath] = useState(firstDefault)
    return(
        <View style={styles.mainContainer}>
            <Text style={styles.title}>
                Presets
            </Text>
            <View style={styles.container}>
                {
                    presetArray.map((command, i) => {
                        return(
                            <View style={styles.gridSection} key={i+20}>
                                <Grid size="150" mainWidth="180" id="miniGrid" key={i}>
                                    <Path d={command.fullAbsCommand} fill={props.fill} key={i+10} fillOpacity={props.fillOpacity} stroke={props.stroke} strokeWidth="5" />
                                </Grid>
                            </View>
                        )
                    })
                }
            </View>
        </View>
    )
};

export default Presets;

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Quicksand-Bold',
        fontSize: 20,
        textShadow: '-1px 1px 2px gray, 1px 1px 1px gray',
        marginTop: -20
    },
    mainContainer:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#c2c2c2',
        borderColor: '#caf',
        borderWidth: 3,
        borderRadius: 18,
        boxShadow: '-2px 2px 8px #9c9c9c',
        padding: 5,
        height: 480,
        marginTop: 10
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      },
    gridSection:{
        scale: 0.5,
        margin: -50
      }
  });