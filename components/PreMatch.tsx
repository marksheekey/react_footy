import {Text, View, Button} from "react-native";
import styles from "../styles/styles";
import {Player} from "../classes/Classes";
import {Appbar} from "react-native-paper";
import {PlayerList} from "./PlayerList";
import React from "react";
import {heslerton} from "../constants/Colors";

export const PreMatch: React.FunctionComponent<{ players: Player[], updatePlayer: ((player: Player) => void), buttonPress: (() => void)  }> = ({ players , updatePlayer, buttonPress} ) => {
    const playing = players.filter(player => player.playing && player.inMatch)
    const notPlaying = players.filter(player => !player.playing && player.inMatch)
    const togglePlaying = (player: Player) =>{
        player.playing = !player.playing
        updatePlayer(player)
    }

    return (<View style={styles.innerContainer}>
            <Appbar.Header style={{ backgroundColor: heslerton }}>
                <Appbar.Content title="Starting team..." />
            </Appbar.Header>
            <Text style={styles.title}>Playing</Text>
        <PlayerList players={playing} itemPress={togglePlaying}/>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                }}
            />
            <Text style={styles.title}>Substitutes</Text>
            <PlayerList players={notPlaying} itemPress={togglePlaying} />
            <Button
                color = {heslerton}
                title="Start Match"
                onPress={() => { buttonPress()} }>
            </Button>
        </View>
    )
}
