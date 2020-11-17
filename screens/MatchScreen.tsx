import {Button, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {MatchProps, MatchStatus, Player} from "../classes/Classes";
import {Component} from "react";
import {StoppedGame} from "../components/StoppedGame";
import {PlayingGame} from "../components/PlayingGame";
import styles from "../styles/styles";
import {openDatabase} from "expo-sqlite";
import {createTable} from "../components/SquadList";

const db = openDatabase('Players.db');

export default class MatchScreen extends Component {
    state = {
        loading : true,
        status: MatchStatus.Stopped,
        players: [] as Player[]
    }

    componentDidMount () {
        createTable()
        this.getPlayersFromDb()
    }

    render() {
        if(this.state.loading){
            return (
                <View style={styles.container}>
                    <Text >Loading</Text>
                </View>
            )
        }
        if(this.state.status == MatchStatus.Stopped){
            return (
                <View style={styles.container}>
                    <Button
                        title="Start Game"
                        onPress={() => {}}/>
                <PlayingGame
                    players={this.state.players}/>
                </View>
            )
        }
        if(this.state.status == MatchStatus.Playing) {
            return (
                <View style={styles.container}>
                    <Button
                        title="Pause Game"
                        onPress={() => {
                        }}/>
                    <StoppedGame
                        players={this.state.players}/>
                </View>
            )
        }

    }

    getPlayersFromDb() {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM squad',
                [],
                (tx, results) => {
                    var squad = [] as Player[]
                    console.log("results:", results.rows)
                    for (let i = 0; i < results.rows.length; ++i) {
                        var player = new Player(results.rows.item(i).name)
                        player.key = results.rows.item(i).id
                        squad.push(player)
                    }
                    this.setState({
                        status: MatchStatus.Stopped,
                        loading: false,
                        players: squad})
                }
            );
        });
    }

    createTable() {
        db.transaction(function (tx) {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS squad (id VARCHAR(20) PRIMARY KEY, name VARCHAR(20), in_match int, playing int, time_played int)',
                []
            )
        });
    }
}
