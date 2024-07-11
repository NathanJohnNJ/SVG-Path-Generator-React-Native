import { Path, G } from "react-native-svg";

const FinalPathPreview = (props) => {
    const path = props.fullCommand.concat('z')
    console.log(path);
    const viewBox = `0 0 ${props.size} ${props.size}`
    return(
        <G id="finalPreviewGroup" height={props.size} width={props.size} viewBox={viewBox} >
            <Path d={path} id="finishedPath" fill={props.fill} fillOpacity={props.fillOpacity} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} />
        </G>
    ) 
};

export default FinalPathPreview;