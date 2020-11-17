import {Button, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {Component} from "react";
import {StoppedGame} from "../components/StoppedGame";
import {PlayingGame} from "../components/PlayingGame";
import styles from "../styles/styles";
import {openDatabase} from "expo-sqlite";
import {createTable} from "../components/SquadList";
import {PreMatch} from "../components/PreMatch";
import {MatchStatus, Player} from "../classes/Classes";

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

     updatePlayer = (player: Player) => {
        var playing = 0
        var inMatch = 0
        if(player.playing) playing = 1
        if(player.inMatch) inMatch = 1
        db.transaction((tx) => {
            tx.executeSql(
                'UPDATE squad set in_match = ?, playing = ?, time_played = ? WHERE id = ?',
                [inMatch, playing, player.timePlayed, player.key],
                (tx, results) => {
                    this.getPlayersFromDb()
                }
            );
        });
    }

    render() {
        if(this.state.loading){
            return (
                <View style={styles.container}>
                    <Text >Loading</Text>
                </View>
            )
        }
        if(this.state.status == MatchStatus.Playing){
            return (
                <View style={styles.container}>
                    <Button
                        title="Pause Game"
                        onPress={() => {this.setState({status : MatchStatus.Stopped})}}
                        />
                <PlayingGame
                    players={this.state.players}/>
                </View>
            )
        }
        if(this.state.status == MatchStatus.PreMatch){
            return (
                <View style={styles.container}>
                    <Button
                        title="Start Match"
                        onPress={() => {this.setState({status : MatchStatus.Playing})}}
                    />
                    <PreMatch
                        players={this.state.players}/>
                </View>
            )
        }
        if(this.state.status == MatchStatus.Stopped) {
            return (
                <View style={styles.container}>
                    <Button
                        title="Match day squad picked"
                        onPress={() => {this.setState({status : MatchStatus.PreMatch})}}
                    />
                    <StoppedGame
                        players={this.state.players} updatePlayer={this.updatePlayer}/>
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
                        const item = results.rows.item(i)
                        var player = new Player(item.name)
                        player.key = item.id
                        player.inMatch = item.in_match > 0
                        player.playing = item.playing > 0
                        player.timePlayed = item.time_played
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
