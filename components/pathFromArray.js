import { Path, G, Defs, ClipPath, Rect, Svg } from "react-native-svg";

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
        props.setShowBtn(true)
        if(path.type==="q" || path.type==="s"){
            props.setFirstCtrl({x: path.controlPoints[0].value, y: path.controlPoints[1].value})
            props.setEndPoint({x: path.endPoint.x, y: path.endPoint.y})
        } else if (props.type==="c"){
            props.setFirstCtrl({x: path.controlPoints.dx1, y: path.controlPoints.dy1})
            props.setSecondCtrl({x: path.controlPoints.dx2, y: path.controlPoints.dy2})
            props.setEndPoint({x: path.endPoint.x, y: path.endPoint.y})
        } else{
            props.setEndPoint({x: path.endPoint.x, y: path.endPoint.y})
        }
    }
    const viewBox = `0 0 ${props.size} ${props.size}`
    
    return(
      <G id="pathGroup" height={props.size} width={props.size} viewBox={viewBox} >
        {
          props.path.map((command, i) => {
            let d;
            if(command.type==="c"){
              d = `M${command.startPoint.x},${command.startPoint.y}${command.type}${command.controlPoints[0].value},${command.controlPoints[1].value} ${command.  controlPoints[2].value},${command.controlPoints[3].value} ${command.endPoint.x},${command.endPoint.y}`;
              return(
                <Path d={d} id={command.id} key={i} fill={props.fill} fillOpacity={props.fillOpacity} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} onClick={()=>pressFunc(command)} onMouseOver={() => hoverFunc(command.id)} onMouseLeave={() => resetHover(command.id)} />
              )
            } else if(command.type==="q" || command.type==="s"){
              d = `M${command.startPoint.x},${command.startPoint.y}${command.type}${command.controlPoints[0].value},${command.controlPoints[1].value} ${command.endPoint.x},${command.endPoint.y}`;
              return(
                <Path d={d} id={command.id} key={i} fill={props.fill} fillOpacity={props.fillOpacity} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} onClick={()=>pressFunc(command)} onMouseOver={() => hoverFunc(command.id)} onMouseLeave={() => resetHover(command.id)} />
              )
            } else if(command.type==="l"){
              d = `M${command.startPoint.x},${command.startPoint.y}${command.type}${command.endPoint.x},${command.endPoint.y}`;
              return(
                <Path d={d} id={command.id} key={i} fill={props.fill} fillOpacity={props.fillOpacity} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} onClick={()=>pressFunc(command)} onMouseOver={() => hoverFunc(command.id)} onMouseLeave={() => resetHover(command.id)} />
              )
            } else if(command.type==="v"){
              d = `M${command.startPoint.x},${command.startPoint.y}${command.type}${command.endPoint.y}`;
              return(
                <Path d={d} id={command.id} key={i} fill={props.fill} fillOpacity={props.fillOpacity} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} onClick={()=>pressFunc(command)} onMouseOver={() => hoverFunc(command.id)} onMouseLeave={() => resetHover(command.id)} />
              )
            } else if(command.type==="h"){
              d = `M${command.startPoint.x},${command.startPoint.y}${command.type}${command.endPoint.x}`;
              return(
                <Path d={d} id={command.id} key={i} fill={props.fill} fillOpacity={props.fillOpacity} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} onClick={()=>pressFunc(command)} onMouseOver={() => hoverFunc(command.id)} onMouseLeave={() => resetHover(command.id)} />
              )
            } 
            else if(command.type==="t"){
              d = `M${props.path[command.id-1].startPoint.x},${props.path[command.id-1].startPoint.y}q${props.path[command.id-1].controlPoints[0].value},${props.path[command.id-1].controlPoints[1].value} ${props.path[command.id-1].endPoint.x},${props.path[command.id-1].endPoint.y}t${command.endPoint.x},${command.endPoint.y}`
              const width = props.size-props.path[command.id-1].startPoint.x
              return(
                <Svg key={i+200}  height={props.size} width={props.size} viewBox={viewBox} x="0" y="0">
                  <Defs>
                    <ClipPath id="clip">
                      <Rect x={props.path[command.id-1].startPoint.x+props.path[command.id-1].endPoint.x} y="0" width={width} height={props.size} />
                    </ClipPath>
                  </Defs>
                  <G id="pathGroup" height={props.size} width={props.size} viewBox={viewBox} key={i+300} >
                    <Path d={d} id={command.id} key={i} fill={props.fill} fillOpacity={props.fillOpacity} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} onClick={()=>pressFunc(command)} onMouseOver={() => hoverFunc(command.id)} onMouseLeave={() => resetHover(command.id)} clipPath="url(#clip)" />
                  </G>
                </Svg>
              )
            }        
          })
        }
    </G>
  ) 
};

export default PathFromArray;