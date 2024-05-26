import QWeb from '../web/commands/q';
import QMobile from './mobile/q';
import CWeb from '../web/commands/c';
import CMobile from './mobile/c';
import { StyleSheet, Text, View, Platform } from 'react-native';

const Commands = (props) => {

        if(Platform.OS==='web'){
            return(
                <View style={styles.container}>
                    <QWeb strWidth={props.strWidth} relative={props.relative} path={props.path} setPath={props.setPath} pathID={props.pathID} setPathID={props.setPathID} startPoints={props.startPoints} setStartPoints={props.setStartPoints} stroke={props.stroke} fill={props.fill} gridRef={props.gridRef} editFunc={props.editFunc} />
                    <CWeb strWidth={props.strWidth} relative={props.relative} path={props.path} setPath={props.setPath} pathID={props.pathID} setPathID={props.setPathID} startPoints={props.startPoints} setStartPoints={props.setStartPoints} stroke={props.stroke} fill={props.fill} gridRef={props.gridRef} editFunc={props.editFunc} />
                </View>
            )
        }else{
            return(
                <View style={styles.container}>
                    <QMobile strWidth={props.strWidth} relative={props.relative} path={props.path} setPath={props.setPath} pathID={props.pathID} setPathID={props.setPathID} startPoints={props.startPoints} setStartPoints={props.setStartPoints} stroke={props.stroke} fill={props.fill} gridRef={props.gridRef} editFunc={props.editFunc} />
                    <CMobile strWidth={props.strWidth} relative={props.relative} path={props.path} setPath={props.setPath} pathID={props.pathID} setPathID={props.setPathID} startPoints={props.startPoints} setStartPoints={props.setStartPoints} stroke={props.stroke} fill={props.fill} gridRef={props.gridRef} editFunc={props.editFunc} />
                </View>
            )
        }
};

export default Commands;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row'
    }
})