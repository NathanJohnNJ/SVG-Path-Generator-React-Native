import { StyleSheet, View } from 'react-native';
import Svg, { G, Rect, Defs, Pattern, Line } from "react-native-svg";
import Draggable from './draggable';


const Grid = (props) => {
    
    const viewBox = `0 0 ${props.size} ${props.size}`
    return(
        <View style={styles(props).grid}>
            <Svg id={props.id} width={props.size} height={props.size} viewBox={viewBox} x="0" y="0" onMouseMove={props.onMouseMove?props.onMouseMove:null} onMouseLeave={props.onMouseLeave?props.onMouseLeave:null}>
                <Defs>
                    <Pattern
                    id="LinePattern"
                    patternUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10">
                        <Line x1="0" y1="0" x2="0" y2={props.size} stroke='#bbb'  />
                        <Line x1="0" y1="0" x2={props.size} y2="0" stroke='#bbb'  />
                    </Pattern>
                    <Pattern
                    id="ThickLinePattern"
                    patternUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="50"
                    height="50"
                    viewBox="0 0 50 50">
                        <Line x1="0" y1="0" x2="0" y2={props.size} stroke='#bbb' strokeWidth="5" />
                        <Line x1="0" y1="0" x2={props.size} y2="0" stroke='#bbb' strokeWidth="5" />
                    </Pattern>
                </Defs>
                <G>
                <Rect fill="url(#LinePattern)" stroke="#bbb" strokeWidth="2" x="0" y="0" width={props.size} height={props.size} />
                <Rect fill="url(#ThickLinePattern)" stroke="#bbb" strokeWidth="5" x="0" y="0" width={props.size} height={props.size} />
                </G>
                {props.children}
                {/* <Draggable initialX="150" initialY="150" /> */}
            </Svg>
        </View>
    )
};

export default Grid;

const styles =  (props) => StyleSheet.create({
    grid:{
        backgroundColor: '#f2f2f2',
        borderColor: '#acf',
        borderWidth: 3,
        borderRadius: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        boxShadow: '-2px 2px 8px #9c9c9c',
        margin: 10,
        width: props.mainWidth                                         
    }
})