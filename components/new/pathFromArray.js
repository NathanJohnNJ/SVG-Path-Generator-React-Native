import { Path, G } from "react-native-svg";
import { useState } from 'react';

const PathFromArray = (props) => {
    const [hover, setHover] = useState(false);
    const hoverWidth = props.strokeWidth*2;
    const hoverColour = '#08f';

    function pressFunc(path){
        props.setInfo(path)
        if(path.type==="Q"){
            props.setFirstCtrl({x: path.controlPoints.dx1, y: path.controlPoints.dy1})
            props.setEndPoint({x: path.endPoint.x, y: path.endPoint.y})
        } else if (props.type==="C"){
            props.setFirstCtrl({x: path.controlPoints.dx1, y: path.controlPoints.dy1})
            props.setSecondCtrl({x: path.controlPoints.dx2, y: path.controlPoints.dy2})
            props.setEndPoint({x: path.endPoint.x, y: path.endPoint.y})
        } else{
            props.setEndPoint({x: path.endPoint.x, y: path.endPoint.y})
        }
    }

    return(
        <G id="pathGroup">
            {
                props.path.map((currentPath, i) => {
                    const d = `M50,50${currentPath.command}`
                    return(
                        <Path d={d} id={currentPath.id} key={i} fill={props.fill} fillOpacity={props.fillOpacity} stroke={hover?hoverColour:props.stroke} strokeWidth={hover?hoverWidth:props.strokeWidth} strokeOpacity={props.strokeOpacity} onClick={()=>pressFunc(currentPath)} onMouseOver={() => setHover(hover => !hover)} onMouseLeave={() => setHover(hover => !hover)} />
                    )
                })
            }
        </G>
    ) 
};

export default PathFromArray;