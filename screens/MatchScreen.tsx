import {Button, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {Match} from "../components/Match";
import {openDatabase} from "expo-sqlite";
import {Player} from "../classes/Player";
import styles from "../styles/styles";
import Dialog from "react-native-dialog";
import {Component} from "react";
import {MatchStatus} from "../App";
import SquadList from "../components/SquadList";
import {StoppedGame} from "../components/StoppedGame";

const db = openDatabase('Players.db');

export default class MatchScreen extends React.Component {
    state = {
        players: [] as Player[],
        status: MatchStatus
    };

    componentDidMount () {
        createTable()
        this.getPlayersFromDb()
    }
    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <StoppedGame  players={this.state.players}>
                </StoppedGame>
            </SafeAreaView>
        );
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
                    this.setState({players: squad})
                }
            );
        });
    }
}

export function createTable() {
    db.transaction(function (tx) {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS squad (id VARCHAR(20) PRIMARY KEY, name VARCHAR(20), in_match int, playing int, time_played int)',
            []
        )
    });
}
