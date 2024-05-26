import { Path, G } from "react-native-svg";

const Path = (props) => {
    function pressFunc(){
        
    }
    return(
        <Path d={props.d} fill={props.fill} fillOpacity={props.fillOpacity} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} onClick={pressFunc}/>
    ) 
};

export default Path;