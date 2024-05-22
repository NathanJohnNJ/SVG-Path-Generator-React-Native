
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FieldSet from 'react-native-fieldset';

const Tables = (props) => {
    console.log(props.path)


    return(
        <View>
            <View>
                <View style={styles.tableContainer}>
                    <FieldSet label="First Control Point" labelColor="#00f" labelFontSize='17.5px' labelStyle={styles.label} mainStyle={styles.fieldSet}>
                        <table style={styles.table}>
                            <tbody style={styles.tbody}>
                                <tr style={styles.tr}>
                                    <th style={styles.th}>dx1</th>
                                    <td style={styles.td}>{props.path.dx1.value}</td>
                                </tr>
                                <tr style={styles.tr}>
                                    <th style={styles.th}>dy1</th>
                                    <td style={styles.td}>{props.path.dy1.value}</td>
                                </tr>
                            </tbody>
                        </table>
                    </FieldSet>
                </View>
                {props.path.dx2
                ?
                <View style={styles.tableContainer}>
                    <FieldSet label="Second Control Point" labelColor="#00f" labelFontSize='17.5px' labelStyle={styles.label} mainStyle={styles.fieldSet}>
                        <table style={styles.table}>
                            <tbody style={styles.tbody}>
                                <tr style={styles.tr}>
                                    <th style={styles.th}>dx2</th>
                                    <td style={styles.td}>{props.path.dx2.value}</td>
                                </tr>
                                <tr style={styles.tr}>
                                    <th style={styles.th}>dy2</th>
                                    <td style={styles.td}>{props.path.dy2.value}</td>
                                </tr>
                            </tbody>
                        </table>
                    </FieldSet>
                </View>
                :<></>}
                <View style={styles.tableContainer}>
                    <FieldSet label="End Point" labelColor="#f00" labelFontSize="17.5px" labelStyle={styles.label} mainStyle={styles.fieldSet}>
                        <table style={styles.table}>
                            <tbody style={styles.tbody}>
                                <tr style={styles.tr}>
                                    <th style={styles.th}>x</th>
                                    <td style={styles.end}>{props.path.x.value}</td>
                                </tr>
                                <tr style={styles.tr}>
                                    <th style={styles.th}>y</th>
                                    <td style={styles.end}>{props.path.y.value}</td>
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
    width: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
},
label: {
    fontFamily: 'Geologica',
    fontWeight: 600,
    fontSize: 17.5
},
table: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    marginTop: 5,
    marginLeft: 10,
    flex:1
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
    borderRadius: '5px',
},
th: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1.8px solid black',
    fontFamily: 'Geologica',
    fontWeight: 500,
    fontSize: 18,
    flex:1,
    width: 40,
    height: 25,
    marginTop: -5,
    marginBottom: -5,
},
td: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    border: '1.5px dashed grey',
    fontFamily: 'Geologica',
    fontWeight: 400,
    fontSize: 18,
    color: '#12f',
    flex:1,
    width: 60,
    height: 25,
    margin: 2
},
start: {
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1.5px dashed grey',
    fontFamily: 'Geologica',
    fontWeight: 400,
    fontSize: 18,
    color: '#159c06',
    flex:1,
    width: 60,
    height: 25,
    margin: 2
},
end: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    border: '1.5px dashed grey',
    fontFamily: 'Geologica',
    fontWeight: 400,
    fontSize: 18,
    color: '#f00',
    flex:1,
    width: 60,
    height: 25,
    margin: 2
},
})