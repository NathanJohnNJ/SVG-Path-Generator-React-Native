import './commands.css';
import { useMousePosition } from '../useMousePosition';
import { useState, useEffect } from 'react';
import Grid from '../grid';
import Modal from 'react-modal';

const Q = (props) => {
    const grid = document.getElementById('grid');
    const bigGrid = document.getElementById('');
    const mousePosition = useMousePosition();
    const [absRel, setAbsRel] = useState("q");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    // const [zoom, setZoom] = useState(10);

    function openModal(){
        setModalIsOpen(true)
        props.toggle()
    }
    function closeModal(){
        setModalIsOpen(false)
    }
    // function zoomIn(){
    //     let z=zoom*10;
    //     setZoom(z)
    // }
    // function zoomOut(){
    //     let z=zoom/10;
    //     setZoom(z)
    // }

    useEffect(()=>{
        if (props.type==="relative"){
            setAbsRel("q")
        } else {
            setAbsRel("Q")
        }
    })

//needs starting point, curve point and finishing point
//get initial size and base the grid for each command on the size needed.
    return (
        <div className="command">
            <Button onClick={openModal}>{absRel}</Button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
                className="commandModal"
                >
                <StyledModal>
                    <Button onClick={closeModal}>X</Button>
                    <div>
                        <div>
                            <Grid size="200" />
                        </div>
                        {/* <CommandButtons>
                            <Button onClick={zoomIn}>+</Button>
                            <Button onClick={zoomOut}>-</Button>
                        </CommandButtons> */}
                    </div>
                </StyledModal>
            </Modal>
        </div>
    )
};

export default Q;

const StyledModal = styled.div`
    height: 75vh;
    width: 75vw;    
    margin-left: 12.5vw;
    margin-top: 12.5vh;
    display: flex;
    justify-content: space-evenly;
`
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