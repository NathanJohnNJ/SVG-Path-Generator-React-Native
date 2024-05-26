import Q from './q';
import C from './c';
// import L from './l';
// import S from './s';
// import T from './t';

import { StyleSheet, View } from 'react-native';

const Commands = (props) => {

    return(
        <View style={styles.container}>
            <Q relative={props.relative} path={props.path} setPath={props.setPath} pathID={props.pathID} setPathID={props.setPathID} startPoints={props.startPoints} setStartPoints={props.setStartPoints} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} editPath={props.editPath} setEditPath={props.setEditPath} editModalIsOpen={props.editModalIsOpen} setEditModalIsOpen={props.setEditModalIsOpen} />
            <C relative={props.relative} path={props.path} setPath={props.setPath} pathID={props.pathID} setPathID={props.setPathID} startPoints={props.startPoints} setStartPoints={props.setStartPoints} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} editPath={props.editPath} setEditPath={props.setEditPath} edit2ModalIsOpen={props.edit2ModalIsOpen} setEdit2ModalIsOpen={props.setEdit2ModalIsOpen} />
            {/* <L relative={props.relative} path={props.path} setPath={props.setPath} pathID={props.pathID} setPathID={props.setPathID} startPoints={props.startPoints} setStartPoints={props.setStartPoints} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} editPath={props.editPath} setEditPath={props.setEditPath} editModalIsOpen={props.editModalIsOpen} setEditModalIsOpen={props.setEditModalIsOpen} /> */}
            {/* <S relative={props.relative} path={props.path} setPath={props.setPath} pathID={props.pathID} setPathID={props.setPathID} startPoints={props.startPoints} setStartPoints={props.setStartPoints} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} editPath={props.editPath} setEditPath={props.setEditPath} editModalIsOpen={props.editModalIsOpen} setEditModalIsOpen={props.setEditModalIsOpen} /> */}
            {/* <T relative={props.relative} path={props.path} setPath={props.setPath} pathID={props.pathID} setPathID={props.setPathID} startPoints={props.startPoints} setStartPoints={props.setStartPoints} stroke={props.stroke} strokeWidth={props.strokeWidth} strokeOpacity={props.strokeOpacity} fill={props.fill} fillOpacity={props.fillOpacity} editPath={props.editPath} setEditPath={props.setEditPath} editModalIsOpen={props.editModalIsOpen} setEditModalIsOpen={props.setEditModalIsOpen} /> */}
        </View>
     )
};

export default Commands;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row'
    }
})