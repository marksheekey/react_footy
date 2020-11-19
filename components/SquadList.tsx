import React, {Component, useState} from "react";
import {Text, View, FlatList, Button} from "react-native";
import styles from "../styles/styles";
import Dialog from 'react-native-dialog';
import {Player} from "../classes/Classes";
import {openDatabase} from "expo-sqlite";
import {PlayerView} from "./PlayerView";
const db = openDatabase('Players.db');

export const SquadList: React.FunctionComponent<{ players: Player[], addPlayer: ((name:string) => void) }> = ({ players , addPlayer} ) => {
    const [dialogVisible, setDialogVisible] = useState(false)
    const [playerName, setPlayerName] = useState("")
        return (
            <View style={styles.container}>
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
                        <Dialog.Input onChangeText={value => setPlayerName(value)}/>
                        <Dialog.Description>
                            Add a player to the squad
                        </Dialog.Description>
                    </Dialog.Container>
                </View>
                <FlatList data={players} renderItem={({item}) => (
                    <PlayerView
                        name={item.name}
                    />
                )}/>
                <Button
                    title="Add Player"
                    onPress={() => {
                        setDialogVisible(true)
                    }}/>
            </View>
        );

}

export default SquadList
