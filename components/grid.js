import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Grid = (props) => {
    const viewbox = `0 0 ${props.size} ${props.size}`

    function createGrid(){
        let num = props.size/10
        for(let i=0; i<num+1; i++){
            const svgns = "http://www.w3.org/2000/svg"
            const grid = document.getElementById('grid')
            const horizLine = document.createElementNS(svgns, 'path')
            const vertLine = document.createElementNS(svgns, 'path')
            horizLine.setAttributeNS(null, 'd', `M 0 ${i*10} h${props.size}`)
            horizLine.setAttributeNS(null, 'stroke', "#bbbbbb")
            horizLine.setAttributeNS(null, 'strokeWidth', 0.1)
            vertLine.setAttributeNS(null, 'd', `M ${i*10} 0 v${props.size}`)
            vertLine.setAttributeNS(null, 'stroke', "#bbbbbb")
            vertLine.setAttributeNS(null, 'strokeWidth', 0.1)
            grid.appendChild(horizLine)
            grid.appendChild(vertLine)
        }
    }

    function drawPath(){
        if(!props.path){

        }else{
            console.log(props.path)
            const svgns = "http://www.w3.org/2000/svg"
            const grid = document.getElementById('grid')
            const currentPath = document.createElementNS(svgns, 'path')
            currentPath.setAttributeNS(null, 'd', `${props.path}`)
            currentPath.setAttributeNS(null, 'stroke', "#0000ff")
            currentPath.setAttributeNS(null, 'strokeWidth', 0.5)
            currentPath.setAttributeNS(null, 'fill', 'none')
            grid.appendChild(currentPath)
        }
    }

    useEffect(() => {
        createGrid()
        drawPath()
    }, [])

    return(
        <View style={styles.container}>
            <svg id='grid' height={props.size} width={props.size} viewBox={viewbox} />
            <View style={styles.position}>
                <Text>Current Path: "{props.path}"</Text>
            </View>
        </View>
    )
};

export default Grid;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    position: {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
    }
})