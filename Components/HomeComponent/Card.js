/* eslint-disable prettier/prettier */
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Entypo';

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height


const card = (props) => {
          let g1 = (props.g1 + "");
          let g2 = (props.g2 + "");
          return (
                    <View>
                              <LinearGradient style={styles.container} colors={[g1, g2]}
                                        start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}>
                                        <View style={styles.cont} key={props.id}>
                                                  <Text style={styles.text}>{props.id}</Text>
                                                  <Text style={styles.text} >{props.name}</Text>
                                                  {props.close ? <TouchableOpacity onPress={props.delete}>
                                                            <Text style={{justifyContent:'center',alignContent:'center',marginTop:10,marginRight:10}}><Icon style={{alignSelf: 'center' }} name="remove-user" size={40} color="#d50100" /></Text>
                                                  </TouchableOpacity> : null
                                                  }
                                        </View>
                              </LinearGradient>
                              <LinearGradient colors={['#000000','#00000010','#ffffff']} style={{width:width,height:10,alignSelf:'center',zIndex:10}}/>
                    </View>

          )
}

const styles = StyleSheet.create({
          container: {
                    marginTop: 10,
                    width: width,
                    height: 60,
                    textAlign: 'center',
                    alignSelf: 'center',
                    fontSize: 20,
                    justifyContent: 'center',
                    // borderRadius: 40 / 2,
                    zIndex: 30,
                    // borderBottomColor: '#00000040',
                    // borderBottomWidth: 4,
          }, cont: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: width,
                    height: 54,
                    backgroundColor: '#ffffff',
                    alignSelf: 'center',
                    // borderColor: '#000000',
                    // borderWidth: 1,
                    // borderRadius: 40 / 2,
          }, text: {
                    textAlign: 'center',
                    fontSize: 20,
                    textAlignVertical: 'center',
                    marginLeft: '5%',
                    marginRight: '5%',
                    textTransform: 'uppercase',
                    fontFamily: 'Trispace-Medium',
          }
});

export default card;