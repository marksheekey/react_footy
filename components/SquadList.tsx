import React, {useState} from "react"
import {Text, View, Button} from "react-native"
import styles from "../styles/styles"
import Dialog from 'react-native-dialog'
import {Player} from "../classes/Classes"
import {openDatabase} from "expo-sqlite"
import {PlayerList} from "./PlayerList"
import {Appbar} from "react-native-paper"
import {heslerton} from "../constants/Colors"
const db = openDatabase('Players.db')

export const SquadList: React.FunctionComponent<{ players: Player[], addPlayer: ((name:string) => void) }> = ({ players , addPlayer} ) => {
    const [dialogVisible, setDialogVisible] = useState(false)
    const [playerName, setPlayerName] = useState("")
        return (
            <View style={styles.innerContainer}>
                <Appbar.Header style={{ backgroundColor: heslerton }}>
                    <Appbar.Content title="Squad..." />
                </Appbar.Header>
                <Text style={styles.title}>Squad list</Text>
                <View>
                    <Dialog.Container visible={dialogVisible}>
                        <Dialog.Title>Add Player</Dialog.Title>
                        <Dialog.Button label="Add" onPress={() => {
                            setDialogVisible(false)
                            addPlayer(playerName)
                            setPlayerName("")
                        }}/>
                        <Dialog.Button label="Cancel" onPress={() => setDialogVisible(false)}/>
                        <Dialog.Input onChangeText={value => setPlayerName(value)} underlineColorAndroid={'black'}/>
                        <Dialog.Description>
                            Add a player to the squad
                        </Dialog.Description>
                    </Dialog.Container>
                </View>
                <PlayerList players={players} />
                <Button
                    color = {heslerton}
                    title="Add Player"
                    onPress={() => {
                        setDialogVisible(true)
                    }}/>
            </View>
        );

}

export default SquadList
