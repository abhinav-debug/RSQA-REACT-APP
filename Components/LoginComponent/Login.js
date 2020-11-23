/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, StatusBar, Text, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Keyboard, Animated, Easing } from 'react-native';
import { Dimensions } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Loader/Loader';
import Icon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import { Shadow } from 'react-native-neomorph-shadows';


const bg = require('../../android/app/src/main/assets/images/logo.png');
const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height
const AnimOpacity = new Animated.Value(0);
const AnimOpacityText = new Animated.Value(0);

const p1 = require('../../android/app/src/main/assets/images/left1.png');
const p2 = require('../../android/app/src/main/assets/images/left2.png');
const p3 = require('../../android/app/src/main/assets/images/left3.png');
const p4 = require('../../android/app/src/main/assets/images/left4.png');
const p5 = require('../../android/app/src/main/assets/images/left5.png');
const p6 = require('../../android/app/src/main/assets/images/left6.png');

const stall = require('../../android/app/src/main/assets/images/bottom1.png');

const animate = () => {
        Animated.sequence([
                Animated.timing(AnimOpacity, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: false,
                        easing: Easing.in
                }),
                Animated.timing(AnimOpacityText, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: false,
                        easing: Easing.in
                }),
                Animated.timing(AnimOpacityText, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: false,
                        easing: Easing.in
                }),
                Animated.timing(AnimOpacityText, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: false,
                        easing: Easing.in
                })
        ]).start();
}

const Opacity = AnimOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
});

const Opacity1 = AnimOpacityText.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
});



export default class Login extends React.Component {

        constructor(props) {
                super(props);
                this._isMounted = false;
                this.state = {
                        username: "",
                        btnText: "Enter in Queue",
                        pass: false,
                        error: "",
                        isLoading: true,
                        id: null
                }
        }
        auth = async (navigation) => {

                await AsyncStorage.getItem("authenticated").then(res => {
                        if (res === 'true') {
                                navigation.navigate("AdminHome");
                        }
                })
                await AsyncStorage.getItem("id").then(res => {
                        if (res !== null) {
                                this.props.navigation.navigate("Home")
                        }
                })
        }

        componentDidMount() {
                // this.timer = setInterval(() => this.check(), 1000);
                const { navigation } = this.props;
                this._isMounted = true;
                AnimOpacity.setValue(0);
                AnimOpacityText.setValue(0);
                animate();
                navigation.addListener('focus', async () => {
                        this.setState({ username: "", pass: false });
                        if (this.textInput !== null)
                                this.textInput.clear();
                });
                this.setState({ isLoading: false });
        }

        render() {
                let error = null;
                const { navigation } = this.props;
                this.auth(navigation);
                const changeUsername = (value) => {
                        this.setState({ username: value });
                        if (value === 'admin@123') {
                                this.setState({ btnText: 'Login', pass: true });
                        } else {
                                this.setState({ btnText: 'Enter in queue', pass: false });
                        }
                }
                const changePassword = async (value) => {
                        await AsyncStorage.setItem("pass", value);
                }
                const login = async () => {
                        this.setState({ isLoading: true });
                        let password = "";
                        Keyboard.dismiss();
                        await AsyncStorage.getItem("pass").then(p => password = p);
                        if (this.state.btnText === 'Login') {
                                fetch('https://rsqueueapp.herokuapp.com/rsqa/api/login', {
                                        method: "POST",
                                        headers: {
                                                'Accept': 'application/json',
                                                'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                                username: this.state.username,
                                                password: password,
                                        })
                                }).then((response) => response.text())
                                        .then(async (responseData) => {
                                                if (responseData === 'success') {
                                                        await AsyncStorage.setItem("authenticated", "true");
                                                        navigation.navigate("AdminHome");
                                                } else {
                                                        this.setState({ error: "Invalid Username Password !" });
                                                        this._isMounted = true;
                                                        setInterval(() => {
                                                                this.setState({ error: "" });
                                                        }, 3000);
                                                }
                                                this.setState({ isLoading: false });
                                        })
                                        .catch((e) => {
                                                console.error(e);
                                        });
                        } else {
                                let token = null;
                                await AsyncStorage.getItem("token").then(tok => token = tok);
                                if (this.state.username !== "") {
                                        fetch('https://rsqueueapp.herokuapp.com/rsqa/api/add', {
                                                method: "PUT",
                                                headers: {
                                                        'Accept': 'application/json',
                                                        'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify({
                                                        name: this.state.username,
                                                        token: token,
                                                })
                                        }).then((response) => response.text())
                                                .then(async (responseData) => {
                                                        await AsyncStorage.setItem("id", responseData);
                                                        navigation.navigate("Home");
                                                        this.setState({ isLoading: false });
                                                })
                                                .catch((e) => {
                                                        console.error(e);
                                                });
                                } else {
                                        this.setState({ error: "Please enter a valid name !" })
                                        this.setState({ isLoading: false });
                                }
                        }
                }

                return (
                        <View style={styles.container} >
                                <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
                                {this.state.isLoading ? <Loader height /> : null}
                                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={0}>
                                        <View style={styles.image}>
                                                <View style={styles.top}>
                                                        <Image style={styles.adminText} source={bg} />
                                                        <View style={{ position: 'absolute', bottom: 0 }}>
                                                                <Animated.View style={{ opacity: Opacity1, justifyContent: 'center' }}>
                                                                        <Text style={styles.welcome}>WELCOME TO RSQA </Text>
                                                                </Animated.View>
                                                        </View>
                                                </View>
                                                <LinearGradient colors={['#00000070', '#d50100']} style={{ width: width, height: 20 }} />
                                                <View style={styles.wrap}>
                                                        <Animated.View style={{ opacity: Opacity }}>
                                                                <Text style={styles.error}>{this.state.error}</Text>
                                                                <TextInput style={styles.login}
                                                                        ref={input => { this.textInput = input }}
                                                                        placeholder="Enter your name"
                                                                        placeholderTextColor='#000000'
                                                                        textAlignVertical='center'
                                                                        textAlign='center'
                                                                        onChangeText={(text) => changeUsername(text)}
                                                                        value={this.state.username}
                                                                />
                                                                {this.state.pass === true ? <TextInput
                                                                        onChangeText={(value) => changePassword(value)}
                                                                        secureTextEntry={true}
                                                                        password={true}
                                                                        style={styles.login1}
                                                                        placeholderTextColor='#000000'
                                                                        placeholder="Password"
                                                                        textAlign='center'
                                                                        textAlignVertical='center'
                                                                />
                                                                        :
                                                                        null}
                                                                <View style={{ justifyContent: 'center', alignContent: 'center', flexDirection: 'row', alignSelf: 'center' }}>
                                                                        <Shadow
                                                                                style={{
                                                                                        shadowRadius: 15,
                                                                                        shadowOpacity: 1,
                                                                                        borderRadius: 100 / 2,
                                                                                        shadowColor: '#000000',
                                                                                        backgroundColor: '#ffffff',
                                                                                        width: 80,
                                                                                        height: 80,
                                                                                        justifyContent: 'center',
                                                                                        marginTop: 40,
                                                                                        alignSelf: 'center',
                                                                                        alignItems: 'center',
                                                                                        fontSize: 20,
                                                                                        fontFamily: 'NotoSansJP-Regular',
                                                                                }}>
                                                                                <TouchableOpacity onPress={() => login()}>
                                                                                        <Icon name="arrowright" size={50} />
                                                                                </TouchableOpacity>
                                                                        </Shadow>
                                                                </View>
                                                        </Animated.View>
                                                </View>
                                        </View>
                                </KeyboardAvoidingView>
                                <View style={styles.bottom}>
                                        <Image source={stall} style={{bottom:0}}/>
                                </View>
                        </View>
                )
        }
}
const styles = StyleSheet.create({

        container: {
                flex: 1,
                width: width + 10,
                height: height + 20,
        }, image: {
                width: width + 10,
                height: height + 20,
                backgroundColor: '#d50100'
        }, text: {
                marginTop: 20,
                marginLeft: 10,
                padding: 10,
                fontSize: 20,
                fontFamily: 'NotoSansJP-Bold',
                color: '#000000',
        }, btn: {
                marginTop: 40,
                width: 80,
                height: 80,
                alignSelf: 'center',
                borderRadius: 100 / 2,
                backgroundColor: '#ffffff',
                alignItems: 'center',
                fontSize: 20,
                fontFamily: 'NotoSansJP-Regular',
                justifyContent: 'center',
        }, adminText: {
                width: '40%',
                height: '20%',
                alignSelf: 'center',
                padding: '10%',
                marginTop: '10%'
        }, login: {
                marginTop: "5%",
                borderWidth: 2,
                marginLeft: "5%",
                marginRight: "5%",
                borderColor: '#000000',
                borderRadius: 100 / 2,
                fontSize: 20,
                fontFamily: 'Trispace-Medium',
                backgroundColor: '#ffffff',
                shadowColor: "#000",
                shadowOffset: {
                        width: 0,
                        height: 12,
                },
                shadowOpacity: 0.58,
                shadowRadius: 16.00,
                elevation: 24,
        }, login1: {
                marginTop: '10%',
                borderWidth: 2,
                marginLeft: "5%",
                marginRight: "5%",
                borderColor: '#000000',
                borderRadius: 100 / 2,
                fontSize: 20,
                fontFamily: 'Trispace-Medium',
                backgroundColor: '#ffffff',
                shadowColor: "#000",
                shadowOffset: {
                        width: 0,
                        height: 12,
                },
                shadowOpacity: 0.58,
                shadowRadius: 16.00,
                elevation: 24,
        }, wrap: {
                flex: 1,
                width: width,
                height: height * .7,
                position: 'relative',
                alignContent: 'center',
                backgroundColor: '#d50100', //#10a181
                // borderTopColor: '#000000',
                // borderTopWidth: 5,
        }, error: {
                color: '#000000',
                textAlign: 'center',
                fontSize: 20,
                marginTop: '10%',
                fontFamily: 'Trispace-Medium',
                justifyContent: 'center'
        }, bottom: {
                position: 'absolute',
                bottom:0,
        }, welcome: {
                fontSize: 30,
                textAlign: 'center',
                fontFamily: 'Trispace-Regular',
                padding: 5,
                marginBottom: '5%',
                marginTop: '5%',
                width: width
        }, top: {
                width: width,
                height: height * .3,
                shadowColor: "#000000",
                shadowOffset: {
                        width: 0,
                        height: 12,
                },
                backgroundColor: '#ffffff',
                shadowOpacity: 1,
                shadowRadius: 16.00,
        }
})