import { StyleSheet, View, Modal, Pressable, Text } from 'react-native';
import { useState, useEffect } from 'react';
import FieldSet from '@njtd/react-native-fieldset';
// import FullPath from '../fullPath';

export const Checkbox = (props) => {
    
    return (
      <div style={{display: 'flex', flexDirection: 'column-reverse', alignItems: 'center', justifyContent: 'center'}}>
        <input
          type="checkbox"
          id={props.id}
          checked={props.isChecked}
          onChange={props.onChange}
        />
        <label htmlFor="checkbox">{props.label}</label>
      </div>
    )
  }


const NodePanel = (props) => {
    const [isChecked, setIsChecked] = useState(false);
    const [endIsChecked, setEndIsChecked] = useState(false);
    const [offsetX, setOffsetX] = useState();
    const [offsetY, setOffsetY] = useState();
    const [selectedElement, setSelectedElement] = useState(null);
    const [mousePosition,setMousePosition] = useState({ x: null, y: null });
    const useMousePosition = () => {
        
        // useEffect(() => {
          const updateMousePosition = ev => {
            setMousePosition({ x: ev.clientX, y: ev.clientY });
          };
          window.addEventListener('mousemove', updateMousePosition);
        //   return () => {
        //     window.removeEventListener('mousemove', updateMousePosition);
        //   };
        // }, []);
        return mousePosition;
      };  
    
    function getMousePosition(evt) {
        const svg = evt.target;
        const CTM = svg.getScreenCTM();
        return {
          x: (evt.clientX - CTM.e) / CTM.a,
          y: (evt.clientY - CTM.f) / CTM.d
        };
      }
    async function drag(evt) {
        console.log(selectedElement);
        console.log('drag Function');
        if (selectedElement) {
            evt.preventDefault();
            console.log(selectedElement);
            console.log('drag Function');
            const selectID = selectedElement.getAttribute('id');
            console.log(selectID);
            let coord =useMousePosition();
            let xCoord = Math.round( ( coord.x - offsetX ));
            let yCoord = Math.round( ( coord.y - offsetY ));
            selectedElement.setAttributeNS(null, "cx", xCoord);
            selectedElement.setAttributeNS(null, 'cy', yCoord);
            // document.getElementById('grid').removeChild(document.getElementById('path'));
            // drawPath();
        }
    }
    function endDrag() {
        setSelectedElement(null);
    }
    function startDrag(evt) {
        evt.preventDefault()
        if (evt.target.classList.contains('draggable')) {
            setSelectedElement(evt.target);
            let offset = MousePosition(evt);
            let numX = offset.x - parseFloat(evt.target.getAttributeNS(null, "cx"))
            let numY = offset.y - parseFloat(evt.target.getAttributeNS(null, "cy"))
            setOffsetX(Math.round( ( numX + Number.EPSILON ) * 100 ) / 100)
            setOffsetY(Math.round( ( numY + Number.EPSILON ) * 100 ) / 100)
        }
    }
    
    function addNodes(){
      const arr = props.fullAbsCommand.split(/([\D][0-9 ,]+)/)
      let newArr = [];
      arr.map((char, i) => {
      if(char!=""){
        newArr.push(char)
      }
    })
    console.log(newArr)

    }
    function checkHandler(){
        setIsChecked(!isChecked);
        let fullPath = 'M50,50';
        if(!document.getElementById('pathGroup')){
          const grid = document.getElementById('grid');
          grid.removeChild(document.getElementById('fullPath'));
        }else{
          props.path.map((currentPath, i) => {
            fullPath += currentPath.fullCommand
            return fullPath
          })
        }
        !isChecked
        ?
        addNodes()
          // props.path.map((command, i) => {
          //     const svgns = "http://www.w3.org/2000/svg"
          //     const grid = document.getElementById('grid');
          //     grid.addEventListener('mousemove', (evt)=>drag(evt));
          //     grid.addEventListener('mouseup', endDrag);
          //     if (command.type==="q" || command.type ==="s"){
          //         const node1 = document.createElementNS(svgns, 'circle');
          //         node1.setAttributeNS(null, 'id', `controlNode${command.id}`);
          //         node1.setAttributeNS(null, "cx", `${command.controlPoints[0].value+command.startPoint.x}`);
          //         node1.setAttributeNS(null, "cy", `${command.controlPoints[1].value+command.startPoint.y}`);
          //         node1.setAttributeNS(null, "r", '5');
          //         node1.addEventListener('mousedown', (evt)=>startDrag(evt));
          //         node1.addEventListener('mousemove', (evt)=>drag(evt));
          //         node1.addEventListener('mouseleave', endDrag);
          //         node1.classList.add('draggable');
          //         grid.appendChild(node1);
          //     } else if(command.type==="c"){
          //         const node1 = document.createElementNS(svgns, 'circle');
          //         node1.setAttributeNS(null, 'id', `controlNode${command.id}`);
          //         node1.setAttributeNS(null, "cx", `${command.controlPoints[0].value+command.startPoint.x}`);
          //         node1.setAttributeNS(null, "cy", `${command.controlPoints[1].value+command.startPoint.y}`);
          //         node1.setAttributeNS(null, "r", '5');
          //         node1.addEventListener('mousedown', (evt)=>startDrag(evt));
          //         node1.addEventListener('mousemove', (evt)=>drag(evt));
          //         node1.addEventListener('mouseleave', endDrag);
          //         node1.classList.add('draggable');
          //         grid.appendChild(node1);
          //         const node2 = document.createElementNS(svgns, 'circle');
          //         node2.setAttributeNS(null, 'id', `control2Node${command.id}`);
          //         node2.setAttributeNS(null, 'cx',`${command.controlPoints[2].value+command.startPoint.x}`);
          //         node2.setAttributeNS(null, "cy", `${command.controlPoints[3].value+command.startPoint.y}`);
          //         node2.setAttributeNS(null, "r", '5');
          //         node2.addEventListener('mousedown', (evt)=>startDrag(evt));
          //         node2.addEventListener('mousemove', (evt)=>drag(evt));
          //         node2.addEventListener('mouseleave', endDrag);
          //         node2.classList.add('draggable');
          //         grid.appendChild(node2);
          //     }
          // })
        :
          props.path.map((command,i) => {
              const grid = document.getElementById('grid');
              grid.removeEventListener('mousemove', (evt)=>{drag(evt)});
              grid.removeEventListener('mouseleave', endDrag);
              grid.removeChild(document.getElementById(`controlNode${command.id}`));
              grid.removeChild(document.getElementById(`control2Node${command.id}`));
          })
      }
      function endHandler(){
        setEndIsChecked(!endIsChecked)
        !endIsChecked
        ?
          props.path.map((command, i) => {
              const svgns = "http://www.w3.org/2000/svg"
              const grid = document.getElementById('grid');
              grid.addEventListener('mousemove', (evt)=>{drag(evt)});
              grid.addEventListener('mouseleave', endDrag);
              const endNode = document.createElementNS(svgns, 'circle');
              endNode.setAttributeNS(null, 'id', `endNode${command.id}`);
              endNode.setAttributeNS(null, 'cx',`${command.endPoint.x+command.startPoint.x}`);
              endNode.setAttributeNS(null, "cy", `${command.endPoint.y+command.startPoint.y}`);
              endNode.setAttributeNS(null, "r", '5');
              endNode.addEventListener('mousedown', (evt)=>startDrag(evt));
              endNode.addEventListener('mouseup', endDrag);
              endNode.classList.add('draggable');
              grid.appendChild(endNode);
          })
        :
          props.path.map((command,i) => {
              const grid = document.getElementById('grid');
              grid.removeEventListener('mousemove', (evt)=>{drag(evt)});
              grid.removeEventListener('mouseleave', endDrag);
              grid.removeChild(document.getElementById(`endNode${command.id}`));
          })
      }

    return(
        <View style={styles(props).nodePanel}>
            <Text style={styles(props).modalTitle}>
                Display Options
            </Text>
            <FieldSet label="Display Nodes" labelColor={props.controlCol} labelStyle={styles(props).label} mainStyle={styles(props).fieldSet}>
                    <table style={styles(props).table}>
                        <tbody style={styles(props).tbody}>
                            <tr style={styles(props).tr}>
                                <td style={styles(props).td}>
                                    <Checkbox id="onCheckbox" label="Control" isChecked={isChecked} path={props.path} onChange={checkHandler} />
                                </td>
                                <td style={styles(props).end}>
                                    <Checkbox id="endOnCheckbox" label="End" isChecked={endIsChecked} path={props.path} onChange={endHandler} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
            </FieldSet>
        </View>
    )
}

export default NodePanel;

const styles = (props) => StyleSheet.create({
    nodePanel:{
        backgroundColor: '#eee',
        borderColor: '#fdb',
        borderWidth: 3,
        borderRadius: 18,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        boxShadow: '-2px 2px 8px #9c9c9c',
        margin: 5,
        height: 130,
        width: 185  
    },
    modalTitle: {
        fontFamily: 'Quicksand-Bold',
        fontSize: 22,
        textShadow: '-1px 1px 2px gray, 1px 1px 1px gray',
        whiteSpace: 'nowrap',
        textAlign: 'center',
    },
    fieldSet:{
        backgroundColor: '#ddd',
        height:50,
        width: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 18
    },
    label: {
        fontFamily: 'Quicksand-Bold',
        fontSize: 15.5,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 6,
    },
    table: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        margin: 2
    },
    tbody:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tr: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    td: {
        display: 'flex',
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        border: '1.5px dashed grey',
        borderRadius: 5,
        fontFamily: 'Quicksand-Bold',
        fontSize: 15,
        color: props.controlCol,
        width: 55,
        height: 40,
        padding: 2,
        margin: 1,
        backgroundColor: '#ccc',
    },
    end: {
        display: 'flex',
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        border: '1.5px dashed grey',
        borderRadius: 5,
        fontFamily: 'Quicksand-Bold',
        fontSize: 15,
        color: props.endCol,
        width: 55,
        height: 40,
        padding: 2,
        margin: 1,
        backgroundColor: '#ccc',
    },
})