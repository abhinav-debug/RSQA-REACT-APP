/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Image, ImageBackground, Button, Alert, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from "react-native";
import * as firebase from 'react-native-firebase';
import NotifService from '../NotificationComponent/NotifService';

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height
const bg = require('../../android/app/src/main/assets/images/bg.jpg');

export default class Login extends React.Component {
          componentDidMount() {
                    // this.timer = setInterval(() => this.getQueue(), 1000);
          }
          async getQueue() {
                    // fetch('https://facebook.github.io/react-native/movies.json', { method: "GET" })
                    //           .then((response) => response.json())
                    //           .then((responseData) => {
                    //                     //set your data here
                    //                     console.log(responseData);
                    //           })
                    //           .catch((error) => {
                    //                     console.error(error);
                    //           });

          }
          render() {
                    return (
                              <View style={styles.container}>
                                        <ImageBackground style={styles.image} source={bg} blurRadius={0}>
                                                  <KeyboardAvoidingView behavior='position'>
                                                            <View style={styles.card}>
                                                                      <Text style={styles.adminText}>ADMIN LOGIN</Text>
                                                                      <TextInput style={styles.login} placeholder="Username" />
                                                                      <TextInput style={styles.login} placeholder="Password" />
                                                                      <TouchableOpacity style={styles.btn} >
                                                                                <Text style={{ fontSize: 20 }}>Login</Text>
                                                                      </TouchableOpacity>
                                                            </View>
                                                            <Text style={styles.text, styles.or}>OR</Text>
                                                            <Text style={styles.text}>Enter the queue :</Text>
                                                            <TextInput style={styles.input} placeholder="ENTER YOUR NAME" />
                                                            <TouchableOpacity style={styles.btn} >
                                                                      <Text style={{ fontSize: 20 }}>Enter Queue</Text>
                                                            </TouchableOpacity>
                                                  </KeyboardAvoidingView>
                                        </ImageBackground>
                              </View>
                    )
          }
}
const styles = StyleSheet.create({

          container: {
                    flex: 1,
          }, image: {
                    width: width + 10,
                    height: height + 10,
          }, input: {
                    padding: 0,
                    borderRadius: 100 / 2,
                    textAlign: 'center',
                    width: width - 40,
                    alignSelf: 'center',
                    height: 60,
                    backgroundColor: 'transparent',
                    fontSize: 20,
                    fontFamily: 'NotoSansJP',
                    color: 'black',
                    borderColor: '#FF000070',
                    borderWidth: 2,
          }, text: {
                    marginTop: 20,
                    marginLeft: 10,
                    padding: 10,
                    fontSize: 20,
                    fontFamily: 'NotoSansJP-Bold',
                    color: '#000000',
          }, btn: {
                    position: 'relative',
                    padding: 10,
                    marginTop: 10,
                    width: width - 200,
                    alignSelf: 'center',
                    borderRadius: 100 / 2,
                    backgroundColor: '#FF000090'
                    , alignItems: 'center',
                    fontSize: 20,
                    fontFamily: 'NotoSansJP-Regular',
          }, or: {
                    textAlign: 'center',
                    marginTop: 10,
                    fontSize: 25,
          }, card: {
                    textAlign: 'center',
                    marginTop: 10,
                    backgroundColor: '#f0ffff90',
                    color: '#ffffff',
                    width: width - 40,
                    height: height - 300,
                    alignSelf: 'center',
                    borderRadius: 40 / 2,
          }, adminText: {
                    alignSelf: 'center',
                    fontSize: 40,
                    color: '#000000',
                    marginBottom: 50,
                    marginTop: 40,
                    fontFamily: 'NotoSansJP-Regular',
          }, login: {
                    marginTop: 20,
                    marginBottom: 20,
                    borderWidth: 2,
                    marginLeft: 10,
                    marginRight: 10,
                    borderColor: '#FF000070',
                    textAlign: 'center',
                    borderRadius: 100 / 2,
                    fontSize: 20,
                    fontFamily: 'NotoSansJP-Regular',
          }
})