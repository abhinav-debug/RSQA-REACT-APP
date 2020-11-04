/* eslint-disable prettier/prettier */
import PushNotification from 'react-native-push-notification';
import React from 'react';

export default class PushService {
 static push(){
      
PushNotification.localNotification({
        title: 'My Notification Title', // (optional)
        message: 'My Notification Message', // (required)
      });
 }
 static setCallbacks(onRegistration, onNotification) {
    PushService.onRegistration = onRegistration;
    PushService.onNotification = onNotification;
  }
  static configure() {
   // eslint-disable-next-line prettier/prettier
   PushNotification.configure({
               onRegister: function (token) {
    console.log('TOKEN:', token);
  },  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
      },
      onAction: function (notification) {
    console.log('ACTION:', notification.action);
        console.log("NOTIFICATION:", notification);
  },  onRegistrationError: function(err) {
    console.error(err.message, err);
  },  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});
  }
}
