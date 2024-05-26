import { StyleSheet, View, Modal, Pressable, Text, TextInput, Image } from 'react-native';
import Q from './commands/q';
import C from './commands/c';

const CommandPanel = (props) => {

    return(
        <View style={styles.commandPanel}>
                <Text style={styles.title}>
                    Commands
                </Text>
            <View style={styles.bottom}>
                <C relative={props.relative} path={props.path} setPath={props.setPath} pathID={props.pathID} setPathID={props.setPathID} startPoints={props.startPoints} setStartPoints={props.setStartPoints} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} />
                <Q relative={props.relative} path={props.path} setPath={props.setPath} pathID={props.pathID} setPathID={props.setPathID} startPoints={props.startPoints} setStartPoints={props.setStartPoints} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} />
            </View>
        </View>
    )
}

export default CommandPanel;

const styles = StyleSheet.create({
    commandPanel:{
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
        height: 250                                            
    },
    titleSection: {
        display: 'flex',
        flexDirection: 'row',
    },
    title: {
        fontFamily: 'Quicksand-Bold',
        fontSize: 20,
    },
    bottom: {
        display: 'flex',
        flexDirection: 'row'
    },
    button: {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height:25,
        width: 'fit-content',
        backgroundColor: '#6c6c6c',
        borderRadius: 5,
        margin: 5,
        padding: 3,
        borderColor: '#4e4e4e',
        borderStyle: 'solid',
        borderWidth: 2,
        textAlign: 'center',
        fontFamily: 'Quicksand-Regular',
        fontSize: 18,
        color:'#4e4e4e',
      },
    hover: {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:'fit-content',
        height:25,
        backgroundColor: '#4e4e4e',
        borderRadius: 5,
        margin: 5,
        padding: 3,
        borderColor: '#fff',
        borderStyle: 'solid',
        borderWidth: 2,
        textAlign: 'center',
      },
    buttonText: {
        textAlign: 'center',
        fontFamily: 'Quicksand-Regular',
        fontSize: 18,
        color:'#4e4e4e',
    },
    textHover: {
        textAlign: 'center',
        fontFamily: 'Quicksand-Regular',
        fontSize: 18,
        color:'#ffffff',
    },
    
})