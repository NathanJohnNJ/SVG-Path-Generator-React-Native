
import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import FieldSet from 'react-native-fieldset';


const Tables = (props) => {
    const [hover, setHover] = useState({dx1: false, dy1:false, dx2:false, dy2:false, x: false, y: false})

    function hoverFunc(i){
        const newHover = { ...hover, [i]: true}
        setHover(newHover)
    }
    function resetHover(){
        setHover({dx1: false, dy1:false, dx2:false, dy2:false, x: false, y: false})
    }

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
            dataArr.push(point.value)
        })
        return(
            <FieldSet label="Control Points" labelColor="#00f" labelStyle={styles.label} mainStyle={styles.fieldSet}>
                <table style={styles.table}>
                    <tbody style={styles.tbody}>
                        <tr style={styles.tr}>
                            {headerArr.map((header, i) => {
                                return(
                                    <th style={styles.th} key={i}>{header}</th>
                                )
                            })}
                        </tr>
                        <tr style={styles.tr}>
                            {controlPoints.map((point, i) => {
                                return(
                                    <td style={(hover[point.key])?styles.hoverTd:styles.td} key={i} onMouseEnter={()=>hoverFunc(point.key)} onMouseLeave={resetHover}>{point.value}</td>
                                )
                            })}
                        </tr>
                    </tbody>
                </table>
            </FieldSet>
        )
    }
    return(
        <View>
            <View>
                <ControlTable />
                <View style={styles.tableContainer}>
                    <FieldSet label="End Point" labelColor="#f00" labelStyle={styles.label} mainStyle={styles.fieldSet}>
                        <table style={styles.table}>
                            <tbody style={styles.tbody}>
                                <tr style={styles.tr}> 
                                    <th style={styles.th}>x</th>
                                    <th style={styles.th}>y</th>
                                </tr>
                                <tr style={styles.tr}>
                                    <td style={hover['x']?styles.hoverEnd:styles.end} onMouseEnter={()=>{hoverFunc('x')}} onMouseLeave={resetHover}>{props.endPoint.x}</td>
                                    <td style={hover['y']?styles.hoverEnd:styles.end} onMouseEnter={()=>{hoverFunc('y')}} onMouseLeave={resetHover}>{props.endPoint.y}</td>
                                </tr>
                            </tbody>
                        </table>
                    </FieldSet>
                </View>
            </View>
        </View>
    )
};

export default Tables;


const styles = StyleSheet.create({
tableContainer: {
    display: "flex",
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex:1
},
fieldSet:{
    backgroundColor: '#a2a2a2',
    height: 80,
    width: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 6
},
label: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 17.5,
    backgroundColor: 'rgba(255, 255, 255, 0.9)'
},
table: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    flex:1,
    backgroundColor: '#a2a2a2',
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
    marginTop: -5,
    padding:2,
    backgroundColor: '#a2a2a2',
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
    color: '#12f',
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
    color: '#12f',
    flex:1,
    width: 40,
    height: 25,
    padding: 2
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
    color: '#f00',
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
    color: '#f00',
    flex:1,
    width: 40,
    height: 25,
    padding: 2
},
})