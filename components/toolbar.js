import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Modal from 'react-modal';

const Toolbar = (props) => {
    const [hover, setHover] = useState({file:false, help:false})
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function file(){
        const list = document.getElementById('fileList');
        list.style.display = 'flex'
        list.style.flexDirection = 'column'
    }
    function newDoc(){
        const list = document.getElementById('fileList');
        list.style.display = 'none'
        openModal()
    }

    function openModal(){
        setModalIsOpen(true)
    }
    function closeModal(){
        setModalIsOpen(false)
    }
    function mouseLeave(){
        setHover({file:false, help:false})
    }
    function mouseOver(type){
        if (type==='file'){
            setHover({file:true, help:false})
        }else if(type==='help'){
            setHover({file:false, help:true})
        }
    }
    function listMouse(){

    }
    function listLeave(){

    }

    return(
        <View style={styles(props).toolbar}>
            <button onMouseOver={()=>mouseOver('file')} onMouseLeave={mouseLeave} style={hover.file?styles(props).toolbarButtonHover:styles(props).toolbarButton} onClick={file}>File</button>
            <View>
                <Text style={hover?styles(props).listHover:styles(props).list} onMouseOver={listMouse} onMouseLeave={listLeave} onClick={newDoc}>New</Text>
            </View>
            <button onMouseOver={()=>mouseOver('help')} onMouseLeave={mouseLeave} style={hover.help?styles(props).toolbarButtonHover:styles(props).toolbarButton}>Help</button>
            <View>
                <Text style={hover?styles(props).listHover:styles(props).list}><a href="" rel="noreferrer" target="_blank">View MDN documentation</a></Text>
            </View>
        </View>
    )
};

export default Toolbar;


const styles = (props) => StyleSheet.create({
    toolbar: {
      flex: 1,
      width: '100vw',
      height: 20,
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#2d2d2d',
      position: 'absolute',
      top: 0
    },
    toolbarButton:{
      fontFamily: 'Poppins-ExtraLight',
      fontSize: 12,
      backgroundColor: '#2d2d2d',
    },
    toolbarButtonHover:{
        fontFamily: 'Poppins-ExtraLight',
        fontSize: 12,
        backgroundColor: '#4e4e4e',
        color: '#fff'
    },
    list:{   
        display: 'none',
        fontFamily: 'Poppins-ExtraLight',
        fontSize: 12,
        backgroundColor: '#2d2d2d',
    },
    listHover:{   
        fontFamily: 'Poppins-ExtraLight',
        fontSize: 12,
        backgroundColor: '#4e4e4e',
        color: '#fff'
    },
})