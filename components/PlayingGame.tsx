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

export const PlayingGame: React.FunctionComponent<{ players: Player[], subPlayer: ((player: Player) => void), buttonPress: (() => void) , elapsedTime: number }> = ({ players , subPlayer, buttonPress, elapsedTime} ) => {
    const playing = players.sort((a,b) => a.timePlayed - b.timePlayed)
    const subs = players.sort((a,b) => b.timePlayed - a.timePlayed)
    return (<View style={styles.innerContainer}>
            <Text style={styles.title}>Playing a match....</Text>
            <Text style={styles.title}>Time elapsed....{elapsedTime}</Text>
            <Text style={styles.title}>Playing</Text>
            <FlatList data={playing.filter(player => player.playing && player.inMatch)}
                      renderItem={({item}) => (
                          <TouchableOpacity onPress={() => {subPlayer(item)}}>
                              <PlayerPlayingView
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
            <FlatList data={subs.filter(player => !player.playing && player.inMatch)}
                      renderItem={({item}) => (
                          <TouchableOpacity onPress={() => {subPlayer(item)}}>
                              <PlayerPlayingView
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

const PlayerPlayingView: React.FunctionComponent<{ name: string, time: number }> = ({ name, time }) => (<Text style={styles.line}>{name+" "+time.toString()}</Text>)
