
import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import FieldSet from 'react-native-fieldset';


const Tables = (props) => {
    const [hover, setHover] = useState({dx1: false, dy1:false, dx2:false, dy2:false, x: false, y: false})

    const ControlTable = () => {
        let controlPoints = [];
        props.secondCtrl
        ?
        controlPoints = [{key: 'dx1', value:`${props.firstCtrl.x}`}, {key: 'dy1', value:`${props.firstCtrl.y}`}, {key: 'dx2', value:`${props.secondCtrl.x}`}, {key: 'dy2', value:`${props.secondCtrl.y}`}]
        :
        controlPoints = [{key: 'dx1', value:`${props.firstCtrl.x}`}, {key: 'dy1', value:`${props.firstCtrl.y}`}];
        let headerArr = [];
        let dataArr = [];
        controlPoints.map((point, i) =>{
            headerArr.push(point.key)
        })
        let absControlPoints = [];
        props.secondCtrl
        ?
        absControlPoints = [{key: 'dx1', value:`${props.firstCtrl.x+props.startX}`}, {key: 'dy1', value:`${props.firstCtrl.y+props.startY}`}, {key: 'dx2', value:`${props.secondCtrl.x+props.startX}`}, {key: 'dy2', value:`${props.secondCtrl.y+props.startY}`}]
        :
        absControlPoints = [{key: 'dx1', value:`${props.firstCtrl.x+props.startX}`}, {key: 'dy1', value:`${props.firstCtrl.y+props.startY}`}];
        
        return(
            <FieldSet label="Control Points" labelColor={props.controlCol} labelStyle={styles(props).label} mainStyle={styles(props).fieldSet}>
                <table style={styles(props).table}>
                    <tbody style={styles(props).tbody}>
                        <tr style={styles(props).tr}>
                            {headerArr.map((header, i) => {
                                return(
                                    <th style={styles(props).th} key={i}>{header}</th>
                                )
                            })}
                        </tr>
                        <tr style={styles(props).trWide}> 
                                    <th style={styles(props).ctrlWide}>Relative</th>
                                </tr>
                        <tr style={styles(props).tr}>
                            {controlPoints.map((point, i) => {
                                return(
                                    <td style={(props.hover[point.key])?styles(props).hoverTd:styles(props).td} key={i} onMouseEnter={()=>props.hoverFunc(point.key)} onMouseLeave={props.resetHover}>{point.value}</td>
                                )
                            })}
                        </tr>
                        <tr style={styles(props).trWide}> 
                                    <th style={styles(props).ctrlWide}>Absolute</th>
                                </tr>
                        <tr style={styles(props).tr}>
                            {absControlPoints.map((point, i) => {
                                return(
                                    <td style={(props.hover[point.key])?styles(props).hoverTd:styles(props).td} key={i} onMouseEnter={()=>props.hoverFunc(point.key)} onMouseLeave={props.resetHover}>{point.value}</td>
                                )
                            })}
                        </tr>
                    </tbody>
                </table>
            </FieldSet>
        )
    }
    return(
        <View style={styles(props).mainContainer}>
            <ControlTable />
            <View style={styles(props).tableContainer}>
                <FieldSet label="End Point" labelColor={props.endCol} labelStyle={styles(props).label} mainStyle={styles(props).fieldSet}>
                    <table style={styles(props).table}>
                        <tbody style={styles(props).tbody}>
                            <tr style={styles(props).tr}> 
                                <th style={styles(props).endTh}>x</th>
                                <th style={styles(props).endTh}>y</th>
                            </tr>
                            <tr style={styles(props).trWide}> 
                                    <th style={styles(props).thWide}>Relative</th>
                                </tr>
                            <tr style={styles(props).tr}>
                                <td style={props.hover.x?styles(props).hoverEnd:styles(props).end} onMouseEnter={()=>{props.hoverFunc('x')}} onMouseLeave={props.resetHover}>{props.endPoint.x}</td>
                                <td style={props.hover.y?styles(props).hoverEnd:styles(props).end} onMouseEnter={()=>{props.hoverFunc('y')}} onMouseLeave={props.resetHover}>{props.endPoint.y}</td>
                            </tr>
                            <tr style={styles(props).trWide}> 
                                <th style={styles(props).thWide}>Absolute</th>
                            </tr>
                            <tr style={styles(props).tr}>
                                <td style={props.hover.x?styles(props).hoverEnd:styles(props).end} onMouseEnter={()=>{props.hoverFunc('x')}} onMouseLeave={props.resetHover}>{props.endPoint.x+props.startX}</td>
                                <td style={props.hover.y?styles(props).hoverEnd:styles(props).end} onMouseEnter={()=>{props.hoverFunc('y')}} onMouseLeave={props.resetHover}>{props.endPoint.y+props.startY}</td>
                            </tr>
                        </tbody>
                    </table>
                </FieldSet>
            </View>
        </View>
    )
};

export default Tables;


const styles =(props)=> StyleSheet.create({
mainContainer: {
    display: "flex",
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    padding: 22,
    borderRadius: 18,
    borderWidth: 3,
    borderColor: '#abd'
    },
tableContainer: {
    display: "flex",
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex:1
},
fieldSet:{
    height: 80,
    width: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
},
label: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 17.5,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius:6
},
table: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    flex:1,
    borderRadius: 6,
    marginTop: 5
},
tbody:{
    flex:1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
},
tr: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
},
th: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1.8px solid black',
    borderRadius: 5,
    fontFamily: 'Quicksand-Medium',
    fontSize: 18,
    flex:1,
    width: 40,
    height: 25,
    marginTop: 5,
    padding:2,
    backgroundColor: props.controlCol,
},

endTh: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1.8px solid black',
    borderRadius: 5,
    fontFamily: 'Quicksand-Medium',
    fontSize: 18,
    flex:1,
    width: 40,
    height: 25,
    marginTop: 5,
    padding:2,
    backgroundColor: props.endCol,
},
td: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    border: '1.5px dashed grey',
    borderRadius: 5,
    fontFamily: 'Quicksand-Regular',
    fontSize: 18,
    color: props.controlCol,
    flex:1,
    width: 40,
    height: 25,
    padding: 2
},
hoverTd: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    border: '1.5px dashed grey',
    borderRadius: 5,
    fontFamily: 'Quicksand-Bold',
    fontSize: 18,
    color: props.controlCol,
    flex:1,
    width: 40,
    height: 25,
    padding: 2
},
trWide:{
    flex: 1,
    display: 'flex',
    marginTop:5
},
thWide: {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1.8px solid black',
  borderRadius: 5,
  fontFamily: 'Quicksand-Bold',
  fontSize: 16,
  flex:1,
  width: 80,
  height: 25,
  marginTop: 1,
  padding:4,
  backgroundColor: props.endCol,
},
ctrlWide: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1.8px solid black',
    borderRadius: 5,
    fontFamily: 'Quicksand-Bold',
    fontSize: 16,
    flex:1,
    width: 80,
    height: 25,
    marginTop: 1,
    padding:4,
    backgroundColor: props.controlCol,
  },
end: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    border: '1.5px dashed grey',
    borderRadius: 5,
    fontFamily: 'Quicksand-Regular',
    fontSize: 18,
    color: props.endCol,
    flex:1,
    width: 40,
    height: 25,
    padding: 2
},
hoverEnd: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    border: '1.5px dashed grey',
    borderRadius: 5,
    fontFamily: 'Quicksand-Bold',
    fontSize: 18,
    color: props.endCol,
    flex:1,
    width: 40,
    height: 25,
    padding: 2
},
})