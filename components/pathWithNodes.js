import { Path, G, Defs, ClipPath, Rect, Svg } from "react-native-svg";
import { useState } from "react";
import { StyleSheet } from 'react-native';
import NodePath from "./nodePath";

const PathFromArray = (props) => {
    const viewBox = `0 0 ${props.size} ${props.size}`;
    const [offsetX, setOffsetX] = useState();
    const [offsetY, setOffsetY] = useState();
    const [selectedElement, setSelectedElement] = useState(null);
    const [idCounter, setIdCounter] = useState([])
    function getMousePosition(evt) {
        const svg = evt.target
        const CTM = svg.getScreenCTM();
        return {
          x: (evt.clientX - CTM.e) / CTM.a,
          y: (evt.clientY - CTM.f) / CTM.d
        };
      }

    function endDrag() {
        if(!selectedElement===null){
            setSelectedElement(null);
        }else{
            setSelectedElement(null);
        }
    }
    async function drag(evt) {
        evt.preventDefault();
        if (selectedElement) {
            let coord = getMousePosition(evt);
            let xCoord = Math.round( ( coord.x - offsetX ))
            let yCoord = Math.round( ( coord.y - offsetY ))
            if(props.path.type==='h'){
                selectedElement.setAttributeNS(null, "cx", xCoord);
                selectedElement.setAttributeNS(null, 'r', props.endSize*1.5) 
                setEndPoint({x:xCoord-50, y:0})
                props.hoverFunc('x');
                document.getElementById('grid').removeChild(document.getElementById('path'))
                drawPath()
            }else if (props.path.type==="v"){
                selectedElement.setAttributeNS(null, "cy", yCoord);
                selectedElement.setAttributeNS(null, 'r', props.endSize*1.5) 
                setEndPoint({x:0, y:yCoord-100})
                props.hoverFunc('v');
                document.getElementById('grid').removeChild(document.getElementById('path'))
                drawPath()
            }else if (props.path.type==="t"){
                selectedElement.setAttributeNS(null, "cy", yCoord);
                selectedElement.setAttributeNS(null, 'r', props.endSize*1.5) 
                setEndPoint({x:xCoord-50-props.fullPath[props.pathID].endPoint.x, y:yCoord-100-props.fullPath[props.pathID].endPoint.y})
                props.hoverFunc('t');
                document.getElementById('grid').removeChild(document.getElementById('path'))
                drawPath()
            }else{
                selectedElement.setAttributeNS(null, "cx", xCoord);
                selectedElement.setAttributeNS(null, "cy", yCoord);  
                if(selectedElement.id==="firstCtrl"){
                    selectedElement.setAttributeNS(null, 'r', props.controlSize*1.5) 
                    setFirstCtrl({x:xCoord-50, y:yCoord-100})
                    props.hoverFunc('dx1')
                    props.hoverFunc('dy1')
                    document.getElementById('grid').removeChild(document.getElementById('path'))
                    drawPath()
                }else if(selectedElement.id==="secondCtrl"){
                    selectedElement.setAttributeNS(null, 'r', props.controlSize*1.5) 
                    setSecondCtrl({x:xCoord-50, y:yCoord-100})
                    props.hoverFunc('dx2')
                    props.hoverFunc('dy2')
                    document.getElementById('grid').removeChild(document.getElementById('path'))
                    drawPath()
                }
                else{
                    setEndPoint({x:xCoord-50, y:yCoord-100})
                    selectedElement.setAttributeNS(null, 'r', props.endSize*1.5) 
                    props.hoverFunc('x');
                    props.hoverFunc('y');
                    document.getElementById('grid').removeChild(document.getElementById('path'))
                    drawPath()
                }
            }
        }
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
        <Svg id="pathGroup" height={props.size} width={props.size} x="0" y="0"  viewBox={viewBox} onMouseMove={(evt) => drag(evt)} onMouseLeave={endDrag} >
            {
                props.path.map((command, i) => {
                    console.log(props.path)
                    // const counter = idCounter
                    // counter.push({})
                    // setIdCounter([])
                    return(
                    <NodePath path={command} key={i} size={props.size} offSetX={offsetX} setOffsetX={setOffsetX} setOffsetY={setOffsetY} offsetY={offsetY} endDrag={endDrag} startDrag={startDrag} selectedElement={selectedElement} setSelectedElement={setSelectedElement} controlCol={props.controlCol} ctrlOpacity={props.ctrlOpacity} controlSize={props.controlSize} endCol={props.endCol} endOpacity={props.endOpacity} endSize={props.endSize} highlight={props.highlight} fullPath={props.path} pathID={props.pathID} fill={props.fill} stroke={props.stroke} strokeWidth={props.strokeWidth} fillOpacity={props.fillOpacity}/>
                    )
                })
            }
        </Svg>
    ) 
};

export default PathFromArray;

const styles = (props) => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    drag:{
      cursor: "move",
      zIndex: 999
    },
    end: {
        cursor: "move",
        zIndex:999
    },
    fullPath: {
        backgroundColor: '#ddd',
        borderColor: '#dff',
        borderWidth: 3,
        borderRadius: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        boxShadow: '-2px 2px 8px #9c9c9c',
        width: 'fit-content',
        height: 70
      },
      fullPathText: {
        fontFamily: 'Geologica-Medium',
        fontSize: 13,
        width:'fit-content',
        flex:1,
        marginTop: 8,
        paddingLeft:4,
        paddingTop: 4,
        borderRadius: 6,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        height: 'fit-content',
        whiteSpace: 'nowrap'
      },
})      
