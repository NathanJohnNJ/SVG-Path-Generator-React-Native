import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Svg, Path, ForeignObject } from 'react-native-svg';
import { useState } from 'react';


const Footer = ( props ) => {

    function njtd(){
        window.open('https://www.njtd.xyz');
    }
    const [width, setWidth] = useState(window.innerWidth)
    const [height, setHeight] = useState(window.innerHeight/8)
    const viewbox = `0 0 ${width} ${height}`
    document.addEventListener('resize', ()=> {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight/8)
    })
    // const myPath = `M${width},${height*8} l-${width},0 l-${height} q 100 -50 ${width/4} 0 q 150 50 ${width/4} 0 q 150 -30 ${width/4} 0 q 260 50 ${width/4}z`
    return(
        <View style={styles.footer}>
            <Svg viewBox={viewbox} preserveAspectRatio="minXminY meet" width={width} height={height}>
                {/* <Path d={myPath} fill="#333" strokeWidth="4" /> */}
                <ForeignObject x={0} y={0} width={width} height={height} >
                    <View style={styles.footerMain}>
                    <Image style={styles.logo} source={require('../assets/logo.svg')} onClick={njtd} />
                
                    <View style={styles.footerText}>
                        <View style={styles.textLine}>
                            <Text style={styles.footerText}>
                                If you like what you see, check out the rest of my portfolio at <a href="https://www.njtd.xyz/portfolio/developer" style={styles.github}>www.njtd.xyz</a>
                            </Text>
                        </View>
                        <View style={styles.textLine}>
                            <Text style={styles.footerText}>
                                You can also see what I'm currently up to on <a href="https://github.com/NathanJohnNJ" style={styles.github} target="_blank" rel="noreferrer">GitHub</a>
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
                    <Image style={styles.logo} source={require('../assets/grey.png')} onClick={njtd} />
                    </View>
                </ForeignObject>
            </Svg>
        </View>
    )
};

export default Footer;

const styles = StyleSheet.create({
    footer: {
        width: '100%',
        height: 140,
        backgroundColor: '#666',
    },
    logo: {
        // marginTop: -30,
        marginLeft: 50,
        marginRight: 50,
        width: 100,
        height: 100
    },
    footerMain: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        flex:1,
        marginTop: 5
    },
    footerText: {
        // display: 'flex',
        // flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        color: "#cecece",
        fontFamily: 'Quicksand-Regular',
        // marginTop: 10,
        // flex:1
    },
    github: {
        color: "#bf9fbf",
        fontFamily: 'Quicksand-Medium',
    },
    textLine: {
        display: 'flex',
        flexDirection: 'row'
    }
})