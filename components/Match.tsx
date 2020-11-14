import React, {Component} from "react";
import {Text, View, FlatList, Button, TouchableWithoutFeedback, TouchableOpacity} from "react-native";
import styles from "../styles/styles";
import {Player} from "../classes/Player";
import {openDatabase} from "expo-sqlite";
import {StoppedGame} from "./StoppedGame";
import Dialog from "react-native-dialog";
import {PlayingGame} from "./PlayingGame";

const db = openDatabase('Players.db');

enum MatchStatus { Stopped, Playing, Paused}

export class Match extends React.Component {
    state = {
        status: MatchStatus.Stopped
    };

    render() {
        if(this.state.status == MatchStatus.Stopped) {
            return (
                <View style={styles.container}>
                    <Button
                        title="Start Game"
                        onPress={() => {this.setState({status: MatchStatus.Playing})}}/>
                    <StoppedGame></StoppedGame>
                </View>
            );
        }
        if(this.state.status == MatchStatus.Playing) {
            return (
                <View style={styles.container}>
                    <Button
                        title="Pause Game"
                        onPress={() => {this.setState({status: MatchStatus.Stopped})}}/>
                    <PlayingGame></PlayingGame>
                </View>
            );
        }
    }
}

