import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg from "react-native-svg";

const EditGrid = (props) => {
    const [offsetX, setOffsetX] = useState();
    const [offsetY, setOffsetY] = useState();
    const [selectedElement, setSelectedElement] = useState(null);
    const viewbox = `0 0 ${props.size} ${props.size}`;
    console.log(props.path)
    function createGrid(){
        let num = props.size/10;
        const svgns = "http://www.w3.org/2000/svg";
        const grid = document.getElementById('editGrid')
        for(let i=0; i<num+1; i++){;
            const horizLine = document.createElementNS(svgns, 'path');
            const vertLine = document.createElementNS(svgns, 'path');
            horizLine.setAttributeNS(null, 'd', `M 0 ${i*10} h${props.size}`);
            horizLine.setAttributeNS(null, 'stroke', "#bbbbbb");
            vertLine.setAttributeNS(null, 'd', `M ${i*10} 0 v${props.size}`);
            vertLine.setAttributeNS(null, 'stroke', "#bbbbbb");
            grid.appendChild(horizLine)
            grid.appendChild(vertLine)
        }
        for(let i=0; i<num+1; i+=5){
            const horizLine = document.createElementNS(svgns, 'path');
            const vertLine = document.createElementNS(svgns, 'path');
            horizLine.setAttributeNS(null, 'd', `M 0 ${i*10} h${props.size}`);
            horizLine.setAttributeNS(null, 'stroke', "#bbbbbb");
            horizLine.setAttributeNS(null, 'stroke-width', 2);
            vertLine.setAttributeNS(null, 'd', `M ${i*10} 0 v${props.size}`);
            vertLine.setAttributeNS(null, 'stroke', "#bbbbbb");
            vertLine.setAttributeNS(null, 'stroke-width', 2);
            grid.appendChild(horizLine);
            grid.appendChild(vertLine);
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
                props.setFirstCtrl({x:xCoord-50, y:yCoord-100}) . aAaa
                document.getElementById('editGrid').removeChild(document.getElementById('path'))
                drawPath()
            }else if(selectedElement.id==="secondCtrl"){
                props.setSecondCtrl({x:xCoord-50, y:yCoord-100})
                document.getElementById('editGrid').removeChild(document.getElementById('path'))
                drawPath()
            }
            else{
                props.setEndPoint({x:xCoord-50, y:yCoord-100})
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
        const svgns = "http://www.w3.org/2000/svg";
        const grid = document.getElementById('editGrid');
        const currentPath = document.createElementNS(svgns, 'path');
        currentPath.setAttributeNS(null, "id", 'path');
        currentPath.setAttributeNS(null, 'stroke', props.stroke);
        currentPath.setAttributeNS(null, 'stroke-width', props.strokeWidth);
        currentPath.setAttributeNS(null, 'stroke-opacity', props.strokeOpacity);
        currentPath.setAttributeNS(null, 'fill-opacity', props.fillOpacity);
        currentPath.setAttributeNS(null, 'fill', props.fill);
        if(props.path.type==='Q'){
            currentPath.setAttributeNS(null, 'd', `M50,100q${props.firstCtrl.x},${props.firstCtrl.y}  ${props.endPoint.x},${props.endPoint.y}`)
        }else if(props.path.type==='C'){
            currentPath.setAttributeNS(null, 'd', `M50,100c${props.firstCtrl.x},${props.firstCtrl.y} ${props.secondCtrl.x},${props.secondCtrl.y} ${props.endPoint.x},${props.endPoint.y}`)
        }
        else {
            currentPath.setAttributeNS(null, 'd', `M50,100l${props.endPoint.x},${props.endPoint.y}`)
        }
        grid.appendChild(currentPath)
    }
    
    useEffect(() => {
        createGrid()
        drawPath()
    }, [])

    //     function pathDecider(){
    // if(props.path.type==='Q'){
    //     const title1 = `Control Point: ${props.path.dx1.value},${props.path.dy1.value}`
    //     const title2 = `End Point: ${props.path.x.value},${props.path.y.value}`     
    //     return(
    //         <View style={styles.container}>
    //             <Svg height={props.size} width={props.size} viewBox={viewbox} onMouseMove={(evt) => drag(evt)} onMouseLeave={endDrag} >
    //                 <circle className="draggable" id="firstCtrl" cx={props.path.dx1.value} cy={props.path.dy1.value} r="5" onMouseDown={(evt) => startDrag(evt)} onMouseUp={endDrag} style={styles.drag}>
    //                     <title>
    //                         {title1}
    //                     </title>
    //                 </circle>
    //                 <circle className="draggable" id="endPoint" cx={props.path.x.value} cy={props.path.y.value} r="5" onMouseDown={(evt) => startDrag(evt)} onMouseUp={endDrag} style={styles.end}>
    //                     <title>
    //                         {title2}
    //                     </title>
    //                 </circle>
    //             </Svg>
    //             <View style={styles.position}>
    //                 <Text>Current Command: "q{props.path.dx1.value},{props.path.dy1.value} {props.path.x.value},{props.path.y.value}"</Text>
    //             </View>
    //         </View>
    //     )
    // }else if(props.path.type==='C'){
    //     const title1 = `First Control Point: ${props.path.dx1.value},${props.path.dy1.value}`
    //     const title2 = `Second Control Point: ${props.path.dx2.value},${props.path.dy2.value}`
    //     const title3 = `End Point: ${props.path.x.value},${props.path.y.value}`
    //     return(     
    //             <View style={styles.container}>
    //             <Svg id='editGrid' height={props.size} width={props.size} viewBox={viewbox} onMouseMove={(evt) => drag(evt)} onMouseLeave={endDrag} >
    //                 <circle className="draggable" id="firstCtrl" cx={props.path.dx1.value} cy={props.path.dy1.value} r="5" onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} style={styles.drag}>
    //                     <title>
    //                         {title1}
    //                     </title>
    //                 </circle>
    //                 <circle className="draggable" id="secondCtrl" cx={props.path.dx2.value} cy={props.path.dy2.value} r="5" onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} style={styles.drag}>
    //                     <title>
    //                         {title2}
    //                     </title>
    //                 </circle>
    //                 <circle className="draggable" id="endPoint" cx={props.path.x.value} cy={props.path.y.value} r="5" onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} style={styles.end}>
    //                     <title>
    //                         {title3}
    //                     </title>
    //                 </circle>
    //             </Svg>
    //             <View style={styles.position}>
    //                 <Text>Current Command Path: "c{props.firstCtrl.x},{props.firstCtrl.y} {props.secondCtrl.x},{props.secondCtrl.y} {props.endPoint.x},{props.endPoint.y}"</Text>
    //             </View>
    //         </View>
    //     )
    // } else if(props.path.type==='H'||props.path.type==='V'||props.path.type==='L'){
    //     const title = `${props.path.x.value},${props.path.y.value}`
    //     return(
    //         <View style={styles.container}>
    //             <Svg id='editGrid' height={props.size} width={props.size} viewBox={viewbox} onMouseMove={(evt) => drag(evt)} onMouseLeave={endDrag} >
    //                 <circle className="draggable" id="endPoint" cx="50" cy="150" r="5" onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} style={styles.end}>
    //                     <title>
    //                         {title}
    //                     </title>
    //                 </circle>
    //             </Svg>
    //             <View style={styles.position}>
    //                 <Text>Current Command: "l{props.path.dx1.valuee},{props.path.dy1.value}"</Text>
    //             </View>
    //         </View>
    //     )
    // }}

    if(props.path.type==='Q'){

        const svgns = "http://www.w3.org/2000/svg"
        const title1 = `Control Point: ${props.firstCtrl.x},${props.firstCtrl.y}`
        const title2 = `End Point: ${props.endPoint.x},${props.endPoint.y}`
        const grid = document.getElementById("editGrid")
        const marker1 = document.createElementNS(svgns, 'circle');
        marker1.setAttributeNS(null, 'cx', 75);
        marker1.setAttributeNS(null, 'cy', 150);
        marker1.setAttributeNS(null, 'r', 5);
        marker1.classList.add('draggable');
        marker1.setAttributeNS(null, 'id', 'firstCtrl');
        marker1.addEventListener('mousedown', function(evt) {startDrag(evt)});
        marker1.addEventListener('mouseup', function() {endDrag});
        const markerTitle = document.createElementNS(svgns, 'title');
        markerTitle.setAttributeNS(null, 'content', {title1})
        // marker1.appendChild(markerTitle)
        grid.appendChild(marker1)
        const endMarker = document.createElementNS(svgns, 'circle');
        endMarker.setAttributeNS(null, 'cx', 100);
        endMarker.setAttributeNS(null, 'cy', 100);
        endMarker.setAttributeNS(null, 'r', 5);
        endMarker.classList.add('draggable');
        endMarker.setAttributeNS(null, 'id', 'endPoint')
        endMarker.addEventListener('mousedown', function(evt) {startDrag(evt)});
        endMarker.addEventListener('mouseup', function() {endDrag});
        
        // return(
        //     <View style={styles.container}>
        //         <Svg id='modalGrid' height={props.size} width={props.size} viewBox={viewbox} onMouseMove={(evt) => drag(evt)} onMouseLeave={endDrag} >
        //             <circle className="draggable" id="firstCtrl" cx="75" cy="150" r="5" onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} style={styles.drag}>
        //                 <title>
        //                     {title1}
        //                 </title>
        //             </circle>
        //             <circle className="draggable" id="endPoint" cx="100" cy="100" r="5" onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} style={styles.end}>
        //                 <title>
        //                     {title2}
        //                 </title>
        //             </circle>   
        //         </Svg>
        //         <View style={styles.position}>
        //             <Text>Current Command: "q{props.firstCtrl.x},{props.firstCtrl.y} {props.endPoint.x},{props.endPoint.y}"</Text>
        //             {/* {currentCommand()}   */}
        //         </View>
        //     </View>
        // )
    }else if(props.path.type==='C'){
        const title1 = `First Control Point: ${props.firstCtrl.x},${props.firstCtrl.y}`
        const title2 = `Second Control Point: ${props.secondCtrl.x},${props.secondCtrl.y}`
        const title3 = `End Point: ${props.endPoint.x},${props.endPoint.y}`
        return(
            <View style={styles.container}>
                <Svg id='editGrid' height={props.size} width={props.size} viewBox={viewbox} onMouseMove={(evt) => drag(evt)} onMouseLeave={endDrag} >
                    <circle className="draggable" id="firstCtrl" cx="100" cy="150" r="5" onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} style={styles.drag}>
                        <title>
                            {title1}
                        </title>
                    </circle>
                    <circle className="draggable" id="secondCtrl" cx="150" cy="50" r="5" onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} style={styles.drag}>
                        <title>
                            {title2}
                        </title>
                    </circle>
                    <circle className="draggable" id="endPoint" cx="200" cy="100" r="5" onMouseDown={(evt) => startDrag(evt)}  onMouseUp={endDrag} style={styles.end}>
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


return(
    <View>
        <Svg id='editGrid' height={props.size} width={props.size} viewBox={viewbox} onMouseMove={(evt) => drag(evt)} onMouseLeave={endDrag} >
        {/* {pathDecider()} */}
        </Svg>
    </View>
)
};

export default EditGrid;

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
