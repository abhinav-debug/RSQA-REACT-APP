/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Text, View, StyleSheet, FlatList, StatusBar } from 'react-native';
import NotifService from '../NotificationComponent/NotifService';
import Loader from '../Loader/Loader';
import Card from './Card';
import Icon from 'react-native-vector-icons/AntDesign';

let abortController = new AbortController();

const auth = async (navigation) => {

        await AsyncStorage.getItem("authenticated").then(res => {
                if (res === 'false') {
                        navigation.navigate("Login");
                }
        })
}
export default class AdminHome extends React.Component {
        constructor(props) {
                super(props);
                abortController = new AbortController();
                this.state = {
                        outQueue: [],
                        inQueue: [],
                        isLoading: true,
                        in: false
                        , out: false
                };
                this.notif = new NotifService();
        }
        componentDidMount() {
                this.timer = setInterval(() => {
                        this.getData();
                }, 3000);
        }
        componentWillUnmount() {
                abortController.abort();
        }
        getData = async () => {
                // OUT QUEUE
                fetch('https://rsqueueapp.herokuapp.com/rsqa/api/outQueue/false', {
                        signal: abortController.signal,
                        method: "GET",
                        headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                        },
                }).then((response) => response.json())
                        .then((responseData) => {
                                if (responseData.length != 0) {
                                        this.setState({ outQueue: Object.values(responseData), out: true });
                                        // IN QUEUE
                                        fetch('https://rsqueueapp.herokuapp.com/rsqa/api/inQueue', {
                                                signal: abortController.signal,
                                                method: "GET",
                                                headers: {
                                                        'Accept': 'application/json',
                                                        'Content-Type': 'application/json',
                                                },
                                        }).then((response) => response.json())
                                                .then((responseData) => {
                                                        if (responseData.length != 0) {
                                                                this.setState({ inQueue: Object.values(responseData), in: true });
                                                        } else {
                                                                this.setState({ inQueue: [], in: false });
                                                        }
                                                        this.setState({ isLoading: false });
                                                })
                                                .catch((e) => {
                                                        console.error(e);
                                                        this.setState({ isLoading: false });
                                                });
                                } else {
                                        this.setState({ outQueue: [], out: false });
                                }
                        })
                        .catch((e) => {
                                console.error(e);
                        });
        }

        render() {
                const { navigation } = this.props;
                const unsubscribe = navigation.addListener('beforeRemove', e => {
                        clearInterval(this.timer);
                });
                const del = (id) => {
                        this.setState({ isLoading: true });
                        fetch('https://rsqueueapp.herokuapp.com/rsqa/api/' + id, {
                                method: "DELETE",
                                headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                }
                        }).then((response) => response.text())
                                .then((responseData) => {
                                        console.log(responseData);
                                        this.getData();
                                        setTimeout(() => { this.setState({ isLoading: false }); }, 2000);
                                })
                                .catch((e) => {
                                        console.error(e);
                                });
                }

                auth(navigation);
                return (
                        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                                <StatusBar barStyle="light-content" backgroundColor="#000000" />
                                {this.state.isLoading ? <Loader height={false} /> : null}
                                <View>
                                        <View style={{ backgroundColor: '#d50100' }}>
                                                <Text style={{
                                                        fontSize: 22,
                                                        fontFamily: 'Trispace-Regular',
                                                        color: "#000000",
                                                        marginTop: 20,
                                                        marginBottom: 20,
                                                        marginLeft: 20
                                                }}>On Going Customer's <Icon name="arrowdown" size={22}/></Text>
                                        </View>
                                        {this.state.out ? <FlatList
                                                data={this.state.outQueue}
                                                renderItem={({ item, index }) => (
                                                        <Card id={item.id} name={item.name} delete={() => del(item.id)} g1="#56ab2f" g2='#a8e063' close={true} />
                                                )}
                                                extraData={this.state.outQueue}
                                                keyExtractor={(item, index) => item.id.toString()}
                                        /> : null}
                                </View>
                                <View style={{ flex: 1 }}>
                                        <Text style={style.text}>Up Coming Customer's <Icon name="arrowdown" size={22}/></Text>
                                        {this.state.in ? <FlatList
                                                contentContainerStyle={{ paddingBottom: 10 }}
                                                data={this.state.inQueue}
                                                renderItem={({ item, index }) => (
                                                        <Card id={item.id} name={item.name} delete={() => del(item.id)} g1="#00000050" g2='#00000050' close={true} />
                                                )}
                                                extraData={this.state.inQueue}
                                                keyExtractor={(item, index) => item.id.toString()}
                                        /> : null}
                                </View>
                        </View>
                )
        }
}

const style = StyleSheet.create({
        container: {
        }, text: {
                fontSize: 22,
                fontFamily: 'Trispace-Regular',
                color: "#000000",
                marginTop: 20,
                marginBottom: 20,
                marginLeft: 20
        }
})