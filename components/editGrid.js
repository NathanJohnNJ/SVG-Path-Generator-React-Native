import { useEffect, useState } from 'react';
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
            const grid = document.getElementById('editGrid')
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
                document.getElementById('editGrid').removeChild(document.getElementById('path'))
                drawPath()
            }else if(selectedElement.id==="circle2"){
                props.setSecondPoint({x:xCoord-50, y:yCoord-100})
                document.getElementById('editGrid').removeChild(document.getElementById('path'))
                drawPath()
            }
            else{
                props.setThirdPoint({x:xCoord-50, y:yCoord-100})
                document.getElementById('editGrid').removeChild(document.getElementById('path'))
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
        const grid = document.getElementById('editGrid')
        const currentPath = document.createElementNS(svgns, 'path')
        currentPath.setAttributeNS(null, "id", "path")
        currentPath.setAttributeNS(null, 'stroke', "#0000ff")
        currentPath.setAttributeNS(null, 'strokeWidth', 0.5)
        currentPath.setAttributeNS(null, 'fill', 'none')
        if(props.command==='Q'){
            currentPath.setAttributeNS(null, 'd', `M50,100q${props.firstPoint.x},${props.firstPoint.y} ${props.secondPoint.x},${props.secondPoint.y}`)
        }else if(props.command==='C'){
            currentPath.setAttributeNS(null, 'd', `M50,100c${props.firstPoint.x},${props.firstPoint.y} ${props.secondPoint.x},${props.secondPoint.y} ${props.thirdPoint.x},${props.thirdPoint.y}`)
        }else {
            currentPath.setAttributeNS(null, 'd', `M50,100l${props.secondPoint.x},${props.secondPoint.y}`)
        }
        grid.appendChild(currentPath)
    }
    // function drawPath(){
    //     const svgns = "http://www.w3.org/2000/svg"
    //     const grid = document.getElementById('grid')
    //     let startPoints = [];
    //     for (let i=0; i<1; i++){
    //         console.log(props.path[i].relCommand);
    //         const startX = props.path[i].x+props.path[i].sx
    //         const startY = props.path[i].y+props.path[i].sy
    //         startPoints.push({sx: startX, sy:startY})
    //         let start = {
    //             x: props.path[i].sx,
    //             y: props.path[i].sy
    //         }
    //         const currentPath = document.createElementNS(svgns, 'path')
    //         currentPath.setAttributeNS(null, 'stroke', "#0000ff");
    //         currentPath.setAttributeNS(null, 'stroke-width', 1.5);
    //         currentPath.setAttributeNS(null, 'fill', 'none');
    //         currentPath.setAttributeNS(null, 'id', `path${i}`);
    //         (props.relative)?currentPath.setAttributeNS(null, 'd', `M50,50${props.path[i].relCommand}`):currentPath.setAttributeNS(null, 'd', `${props.path[i].absCommand}`)
    //         grid.appendChild(currentPath)
    //         let thisPath = document.getElementById(`path${i}`)
    //         thisPath.addEventListener('mouseover', ()=>hoverFunc(thisPath))
    //         thisPath.addEventListener('mouseleave', ()=>leaveFunc(thisPath))
    //         thisPath.addEventListener('click', ()=>clickFunc(props.path[i]), start)
    //     }
    //     for (let i=1; i<props.path.length; i++){
    //         console.log(props.path[i].relCommand);
    //         const startX = startPoints[i-1].sx;
    //         const startY = startPoints[i-1].sy;
    //         const currentPath = document.createElementNS(svgns, 'path')
    //         currentPath.setAttributeNS(null, 'stroke', "#0000ff");
    //         currentPath.setAttributeNS(null, 'stroke-width', 1.5);
    //         currentPath.setAttributeNS(null, 'fill', 'none');
    //         currentPath.setAttributeNS(null, 'id', `path${i}`);
    //         (props.relative)?currentPath.setAttributeNS(null, 'd', `M${startX},${startY}${props.path[i].relCommand}`):currentPath.setAttributeNS(null, 'd', `${props.path[i].absCommand}`)
    //         grid.appendChild(currentPath)
    //         let thisPath = document.getElementById(`path${i}`)
    //         thisPath.addEventListener('mouseover', ()=>hoverFunc(thisPath))
    //         thisPath.addEventListener('mouseleave', ()=>leaveFunc(thisPath))
    //         thisPath.addEventListener('click', ()=>clickFunc(props.path[i], startPoints[i-1]))
    //         const nextStartX = props.path[i].x+startPoints[i-1].sx;
    //         const nextStartY = props.path[i].y+startPoints[i-1].sy;
    //         startPoints.push({sx: nextStartX, sy:nextStartY});
    //     }
    // }

    useEffect(() => {
        createGrid()
        drawPath()
        console.log(props)
    }, [])
    if(props.command==='Q'){
        const title1 = `${props.firstPoint.x},${props.firstPoint.y}`
        const title2 = `${props.secondPoint.x},${props.secondPoint.y}`
        return(
            <View style={styles.container}>
                <svg id='editGrid' height={props.size} width={props.size} viewBox={viewbox} onMouseMove={(evt) => drag(evt)} onMouseLeave={endDrag} >
                    <circle cx="50" cy="100" r="5" style={styles.start}>
                        <title>Starting point: {props.startingPoint.x},{props.startingPoint.y}</title>
                    </circle>
                    <circle className="draggable" id="circle1" cx="75" cy="150" r="5" onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} style={styles.drag}>
                        <title>
                            {title1}
                        </title>
                    </circle>
                    <circle className="draggable" id="circle2" cx="100" cy="100" r="5" onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} style={styles.end}>
                        <title>
                            {title2}
                        </title>
                    </circle>
                </svg>
                <View style={styles.position}>
                    <Text>Current Command: "q{props.firstPoint.x},{props.firstPoint.y} {props.secondPoint.x},{props.secondPoint.y}"</Text>
                </View>
            </View>
        )
    }else if(props.command==='C'){
        const title1 = `${props.firstPoint.x},${props.firstPoint.y}`
        const title2 = `${props.secondPoint.x},${props.secondPoint.y}`
        const title3 = `${props.thirdPoint.x},${props.thirdPoint.y}`
        return(
            <View style={styles.container}>
                <svg id='editGrid' height={props.size} width={props.size} viewBox={viewbox} onMouseMove={(evt) => drag(evt)} onMouseLeave={endDrag} >
                    <circle cx="50" cy="100" r="5" style={styles.start}>
                        <title>Starting point: {props.startingPoint.x},{props.startingPoint.y}</title>
                    </circle>
                    <circle className="draggable" id="circle1" cx="75" cy="150" r="5" onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} style={styles.drag}>
                        <title>
                            {title1}
                        </title>
                    </circle>
                    <circle className="draggable" id="circle2" cx="125" cy="150" r="5" onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} style={styles.drag}>
                        <title>
                            {title2}
                        </title>
                    </circle>
                    <circle className="draggable" id="circle3" cx="150" cy="100" r="5" onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} style={styles.end}>
                        <title>
                            {title3}
                        </title>
                    </circle>
                </svg>
                <View style={styles.position}>
                    <Text>Current Command Path: "c{props.firstPoint.x},{props.firstPoint.y} {props.secondPoint.x},{props.secondPoint.y} {props.thirdPoint.x},{props.thirdPoint.y}"</Text>
                </View>
            </View>
        )
    } else if(props.command==='H'||props.command==='V'||props.command==='L'){
        const title1 = `${props.firstPoint.x},${props.firstPoint.y}`
        const title2 = `${props.firstPoint.x+props.path.dx},${props.firstPoint.y+props.path.dy}`
        return(
            <View style={styles.container}>
                <svg id='editGrid' height={props.size} width={props.size} viewBox={viewbox} onMouseMove={(evt) => drag(evt)} onMouseLeave={endDrag} >
                    <circle cx="50" cy="100" r="5" style={styles.start}>
                        <title>Starting point: {props.firstPoint.x},{props.firstPoint.y}</title>
                    </circle>
                    <circle className="draggable" id="circle2" cx="50" cy="150" r="5" onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} style={styles.end}>
                        <title>
                            {title2}
                        </title>
                    </circle>
                </svg>
                <View style={styles.position}>
                    <Text>Current Command: "l{props.path.dx},{props.path.dy}"</Text>
                </View>
            </View>
        )
    }
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
