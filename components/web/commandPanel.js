import { StyleSheet, View, Pressable, Text } from 'react-native';
import Q from './commands/q';
import C from './commands/c';
import L from './commands/l';

const CommandPanel = (props) => {

    return(
        <View style={styles.commandPanel}>
                <Text style={styles.title}>
                    Commands
                </Text>
            <View style={styles.bottom}>
                <C relative={props.relative} path={props.path} setPath={props.setPath} pathID={props.pathID} setPathID={props.setPathID} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} info={props.info} setInfo={props.setInfo} endPoint={props.endPoint} setEndPoint={props.setEndPoint} firstCtrl={props.firstCtrl} setFirstCtrl={props.setFirstCtrl} secondCtrl={props.secondCtrl} setSecondCtrl={props.setSecondCtrl} controlCol={props.controlCol} ctrlOpacity={props.ctrlOpacity} controlSize={props.controlSize} endCol={props.endCol} endOpacity={props.endOpacity}  endSize={props.endSize} highlight={props.highlight} />
                <L relative={props.relative} path={props.path} setPath={props.setPath} pathID={props.pathID} setPathID={props.setPathID} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} info={props.info} setInfo={props.setInfo} endPoint={props.endPoint} setEndPoint={props.setEndPoint} controlCol={props.controlCol} ctrlOpacity={props.ctrlOpacity} controlSize={props.controlSize} endCol={props.endCol} endOpacity={props.endOpacity}  endSize={props.endSize} highlight={props.highlight} />
                <Q relative={props.relative} path={props.path} setPath={props.setPath} pathID={props.pathID} setPathID={props.setPathID} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} info={props.info} setInfo={props.setInfo} endPoint={props.endPoint} setEndPoint={props.setEndPoint} firstCtrl={props.firstCtrl} setFirstCtrl={props.setFirstCtrl} controlCol={props.controlCol} ctrlOpacity={props.ctrlOpacity} controlSize={props.controlSize} endCol={props.endCol} endOpacity={props.endOpacity}  endSize={props.endSize} highlight={props.highlight}  />
            </View>
        </View>
    )
}

export default CommandPanel;

const styles = StyleSheet.create({
    commandPanel:{
        backgroundColor: '#ccc',
        borderColor: '#ecd',
        borderWidth: 3,
        borderRadius: 18,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 30,
        boxShadow: '-2px 2px 8px #9c9c9c',
        margin: 10,    
        height: 150,
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