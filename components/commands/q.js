import { useState, useEffect } from 'react';
import Grid from '../gridWithDrag';
import Modal from 'react-modal';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

const Q = (props) => {
    const grid = document.getElementById('grid');
    const bigGrid = document.getElementById('');
    const [qPath, setQPath] = useState('M50,100 q25,50 50,0')
    const [absRel, setAbsRel] = useState("q");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [hover, setHover] = useState(false);

    function openModal(){
        setModalIsOpen(true)
        props.toggle()
    }
    function closeModal(){
        const newPath = props.path + qPath
        props.setPath(newPath)
        setModalIsOpen(false)
    }
    function buttonHover(){
        setHover(true)
    }
    function buttonLeave(){
        setHover(false)
    }

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
        <View className="command">
            <button onClick={openModal} onMouseOver={buttonHover}  onMouseLeave={buttonLeave} style={hover?styles.hover:styles.button}><Text>{absRel}</Text></button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
                style={styles.modal}
                >
                <View>
                    <button id="close" onClick={closeModal} onMouseOver={buttonHover} onMouseLeave={buttonLeave} style={hover?styles.hover:styles.button}><Text>X</Text></button>
                        <View>
                            <Grid size="200" type="Q" path={qPath} setPath={setQPath}  />
                        </View>
                </View>
            </Modal>
        </View>
    )
};

export default Q;

const styles = StyleSheet.create({
    modal: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      height: '75vh',
      width: '75vw',    
      marginLeft: '12.5vw',
      marginTop: '12.5vh',
    },
    button: {
      width:'30px',
      height:'30px',    
      color:'#4e4e4e',
      backgroundColor: '#000000',
      textAlign: 'center',
      textShadow: '-1px 1px 1px #ffffff',
      fontSize: '30px',
      textJustify: 'center'
    },
    hover: {
        width:'30px',
        height:'30px',    
        color:'#ffffff',
        backgroundColor: '#4e4e4e',
        textAlign: 'center',
        textShadow: '-1px 1px 1px #ffffff',
        fontSize: '30px',
        textJustify: 'center',
        cursor: 'pointer',
        boxShadow: '-1px -1px 1px 1px #ffffff, -1px 1px 1px 1px #ffffff, 1px 1px 1px 1px #ffffff, 1px -1px 1px 1px #ffffff'
    }
})

 

const Command1s = styled.View`
    align-items: center;
    justify-content: space-evenly;
    display:none;
    margin: 5px;
`