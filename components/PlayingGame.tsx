import React, {Component, useEffect, useRef, useState} from "react";
import { differenceInSeconds } from 'date-fns'
import {
    Text,
    View,
    FlatList,
    TouchableOpacity, Button,
} from "react-native";
import styles from "../styles/styles";
import {MatchStatus, Player} from "../classes/Classes";
import {Appbar} from "react-native-paper";
import {PlayerList} from "./PlayerList";

export const PlayingGame: React.FunctionComponent<{ players: Player[], subPlayer: ((player: Player) => void), buttonPress: (() => void) , elapsedTime: number }> = ({ players , subPlayer, buttonPress, elapsedTime} ) => {
    const playing = players.filter(player => player.playing && player.inMatch)
    const subs = players.filter(player => !player.playing && player.inMatch)
    return (
        <View style={styles.innerContainer}>
            <Appbar.Header >
                <Appbar.Content title="Match" />
            </Appbar.Header>
            <Text style={styles.title}>Time elapsed....{elapsedTime}</Text>
            <Text style={styles.title}>Playing</Text>
            <FlatList data={playing}
                      renderItem={({item}) => (
                          <TouchableOpacity onPress={() => {subPlayer(item)}}>
                              <PlayerPlayingView
                                  selected = {item.selected}
                                  time = {item.timePlayed}
                                  name={item.name}
                              />
                          </TouchableOpacity>
                      )}/>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                }}
            />
            <Text style={styles.title}>Substitutes</Text>
            <FlatList data={subs}
                      renderItem={({item}) => (
                          <TouchableOpacity onPress={() => {subPlayer(item)}}>
                              <PlayerPlayingView
                                  selected = {item.selected}
                                  time = {item.timePlayed}
                                  name={item.name}
                              />
                          </TouchableOpacity>
                      )}/>
            <Button
                title="Stop Game"
                onPress={() => { buttonPress()} }>
            </Button>
        </View>
    )
}

const PlayerPlayingView: React.FunctionComponent<{ name: string, time: number, selected: boolean }> = ({ name, time, selected }) =>
{
    let style = styles.line
    if(selected) {
        style = styles.selectedLine
    }
    return (<Text style={style}>{name+" "+time.toString()}</Text>)
}
