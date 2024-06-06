import { View, StyleSheet, Text, Pressable } from "react-native";
import { Path } from "react-native-svg";
import Grid from "../grid";

const Presets = (props) => {
    function hoverFunc(id){
        const grid = document.getElementById(id)
        grid.style.backgroundColor = "#acd";
        grid.style.borderColor = "#e9b";
        grid.style.boxShadow = "-1px 1px 10px #000";
    }
    function resetHover(id){
        const grid = document.getElementById(id)
        grid.style.backgroundColor = "#c2c2c2";
        grid.style.borderColor = "#ccf";
        grid.style.boxShadow = "-2px 2px 8px #9c9c9c";
    }

    const first = {
        type: 'l',
        absType: 'L',
        id: props.pathID+1,
        absX: 100,
        absY: 100,
        startPoint: {x: 50, y: 50},
        endPoint: {x:50, y: 50},
        absEndPoint: {x: 100, y: 100},
        command: 'l50,50',
        absCommand: 'L100,100',
        fullCommand: 'M50,50l50,50',
        fullAbsCommand: 'M50,50L100,100',
        hoverRef: "first"
    }
    const second = {
        type: 'l',
        absType: 'L',
        id: props.pathID+1,
        absX: 0,
        absY: 100,
        startPoint: {x: 50, y: 50},
        endPoint: {x:-50, y: 50},
        absEndPoint: {x: 0, y: 100},
        command: 'l-50,50',
        absCommand: 'L0,100',
        fullCommand: 'M50,50l-50,50',
        fullAbsCommand: 'M50,50L0,100',
        hoverRef: "second"
    }
    const third = {
        type: 'l',
        absType: 'L',
        id: props.pathID+1,
        absX: 75,
        absY: 200,
        startPoint: {x: 50, y: 50},
        endPoint: {x:25, y: 150},
        absEndPoint: {x: 75, y: 200},
        command: 'l25,150',
        absCommand: 'L75,200',
        fullCommand: 'M50,50l25,150',
        fullAbsCommand: 'M50,50,75,200',
        hoverRef: "third"
    }
    
    const presetArray = [first, second, third];
    function select(command){
        props.setDefaultPath(command);
        const grid = document.getElementById('createGrid');
        const path = document.getElementById('path');
        props.setEndPoint(command.endPoint);
        const svgns = "http://www.w3.org/2000/svg";
        const currentPath = document.createElementNS(svgns, 'path');
        currentPath.setAttributeNS(null, "id", 'path');
        currentPath.setAttributeNS(null, 'stroke', props.stroke);
        currentPath.setAttributeNS(null, 'stroke-width', props.strokeWidth);
        currentPath.setAttributeNS(null, 'stroke-opacity', props.strokeOpacity);
        currentPath.setAttributeNS(null, 'fill', props.fill);
        currentPath.setAttributeNS(null, 'fill-opacity', props.fillOpacity);
        currentPath.setAttributeNS(null, 'd', `M50,100l ${command.endPoint.x},${command.endPoint.y}`);
        grid.replaceChild(currentPath, path);
    }
    return(
        <View style={styles.mainContainer}>
            <Text style={styles.title}>
                Presets
            </Text>
            <View style={styles.container}>
                {
                    presetArray.map((command, i) => {
                        return(
                            <Pressable id={command.hoverRef} style={styles.gridSection} key={i+20} onPress={()=>select(command)} onHoverIn={()=>hoverFunc(command.hoverRef)} onHoverOut={()=>resetHover(command.hoverRef)}>
                                <Grid size="150" mainWidth="180" id="miniGrid" key={i}>
                                    <Path d={command.fullAbsCommand} fill={props.fill} key={i+10} fillOpacity={props.fillOpacity} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity}  />
                                </Grid>
                            </Pressable>
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
        margin: -50,
        borderRadius: 18,
        borderColor: "#ccf",
        boxShadow: "-2px 2px 8px #9c9c9c",
      },
  });