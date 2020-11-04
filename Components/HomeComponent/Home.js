/* eslint-disable prettier/prettier */
import React from 'react';
import { Button, TouchableOpacity } from 'react-native';
import NotifService from '../NotificationComponent/NotifService';

export default class Home extends React.Component {
          constructor(props) {
                    super(props);
                    this.state = {};
                    this.notif = new NotifService();
          }
          render() {
                    return (
                              <TouchableOpacity>
                                      
                              </TouchableOpacity>
                    )
          }
}