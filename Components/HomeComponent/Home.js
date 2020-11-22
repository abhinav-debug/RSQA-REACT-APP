/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { StatusBar, Text, StyleSheet, FlatList, View } from 'react-native';
import NotifService from '../NotificationComponent/NotifService';
import Card from './Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Loader/Loader';
import Icon from 'react-native-vector-icons/AntDesign'

let abortController = new AbortController();
export default class Home extends React.Component {
        _isMounted = false
        constructor(props) {
                super(props);
                abortController = new AbortController();
                this.state = {
                        outQueue: [],
                        inQueue: [],
                        queue: null,
                        id: -1,
                        in: false
                        , out: false,
                        isLoading: true
                };
                this.notif = new NotifService();
        }
        componentDidMount() {
                this._isMounted = true;
                this.timer = setInterval(() => {
                        this.getData();
                }, 3000);
        }
        componentWillUnmount() {
                abortController.abort();
        }

        check = async () => {
                await AsyncStorage.removeItem("id");
                this.props.navigation.navigate("Login");
        }

        getData = async () => {
                // OUT QUEUE
                await AsyncStorage.getItem("id").then(id => this.setState({ id: id }));

                // CHECK  ID EXIST OR NOT
                fetch('https://rsqueueapp.herokuapp.com/rsqa/api/check/' + this.state.id, {
                        signal: abortController.signal,
                        method: "GET",
                        headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                        }
                }).then((response) => response.text())
                        .then((responseData) => {
                                if (responseData === "false") {
                                        this.check();
                                }
                        })
                        .catch((e) => {
                                console.error(e);
                        });

                fetch('https://rsqueueapp.herokuapp.com/rsqa/api/outQueue', {
                        signal: abortController.signal,
                        method: "GET",
                        headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                        }
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
                                                        'Content-Type': 'application/json'
                                                }
                                        }).then((response) => response.json())
                                                .then(async (responseData) => {
                                                        if (responseData.length != 0) {
                                                                this.setState({ inQueue: Object.values(responseData), in: true });
                                                        } else {
                                                                this.setState({ inQueue: [], in: false });
                                                        }
                                                        const queue = [...this.state.outQueue, ...this.state.inQueue];
                                                        if (queue.length > 0)
                                                                this.setState({ queue: queue, isLoading: false });
                                                        else
                                                                this.setState({ queue: null, isLoading: false });
                                                })
                                                .catch((e) => {
                                                        console.error(e);
                                                        this.setState({ isLoading: false });
                                                });
                                } else {
                                        this.setState({ outQueue: [], out: false });
                                }
                                console.log(responseData);
                        })
                        .catch((e) => {
                                console.error(e);
                        });

                this._isMounted = false;
        }
        render() {
                const { navigation } = this.props;
                const unsubscribe = navigation.addListener('beforeRemove', e => {
                        clearInterval(this.timer);
                });

                return (
                        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                                <StatusBar barStyle="light-content" backgroundColor="#000000" />
                                {this.state.isLoading ? <Loader height={false} /> : null}
                                <View style={{ flex: 1 }}>
                                        <View style={{ backgroundColor: '#d50100' }}>
                                                <Text style={{
                                                        textAlign: 'left',
                                                        fontSize: 25,
                                                        marginTop: 0,
                                                        padding: 20,
                                                        fontFamily: 'Trispace-Regular',
                                                        color: 'white'
                                                }}>Your token no - {this.state.id === -1 ? null : <Text style={{color:'#000000',fontSize:30,fontFamily:'NotoSansJP-Bold'}}>{this.state.id < 100 ? 0+this.state.id : this.state.id}</Text>}</Text>
                                                <Text style={style.text}>On Queue <Icon name="arrowdown" size={25}/></Text>
                                        </View>
                                        {this.state.queue ? <FlatList
                                                data={this.state.queue}
                                                renderItem={({ item, index }) => {
                                                        if (index < 5) {
                                                                return < Card id={item.id} name={item.name} delete={() => { }} g1="#56ab2f" g2='#a8e063' close={false} />;
                                                        }
                                                        else {
                                                                if (item.id != this.state.id)
                                                                        return <Card id={item.id} name={item.name} delete={() => { }} g1="#00000050" g2='#00000050' close={false} />;
                                                                else
                                                                        return <Card id={item.id} name={"You are here : " + item.name} delete={() => { }} g1="#eb3349" g2='#f45c43' close={false} />;

                                                        }
                                                }}
                                                extraData={this.state.queue}
                                                keyExtractor={(item, index) => item.id.toString()}
                                        /> : null}
                                </View>
                                {/* <View style={{ flex: 1 }}>
                                        <Text style={style.text}>On Queue:</Text>
                                        {this.state.inQueue.length != 0 ? <FlatList
                                                contentContainerStyle={{ paddingBottom: 10 }}
                                                data={this.state.inQueue}
                                                renderItem={({ item, index }) => {
                                                        if (item.id != this.state.id) {
                                                                return <Card id={item.id} name={item.name} delete={() => { }} g1="#00000050" g2='#00000050' close={false} />;
                                                        } else {
                                                                return <Card id={item.id} name={item.name} delete={() => { }} g1="#eb3349" g2='#f45c43' close={false} />;
                                                        }
                                                }}
                                                extraData={this.state.inQueue}
                                                keyExtractor={(item, index) => item.id.toString()}
                                        /> : null}
                                </View> */}
                        </View>
                )
        }
}

const style = StyleSheet.create({
        container: {

        }, text: {
                fontSize: 20,
                fontFamily: 'Trispace-Regular',
                color: "#ffffff",
                marginTop: 20,
                marginBottom: 20,
                marginLeft: 20
        }
})