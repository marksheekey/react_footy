import React, {Component} from "react";
import {Text, View, FlatList, Button, TouchableWithoutFeedback, TouchableOpacity} from "react-native";
import styles from "../styles/styles";
import {Player} from "../classes/Player";
import {openDatabase} from "expo-sqlite";
import {StoppedGame} from "./StoppedGame";
import Dialog from "react-native-dialog";
import {PlayingGame} from "./PlayingGame";
import {MatchStatus} from "../App";

export const Match: React.FunctionComponent<{ players: Player[], status: MatchStatus }> = ({ players, status }) => (
                <View style={styles.container}>
                   <MatchButton  status={status}>
                   </MatchButton>
                    <PlayingGame players={players}>
                    </PlayingGame>
                </View>
)

type MatchProps = {
    status: MatchStatus,
    players: Player[]
}
class MatchScreen extends Component<MatchProps> {
    render() {
        if(this.props.status == MatchStatus.Stopped){
            return (
                <StoppedGame
                     players={this.props.players}/>
            )
        }
        if(this.props.status == MatchStatus.Playing){
            return (
                <PlayingGame
                    players={this.props.players}/>
            )
        }
    }
}

class MatchButton extends Component<{ status: MatchStatus }> {
    render() {
        let {status} = this.props;
        if(status == MatchStatus.Stopped){
            return (
                <Button
                    title="Start Game"
                    onPress={() => {}}/>
            )
        }
        if(status == MatchStatus.Playing){
            return (
                <Button
                    title="Pause Game"
                    onPress={() => {}}/>
            )
        }
    }
}
