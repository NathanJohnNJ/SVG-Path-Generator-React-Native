{/* <View style={styles(props).switcher}>
                  <Text style={styles(props).nodeTitle}>Nodes</Text>
                  <View style={styles(props).nodeBtns}>
                    <Pressable onPress={() => setShowNodes(showNodes => !showNodes)} disabled={showNodes} style={showNodes?styles(props).selected:styles(props).switch}>
                      <Text style={showNodes?styles(props).selectedText:styles(props).switchText}>
                        Show
                      </Text>
                    </Pressable>

                    <Pressable onPress={() => setShowNodes(showNodes => !showNodes)} disabled={!showNodes} style={!showNodes?styles(props).selected:styles(props).switch}>
                      <Text style={!showNodes?styles(props).selectedText:styles(props).switchText}>
                        Hide
                      </Text>
                    </Pressable>
                  </View>
                </View>


nodeTitle: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 25,
    marginTop: -20,
    textShadow: '-1px 1px 2px gray, 1px 1px 1px gray',
}, */}


// switch:{
//   display:'flex',
//   flexDirection: 'row',
//   alignItems: 'center',
//   justifyContent: 'center',
//   width:'fit-content',
//   height:25,
//   backgroundColor: '#6c6c6c',
//   borderRadius: 6,
//   borderColor: '#4e4e4e',
//   borderWidth: 2,
//   margin: 2,
//   padding: 5
// },
// switchText:{
//   textAlign:'center',
//   color:'#4e4e4e',
//   fontFamily: 'Quicksand-Regular',
//   fontSize: 18,
// },
// selected:{
//   display:'flex',
//   flexDirection: 'row',
//   alignItems: 'center',
//   justifyContent: 'center',
//   width:'fit-content',
//   height:25,
//   borderColor: '#fff',
//   borderWidth: 2,
//   borderRadius: 6,
//   backgroundColor: '#4e4e4e',
//   margin: 2,
//   padding: 5
// },
// nodeBtns:{
//   display: 'flex',
//   flexDirection: 'row',
//   alignItems: 'center',
//   justifyContent: 'center',
// },
// selectedText:{
//   textAlign:'center',
//   color: '#ffffff',
//   fontFamily: 'Quicksand-Medium',
//   fontSize: 18,
//   textShadow: '-1px 1px 1px #ffffff',
// },
// switcher:{
//   display:'flex',
//   flexDirection: 'column',
//   width:250,
//   height: 70,
//   backgroundColor: '#eaeaea',
//   borderColor: '#dbf',
//   borderWidth: 3,
//   borderRadius: 18,
//   alignItems: 'center',
//   justifyContent: 'center',
//   padding: 22,
//   boxShadow: '-2px 2px 8px #9c9c9c',
//   margin: 10,
// },