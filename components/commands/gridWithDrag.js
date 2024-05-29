import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Grid from '../grid';

const GridWithDrag = (props) => {
    const [offsetX, setOffsetX] = useState();
    const [offsetY, setOffsetY] = useState();
    const [selectedElement, setSelectedElement] = useState(null);
    const viewbox = `0 0 ${props.size} ${props.size}`;

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
            if(props.path.absType==='H'){
                selectedElement.setAttributeNS(null, "cx", xCoord);
                selectedElement.setAttributeNS(null, 'r', props.endSize*1.5) 
                props.setEndPoint({x:xCoord-50, y:0})
                props.hoverFunc('x');
                document.getElementById('createGrid').removeChild(document.getElementById('path'))
                drawPath()
            }else if (props.path.absType==="V"){
                selectedElement.setAttributeNS(null, "cy", yCoord);
                selectedElement.setAttributeNS(null, 'r', props.endSize*1.5) 
                props.setEndPoint({x:0, y:yCoord-100})
                props.hoverFunc('y');
                document.getElementById('createGrid').removeChild(document.getElementById('path'))
                drawPath()
            }else{
                selectedElement.setAttributeNS(null, "cx", xCoord);
                selectedElement.setAttributeNS(null, "cy", yCoord);  
                if(selectedElement.id==="firstCtrl"){
                    selectedElement.setAttributeNS(null, 'r', props.controlSize*1.5) 
                    props.setFirstCtrl({x:xCoord-50, y:yCoord-100})
                    props.hoverFunc('dx1')
                    props.hoverFunc('dy1')
                    document.getElementById('createGrid').removeChild(document.getElementById('path'))
                    drawPath()
                }else if(selectedElement.id==="secondCtrl"){
                    selectedElement.setAttributeNS(null, 'r', props.controlSize*1.5) 
                    props.setSecondCtrl({x:xCoord-50, y:yCoord-100})
                    props.hoverFunc('dx2')
                    props.hoverFunc('dy2')
                    document.getElementById('createGrid').removeChild(document.getElementById('path'))
                    drawPath()
                }
                else{
                    props.setEndPoint({x:xCoord-50, y:yCoord-100})
                    selectedElement.setAttributeNS(null, 'r', props.endSize*1.5) 
                    props.hoverFunc('x');
                    props.hoverFunc('y');
                    document.getElementById('createGrid').removeChild(document.getElementById('path'))
                    drawPath()
                }
            }
        }
    }
    function endDrag() {
        if(selectedElement.id==="endPoint"){
            selectedElement.setAttributeNS(null, 'r', props.endSize)
        }else{
            selectedElement.setAttributeNS(null, 'r', props.controlSize)
        }
        setSelectedElement(null);
        props.resetHover()
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
    function drawPath(){
        const svgns = "http://www.w3.org/2000/svg"
        const grid = document.getElementById('createGrid');
        const currentPath = document.createElementNS(svgns, 'path');
        currentPath.setAttributeNS(null, "id", 'path');
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

    useEffect(() => {
        drawPath()
    }, [])


    if(props.path.absType==='Q'){
        const title1 = `Control Point: ${props.firstCtrl.x},${props.firstCtrl.y}`
        const title2 = `End Point: ${props.endPoint.x},${props.endPoint.y}`
        return(
            <View style={styles(props).container}>
                <Grid id='createGrid' size={props.size} viewBox={viewbox} onMouseMove={(evt) => drag(evt)} onMouseLeave={endDrag} >
                    <circle className="draggable" id="firstCtrl" cx={props.firstCtrl.x+50} cy={props.firstCtrl.y+100} onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} style={styles(props).drag} r={props.controlSize}  fill={props.controlCol} fillOpacity={props.ctrlOpacity}>
                        <title>
                            {title1}
                        </title>
                    </circle>
                    <circle className="draggable" id="endPoint" cx={props.endPoint.x+50} cy={props.endPoint.y+100} onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} style={styles(props).end} fill={props.endCol} fillOpacity={props.endOpacity} r={props.endSize} >
                        <title>
                            {title2}
                        </title>
                    </circle>   
                </Grid>
                <View style={styles(props).position}>
                    <Text>Relative Command: "q{props.firstCtrl.x},{props.firstCtrl.y} {props.endPoint.x},{props.endPoint.y}"</Text>
                    <Text>Absolute Command: "Q{props.firstCtrl.x+props.startX},{props.firstCtrl.y+props.startY} {props.endPoint.x+props.startX},{props.endPoint.y+props.startY}"</Text>
                </View>
            </View>
        )
    }else if(props.path.absType==='L'){
        const title = `End Point: ${props.endPoint.x},${props.endPoint.y}`
        return(
            <View style={styles(props).container}>
                <Grid id='createGrid' size={props.size} viewBox={viewbox} onMouseMove={(evt) => drag(evt)} onMouseLeave={endDrag} >
                    <circle className="draggable" id="endPoint" cx={props.endPoint.x+50} cy={props.endPoint.y+100} onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} style={styles(props).end} fill={props.endCol} fillOpacity={props.endOpacity} r={props.endSize} >
                        <title>
                            {title}
                        </title>
                    </circle>   
                </Grid>
                <View style={styles(props).position}>
                    <Text>Relative Command: "l{props.endPoint.x},{props.endPoint.y}"</Text>
                    <Text>Absolute Command: "L{props.endPoint.x+props.startX},{props.endPoint.y+props.startY}"</Text>
                </View>
            </View>
        )
    }else if(props.path.absType==='V'){
        const title = `End Point: ${props.endPoint.x},${props.endPoint.y}`
        return(
            <View style={styles(props).container}>
                <Grid id='createGrid' size={props.size} viewBox={viewbox} onMouseMove={(evt) => drag(evt)} onMouseLeave={endDrag} >
                    <circle className="draggable" id="endPoint" cx="50" cy={props.endPoint.y+100} onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} style={styles(props).end} fill={props.endCol} fillOpacity={props.endOpacity} r={props.endSize} >
                        <title>
                            {title}
                        </title>
                    </circle>   
                </Grid>
                <View style={styles(props).position}>
                    <Text>Relative Command: "{props.path.type}{props.endPoint.y}"</Text>
                    <Text>Absolute Command: "{props.path.absType}{props.endPoint.y+props.startY}"</Text>
                </View>
            </View>
        )
    }else if(props.path.absType==='H'){
        const title = `End Point: ${props.endPoint.x},100`
        return(
            <View style={styles(props).container}>
                <Grid id='createGrid' size={props.size} viewBox={viewbox} onMouseMove={(evt) => drag(evt)} onMouseLeave={endDrag} >
                    <circle className="draggable" id="endPoint" cx={props.endPoint.x+50} cy="100" onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} style={styles(props).end} fill={props.endCol} fillOpacity={props.endOpacity} r={props.endSize} >
                        <title>
                            {title}
                        </title>
                    </circle>   
                </Grid>
                <View style={styles(props).position}>
                    <Text>Relative Command: "{props.path.type}{props.endPoint.x}"</Text>
                    <Text>Absolute Command: "{props.path.absType}{props.endPoint.x+props.startX}"</Text>
                </View>
            </View>
        )
    }else if(props.path.absType==='C'){
        const title1 = `First Control Point: ${props.firstCtrl.x},${props.firstCtrl.y}`
        const title2 = `Second Control Point: ${props.secondCtrl.x},${props.secondCtrl.y}`
        const title3 = `End Point: ${props.endPoint.x},${props.endPoint.y}`
        return(
            <View style={styles(props).container}>
                <Grid id='createGrid' size={props.size} viewBox={viewbox} onMouseMove={(evt) => drag(evt)} onMouseLeave={endDrag} >
                    <circle className="draggable" id="firstCtrl" cx={props.firstCtrl.x+50} cy={props.firstCtrl.y+100} r={props.controlSize} onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} style={styles(props).drag} fill={props.controlCol} fillOpacity={props.ctrlOpacity}>
                        <title>
                            {title1}
                        </title>
                    </circle>
                    <circle className="draggable" id="secondCtrl" cx={props.secondCtrl.x+50} cy={props.secondCtrl.y+100} onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} style={styles(props).drag} fill={props.controlCol} fillOpacity={props.ctrlOpacity} r={props.controlSize} >
                        <title>
                            {title2}
                        </title>
                    </circle>
                    <circle className="draggable" id="endPoint" cx={props.endPoint.x+50} cy={props.endPoint.y+100} onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} style={styles(props).end} fill={props.endCol} fillOpacity={props.endOpacity} r={props.endSize} >
                        <title>
                            {title3}
                        </title>
                    </circle>
                </Grid>
                <View style={styles(props).position}>
                    <Text>Relative Command Path: "c{props.firstCtrl.x},{props.firstCtrl.y} {props.secondCtrl.x},{props.secondCtrl.y} {props.endPoint.x},{props.endPoint.y}"</Text>
                    <Text>Absolute Command Path: "C{props.firstCtrl.x+props.startX},{props.firstCtrl.y+props.startY} {props.secondCtrl.x+props.startX},{props.secondCtrl.y+props.startY} {props.endPoint.x+props.startX},{props.endPoint.y+props.startY}"</Text>
                </View>
            </View>
        )
    }
};

export default GridWithDrag;
    
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
    end: {
        cursor: "move",
        zIndex:999
    }
})      
