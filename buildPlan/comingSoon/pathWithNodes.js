import { Path, G } from "react-native-svg";
import { StyleSheet } from "react-native-web";
import { useState } from 'react';

const PathWithNodes = (props) => {
    const hoverWidth = props.strokeWidth*2;
    const hoverColour = props.highlight;

    const [offsetX, setOffsetX] = useState();
    const [offsetY, setOffsetY] = useState();
    const [selectedElement, setSelectedElement] = useState(null);
    
    function drawPath(){
        const svgns = "http://www.w3.org/2000/svg"
        const grid = document.getElementById('grid');
        const currentPath = document.createElementNS(svgns, 'path');
        currentPath.setAttributeNS(null, "id", 'nodeGroup');
        currentPath.setAttributeNS(null, 'stroke', props.stroke);
        currentPath.setAttributeNS(null, 'stroke-width', props.strokeWidth);
        currentPath.setAttributeNS(null, 'stroke-opacity', props.strokeOpacity);
        currentPath.setAttributeNS(null, 'fill', props.fill);
        currentPath.setAttributeNS(null, 'fill-opacity', props.fillOpacity);
        if(props.path.absType==='Q'){
            currentPath.setAttributeNS(null, 'd', `M50,100q${props.firstCtrl.x},${props.firstCtrl.y} ${props.endPoint.x},${props.endPoint.y}`)
        }else if(props.path.absType==='C'){
            currentPath.setAttributeNS(null, 'd', `M50,100c${props.firstCtrl.x},${props.firstCtrl.y} ${props.secondCtrl.x},${props.secondCtrl.y} ${props.endPoint.x},${props.endPoint.y}`)
        }else if(props.path.absType==='L'){
            currentPath.setAttributeNS(null, 'd', `M50,100l${props.endPoint.x},${props.endPoint.y}`)
        }else if(props.path.absType==='V'){
            currentPath.setAttributeNS(null, 'd', `M50,100v${props.endPoint.y}`)
        }else if(props.path.absType==='H'){
            currentPath.setAttributeNS(null, 'd', `M50,100h${props.endPoint.x}`)
        }
        grid.appendChild(currentPath)
    }

    function pressFunc(path){
        props.setInfo(path)
        if(path.type==="Q"){
            props.setFirstCtrl({x: path.controlPoints.dx1.value, y: path.controlPoints.dy1.value})
            props.setEndPoint({x: path.endPoint.x, y: path.endPoint.y})
        } else if (props.type==="C"){
            props.setFirstCtrl({x: path.controlPoints.dx1.value, y: path.controlPoints.dy1.value})
            props.setSecondCtrl({x: path.controlPoints.dx2.value, y: path.controlPoints.dy2.value})
            props.setEndPoint({x: path.endPoint.x, y: path.endPoint.y})
        } else{
            props.setEndPoint({x: path.endPoint.x, y: path.endPoint.y})
        }
    }
    function getMousePosition(evt) {
        const svg = evt.target
        const CTM = svg.getScreenCTM();
        return {
          x: (evt.clientX - CTM.e) / CTM.a,
          y: (evt.clientY - CTM.f) / CTM.d
        };
      }
    function drag(evt) {
        if (selectedElement) {
            evt.preventDefault();
            let coord = getMousePosition(evt);
            let xCoord = Math.round( ( coord.x - offsetX ))
            let yCoord = Math.round( ( coord.y - offsetY ))
            if(props.command==='H'){
                selectedElement.setAttributeNS(null, "cx", xCoord);
                selectedElement.setAttributeNS(null, 'r', props.endSize*1.5) 
                props.setEndPoint({x:xCoord-50, y:0})
                document.getElementById('commandGroup').removeChild(document.getElementById('path'))
                drawPath()
            }else if (props.command==="V"){
                selectedElement.setAttributeNS(null, "cy", yCoord);
                selectedElement.setAttributeNS(null, 'r', props.endSize*1.5) 
                props.setEndPoint({x:0, y:yCoord-100})
                document.getElementById('commandGroup').removeChild(document.getElementById('path'))
                drawPath()
            }else{
                selectedElement.setAttributeNS(null, "cx", xCoord);
                selectedElement.setAttributeNS(null, "cy", yCoord);  
                if(selectedElement.id==="firstCtrl"){
                    selectedElement.setAttributeNS(null, 'r', props.controlSize*1.5) 
                    props.setFirstCtrl({x:xCoord-50, y:yCoord-100})
                    document.getElementById('commandGroup').removeChild(document.getElementById('path'))
                    drawPath()
                }else if(selectedElement.id==="secondCtrl"){
                    selectedElement.setAttributeNS(null, 'r', props.controlSize*1.5) 
                    props.setSecondCtrl({x:xCoord-50, y:yCoord-100})
                    document.getElementById('commandGroup').removeChild(document.getElementById('path'))
                    drawPath()
                }
                else{
                    props.setEndPoint({x:xCoord-50, y:yCoord-100})
                    selectedElement.setAttributeNS(null, 'r', props.endSize*1.5) 
                    document.getElementById('commandGroup').removeChild(document.getElementById('path'))
                    drawPath()
                }
            }
        }
    }
    function endDrag() {
        setSelectedElement(null);
    }
    function startDrag(evt) {
        evt.preventDefault()
        if (evt.target.classList.contains('draggable')) {
            setSelectedElement(evt.target);
            let offset = getMousePosition(evt);
            let numX = offset.x - parseFloat(evt.target.getAttributeNS(null, "cx"))
            let numY = offset.y - parseFloat(evt.target.getAttributeNS(null, "cy"))
            setOffsetX(Math.round( ( numX + Number.EPSILON ) * 100 ) / 100)
            setOffsetY(Math.round( ( numY + Number.EPSILON ) * 100 ) / 100)
        }
    }
    

    return(
        <G id="nodeGroup" onMouseMove={(evt) => drag(evt)} onMouseLeave={endDrag}>
            {
                props.path.map((currentPath, i) => {
                    const d = currentPath.fullCommand
                    if(currentPath.type==='c'){
                    return(
                        <G id="commandGroup" key="CG">
                        <Path d={d} id="path" key={i} fill={props.fill} fillOpacity={props.fillOpacity} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} onClick={()=>pressFunc(currentPath)} />
                        <circle className="draggable" id="firstCtrl" key={i+10} cx={currentPath.absControlPoints[0].value} cy={currentPath.absControlPoints[1].value} onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} style={styles(props).control} fill={props.endCol} fillOpacity={props.endOpacity} r={props.endSize} />
                        <circle className="draggable" id="secondCtrl" key={i+20} cx={currentPath.absControlPoints[2].value} cy={currentPath.absControlPoints[3].value} onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} style={styles(props).control} fill={props.endCol} fillOpacity={props.endOpacity} r={props.endSize} />
                        <circle className="draggable" id="endPoint" key={i+30} cx={currentPath.absEndPoint.x} cy={currentPath.absEndPoint.y} onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} style={styles(props).end} fill={props.endCol} fillOpacity={props.endOpacity} r={props.endSize} />
                        </G>
                        )
                    }else if (currentPath.type==='q'){
                        return (
                            <G id="commandGroup" key="CG">
                        <Path d={d} id='path' key={i} fill={props.fill} fillOpacity={props.fillOpacity} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} onClick={()=>pressFunc(currentPath)} />
                        <circle className="draggable" id="firstCtrl" key={i+10} cx={currentPath.absControlPoints[0].value} cy={currentPath.absControlPoints[1].value} onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} style={styles(props).end} fill={props.endCol} fillOpacity={props.endOpacity} r={props.endSize} ></circle>
                        <circle className="draggable" id="endPoint" key={i+20} cx={currentPath.absEndPoint.x} cy={currentPath.absEndPoint.y} onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} style={styles(props).end} fill={props.endCol} fillOpacity={props.endOpacity} r={props.endSize} ></circle>
                        </G>
                        )
                    }
                    return(
                        <G id="commandGroup" key="CG">
                        <Path d={d} id='path' key={i} fill={props.fill} fillOpacity={props.fillOpacity} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} onClick={()=>pressFunc(currentPath)} />
                        <circle className="draggable" key={i+10} cx={props.endPoint.x+50} cy={props.endPoint.y+100} onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} style={styles(props).end} fill={props.endCol} fillOpacity={props.endOpacity} r={props.endSize} ></circle>
                        </G>
                    )
                })
            }
        </G>
    ) 
};

export default PathWithNodes;

const styles = (props) => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    position: {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    drag:{
      cursor: "move",
      zIndex: 999
    },
    start: {
        fill: '#159c06',
        opacity: 0.7
    },
    end: {
        fill: '#f00',
        cursor: "move",
        opacity: 0.7,
        zIndex:999
    }
}) 