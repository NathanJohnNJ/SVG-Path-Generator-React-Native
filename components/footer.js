import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Svg, Path, ForeignObject, G, Defs, LinearGradient, Stop } from 'react-native-svg';
import { useState, useLayoutEffect } from 'react';


const Footer = ( props ) => {
    const [hover, setHover] = useState({git: false, nj: false})

    function hoverFunc(i){
        const newHover = { ...hover, [i]: true}
        setHover(newHover)
    }
    function resetHover(){
        setHover({git: false, nj: false})
    }

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
    const viewbox = `0 ${height-120} ${width} ${height}`;
   
    const myPath = `M0,0 c${width/12},-20 ${width/6},20 ${width/3},0 s${width/6},20 ${width/3},0s${width/6},-20 ${width/3},0l0,120 l-${width},0 z`;
    return(
        <Svg style={styles.footer}>
            <Defs>
                <LinearGradient id="grad" x1="0%" x2="100%" y1="0%" y2="0%">
                    <Stop offset="0%" stopColor="#eee"  />
                    <Stop offset="50%" stopColor="#aaa" />
                    <Stop offset="100%" stopColor="#444" />
                </LinearGradient>
            </Defs>

            <G x="0" y="40" viewBox={viewbox}>
                <Path d={myPath} x="0" y="0" viewBox={viewbox} fill="url(#grad)" stroke="none" preserveAspectRatio="minXminY meet"/>
                <ForeignObject x={width/3} y={80} width={width/2} height={120} >
                    <View style={styles.footerMain}>
                        <Pressable onPress={njtd}>    
                            <Image style={styles.logo} source={require('../assets/logo.svg')}/>
                        </Pressable>
                        <View style={styles.footerText}>
                            <View style={styles.textLine}>
                                <Text style={styles.footerText}>
                                    If you like what you see, check out the rest of my portfolio at 
                                </Text>
                                <Text onMouseOver={()=>hoverFunc('nj')} onMouseLeave={resetHover}>
                                    <a href="https://www.njtd.xyz/portfolio/developer" target="_blank" rel="noreferrer" style={hover.nj?styles.gitHover:styles.github} >
                                         www.njtd.xyz
                                    </a>
                                </Text>
                            </View>
                            <View style={styles.textLine}>
                                <Text style={styles.footerText}>
                                    You can also see what I'm currently up to on 
                                </Text>
                                <Text onMouseOver={()=>hoverFunc('git')} onMouseLeave={resetHover} >
                                    <a href="https://github.com/NathanJohnNJ" target="_blank" rel="noreferrer" style={hover.git?styles.gitHover:styles.github}>
                                         GitHub
                                    </a>
                                </Text>
                            </View>
                            <View style={styles.textLine}>
                                <Text style={styles.footerText}>
                                    Thanks for checking out my SVG Path Generator! I hope you've enjoyed using it!
                                </Text>
                            </View>
                            <View style={styles.textLine}>
                                <Text style={styles.footerText}>
                                    See you again soon!
                                </Text>
                            </View>
                        </View>
                        <Pressable onPress={njtd}>
                            <Image style={styles.logo2} source={require('../assets/grey.png')} />
                        </Pressable>
                    </View>
                </ForeignObject>
            </G>
        </Svg>
    )
};

export default Footer;

const styles = StyleSheet.create({
    footer: {
        height: 160,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        marginLeft: 75,
        marginRight: 50,
        width: 100,
        height: 100
    },
    logo2: {
        marginLeft: 50,
        width: 100,
        height: 100,
        marginTop: -15
    },
    footerMain: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
    },
    footerText: {
        justifyContent: 'center',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        color: "#494949",
        fontFamily: 'Quicksand-Regular',
    },
    github: {
        color: "#1166d9",
        fontFamily: 'Quicksand-Medium',
        textDecorationLine: 'none',
        marginLeft:3
    },
    gitHover: {
        color: "#fff",
        fontFamily: 'Quicksand-Medium',
        textDecorationLine: 'none',
        marginLeft:3
    },
    textLine: {
        display: 'flex',
        flexDirection: 'row'
    }
})