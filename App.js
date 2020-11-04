/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Home from './Components/HomeComponent/Home';
import Login from './Components/LoginComponent/Login';
import * as firebase from 'react-native-firebase';
import NotifService from './Components/NotificationComponent/NotifService';

 const getFcmToken = async () => {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
     console.log(fcmToken);
     console.log("Your Firebase Token is:", fcmToken);
    } else {
     console.log("Failed", "No token received");
    }
  }

class App extends React.Component {

  constructor(){
    super();
    firebase.messaging().onMessage(async remoteMessage => {
       new NotifService().localNotif(remoteMessage.data.msg);
    });
  }
  componentDidMount(){
        getFcmToken();
  }
  render() {
    return (
      <SafeAreaView>
        <Login/>
      </SafeAreaView>
    );
  }
}
export default App;
