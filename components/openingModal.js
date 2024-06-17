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
        name: 'Curve',                                                      
        id: props.pathID,
        startPoint: {x: 50, y: 50},
        controlPoints: [{key: 'dx1', value:25}, {key: 'dy1', value:50}, {key: 'dx2', value:75}, {key: 'dy2', value:-50}],
        endPoint: {x: 100, y: 0},
    }

    const qPath = {
        type: 'q',
        name: 'Quadratic',
        name2: 'Bézier',
        name3: 'Curve',
        id: props.pathID,
        startPoint: {x: 50, y: 50},
        controlPoints: [{key: 'dx1', value:25}, {key: 'dy1', value:50}],
        endPoint: {x:50, y: 0},
    }

    const lPath = {
        type: 'l',
        name: 'Line',
        id: props.pathID,
        startPoint: {x: 50, y: 50},
        endPoint: {x:50, y: 50}
    }

    const hPath = {
        type: 'h',
        name: 'Horizontal',
        name2: 'Line',
        id: props.pathID,
        startPoint: {x: 50, y: 50},
        endPoint: {x:50, y: 0}
    }

    const vPath = {
        type: 'v',
        name: 'Vertical',
        name2: 'Line',
        id: props.pathID,
        startPoint: {x: 50, y: 50},
        endPoint: {x:0, y: 50}
    }

    const openingArray = [cPath, qPath, lPath, hPath, vPath];

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
                            let d;
                            if(command.type==="c"){
                                d = `M${command.startPoint.x},${command.startPoint.y}${command.type}${command.controlPoints[0].value},${command.controlPoints[1].value} ${command.controlPoints[2].value},${command.controlPoints[3].value} ${command.endPoint.x},${command.endPoint.y}`;
                            } else if(command.type==="q" || command.type==="s"){
                                d = `M${command.startPoint.x},${command.startPoint.y}${command.type}${command.controlPoints[0].value},${command.controlPoints[1].value} ${command.endPoint.x},${command.endPoint.y}`;
                            } else if(command.type==="t" || command.type==="l" || command.type==="v" || command.type==="h"){
                                d = `M${command.startPoint.x},${command.startPoint.y}${command.type}${command.endPoint.x},${command.endPoint.y}`;
                            }
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
                                        <Path id={command.type} d={d} fill="none" key={i+10} stroke="#fda" strokeWidth="5" onMouseOver={()=>mouseOver(command.type)} onMouseOut={()=>mouseOut(command.type)}/>
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
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight:4,
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