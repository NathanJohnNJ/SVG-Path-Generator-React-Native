import { Path, G } from "react-native-svg";

const FullPath = (props) => {
    const viewBox = `0 0 ${props.size} ${props.size}`
    let fullPath = 'M50,50'
    props.path.map((currentPath, i) => {
        fullPath += currentPath.fullCommand
        return fullPath
    })


    
    return(
        <G id="fullPath"  height={props.size} width={props.size} viewBox={viewBox}>
            <Path fill={props.fill} fillOpacity={props.fillOpacity} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} x="0" y="0" d={fullPath} />
        </G>
    ) 
};

export default FullPath;