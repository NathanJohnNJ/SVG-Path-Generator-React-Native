import { Image, StyleSheet } from 'react-native';
import { useState, useLayoutEffect } from 'react';
import { Svg, LinearGradient, Path, ForeignObject, Defs, Stop, G } from 'react-native-svg';

const Header = ( props ) => {
    
    function njtd(){
        window.open('https://www.njtd.xyz');
    }
    function useWindowSize() {
        const [size, setSize] = useState([0, 0]);
        useLayoutEffect(() => {
          function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
          }
          window.addEventListener('resize', updateSize);
          updateSize();
          return () => window.removeEventListener('resize', updateSize);
        }, []);
        return size;
      }

    const [width, height] = useWindowSize();
    const viewbox = `0 0 ${width} 120`;
    const myPath = `M0,0 l${width},0 l0,120 c-${width/16},60 -${width/8},-40 -${width/4},0 s-${width/8},-30 -${width/4},5s-${width/8},-40 -${width/4},0s-${width/8},-60 -${width/4},10z`;

    return(
        <Svg style={styles.header}>
            <Defs>
                <LinearGradient id="grad" x1="0%" x2="100%" y1="0%" y2="0%">
                    <Stop offset="0%" stopColor="#444"  />
                    <Stop offset="50%" stopColor="#aaa" />
                    <Stop offset="100%" stopColor="#eee" />
                </LinearGradient>
            </Defs>
            <G x="0" y="0" viewBox={viewbox}>
                <Path x="0" y="0" viewBox={viewbox} fill="url(#grad)" d={myPath} stroke="none" preserveAspectRatio="minXminY meet"/>
                <ForeignObject x={(width/2)-60} y={0} width={width} height={120} >
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
        height: 160,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyItems: 'center'
    },
    logo: {
        width: 120,
        height: 120,
        display: 'flex',
        alignSelf: 'center',
        justifySelf: 'center',
        cursor: 'pointer'
    }
})
