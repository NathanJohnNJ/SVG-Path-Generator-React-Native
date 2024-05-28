import { Path, G } from "react-native-svg";

const NewPath = (props) => {
    function pressFunc(){
        
    }
    return(
        <Path d={props.d} id="path" fill={props.fill} fillOpacity={props.fillOpacity} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} onClick={pressFunc}/>
    ) 
};

export default NewPath;