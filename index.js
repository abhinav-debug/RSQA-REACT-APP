import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import NotifService from './Components/NotificationComponent/NotifService';
import AsyncStorage from '@react-native-async-storage/async-storage';

AsyncStorage.setItem("token","null");


AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () =>
//   console.log('bgMessaging: ', new Date()),
// );
