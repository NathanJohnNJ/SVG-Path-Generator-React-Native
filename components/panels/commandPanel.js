import { StyleSheet, View, Text } from 'react-native';
import Q from '../commands/q';
import C from '../commands/c';
import L from '../commands/l';
import H from '../commands/h';
import V from '../commands/v';
import T from '../commands/t';
import S from '../commands/s';
import Z from '../commands/z';

const CommandPanel = (props) => {
    function displayExtras(){
        if ( props.path[props.pathID].type==="q" || props.path[props.pathID].type==="t"){
            return(
                <T path={props.path} setPath={props.setPath} pathID={props.pathID} setPathID={props.setPathID} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} info={props.info} setInfo={props.setInfo} endPoint={props.endPoint} setEndPoint={props.setEndPoint} endCol={props.endCol} endOpacity={props.endOpacity} endSize={props.endSize} highlight={props.highlight} />
            )
        } else if(props.path[props.pathID].type==="c"){
            return(
                <S path={props.path} setPath={props.setPath} pathID={props.pathID} setPathID={props.setPathID} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} info={props.info} setInfo={props.setInfo} endPoint={props.endPoint} setEndPoint={props.setEndPoint} secondCtrl={props.secondCtrl} setSecondCtrl={props.setSecondCtrl} controlCol={props.controlCol} ctrlOpacity={props.ctrlOpacity} controlSize={props.controlSize} endCol={props.endCol} endOpacity={props.endOpacity}  endSize={props.endSize} highlight={props.highlight} />
            )
        } else {

        }
    }

    return(
        <View style={styles(props).commandPanel}>
            <Text style={styles(props).title}>
                Commands
            </Text>
            <View style={styles(props).top}>
                <C path={props.path} setPath={props.setPath} pathID={props.pathID} setPathID={props.setPathID} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} info={props.info} setInfo={props.setInfo} endPoint={props.endPoint} setEndPoint={props.setEndPoint} firstCtrl={props.firstCtrl} setFirstCtrl={props.setFirstCtrl} secondCtrl={props.secondCtrl} setSecondCtrl={props.setSecondCtrl} controlCol={props.controlCol} ctrlOpacity={props.ctrlOpacity} controlSize={props.controlSize} endCol={props.endCol} endOpacity={props.endOpacity} endSize={props.endSize} highlight={props.highlight} />
                <Q path={props.path} setPath={props.setPath} pathID={props.pathID} setPathID={props.setPathID} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} info={props.info} setInfo={props.setInfo} endPoint={props.endPoint} setEndPoint={props.setEndPoint} firstCtrl={props.firstCtrl} setFirstCtrl={props.setFirstCtrl} controlCol={props.controlCol} ctrlOpacity={props.ctrlOpacity} controlSize={props.controlSize} endCol={props.endCol} endOpacity={props.endOpacity} endSize={props.endSize} highlight={props.highlight} />
                <H path={props.path} setPath={props.setPath} pathID={props.pathID} setPathID={props.setPathID} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} info={props.info} setInfo={props.setInfo} endPoint={props.endPoint} setEndPoint={props.setEndPoint} endCol={props.endCol} endOpacity={props.endOpacity} endSize={props.endSize} highlight={props.highlight} />
                <L path={props.path} setPath={props.setPath} pathID={props.pathID} setPathID={props.setPathID} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} info={props.info} setInfo={props.setInfo} endPoint={props.endPoint} setEndPoint={props.setEndPoint} endCol={props.endCol} endOpacity={props.endOpacity} endSize={props.endSize} highlight={props.highlight} />
                <V path={props.path} setPath={props.setPath} pathID={props.pathID} setPathID={props.setPathID} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} info={props.info} setInfo={props.setInfo} endPoint={props.endPoint} setEndPoint={props.setEndPoint} endCol={props.endCol} endOpacity={props.endOpacity} endSize={props.endSize} highlight={props.highlight} />
            </View>
            <View style={styles(props).bottom}>
                {displayExtras()}
                {/* <Z path={props.path} setPath={props.setPath} pathID={props.pathID} setPathID={props.setPathID} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} fullCommand={props.fullCommand}/> */}
            </View>
        </View>
    )
}

export default CommandPanel;

const styles = (props) => StyleSheet.create({
    commandPanel:{
        backgroundColor: '#eee',
        borderColor: '#ecd',
        borderWidth: 3,
        borderRadius: 18,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 30,
        boxShadow: '-2px 2px 8px #9c9c9c',
        margin: 5,    
        height:130,
        width: 185                                         
    },
    titleSection: {
        display: 'flex',
        flexDirection: 'row',
    },
    title: {
        fontFamily: 'Quicksand-Bold',
        fontSize: 25,
        textShadow: '-1px 1px 2px gray, 1px 1px 1px gray',
        marginBottom: 15,
        marginTop: -30
    },
    top: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: -20
    },
    bottom: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: -5
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