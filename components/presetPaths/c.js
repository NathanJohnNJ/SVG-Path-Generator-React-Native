import { View, StyleSheet, Text, Pressable } from "react-native";
import { Path } from "react-native-svg";
import Grid from "../grid";

const Presets = (props) => {

    const first = {
        type:'c',
        absType: 'C',
        id: props.pathID+1,
        absX: 150,
        absY: 50,
        startPoint: {x: 50, y: 50},
        controlPoints: [{key: 'dx1', value:25}, {key: 'dy1', value:50}, {key: 'dx2', value:75}, {key: 'dy2', value:50}],
        absControlPoints: [{key: 'dx1', value:75}, {key: 'dy1', value:100}, {key: 'dx2', value:125}, {key: 'dy2', value:100}],
        endPoint: {x: 100, y: 0},
        absEndPoint: {x: 150, y: 50},
        command: 'c25,50 75,50 100,0',
        absCommand: 'C75,100 125,100 150,50',
        fullCommand: 'M50,50c25,50 75,50 100,0',
        fullAbsCommand: 'M50,50C75,100 125,100 150,50'
    }
    const second = {
        type: 'c',
        absType: 'C',
        id: props.pathID+1,
        absX: 150,
        absY: 50,
        startPoint: {x: 50, y: 50},
        controlPoints: [{key: 'dx1', value:50}, {key: 'dy1', value:50}, {key: 'dx2', value:100}, {key: 'dy2', value:-50}],
        absControlPoints: [{key: 'dx1', value:75}, {key: 'dy1', value:100}, {key: 'dx2', value:125}, {key: 'dy2', value:0}],
        endPoint: {x: 125,y: 0},
        absEndPoint:{x: 150,y: 50},
        command:'c50,50 100,-50 150,0',
        absCommand: 'C75,100 125,0 175,50',
        fullCommand: 'M25,50c50,50 100,-50 125,0',
        fullAbsCommand: 'M25,50C75,100 125,0 150,50'
    }
    const third = {
        type:'c',
        absType: 'C',
        id: props.pathID+1,
        absX: 125,
        absY: 125,
        startPoint: {x: 50, y: 50},
        controlPoints: [{key: 'dx1', value:25}, {key: 'dy1', value:50}, {key: 'dx2', value:75}, {key: 'dy2', value:0}],
        absControlPoints: [{key: 'dx1', value:75}, {key: 'dy1', value:100}, {key: 'dx2', value:125}, {key: 'dy2', value:50}],
        endPoint: {x: 100, y: 75},
        absEndPoint: {x: 150, y: 125},
        command: 'c25,50 75,0 100,75',
        absCommand: 'C75,100 125,50 150,125',
        fullCommand: 'M50,50c25,50 75,0 100,175',
        fullAbsCommand: 'M50,50C75,100 125,50 150,125'
    }
    const fourth = {
        type:'c',
        absType: 'C',
        id: props.pathID+1,
        absX: 50,
        absY: 125,
        startPoint: {x: 100, y: 50},
        controlPoints: [{key: 'dx1', value:25}, {key: 'dy1', value:50}, {key: 'dx2', value:-25}, {key: 'dy2', value:100}],
        absControlPoints: [{key: 'dx1', value:125}, {key: 'dy1', value:100}, {key: 'dx2', value:75}, {key: 'dy2', value:150}],
        endPoint: {x: -50, y: 75},
        absEndPoint: {x: 50, y: 125},
        command: 'c25,50 -25,100 -50,75',
        absCommand: 'C125,100 75,150 50,125',
        fullCommand: 'M100,50c25,50 -25,100 -50,75',
        fullAbsCommand: 'M100,50C125,100 75,150 50,125'
    }
    const presetArray = [first, second, third, fourth]
    // const [defaultPath, setDefaultPath] = useState(firstDefault)
    function select(command){
        props.setDefaultPath(command)
        const grid = document.getElementById('createGrid')
        const path = document.getElementById('path')
        // grid.removeChild(path)
        props.setFirstCtrl({x:command.controlPoints[0].value, y:command.controlPoints[1].value})
        props.setSecondCtrl({x:command.controlPoints[2].value, y:command.controlPoints[3].value})
        props.setEndPoint(command.endPoint)
        const svgns = "http://www.w3.org/2000/svg"
        const currentPath = document.createElementNS(svgns, 'path');
        currentPath.setAttributeNS(null, "id", 'path');
        currentPath.setAttributeNS(null, 'stroke', props.stroke);
        currentPath.setAttributeNS(null, 'stroke-width', props.strokeWidth);
        currentPath.setAttributeNS(null, 'stroke-opacity', props.strokeOpacity);
        currentPath.setAttributeNS(null, 'fill', props.fill);
        currentPath.setAttributeNS(null, 'fill-opacity', props.fillOpacity);
        currentPath.setAttributeNS(null, 'd', `M50,100c${props.firstCtrl.x},${props.firstCtrl.y} ${props.secondCtrl.x},${props.secondCtrl.y} ${props.endPoint.x},${props.endPoint.y}`)
        grid.replaceChild(currentPath, path)
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
                            <Pressable style={styles.gridSection} key={i+20} onPress={()=>select(command)}>
                                <Grid size="150" mainWidth="180" id="miniGrid" key={i}>
                                    <Path d={command.fullAbsCommand} fill={props.fill} key={i+10} fillOpacity={props.fillOpacity} stroke={props.stroke} strokeWidth="5" />
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
      }
  });