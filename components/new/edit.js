// import { StyleSheet, View, Modal, Pressable, Text, TextInput } from 'react-native';
// import { useState } from 'react';
// import FieldSet from 'react-native-fieldset';


// const SidePanel = (props) => {
//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const [dx1, setdx1] = useState(props.path.dx1.value);
//     const [dy1, setdy1] = useState(props.path.dx1.value);
//     const [dx2, setdx2] = useState(props.path.dx1.value);
//     const [dy2, setdy2] = useState(props.path.dx1.value);

//     function openModal(){
//         setModalIsOpen(true)
//     }

//     function closeModal(){
//         setModalIsOpen(false)
//     }

//     const ControlTable = () => {
//         let headerArr = [];
//         let dataArr = [];
//         props.path.controlPoints.map((point, i) =>{
//             console.log(point)
//             headerArr.push(point.key)
//             dataArr.push(point.value)
//         })
//         return(
//             <FieldSet label="Control Points" labelColor="#00f" labelFontSize='17.5px' labelStyle={styles.label} mainStyle={styles.fieldSet}>
//                 <table style={styles.table}>
//                     <tbody style={styles.tbody}>
//                         <tr style={styles.tr}>
//                             {headerArr.map((header, i) => {
//                                 console.log(header)
//                                 return(
//                                     <th style={styles.th} key={i}>{header}</th>
//                                 )
//                             })}
//                         </tr>
//                         <tr style={styles.tr}>
//                             {dataArr.map((data, i) => {
//                                 console.log(data)
//                                 return(
//                                     <td style={styles.td} key={i}>{data}</td>
//                                 )
//                             })}
//                         </tr>
//                     </tbody>
//                 </table>
//             </FieldSet>
//         )
//     }

//     return(
        
//             </View>
//             <Modal
//             animationType="slide"
//             transparent={false}
//             visible={modalIsOpen}
//             onRequestClose={closeModal}
//             style={styles.modal}
//             >

//             </Modal>
            
//         </View>
//     )
// }

// export default SidePanel;

// const styles = StyleSheet.create({
//     edit:{
//         backgroundColor: '#fff',
//         borderColor: '#fdb',
//         borderWidth: 3,
//         borderRadius: 18,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: 22,
//         boxShadow: '-2px 2px 8px #9c9c9c',
//         margin: 10,                                                
//     },
//     top: {
//         display: 'flex',
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-around',
//     },
//     title: {
//         fontFamily: 'Quicksand-Bold',
//         fontSize: 20,
//     },
//     editText: {},
//     tableSection: {},
//     modal: {},
//     button: {
//         display:'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         width:25,
//         height:25,   
//         color:'#4e4e4e',
//         backgroundColor: '#6c6c6c',
//         textAlign: 'center',
//         fontFamily: 'Quicksand-Bold',
//         fontSize: 18,
//         borderRadius: 5,
//         margin: 5
//       },
//     fieldSet:{
//         backgroundColor: '#a2a2a2',
//         height: 80,
//         width: 'auto',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'flex-start',
//     },
//     label: {
//         fontFamily: 'Quicksand-Bold',
//         fontSize: 17.5,
//         backgroundColor: 'rgba(255, 255, 255, 0.8)'
//     },
//     table: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         color: '#fff',
//         flex:1
//     },
//     tbody:{
//         flex:1,
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     tr: {
//         flex: 1,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     th: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         border: '1.8px solid black',
//         borderRadius: 5,
//         fontFamily: 'Quicksand-Medium',
//         fontSize: 18,
//         flex:1,
//         width: 40,
//         height: 25,
//         marginTop: -5,
//     },
//     td: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         textAlign: 'center',
//         border: '1.5px dashed grey',
//         fontFamily: 'Quicksand-Regular',
//         fontSize: 18,
//         color: '#12f',
//         flex:1,
//         width: 40,
//         height: 25,
//         padding:2
//     },
//     end: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         textAlign: 'center',
//         border: '1.5px dashed grey',
//         fontFamily: 'Quicksand-Regular',
//         fontSize: 18,
//         color: '#f00',
//         flex:1,
//         width: 40,
//         height: 25,
//     },
    

// })




