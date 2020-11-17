import React, {Component} from "react";
import {Text, View, FlatList, Button, TouchableWithoutFeedback, TouchableOpacity} from "react-native";
import styles from "../styles/styles";
import {Player} from "../classes/Classes";
import {PlayerView} from "./PlayerView";

export const StoppedGame: React.FunctionComponent<{ players: Player[] }> = ({ players }) => (
    <View style={styles.container}>
        <Text style={styles.title}>Playing in Match</Text>
        <FlatList data={players.filter(player => player.inMatch)}
                  renderItem={({item}) => (
                      <PlayerView
                          name={item.name}
                      />
                  )}/>
        <View
            style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
            }}
        />
        <Text style={styles.title}>Not Playing</Text>
        <FlatList data={players.filter(player => !player.inMatch)}
                  renderItem={({item}) => (
                      // <TouchableOpacity onPress={() => this.updatePlayer(item.key, true)}>
                      <PlayerView
                          name={item.name}
                      />
                      // </TouchableOpacity>
                  )}/>
    </View>
)



