import { View, Text, StyleSheet, Modal, Pressable, SafeAreaView } from 'react-native';
import Grid from './grid';
import { Path } from "react-native-svg";
import { useState } from 'react';
import Header from './header';
import Footer from './footer';

const Opening = (props) => {
    const [modalIsOpen, setModalIsOpen] = useState(true);
    function closeModal(){
        setModalIsOpen(false)
    }
    const cPath = {
        type:'c',
        absType: 'C',
        name: 'Curve',                                                      
        id: props.pathID,
        absX: 150,
        absY: 50,
        startPoint: {x: 50, y: 50},
        controlPoints: [{key: 'dx1', value:25}, {key: 'dy1', value:50}, {key: 'dx2', value:75}, {key: 'dy2', value:-50}],
        absControlPoints: [{key: 'dx1', value:75}, {key: 'dy1', value:100}, {key: 'dx2', value:125}, {key: 'dy2', value:0}],
        endPoint: {x: 100, y: 0},
        absEndPoint: {x: 150, y: 50},
        command: 'c25,50 75,-50 100,0',
        absCommand: 'C75,100 125,0 150,50',
        fullCommand: 'M50,50c25,50 75,-50 100,0',
        fullAbsCommand: 'M50,50C75,100 125,0 150,50'
    }

    const qPath = {
        type: 'q',
        absType: 'Q',
        name: 'Quadratic',
        name2: 'Bézier',
        name3: 'Curve',
        id: props.pathID,
        absX: 100,
        absY: 50,
        startPoint: {x: 50, y: 50},
        controlPoints: [{key: 'dx1', value:25}, {key: 'dy1', value:50}],
        absControlPoints: [{key: 'dx1', value:75}, {key: 'dy1', value:100}],
        endPoint: {x:50, y: 0},
        absEndPoint: {x: 100, y: 50},
        command: 'q25,50 50,0',
        absCommand: 'Q75,100 100,50',
        fullCommand: 'M50,50q25,50 50,0',
        fullAbsCommand: 'M50,50Q75,100 100,50'
    }

    const lPath = {
        type: 'l',
        absType: 'L',
        name: 'Line',
        id: props.pathID,
        absX: 100,
        absY: 100,
        startPoint: {x: 50, y: 50},
        endPoint: {x:50, y: 50},
        absEndPoint: {x: 100, y: 100},
        command: 'l50,50',
        absCommand: 'L100,100',
        fullCommand: 'M50,50l50,50',
        fullAbsCommand: 'M50,50L100,100'
    }

    const hPath = {
        type: 'h',
        absType:'H',
        name: 'Horizontal',
        name2: 'Line',
        id: props.pathID,
        absX: 100,
        absY: 50,
        startPoint: {x: 50, y: 50},
        endPoint: {x:50, y: 0},
        absEndPoint: {x: 100, y: 50},
        command: 'h50',
        absCommand: 'H100',
        fullCommand: 'M50,50h50',
        fullAbsCommand: 'M50,50H100'
    }

    const vPath = {
        type: 'v',
        absType:'V',
        name: 'Vertical',
        name2: 'Line',
        id: props.pathID,
        absX: 50,
        absY: 100,
        startPoint: {x: 50, y: 50},
        endPoint: {x:0, y: 50},
        absEndPoint: {x: 50, y: 100},
        command: 'v50',
        absCommand: 'V100',
        fullCommand: 'M50,50v50',
        fullAbsCommand: 'M50,50V100'
    }

    const openingArray = [cPath, qPath, lPath, hPath, vPath];
    // const [hover, setHover] = useState([q:false, c:false, l:false, v:false, h:false])
    const [hover, setHover] = useState([false, false, false, false, false])

    function select(command){
        const newPath = [command]
        props.setPath(newPath)
        setModalIsOpen(false);
    }
 
    function hoverFunc(id){
        const grid = document.getElementById(id)
        grid.style.backgroundColor = "#acd";
        grid.style.borderColor = "#e9b";
        grid.style.boxShadow = "-1px 1px 10px #000";
    }
    function resetHover(id){
        const grid = document.getElementById(id)
        grid.style.backgroundColor = "#def";
        grid.style.borderColor = "#ccf";
        grid.style.boxShadow = "-2px 2px 8px #9c9c9c";
    }
    function mouseOver(id){
        const path = document.getElementById(id)
        path.style.stroke = "#f51"
    }
    function mouseOut(id){
        const path = document.getElementById(id)
        path.style.stroke = "#fda"
    }

    return (
        <View>
        <Modal
        animationType="slide"
        transparent={false}
        visible={modalIsOpen}
        onRequestClose={closeModal}
        >
            <Header />
            <View style={styles.main}>
                <Text style={styles.heading}>
                    Choose your starting path...
                </Text>
                <View style={styles.row}>
                    {
                        openingArray.map((command, i) => {
                            const ID = `grid${command.type}`
                            return(
                                <View key={i*8} style={styles.gridWithTitle}>
                                    <View style={styles.gridTitleSection}>
                                        <Text style={styles.gridTitle}>
                                            {command.name}
                                        </Text>
                                        <Text style={styles.gridTitle}>
                                            {command.name2?command.name2:<></>}
                                        </Text>
                                        <Text style={styles.gridTitle}>    
                                            {command.name3?command.name3:<></>}
                                        </Text>
                                    </View>
                                <Pressable style={styles.gridSection} key={i+20} onPress={()=>select(command)}  onHoverIn={() => hoverFunc(ID)} onHoverOut={() => resetHover(ID)} id={ID}>
                                    <Grid size="150" mainWidth="180" id="miniGrid" key={i}>
                                        <Path id={command.type} d={command.fullAbsCommand} fill="none" key={i+10} stroke="#fda" strokeWidth="5" onMouseOver={()=>mouseOver(command.type)} onMouseOut={()=>mouseOut(command.type)}/>
                                    </Grid>
                                </Pressable>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
            <Footer />
        </Modal>
        </View>
    )
};

export default Opening;

const styles = StyleSheet.create({
    main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center', 
        flex:1,
    },
    heading: {
        fontFamily: 'Geologica-Black',
        fontSize: 20,
        marginTop: 20,
        display: 'flex',
        alignSelf: 'center', 
        justifySelf: 'center',
        marginBottom: -15
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex:1,
        alignSelf: 'center',
    },
      gridSection:{
        scale: 0.5,
        backgroundColor: '#def',
        borderColor: '#ccf',
        borderWidth: 3,
        borderRadius: 18,
        boxShadow: '-2px 2px 8px #9c9c9c',
        padding: 5,
        marginHorizontal: -40,
      },
      gridWithTitle:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: 300
      },
      gridTitle:{
        fontFamily:"Quicksand-Bold",
        fontSize: 16,
        textAlign: 'center',
      },
      gridTitleSection:{
        marginBottom:-35
      }
})