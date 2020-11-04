/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import NotifService from './Components/NotificationComponent/NotifService';
import firebase from 'react-native-firebase';
import config from './react-native.config';

firebase.initializeApp(config);


AppRegistry.registerComponent(appName, () => App);
