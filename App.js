/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet, Text, View
} from 'react-native';

import Home from './Components/HomeComponent/Home';
import AdminHome from './Components/HomeComponent/AdminHome';
import Login from './Components/LoginComponent/Login';
import * as firebase from 'react-native-firebase';
import NotifService from './Components/NotificationComponent/NotifService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import { Shadow } from 'react-native-neomorph-shadows';


const Stack = createStackNavigator();

const getFcmToken = async () => {
  const fcmToken = await firebase.messaging().getToken();
  if (fcmToken) {
    console.log(fcmToken);
    console.log("Your Firebase Token is:", fcmToken);
    AsyncStorage.setItem("token", fcmToken);
  } else {
    console.log("Failed", "No token received");
  }
}

class App extends React.Component {

  constructor(props) {
    super(props);
    firebase.messaging().onMessage(async remoteMessage => {
      new NotifService().localNotif(remoteMessage.data.msg);
    });
  }
  componentDidMount() {
    getFcmToken();
  }
  render() {
    const logout = async ({ navigation }) => {
      await AsyncStorage.setItem("authenticated", "false");
      await AsyncStorage.setItem("pass", "");
      navigation.navigate("Login");
    }
    const exitQueue = async ({ navigation }) => {
      let idd = "";
      await AsyncStorage.getItem("id").then(id => {
        idd = id
      });
      fetch('https://rsqueueapp.herokuapp.com/rsqa/api/exit/' + idd, {
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then((response) => response.text())
        .then(async (responseData) => {
          console.log(responseData);
          await AsyncStorage.removeItem("id");
          navigation.navigate("Login");
        })
        .catch((e) => {
          console.error(e);
        });
    }
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={Login} >
          <Stack.Screen name="Login" component={Login} options={({ navigation }) => ({
            headerShown: false,
          })} />
          <Stack.Screen name="AdminHome" component={AdminHome} options={({ navigation }) => ({
            headerTitle: null, headerLeft: null,
            headerRight: () => (
              <Shadow
                style={{
                  shadowRadius: 15,
                  shadowOpacity: 1,
                  borderRadius: 100 / 2,
                  shadowColor: '#000000',
                  backgroundColor: '#000000',
                  width: 60,
                  height: 60,
                  justifyContent: 'center'
                }}
              >
                <TouchableOpacity style={[styles.btn, { elevation: 24, alignSelf: 'center' }]} onPress={() => logout({ navigation })}>
                  <Icon1 name="logout" size={40} color="#d50100" style={{ alignSelf: 'center' }} />
                </TouchableOpacity>
              </Shadow>
            ), headerRightContainerStyle: {
              marginRight: 20,
              marginTop: '7%'
            }, headerLeftContainerStyle: {
              marginLeft: 30
            }, headerStyle: {
              backgroundColor: '#d50100',
              elevation: 0,
              height: 80,
            }
          })} />
          <Stack.Screen name="Home" component={Home} options={({ navigation }) => ({
            headerTitle: null, headerLeft: null,
            headerRight: () => (
              <Shadow
                style={{
                  shadowRadius: 15,
                  shadowOpacity: 1,
                  borderRadius: 100 / 2,
                  shadowColor: '#000000',
                  backgroundColor: '#000000',
                  width: 60,
                  height: 60,
                  justifyContent: 'center'
                }}
              >
                <TouchableOpacity style={[styles.btn, { elevation: 24, alignSelf: 'center' }]} onPress={() => exitQueue({ navigation })} >
                  <Icon1 name="exit-run" size={40} color="#d50100" style={{ alignSelf: 'center' }} />
                </TouchableOpacity>
              </Shadow>
            ), headerRightContainerStyle: {
              marginRight: 20,
              marginTop: '7%'
            }, headerLeftContainerStyle: {
              marginLeft: 30,
            }, headerStyle: {
              backgroundColor: '#d50100',
              elevation: 0,
              height: 80,
            }
          })} />
        </Stack.Navigator>
      </NavigationContainer>
      // <React.Fragment>
      // <Card id ='1' name='abhinav' g1='#eb3349' g2='#f45c43' />
      // <Card id = '2' name="Anay" g1="#56ab2f"  g2='#56ab2f' />
      // <Card id = '3' name="Amay" g1="#00000050"  g2='#00000050' />
      // </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    width: 60,
    height: 60,
    borderRadius: 100 / 2,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
});

export default App;
