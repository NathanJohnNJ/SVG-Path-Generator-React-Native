import { useState, useEffect } from 'react';
import Q from './commands/q';
import Grid from './grid';
import styled from 'styled-components/native';
import { useMousePosition } from './useMousePosition';

const Draw = () => {
    const [type, setType] = useState('relative');
    const [path, setPath] = useState("");
    const mousePosition = useMousePosition()
    

    function toggle(){
        const rel = document.getElementById('relative');
        const abs = document.getElementById('absolute');
        if (rel.style.backgroundColor === "rgb(0, 0, 0)"){
            rel.style.backgroundColor = "#4e4e4e"
            rel.style.color = "#ffffff"
            rel.classList.add("selected")
            abs.classList.remove("selected")
            abs.style.backgroundColor = "#000000"
            abs.style.color = "#4e4e4e"
            setType("relative")
        } else {
            rel.style.backgroundColor = "#000000"
            rel.style.color = "#4e4e4e"
            abs.style.backgroundColor = "#4e4e4e"
            abs.style.color = "#ffffff"
            abs.classList.add("selected")
            rel.classList.remove("selected")
            setType("absolute")
        }
    }
    function commandToggle(){
        const buttons = document.getElementById("commandBtns")
        const button = document.getElementById("commandBtn")
        if (buttons.style.display==="none"){
            button.classList.add("selected")
            buttons.style.display = "flex"
        }else{
            buttons.style.display = "none"
            button.classList.remove("selected")
        }
    }

   

    return (
        <div className="draw">
            <TypeSwitcher>
                <Switch id="absolute" onClick={()=>toggle()}>Absolute</Switch>
                <Switch className="selected" id="relative" onClick={()=>toggle()}>Relative</Switch>
            </TypeSwitcher>
            <div id="commandBtn" className="cmdBtn" onClick={() => commandToggle()}>
                <p>?</p>
            </div>
            <CommandButtons>
                <Q type={type} toggle={commandToggle} />
                <div className="command"  onClick={() => commandToggle()}>
                <Button>X</Button>
                </div>
            </CommandButtons>
            
            <div>
                <Grid size="400" />
            </div>
            {mousePosition.x}
            {mousePosition.y}
        </div>
    )
};

export default Draw;

const Button = styled.button`
width:30px;
height:30px;    
color:#4e4e4e;
background-color: #000000;
text-align: center;
text-shadow: -1px 1px 1px #ffffff;
font-size: 30px;
text-justify: center;

&:hover {
    cursor:pointer;
    color: #ffffff;
    background-color: #4e4e4e;
    box-shadow: -1px -1px 1px 1px #ffffff, -1px 1px 1px 1px #ffffff, 1px 1px 1px 1px #ffffff, 1px -1px 1px 1px #ffffff;
}
`

const CommandButtons = styled.div`
    align-items: center;
    justify-content: space-evenly;
    display:none;
    margin: 5px;
`

const TypeSwitcher = styled.div`
    display:flex;
    justify-content: space-between;
    width:162px;
    height: 20px;
`
const Switch = styled.div`
    width:80px;
    height:20px;
    color:#4e4e4e;
    background-color: #000000;
    &:hover{
        cursor:pointer;
    }
    &.selected{
        box-shadow: -1px -1px 1px 1px #ffffff, -1px 1px 1px 1px #ffffff, 1px 1px 1px 1px #ffffff, 1px -1px 1px 1px #ffffff;
        color: #ffffff;
        background-color: #4e4e4e;
    }
`