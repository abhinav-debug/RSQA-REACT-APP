/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { ActivityIndicator, View, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import { BlurView } from "@react-native-community/blur";

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height

const p1 = require('../../android/app/src/main/assets/images/1.png');
const p2 = require('../../android/app/src/main/assets/images/2.png');
const p3 = require('../../android/app/src/main/assets/images/3.png');
const p4 = require('../../android/app/src/main/assets/images/4.png');
const p5 = require('../../android/app/src/main/assets/images/5.png');
const p6 = require('../../android/app/src/main/assets/images/6.png');

const Animatep1 = new Animated.Value(0);
const Animatep2 = new Animated.Value(0);
const Animatep3 = new Animated.Value(0);
const Animatep4 = new Animated.Value(0);
const Animatep5 = new Animated.Value(0);
const Animatep6 = new Animated.Value(0);

const Animatep1X = Animatep1.interpolate({
          inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
          outputRange: [0, 1000, -500, -500, -500, -500, 0, 0, 0, 0, 0, 0],
});

const opacity1X = Animatep1.interpolate({
          inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
          outputRange: [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
});

const Animatep2X = Animatep2.interpolate({
          inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
          outputRange: [0, 0, 1000, -500, -500, -500, -500, 0, 0, 0, 0, 0],
});

const opacity2X = Animatep2.interpolate({
          inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
          outputRange: [1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
});

const Animatep3X = Animatep3.interpolate({
          inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
          outputRange: [0, 0, 0, 1000, -500, -500, -500, -500, 0, 0, 0, 0],
});

const opacity3X = Animatep3.interpolate({
          inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
          outputRange: [1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1],
});

const Animatep4X = Animatep4.interpolate({
          inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
          outputRange: [0, 0, 0, 0, 1000, -500, -500, -500, -500, 0, 0, 0],
});

const opacity4X = Animatep4.interpolate({
          inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
          outputRange: [1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1],
});
const Animatep5X = Animatep5.interpolate({
          inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
          outputRange: [0, 0, 0, 0, 0, 1000, -500, -500, -500, -500, 0, 0],
});
const opacity5X = Animatep5.interpolate({
          inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
          outputRange: [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1],
});
const Animatep6X = Animatep6.interpolate({
          inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
          outputRange: [0, 0, 0, 0, 0, 0, 1000, -500, -500, -500, -500, 0],
});
const opacity6X = Animatep6.interpolate({
          inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
          outputRange: [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
});

const Animate = () => {
          Animated.loop(
                    Animated.parallel([
                              Animated.timing(Animatep1, {
                                        toValue: 11,
                                        duration: 10000,
                                        easing: Easing.linear,
                                        useNativeDriver: false,
                              }), Animated.delay(1000),
                              Animated.timing(Animatep2, {
                                        toValue: 11,
                                        duration: 10000,
                                        easing: Easing.linear,
                                        useNativeDriver: false,
                              }), Animated.delay(1000),
                              Animated.timing(Animatep3, {
                                        toValue: 11,
                                        duration: 10000,
                                        easing: Easing.linear,
                                        useNativeDriver: false,
                              }), Animated.delay(1000),
                              Animated.timing(Animatep4, {
                                        toValue: 11,
                                        duration: 10000,
                                        easing: Easing.linear,
                                        useNativeDriver: false,
                              }), Animated.delay(1000),
                              Animated.timing(Animatep5, {
                                        toValue: 11,
                                        duration: 10000,
                                        easing: Easing.linear,
                                        useNativeDriver: false,
                              }), Animated.delay(1000),
                              Animated.timing(Animatep6, {
                                        toValue: 11,
                                        duration: 10000,
                                        easing: Easing.linear,
                                        useNativeDriver: false,
                              })
                    ])
          ).start();
}
export default class loader extends React.Component {
          componentDidMount() {
                    Animate();
          }
          render() {

                    let arr = [];
                    arr.push(styles.container);
                    if(!this.props.height)
                       arr.push(styles.temp);
                    return (
                              <View >
                                        {/* <BlurView blurType='light' blurAmount={1} style={styles.blur}
                                                  reducedTransparencyFallbackColor="white" /> */}
                                        <View style={arr}>
                                                  <Animated.View style={{
                                                            transform: [{
                                                                      translateX: Animatep6X,
                                                            }], opacity: opacity6X,
                                                  }}>
                                                            <Animated.Image source={p6} style={styles.image} />
                                                  </Animated.View>
                                                  <Animated.View style={{
                                                            transform: [{
                                                                      translateX: Animatep5X,
                                                            }], opacity: opacity5X,
                                                  }}>
                                                            <Animated.Image source={p5} style={styles.image} />
                                                  </Animated.View>
                                                  <Animated.View style={{
                                                            transform: [{
                                                                      translateX: Animatep4X,
                                                            }], opacity: opacity4X,
                                                  }}>
                                                            <Animated.Image source={p4} style={styles.image} />
                                                  </Animated.View>
                                                  <Animated.View style={{
                                                            transform: [{
                                                                      translateX: Animatep3X,
                                                            }], opacity: opacity3X,
                                                  }}>
                                                            <Animated.Image source={p3} style={styles.image} />
                                                  </Animated.View>
                                                  <Animated.View style={{
                                                            transform: [{
                                                                      translateX: Animatep2X,
                                                            }], opacity: opacity2X,
                                                  }}>
                                                            <Animated.Image source={p2} style={styles.image} />
                                                  </Animated.View>
                                                  <Animated.View style={{
                                                            transform: [{
                                                                      translateX: Animatep1X,
                                                            }], opacity: opacity1X,
                                                  }}>
                                                            <Animated.Image source={p1} style={styles.image} />
                                                  </Animated.View>
                                        </View>
                              </View>
                    );
          }
}

const styles = StyleSheet.create({
          container: {
                    flex: 1,
                    position: 'absolute',
                    justifyContent: 'center',
                    width: width,
                    height: height+20,
                    alignContent: 'center',
                    backgroundColor: '#00000080',
                    alignItems: 'center',
                    flexDirection: 'row',
                    zIndex:1200,
          }, image: {
                    width: 30,
                    height:   90,
                    marginLeft: 10
          }, blur: {
                    position: 'absolute',
                    width: width + 10,
                    height: height + 20,
                    zIndex: 1000
          },temp:{
                    marginTop:'-20%',
          }
});


