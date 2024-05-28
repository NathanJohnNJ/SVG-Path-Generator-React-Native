import { StyleSheet, View, Modal, Pressable, Text, TextInput, Image } from 'react-native';
import { useState, useEffect } from 'react';
import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';
import FieldSet from 'react-native-fieldset';



const ConfigPanel = (props) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [attributeToChange, setAttributeToChange] = useState();
    const [hover, setHover] = useState({x: false, change: false, edit: false});
    const [showStroke, setShowStroke] = useState(false);
    const [showFill, setShowFill] = useState(false);
    const [showControl, setShowControl] = useState(false);
    const [showEndPoints, setShowEndPoints] = useState(false);

    function hoverFunc(i){
        const newHover = { ...hover, [i]: true}
        setHover(newHover)
    }
    function resetHover(){
        setHover({x: false, change: false, edit: false})
    }
    function openModal(title){
        setModalIsOpen(true)
        setModalTitle(title)
        setAttributeToChange(title)
    }

    function closeModal(){
        setModalIsOpen(false)
        setAttributeToChange()
    }

    const onSelectColor = ({ hex }) => {
        console.log(attributeToChange)
        if (attributeToChange==='Stroke'){
            props.setStroke(hex)
        } else if (attributeToChange==='Fill'){
            props.setFill(hex)
        } else if (attributeToChange==='Control Points'){
            props.setControlCol(hex)
        } else if (attributeToChange==='End Points'){
        props.setEndCol(hex)
        } else if (attributeToChange==='Highlight'){
            props.setHighlight(hex)
      }
}

    function up(){
        if(props.strokeOpacity<1){
            const newOpacity = props.strokeOpacity + 0.05
            props.setStrokeOpacity(newOpacity)       
        } else {
            props.setStrokeOpacity(1)
        }
    }
    function down(){
        if(props.strokeOpacity>0){
            const newOpacity = props.strokeOpacity - 0.05
            props.setStrokeOpacity(newOpacity)       
        } else {
            props.setStrokeOpacity(0)
        }
    }
    function upFill(){
        if(props.fillOpacity<1){
            const newOpacity = props.fillOpacity + 0.05
            props.setFillOpacity(newOpacity)       
        } else {
            props.setFillOpacity(1)
        }
    }
    function downFill(){
        if(props.fillOpacity>0){
            const newOpacity = props.fillOpacity - 0.05
            props.setFillOpacity(newOpacity)       
        } else {
            props.setFillOpacity(0)
        }
    }
    function upSize(){
        if(props.controlSize<10){
            const newSize = props.controlSize + 1
            props.setControlSize(newSize)       
        } else {
            props.setControlSize(10)
        }
    }
    function downSize(){
        if(props.controlSize>0){
            const newSize = props.controlSize - 1
            props.setControlSize(newSize)       
        } else {
            props.setControlSize(0)
        }
    }
    function upCtrlOpacity(){
        if(props.ctrlOpacity<1){
            const newOpacity = props.ctrlOpacity + 0.05
            props.setCtrlOpacity(newOpacity)       
        } else {
            props.setCtrlOpacity(1)
        }
    }
    function downCtrlOpacity(){
        if(props.ctrlOpacity>0){
            const newOpacity = props.ctrlOpacity - 0.05
            props.setCtrlOpacity(newOpacity)       
        } else {
            props.setCtrlOpacity(0)
        }
    }
    function upEnd(){
        if(props.endSize<10){
            const newSize = props.endSize + 1
            props.setEndSize(newSize)       
        } else {
            props.setEndSize(10)
        }
    }
    function downEnd(){
        if(props.endSize>0){
            const newSize = props.endSize - 1
            props.setEndSize(newSize)       
        } else {
            props.setEndSize(0)
        }
    }
    function upEndOpacity(){
        if(props.endOpacity<1){
            const newOpacity = props.endOpacity + 0.05
            props.setEndOpacity(newOpacity)       
        } else {
            props.setEndOpacity(1)
        }
    }
    function downEndOpacity(){
        if(props.endOpacity>0){
            const newOpacity = props.endOpacity - 0.05
            props.setEndOpacity(newOpacity)       
        } else {
            props.setEndOpacity(0)
        }
    }
    

    return(
        <View style={styles.configPanel}>
                <Text style={styles.title}>
                    Styles
                </Text>
            {/* ******** FIRST ROW ******** */}
            <View style={styles.bottom}>

                {/****** STROKE SECTION ******/}
                <View style={styles.strokeSection}>

                    <FieldSet label="Stroke" labelColor={props.stroke} labelStyle={styles.sectionTitle} mainStyle={styles.fieldSet}>
                    {
                    showStroke
                    ?
                    <View>
                        <View style={styles.attSection}>
                            <Text style={styles.attribute}>
                                Colour:
                            </Text>
                            <Pressable style={[styles.color, {backgroundColor:props.stroke}]} onPress={() => openModal('Stroke')}></Pressable>
                        </View>
                        <View style={styles.attSection}>
                            <Text style={styles.attribute}>
                                Highlight Colour:
                            </Text>
                            <Pressable style={[styles.color, {backgroundColor:props.highlight}]} onPress={() => openModal('Highlight')}></Pressable>
                        </View>
                        <View style={styles.attSection}>
                            <Text style={styles.attribute}>
                                Width: 
                            </Text>
                            <TextInput
                            onChangeText={props.setStrokeWidth}
                            value={String(props.strokeWidth)}
                            inputMode="numeric"
                            style={styles.textInput} />
                        </View>
                        <View style={styles.attSection}>
                            <Text style={styles.attribute}>
                                Opacity: 
                            </Text>
                            <Pressable style={styles.upDown} onPress={down}>
                                <Image
                                style={styles.icon}
                                source={require('../images/down.svg')} />
                            </Pressable>
                            <Text style={styles.opacity}>{Math.round( ( props.strokeOpacity + Number.EPSILON ) * 100 ) / 100}</Text>
                            <Pressable style={styles.upDown} onPress={up}>
                                <Image
                                style={styles.icon}
                                source={require('../images/up.svg')} />
                            </Pressable>
                        </View>
                        <Pressable style={styles.upDown} onPress={() => setShowStroke(showStroke => !showStroke)}>
                            <Image
                            style={styles.icon}
                            source={require('../images/up.svg')} />
                        </Pressable>
                    </View>
                    :
                    <View>
                        <Pressable style={styles.upDown} onPress={() => setShowStroke(showStroke => !showStroke)}>
                            <Image
                            style={styles.icon}
                            source={require('../images/down.svg')} />
                        </Pressable>
                    </View>
                    }
                    </FieldSet>
                </View>
                    {/****** END OF STROKE SECTION ******/}

                {/****** FILL SECTION ******/}
                <View style={styles.strokeSection}>
                    <FieldSet label="Fill" labelColor={props.fill} labelStyle={styles.sectionTitle} mainStyle={styles.fieldSet}>
                    {
                        showFill
                        ?
                        <View>
                        <View style={styles.attSection}>
                        <Text style={styles.attribute}>
                            Colour:
                        </Text>
                        <Pressable style={[styles.color, {backgroundColor:props.fill}]} onPress={() => openModal('Fill')}></Pressable>
                    </View>
                    <View style={styles.attSection}>
                        <Text style={styles.attribute}>
                            Opacity: 
                        </Text>
                        <Pressable style={styles.upDown} onPress={downFill}>
                            <Image
                            style={styles.icon}
                            source={require('../images/down.svg')} />
                        </Pressable>
                        <Text style={styles.opacity}>{Math.round( ( props.fillOpacity + Number.EPSILON ) * 100 ) / 100}</Text>
                        <Pressable style={styles.upDown} onPress={upFill}>
                            <Image
                            style={styles.icon}
                            source={require('../images/up.svg')} />
                        </Pressable>
                    </View>
                    <View>
                        <Pressable style={styles.upDown} onPress={() => setShowFill(showFill => !showFill)}>
                            <Image
                            style={styles.icon}
                            source={require('../images/up.svg')} />
                        </Pressable>
                    </View>
                    </View>
                    :
                    <View>
                        <Pressable style={styles.upDown} onPress={() => setShowFill(showFill => !showFill)}>
                            <Image
                            style={styles.icon}
                            source={require('../images/down.svg')} />
                        </Pressable>
                    </View>
                    }
                    </FieldSet>
                </View>
                {/****** END OF FILL SECTION ******/}
            </View>
            {/****** END OF FIRST ROW ******/}

            {/****** SECOND ROW ******/}
            <View style={styles.bottom}>

                {/****** CONTROL SECTION ******/}
            <View style={styles.strokeSection}>
                    <FieldSet label="Control Points" labelColor={props.stroke} labelStyle={styles.sectionTitle} mainStyle={styles.fieldSet}>
                    {
                    showControl
                    ?
                    <View>
                        <View style={styles.attSection}>
                            <Text style={styles.attribute}>
                                Colour:
                            </Text>
                            <Pressable style={[styles.color, {backgroundColor:props.controlCol}]} onPress={() => openModal('Control Points')}></Pressable>
                        </View>
                        <View style={styles.attSection}>
                            <Text style={styles.attribute}>
                                Opacity: 
                            </Text>
                            <Pressable style={styles.upDown} onPress={downCtrlOpacity}>
                                <Image
                                style={styles.icon}
                                source={require('../images/down.svg')} />
                            </Pressable>
                            <Text style={styles.opacity}>{Math.round( ( props.ctrlOpacity + Number.EPSILON ) * 100 ) / 100}</Text>
                            <Pressable style={styles.upDown} onPress={upCtrlOpacity}>
                                <Image
                                style={styles.icon}
                                source={require('../images/up.svg')} />
                            </Pressable>
                        </View>
                        <View style={styles.attSection}>
                            <Text style={styles.attribute}>
                                Size: 
                            </Text>
                            <Pressable style={styles.upDown} onPress={downSize}>
                                <Image
                                style={styles.icon}
                                source={require('../images/down.svg')} />
                            </Pressable>
                            <Text style={styles.opacity}>{Math.round( ( props.controlSize + Number.EPSILON ) * 100 ) / 100}</Text>
                            <Pressable style={styles.upDown} onPress={upSize}>
                                <Image
                                style={styles.icon}
                                source={require('../images/up.svg')} />
                            </Pressable>
                        </View>
                        <Pressable style={styles.upDown} onPress={() => setShowControl(showControl => !showControl)}>
                            <Image
                            style={styles.icon}
                            source={require('../images/up.svg')} />
                        </Pressable>
                    </View>
                    :
                    <View>
                        <Pressable style={styles.upDown} onPress={() => setShowControl(showControl => !showControl)}>
                            <Image
                            style={styles.icon}
                            source={require('../images/down.svg')} />
                        </Pressable>
                    </View>
                    }
                    </FieldSet>
                </View>
                {/****** END OF CONTROL SECTION ******/}
                    </View>
                    <View style={styles.bottom}>
                {/****** END POINT SECTION ******/}
                <View style={styles.strokeSection}>
                    <FieldSet label="End Points" labelColor={props.endPointCol} labelStyle={styles.sectionTitle} mainStyle={styles.fieldSet}>
                    {
                        showEndPoints
                        ?
                        <View>
                        <View style={styles.attSection}>
                        <Text style={styles.attribute}>
                            Colour:
                        </Text>
                        <Pressable style={[styles.color, {backgroundColor:props.endPointCol}]} onPress={() => openModal('End Points')}></Pressable>
                    </View>
                    <View style={styles.attSection}>
                        <Text style={styles.attribute}>
                            Opacity: 
                        </Text>
                        <Pressable style={styles.upDown} onPress={downEndOpacity}>
                            <Image
                            style={styles.icon}
                            source={require('../images/down.svg')} />
                        </Pressable>
                        <Text style={styles.opacity}>{Math.round( ( props.endOpacity + Number.EPSILON ) * 100 ) / 100}</Text>
                        <Pressable style={styles.upDown} onPress={upEndOpacity}>
                            <Image
                            style={styles.icon}
                            source={require('../images/up.svg')} />
                        </Pressable>
                    </View>
                    <View style={styles.attSection}>
                        <Text style={styles.attribute}>
                            Size: 
                        </Text>
                        <Pressable style={styles.upDown} onPress={downEnd}>
                            <Image
                            style={styles.icon}
                            source={require('../images/down.svg')} />
                        </Pressable>
                        <Text style={styles.opacity}>{Math.round( ( props.endSize + Number.EPSILON ) * 100 ) / 100}</Text>
                        <Pressable style={styles.upDown} onPress={upEnd}>
                            <Image
                            style={styles.icon}
                            source={require('../images/up.svg')} />
                        </Pressable>
                    </View>


                    <View>
                        <Pressable style={styles.upDown} onPress={() => setShowEndPoints(showEndPoints => !showEndPoints)}>
                            <Image
                            style={styles.icon}
                            source={require('../images/up.svg')} />
                        </Pressable>
                    </View>
                    </View>
                    :
                    <View>
                        <Pressable style={styles.upDown} onPress={() => setShowEndPoints(showEndPoints => !showEndPoints)}>
                            <Image
                            style={styles.icon}
                            source={require('../images/down.svg')} />
                        </Pressable>
                    </View>
                    }
                    </FieldSet>
                    </View>
                    {/****** END OF END POINT SECTION ******/}
            </View>
                    {/****** END OF SECOND ROW ******/}
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalIsOpen}
            onRequestClose={closeModal}
            >
                <View style={styles.colorModal}>
                    <View style={styles.titleSection}>
                        <Text style={styles.modalTitle}>
                            Colour Picker - {modalTitle}
                        </Text>
                        <Pressable style={hover.x?styles.closeHover:styles.close} onPress={closeModal} onMouseOver={() => hoverFunc('x')} onMouseLeave={resetHover}>
                            <Text style={hover.x?styles.closeTextHover:styles.closeText}>
                                X
                            </Text>
                        </Pressable>
                    </View>
                    <View>
                    <ColorPicker style={{ width: '70%' }} value={props.stroke} onComplete={onSelectColor}>
                        <Preview />
                        <Panel1 />
                        <HueSlider />
                        <OpacitySlider />
                        <Swatches />
                    </ColorPicker>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default ConfigPanel;

const styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 20,
    },
    upDown: {
        width: 23,
        height: 23,
        marginLeft: 4,
        marginRight: 4,
        padding: 1
    },
    opacity: {
        width: 25,
        textAlign: 'center'
    },
    configPanel:{
        backgroundColor: '#eee',
        borderColor: '#dfa',
        borderWidth: 3,
        borderRadius: 18,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 30,
        boxShadow: '-2px 2px 8px #9c9c9c',
        margin: 10,    
        height: 400,
        width: 250                                           
    },
    titleSection: {
        display: 'flex',
        flexDirection: 'row',
    },
    title: {
        fontFamily: 'Quicksand-Bold',
        fontSize: 20,
        marginBottom: 15
    },
    bottom: {
        display: 'flex',
        flexDirection: 'row'
    },
    modalTitle: {
        fontFamily: 'Quicksand-Bold',
        fontSize: 40,
    },
    colorModal: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: 'rgba(200, 200, 200, 0.95)',
        marginTop: 100
    },
    strokeSection:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    sectionTitle: {
        fontFamily: 'Quicksand-Bold',
        fontSize: 17,
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 6,
        marginBottom: 10
    },
    fieldSet:{
        backgroundColor: '#a2a2a2',
        width: 'fit-content',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    attSection:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    attribute: {
        fontFamily: 'Quicksand-Light',
        fontSize: 16,
    },
    color: {
        width: 20,
        height: 20,
        margin: 5,
    },
    textInput:{
        width: 30,
        marginLeft: 10
    },
    close: {
      display:'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height:25,
      width: 'fit-content',
      backgroundColor: '#6c6c6c',
      borderRadius: 6,
      margin: 15,
      padding: 5,
      borderColor: '#681402',
      borderWidth: 2,
      textAlign: 'center',
      fontFamily: 'Quicksand-Regular',
      fontSize: 18,
      color:'#681402',
    },
    closeHover: {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:'fit-content',
        height:25,
        backgroundColor: '#681402',
        borderRadius: 6,
        margin: 15,
        padding: 5,
        borderColor: '#fff',
        borderWidth: 2,
        textAlign: 'center',
        textShadow: '-1px 1px 1px #fff',
    },
    closeText: {
        textAlign: 'center',
        fontFamily: 'Quicksand-Bold',
        fontSize: 18,
        color:'#681402',
        textShadow: '-1px 1px 1px #681402'
    },
    closeTextHover: {
        textAlign: 'center',
        fontFamily: 'Quicksand-Bold',
        fontSize: 18,
        color:'#fff',
        textShadow: '-1px 1px 1px #fff',
    },
})