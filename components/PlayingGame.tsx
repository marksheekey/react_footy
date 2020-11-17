import React, {Component, useEffect, useRef, useState} from "react";
import { differenceInSeconds } from 'date-fns'
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
} from "react-native";
import styles from "../styles/styles";
import {Player} from "../classes/Classes";

export const PlayingGame: React.FunctionComponent<{ players: Player[], subPlayer: ((player: Player) => void) }> = ({ players , subPlayer} ) => {
    const playing = players.sort((b,a) => a.timePlayed - b.timePlayed)
    const subs = players.sort((a,b) => a.timePlayed - b.timePlayed)
    return (<View style={styles.container}>
            <Text style={styles.title}>Playing</Text>
            <FlatList data={playing.filter(player => player.playing && player.inMatch)}
                      renderItem={({item}) => (
                          <TouchableOpacity onPress={() => {
                              subPlayer(item)
                          }
                          }>
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
                          <TouchableOpacity onPress={() => {
                              subPlayer(item)
                          }
                          }>
                              <PlayerPlayingView
                                  time = {item.timePlayed}
                                  name={item.name}
                              />
                          </TouchableOpacity>
                      )}/>
        </View>
    )
}

const PlayerPlayingView: React.FunctionComponent<{ name: string, time: number }> = ({ name, time }) => (<Text style={styles.line}>{name+" "+time.toString()}</Text>)
