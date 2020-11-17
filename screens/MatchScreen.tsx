import {Button, Text, View} from "react-native";
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
const timer = require('react-native-timer');

export default class MatchScreen extends Component {
    state = {
        loading: true,
        status: MatchStatus.Stopped,
        players: [] as Player[],
        playerOff: "",
        playerOn: "",
        clockRunning: false,
        elapsedTime: 0
    }

    doTiming = () => {
        console.log("timer")
        if (this.state.clockRunning) {
            const updatedTime = this.state.elapsedTime + 1
            this.setState({
                elapsedTime: updatedTime
            })
            this.state.players.filter(player => player.playing && player.inMatch).forEach((item) => {
                var upd = item
                item.timePlayed = item.timePlayed + 1
                this.updatePlayer(item)
            })
        }
    }

    componentDidMount() {
        createTable()
    }

    subPlayer = (player: Player) => {
        var playerOnState = this.state.playerOn
        var playerOffState = this.state.playerOff
        if (player.key == playerOnState || player.key == playerOffState) {
            this.setState({
                playerOff: "",
                playerOn: ""
            })
            console.log("return")
            return
        }

        if (player.playing) {
            playerOffState = player.key
            this.setState({
                playerOff: player.key
            })
        }

        if (!player.playing) {
            playerOnState = player.key
            this.setState({
                playerOn: player.key
            })
        }

        if (playerOnState.length > 0 && playerOffState.length > 0) {
            var playerOff = this.state.players.find(list => list.key === playerOffState)
            if (playerOff !== undefined) {
                playerOff.playing = false
                var playerOn = this.state.players.find(list => list.key === playerOnState)
                if (playerOn != undefined) {
                    playerOn.playing = true
                    this.updatePlayer(playerOff)
                    this.updatePlayer(playerOn)
                    this.setState({
                        playerOff: "",
                        playerOn: ""
                    })
                }
            }
        }
    }

    updatePlayer = (player: Player) => {
        var playing = 0
        var inMatch = 0
        if (player.playing) playing = 1
        if (player.inMatch) inMatch = 1
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
        if (this.state.loading) {
            this.getPlayersFromDb()
            timer.clearTimeout(this)
            return (
                <View style={styles.container}>
                    <Text>Loading</Text>
                </View>
            )
        }
        if (this.state.status == MatchStatus.Playing) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>Playing a match....</Text>
                    <Text style={styles.title}>Time elapsed....{this.state.elapsedTime}</Text>
                    <PlayingGame
                        players={this.state.players} subPlayer={this.subPlayer}/>
                    <Button
                        title="Pause Game"
                        onPress={() => {
                            timer.clearInterval(this)
                            this.setState({status: MatchStatus.Stopped, clockRunning: false})
                        }}
                    />
                </View>
            )
        }
        if (this.state.status == MatchStatus.PreMatch) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>Select team to start....</Text>
                    <PreMatch
                        players={this.state.players} updatePlayer={this.updatePlayer}/>
                    <Button
                        title="Start Match"
                        onPress={() => {
                            timer.setInterval(this, "match", this.doTiming, 1000)
                            this.setState({status: MatchStatus.Playing, clockRunning: true})
                        }}
                    />
                </View>
            )
        }
        if (this.state.status == MatchStatus.Stopped) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>Select match day squad....</Text>
                    <StoppedGame
                        players={this.state.players} updatePlayer={this.updatePlayer}/>
                    <Button
                        title="Select Team to start"
                        onPress={() => {
                            this.setState({status: MatchStatus.PreMatch, loading: true})
                        }}
                    />
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
                    const init = this.state.loading
                    var squad = [] as Player[]
                    for (let i = 0; i < results.rows.length; ++i) {
                        const item = results.rows.item(i)
                        var player = new Player(item.name)
                        player.key = item.id
                        player.inMatch = item.in_match > 0
                        player.playing = item.playing > 0
                        if (init) {
                            player.timePlayed = 0
                        } else {
                            player.timePlayed = item.time_played
                        }
                        squad.push(player)
                    }
                    if (init) {
                        this.setState({
                            elapsedTime: 0,
                            loading: false,
                            players: squad
                        })
                    } else {
                        this.setState({
                            players: squad
                        })
                    }
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
