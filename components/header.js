import { Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Svg, LinearGradient, Path, ForeignObject, Defs, Stop, G } from 'react-native-svg';

const Header = ( props ) => {
    
    function njtd(){
        window.open('https://www.njtd.xyz');
    }
    const [width, setWidth] = useState(window.innerWidth)
    const [height, setHeight] = useState(window.innerHeight/5)
    const viewbox = `0 0 ${width} ${height}`
    document.addEventListener('resize', ()=> {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight/10)
    })

    const myPath = `M0,0 l${width},0 l0,${height} l-${width},0z`
    const positionX = (width/2) - 75
    return(
        <Svg style={styles.header}>
            <Defs>
                <LinearGradient id="gradient" x1="0" y1={height} x2={width} y2="0">
                    <Stop offset="0" stopColor="#aaa" stopOpacity="1" />
                    <Stop offset="1" stopColor="#888" stopOpacity="1" />
                    <Stop offset="2" stopColor="#3d3d3d" stopOpacity="1" />
                </LinearGradient>
            </Defs>
            <G x="0" y="0" viewBox={viewbox}>
                {/* <Path x="0" y="0" viewBox={viewbox} fill="url(#gradient)" d={myPath} /> */}
                <ForeignObject x={positionX} y={0} width={150} height={150} >
                    <Image style={styles.logo} source={require('../assets/logo.svg')} onClick={njtd} />
                </ForeignObject>
            </G>
        </Svg>
    )
};

export default Header;

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 150,
        backgroundColor: '#666',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyItems: 'center'
    },
    logo: {
        width: 150,
        height: 150,
        display: 'flex',
        alignSelf: 'center',
        cursor: 'pointer'
    }
})
