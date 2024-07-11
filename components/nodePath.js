import { Path, G, Defs, ClipPath, Rect, Svg } from "react-native-svg";
import { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';

const NodePath = (props) => {
    const hoverWidth = props.strokeWidth*2;
    const hoverColour = props.highlight;

    const [firstCtrl, setFirstCtrl] = useState();
    const fID = `first${props.path.id}`
    const [secondCtrl, setSecondCtrl] = useState();
    const sID = `second${props.path.id}`
    const [endPoint, setEndPoint] = useState();
    const eID = `end${props.path.id}`
    const viewBox = `0 0 ${props.size} ${props.size}`

    useEffect(() => {
        console.log(props.path)
        drawPath()
        setEndPoint(props.path.endPoint);
        if(props.path.type==='c'){
                setSecondCtrl({x:props.path.controlPoints.dx2, y:props.path.controlPoints.dy2});
                setFirstCtrl({x:props.path.controlPoints.dx1, y:props.path.controlPoints.dy1});
            }
        else if(props.path.controlPoints[0].key)
            {
                setFirstCtrl({x:props.path.controlPoints.dx1, y:props.path.controlPoints.dy1});
            }
        
        
    }, [props.path])
    function letGo(){
        document.getElementById(eID).setAttributeNS(null, 'r', props.endSize);
        document.getElementById(fID)?document.getElementById(fID).setAttributeNS(null, 'r', props.controlSize):null;
        document.getElementById(sID)?document.getElementById(sID).setAttributeNS(null, 'r', props.controlSize):null
    }
    // function startDrag(evt) {
    //     evt.preventDefault()
    //     if (evt.target.classList.contains('draggable')) {
    //         setSelectedElement(evt.target);
    //         let offset = getMousePosition(evt);
    //         let numX = offset.x - parseFloat(evt.target.getAttributeNS(null, "cx"))
    //         let numY = offset.y - parseFloat(evt.target.getAttributeNS(null, "cy"))
    //         setOffsetX(Math.round( ( numX + Number.EPSILON ) * 100 ) / 100)
    //         setOffsetY(Math.round( ( numY + Number.EPSILON ) * 100 ) / 100)
    //     }
    // }
    async function drag(evt) {
        if (selectedElement) {
            evt.preventDefault();
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
                if(selectedElement.id===fID){
                    selectedElement.setAttributeNS(null, 'r', props.controlSize*1.5) 
                    setFirstCtrl({x:xCoord-50, y:yCoord-100})
                    props.hoverFunc('dx1')
                    props.hoverFunc('dy1')
                    document.getElementById('grid').removeChild(document.getElementById('path'))
                    drawPath()
                }else if(selectedElement.id===sID){
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
            setFirstCtrl({x: path.controlPoints[0].value, y: path.controlPoints[1].value})
            setEndPoint({x: path.endPoint.x, y: path.endPoint.y})
        } else if (props.type==="c"){
            setFirstCtrl({x: path.controlPoints.dx1, y: path.controlPoints.dy1})
            setSecondCtrl({x: path.controlPoints.dx2, y: path.controlPoints.dy2})
            setEndPoint({x: path.endPoint.x, y: path.endPoint.y})
        } else{
            setEndPoint({x: path.endPoint.x, y: path.endPoint.y})
        }
        const allPath = document.getElementsByClassName('pathSection')
        allPath.setAttributeNS(null, 'stroke-width', props.strokeWidth)
        allPath.setAttributeNS(null, 'stroke', props.stroke)
        const i = document.getElementById(path.id)
        i.setAttributeNS(null, 'stroke-width', hoverWidth)
        i.setAttributeNS(null, 'stroke', hoverColour)
    }
    
    function drawPath(){
        const svgns = "http://www.w3.org/2000/svg"
        const grid = document.getElementById('pathGroup');
        const currentPath = document.createElementNS(svgns, 'path');
        currentPath.setAttributeNS(null, "id", 'path');
        currentPath.setAttributeNS(null, 'stroke', props.stroke);
        currentPath.setAttributeNS(null, 'stroke-width', props.strokeWidth);
        currentPath.setAttributeNS(null, 'stroke-opacity', props.strokeOpacity);
        currentPath.setAttributeNS(null, 'fill', props.fill);
        currentPath.setAttributeNS(null, 'fill-opacity', props.fillOpacity);
        if(props.path.type==='q'){
            currentPath.setAttributeNS(null, 'd', `M50,100q${firstCtrl.x},${firstCtrl.y} ${props.endPoint.x},${props.endPoint.y}`)
        }else if(props.path.type==='c'){
            currentPath.setAttributeNS(null, 'd', `M50,100c${firstCtrl.x},${firstCtrl.y} ${secondCtrl.x},${secondCtrl.y} ${props.endPoint.x},${props.endPoint.y}`)
        }else if(props.path.type==='s'){
            currentPath.setAttributeNS(null, 'd', `M50,100s${secondCtrl.x},${secondCtrl.y} ${props.endPoint.x},${props.endPoint.y}`)
        }else if(props.path.type==='l'){
            currentPath.setAttributeNS(null, 'd', `M50,100l${props.endPoint.x},${props.endPoint.y}`)
        }else if(props.path.type==='v'){
            currentPath.setAttributeNS(null, 'd', `M50,100v${props.endPoint.y}`)
        }else if(props.path.type==='h'){
            currentPath.setAttributeNS(null, 'd', `M50,100h${props.endPoint.x}`)
        }else if(props.path.type==='t'){
            currentPath.setAttributeNS(null, 'd', `M50,100q${props.fullPath[props.pathID].controlPoints[0].value},${props.fullPath[props.pathID].controlPoints[1].value} ${props.fullPath[props.pathID].endPoint.x},${props.fullPath[props.pathID].endPoint.y}t${props.endPoint.x},${props.endPoint.y}`);
        }
        grid.appendChild(currentPath);
    }

    let d;
    if(props.path.type==="c"){
        d = `M${props.path.startPoint.x},${props.path.startPoint.y}${props.path.type}${props.path.controlPoints[0].value},${props.path.controlPoints[1].value} ${props.path.controlPoints[2].value},${props.path.controlPoints[3].value} ${props.path.endPoint.x},${props.path.endPoint.y}`;
        const title1 = `Control Point: ${firstCtrl.x},${firstCtrl.y}`
        const title2 = `Control Point: ${secondCtrl.x},${secondCtrl.y}`
        const title3 = `End Point: ${endPoint.x},${endPoint.y}`
        return(
            <Svg>
                <Path className="pathSection" d={d} id={props.path.id}  fill={props.fill} fillOpacity={props.fillOpacity} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} onClick={()=>pressFunc(command)} onMouseOver={() => hoverFunc(props.path.id)} onMouseLeave={() => resetHover(props.path.id)} />
                <circle className="draggable" id="firstCtrl" cx={firstCtrl.x+50} cy={firstCtrl.y+100} onMouseDown={(evt) => props.startDrag(evt)}  onMouseUp={props.endDrag} onMouseLeave={() => letGo()}   style={styles(props).drag} r={props.controlSize}  fill={props.controlCol} fillOpacity={props.ctrlOpacity}>
                    <title>
                        {title1}
                    </title>
                </circle>
                <circle className="draggable" id="secondCtrl" cx={secondCtrl.x+50} cy={secondCtrl.y+100} onMouseDown={(evt) => props.startDrag(evt)}  onMouseUp={props.endDrag} onMouseLeave={() => letGo()}   style={styles(props).drag} r={props.controlSize}  fill={props.controlCol} fillOpacity={props.ctrlOpacity}>
                    <title>
                        {title2}
                    </title>
                </circle>
                <circle className="draggable" id="endPoint" cx={endPoint.x+50} cy={endPoint.y+100} onMouseDown={(evt) => props.startDrag(evt)}  onMouseUp={props.endDrag} onMouseLeave={() => letGo()}   style={styles(props).end} fill={props.endCol} fillOpacity={props.endOpacity} r={props.endSize} >
                    <title>
                        {title3}
                    </title>
                </circle> 
                </Svg>
        )
        } else if(props.path.type==="q" || props.path.type==="s"){    
        const title1 = `Control Point: ${firstCtrl.x},${firstCtrl.y}`
        const title2 = `End Point: ${endPoint.x},${endPoint.y}`
        d = `M${props.path.startPoint.x},${props.path.startPoint.y}${props.path.type}${props.path.controlPoints[0].value},${props.path.controlPoints[1].value} ${props.path.endPoint.x},${props.path.endPoint.y}`;
        return(
            <Svg>
                <Path className="pathSection" d={d} id={props.path.id}  fill={props.fill} fillOpacity={props.fillOpacity} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} onClick={()=>pressFunc(command)} onMouseOver={() => hoverFunc(props.path.id)} onMouseLeave={() => resetHover(props.path.id)} />
                <circle className="draggable" id="firstCtrl" cx={firstCtrl.x+50} cy={firstCtrl.y+100} onMouseDown={(evt) => props.startDrag(evt)}  onMouseUp={props.endDrag} onMouseLeave={() => letGo()}   style={styles(props).drag} r={props.controlSize}  fill={props.controlCol} fillOpacity={props.ctrlOpacity}>
                    <title>
                        {title1}
                    </title>
                </circle>
                <circle className="draggable" id="endPoint" cx={endPoint.x+50} cy={endPoint.y+100} onMouseDown={(evt) => props.startDrag(evt)}  onMouseUp={props.endDrag} onMouseLeave={() => letGo()}   style={styles(props).end} fill={props.endCol} fillOpacity={props.endOpacity} r={props.endSize} >
                    <title>
                        {title2}
                    </title>
                </circle> 
            </Svg>
        )
        } else if(props.path.type==="l"){
        const title = `End Point: ${endPoint.x},${endPoint.y}`
        d = `M${props.path.startPoint.x},${props.path.startPoint.y}${props.path.type}${props.path.endPoint.x},${props.path.endPoint.y}`;
        return(
            <Svg>
                <Path className="pathSection" d={d} id={props.path.id}  fill={props.fill} fillOpacity={props.fillOpacity} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} onClick={()=>pressFunc(command)} onMouseOver={() => hoverFunc(props.path.id)} onMouseLeave={() => resetHover(props.path.id)} />
                    <circle className="draggable" id="endPoint" cx={endPoint.x+50+props.fullPath[props.pathID].endPoint.x} cy={endPoint.y+100+props.fullPath[props.pathID].endPoint.y} onMouseDown={(evt) => props.startDrag(evt)}  onMouseUp={props.endDrag} onMouseLeave={() => letGo()}   style={styles(props).end} fill={props.endCol} fillOpacity={props.endOpacity} r={props.endSize} >
                    <title>
                        {title}
                    </title>
                </circle>  
            </Svg>
        )
        } else if(props.path.type==="v"){
        const title = `End Point: ${endPoint.x},${endPoint.y}`
        d = `M${props.path.startPoint.x},${props.path.startPoint.y}${props.path.type}${props.path.endPoint.y}`;
        return(
            <Svg>
                <Path className="pathSection" d={d} id={props.path.id}  fill={props.fill} fillOpacity={props.fillOpacity} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} onClick={()=>pressFunc(command)} onMouseOver={() => hoverFunc(props.path.id)} onMouseLeave={() => resetHover(props.path.id)} />
                    <circle className="draggable" id="endPoint" cx={endPoint.x+50+props.fullPath[props.pathID].endPoint.x} cy={endPoint.y+100+props.fullPath[props.pathID].endPoint.y} onMouseDown={(evt) => props.startDrag(evt)}  onMouseUp={props.endDrag} onMouseLeave={() => letGo()}   style={styles(props).end} fill={props.endCol} fillOpacity={props.endOpacity} r={props.endSize} >
                    <title>
                        {title}
                    </title>
                </circle>  
            </Svg>
        )
        } else if(props.path.type==="h"){
        const title = `End Point: ${endPoint.x},${endPoint.y}`
        d = `M${props.path.startPoint.x},${props.path.startPoint.y}${props.path.type}${props.path.endPoint.x}`;
        return(
            <Svg>
                <Path className="pathSection" d={d} id={props.path.id} fill={props.fill} fillOpacity={props.fillOpacity} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} onClick={()=>pressFunc(command)} onMouseOver={() => hoverFunc(props.path.id)} onMouseLeave={() => resetHover(props.path.id)} />
                <circle className="draggable" id="endPoint" cx={endPoint.x+50+props.fullPath[props.pathID].endPoint.x} cy={endPoint.y+100+props.fullPath[props.pathID].endPoint.y} onMouseDown={(evt) => props.startDrag(evt)}  onMouseUp={props.endDrag} onMouseLeave={() => letGo()}   style={styles(props).end} fill={props.endCol} fillOpacity={props.endOpacity} r={props.endSize} >
                    <title>
                        {title}
                    </title>
                </circle>  
            </Svg>
        )
        } 
        else if(props.path.type==="t"){
        d = `M${props.path[props.path.id-1].startPoint.x},${props.path[props.path.id-1].startPoint.y}q${props.path[props.path.id-1].controlPoints[0].value},${props.path[props.path.id-1].controlPoints[1].value} ${props.path[props.path.id-1].endPoint.x},${props.path[props.path.id-1].endPoint.y}t${props.path.endPoint.x},${props.path.endPoint.y}`
        const width = props.size-props.path[props.path.id-1].startPoint.x
        return(
            <Svg key={i+200}  height={props.size} width={props.size} viewBox={viewBox} x="0" y="0">
                <Defs>
                    <ClipPath id="clip">
                        <Rect x={props.path[props.path.id-1].startPoint.x+props.path[props.path.id-1].endPoint.x} y="0" width={width} height={props.size} />
                    </ClipPath>
                </Defs>
                <Path className="pathSection" d={d} id={props.path.id}  fill={props.fill} fillOpacity={props.fillOpacity} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} onClick={()=>pressFunc(command)} onMouseOver={() => hoverFunc(props.path.id)} onMouseLeave={() => resetHover(props.path.id)} clipPath="url(#clip)" />
            </Svg>
        )}

};
export default NodePath;

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
