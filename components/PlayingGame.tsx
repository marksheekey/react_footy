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
            <Text style={styles.title}>Time elapsed....{secondsToHms(elapsedTime)}</Text>
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
    return (
        <View style = {style}>
                <Text style={{flex:5}}>{name}</Text>
                <Text style={{textAlign: 'right', flex:1}}>{secondsToHms(time)}</Text>

        </View>
    )
}

function secondsToHms(seconds: number) {
    var h = Math.floor(seconds / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 3600 % 60);
    let minutes = "00"
    if(m>0 && m<10){
        minutes = "0"+m
    }
    if(m>10){
        minutes = ""+m
    }
    let secs = s+""
    if(s<10){
        secs = "0"+s
    }
    return minutes+":"+secs
}
