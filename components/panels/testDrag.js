// Receives full path as string, need to split it into individual commands and then split each command into individual nodes
// Assign each node a circle that can be moved and updates the nodes co-ordinates and update the full path string
// Then split the full path into the individual commands again or make the commands before the string i.e reverse the first process
// import Grid from "../grid";
// const Point = (x, y, id) =>{
//   const node = document.createElementNS(svgns, 'circle');
//   const grid = document.getElementById('grid')
//   node.setAttributeNS(null, 'id', `controlNode${id}`);
//   node.setAttributeNS(null, "cx", `${x}`);
//   node.setAttributeNS(null, "cy", `${y}`);
//   node.setAttributeNS(null, "r", '5');
//   node.addEventListener('mousedown', (evt)=>startDrag(evt));
//   node.addEventListener('mousemove', (evt)=>drag(evt));
//   node.addEventListener('mouseleave', endDrag);
//   node.classList.add('draggable');
//   grid.appendChild(node);
// }

const Out = () =>{

  const path = "M50,50Q75,100 100,150C120,170 140,190 160,210L210,220H280V350"
  const arr = path.split(/([\D][0-9 ,]+)/)
  let newArr = [];
  arr.map((char, i) => {
    if(char!=""){
      newArr.push(char)
    }
  })
  console.log(newArr)
  
  const coOrds = newArr.map((command, i) => {
    const last = command.split(/ /)
    // console.log(last)
    return last
  });
  console.log(coOrds)
  coOrds.map((set, i) => {
    set.map((pair, i) => {
      if (i===0){
        const array = pair.split("")
        const commandType = array[0]
        const newPair = array.slice(1).join("")
        console.log( newPair);
        console.log(commandType)
      }
      else if(i===1){
        if (props.type==="s"){
          props.setSecondCtrl({dx2:pair[0], dy2:pair[1]})
        } else{
          props.setFirstCtrl({dx1:pair[0], dy1:pair[1]})
        }
      }
      else{       
        props.setSecondCtrl({dx2:pair[0], dy2:pair[1]})
      }
    })
  })
  

  return(
  //   <Grid size="400">
  //     {newArr.map((command, i) => {
  //   console.log(command.split(/(\d\d)/)[0])
  //   return(
  //     <Point x={command.split(/(\d\d)/)[0]} y={command.split(/[\D]/)[1]} id={i-1} /> 
  //   )
  // })}
  //   </Grid>
  <></>
  )
}

export default Out
