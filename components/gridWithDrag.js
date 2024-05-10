import { useEffect, useState } from 'react';
import { useMousePosition } from './useMousePosition';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Grid = (props) => {
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
            horizLine.setAttributeNS(null, 'strokeWidth', 0.1)
            vertLine.setAttributeNS(null, 'd', `M ${i*10} 0 v${props.size}`)
            vertLine.setAttributeNS(null, 'stroke', "#bbbbbb")
            vertLine.setAttributeNS(null, 'strokeWidth', 0.1)
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
            if(selectedElement.id==="circle1"){
                props.setFirstPoint({x:xCoord-50, y:yCoord-100})
                document.getElementById('modalGrid').removeChild(document.getElementById('path'))
                drawPath()
            }else{
                props.setSecondPoint({x:xCoord-50, y:yCoord-100})
                document.getElementById('modalGrid').removeChild(document.getElementById('path'))
                drawPath()
            }
        }
    }
    function endDrag() {
        setSelectedElement(null);
        // const newPath = `${props.path} q${props.firstPoint.x},${props.firstPoint.y} ${props.secondPoint.x},${props.secondPoint.y}`
        // props.setPath(newPath)
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
            currentPath.setAttributeNS(null, 'd', `M50,100 q${props.firstPoint.x},${props.firstPoint.y} ${props.secondPoint.x},${props.secondPoint.y}`)
            currentPath.setAttributeNS(null, 'stroke', "#0000ff")
            currentPath.setAttributeNS(null, 'strokeWidth', 0.5)
            currentPath.setAttributeNS(null, 'fill', 'none')
            grid.appendChild(currentPath)
    }

    useEffect(() => {
        createGrid()
        drawPath()
    }, [])

    return(
        <View style={styles.container}>
            <svg id='modalGrid' height={props.size} width={props.size} viewBox={viewbox} onMouseMove={(evt) => drag(evt)} onMouseLeave={endDrag} >
                <circle className="draggable" id="circle1" cx="75" cy="150" r="5" onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} style={styles.drag}/>
                <circle className="draggable" id="circle2" cx="100" cy="100" r="5" onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} style={styles.drag} />
            </svg>
            <View style={styles.position}>
                <Text>Current Command Path: "q{props.firstPoint.x},{props.firstPoint.y} {props.secondPoint.x},{props.secondPoint.y}"</Text>
            </View>
        </View>
    )
};

export default Grid;

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
      fill:'#ff0000',
      cursor: "move"
    }
})
