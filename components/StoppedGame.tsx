import React from "react";
import {Button, FlatList, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles";
import {Player} from "../classes/Classes";
import {Appbar} from "react-native-paper";
import {PlayerList} from "./PlayerList";
import {heslerton} from "../constants/Colors";

export const StoppedGame: React.FunctionComponent<{ players: Player[], updatePlayer: ((player: Player) => void), buttonPress: (() => void) }> = ({players, updatePlayer, buttonPress}) => {
    const inSquad = players.filter(player => player.inMatch)
    const outSquad = players.filter(player => !player.inMatch)
    const togglePlayer = (player: Player) => {
        player.inMatch = !player.inMatch
        updatePlayer(player)
    }
    return (<View style={styles.innerContainer}>
            <Appbar.Header style={{ backgroundColor: heslerton }}>
                <Appbar.Content title="Matchday squad..." />
            </Appbar.Header>
            <Text style={styles.title}>Playing in Match</Text>
            <PlayerList players={inSquad} itemPress={togglePlayer}/>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                }}
            />
            <Text style={styles.title}>Not Playing</Text>
            <PlayerList players={outSquad} itemPress={togglePlayer}/>
            <Button
                color = {heslerton}
                title="Select Team to start" onPress={() => {
                buttonPress()
            }}>
            </Button>
        </View>
    )
}



