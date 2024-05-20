import { useEffect, useState } from 'react';
import Svg, { Path } from "react-native-svg"
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const GridWithDrag = (props) => {
    const [offsetX, setOffsetX] = useState();
    const [offsetY, setOffsetY] = useState();
    const [selectedElement, setSelectedElement] = useState(null);
    const viewbox = `0 0 ${props.size} ${props.size}`;

    function createGrid(){
        let num = props.size/10 
        for(let i=0; i<num+1; i++){
            const svgns = "http://www.w3.org/2000/svg"
            const grid = document.getElementById('modalGrid')
            const horizLine = document.createElementNS(svgns, 'path')
            const vertLine = document.createElementNS(svgns, 'path')
            horizLine.setAttributeNS(null, 'd', `M 0 ${i*10} h${props.size}`)
            horizLine.setAttributeNS(null, 'stroke', "#bbbbbb")
            vertLine.setAttributeNS(null, 'd', `M ${i*10} 0 v${props.size}`)
            vertLine.setAttributeNS(null, 'stroke', "#bbbbbb")
            grid.appendChild(horizLine)
            grid.appendChild(vertLine)
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
            selectedElement.setAttributeNS(null, "cx", xCoord);
            selectedElement.setAttributeNS(null, "cy", yCoord);
            if(selectedElement.id==="firstCtrl"){
                props.setFirstCtrl({x:xCoord-50, y:yCoord-100})
                document.getElementById('modalGrid').removeChild(document.getElementById('path'))
                drawPath()
            }else if(selectedElement.id==="secondCtrl"){
                props.setSecondCtrl({x:xCoord-50, y:yCoord-100})
                document.getElementById('modalGrid').removeChild(document.getElementById('path'))
                drawPath()
            }
            else{
                props.setEndPoint({x:xCoord-50, y:yCoord-100})
                document.getElementById('modalGrid').removeChild(document.getElementById('path'))
                drawPath()
            }
        }
    }
    function endDrag() {
        setSelectedElement(null);
    }
    function startDrag(evt) {
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
        const grid = document.getElementById('modalGrid')
        const currentPath = document.createElementNS(svgns, 'path')
        currentPath.setAttributeNS(null, "id", "path")
        currentPath.setAttributeNS(null, 'stroke', "#0000ff")
        currentPath.setAttributeNS(null, 'stroke-width', props.strWidth)
        currentPath.setAttributeNS(null, 'fill', 'none')
        if(props.command==='Q'){
            currentPath.setAttributeNS(null, 'd', `M50,100q${props.firstCtrl.x},${props.firstCtrl.y} ${props.endPoint.x},${props.endPoint.y}`)
        }else if(props.command==='C'){
            currentPath.setAttributeNS(null, 'd', `M50,100c${props.firstCtrl.x},${props.firstCtrl.y} ${props.secondCtrl.x},${props.secondCtrl.y} ${props.endPoint.x},${props.endPoint.y}`)
        }
        grid.appendChild(currentPath)
    }

    useEffect(() => {
        createGrid()
        drawPath()
    }, [])

    if(props.command==='Q'){
        const title1 = `${props.firstCtrl.x},${props.firstCtrl.y}`
        const title2 = `${props.endPoint.x},${props.endPoint.y}`
        return(
            <View style={styles.container}>
                <Svg id='modalGrid' height={props.size} width={props.size} viewBox={viewbox} onMouseMove={(evt) => drag(evt)} onMouseLeave={endDrag} >
                    {/* <circle cx="50" cy="100" r="5" style={styles.start}>
                        <title>Starting point: {props.startPoint.sx},{props.startPoint.sy}</title>
                    </circle> */}
                    <circle className="draggable" id="firstCtrl" cx="75" cy="150" r="5" onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} style={styles.drag}>
                        <title>
                            {title1}
                        </title>
                    </circle>
                    <circle className="draggable" id="endPoint" cx="100" cy="100" r="5" onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} style={styles.end}>
                        <title>
                            {title2}
                        </title>
                    </circle>
                </Svg>
                <View style={styles.position}>
                    <Text>Current Command: "q{props.firstCtrl.x},{props.firstCtrl.y} {props.endPoint.x},{props.endPoint.y}"</Text>
                </View>
            </View>
        )
    }else if(props.command==='C'){
        const title1 = `${props.firstCtrl.x},${props.firstCtrl.y}`
        const title2 = `${props.secondCtrl.x},${props.secondCtrl.y}`
        const title3 = `${props.endPoint.x},${props.endPoint.y}`
        return(
            <View style={styles.container}>
                <Svg id='modalGrid' height={props.size} width={props.size} viewBox={viewbox} onMouseMove={(evt) => drag(evt)} onMouseLeave={endDrag} >
                    {/* <circle cx="50" cy="100" r="5" style={styles.start}>
                        <title>Starting point: {props.startPoint.sx},{props.startPoint.sy}</title>
                    </circle> */}
                    <circle className="draggable" id="firstCtrl" cx="75" cy="150" r="5" onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} style={styles.drag}>
                        <title>
                            {title1}
                        </title>
                    </circle>
                    <circle className="draggable" id="secondCtrl" cx="125" cy="150" r="5" onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} style={styles.drag}>
                        <title>
                            {title2}
                        </title>
                    </circle>
                    <circle className="draggable" id="endPoint" cx="150" cy="100" r="5" onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} style={styles.end}>
                        <title>
                            {title3}
                        </title>
                    </circle>
                </Svg>
                <View style={styles.position}>
                    <Text>Current Command Path: "c{props.firstCtrl.x},{props.firstCtrl.y} {props.secondCtrl.x},{props.secondCtrl.y} {props.endPoint.x},{props.endPoint.y}"</Text>
                </View>
            </View>
        )
    }
};

export default GridWithDrag;

const styles = StyleSheet.create({
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
      fill:'#12f',
      cursor: "move",
      opacity: 0.7
    },
    start: {
        fill: '#159c06',
        opacity: 0.7
    },
    end: {
        fill: '#f00',
        cursor: "move",
        opacity: 0.7
    }
})      
