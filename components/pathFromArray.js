import { Path, G } from "react-native-svg";

const PathFromArray = (props) => {
    const hoverWidth = props.strokeWidth*2;
    const hoverColour = props.highlight;

    function hoverFunc(id){
        const i = document.getElementById(id)
        i.setAttributeNS(null, 'stroke-width', hoverWidth)
        i.setAttributeNS(null, 'stroke', hoverColour)
    }
    function resetHover(id){
        const i = document.getElementById(id)
        i.setAttributeNS(null, 'stroke-width', props.strokeWidth)
        i.setAttributeNS(null, 'stroke', props.stroke)
    }

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
                    const d = currentPath.fullCommand
                    return(
                        <Path d={d} id={currentPath.id} key={i} fill={props.fill} fillOpacity={props.fillOpacity} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} onClick={()=>pressFunc(currentPath)} onMouseOver={() => hoverFunc(currentPath.id)} onMouseLeave={() => resetHover(currentPath.id)} />
                    )
                })
            }
        </G>
    ) 
};

export default PathFromArray;