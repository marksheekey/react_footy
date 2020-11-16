import React, {Component} from "react";
import {Text, View, FlatList, Button, TouchableWithoutFeedback, TouchableOpacity} from "react-native";
import styles from "../styles/styles";
import {Player} from "../classes/Player";
import {PlayerView} from "./PlayerView";

export const PlayingGame: React.FunctionComponent<{ players: Player[] }> = ({ players }) => (
            <View style={styles.container}>
                <Text style={styles.title}>Playing</Text>
                <FlatList data={players.filter(player => player.inMatch && player.playing)}
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
                <Text style={styles.title}>Substitutes</Text>
                <FlatList data={players.filter(player => player.inMatch && !player.playing)}
                          renderItem={({item}) => (
                             // <TouchableOpacity onPress={() => this.updatePlayer(item.key, true)}>
                                  <PlayerView
                                      name={item.name}
                                  />
                             // </TouchableOpacity>
                          )}/>
            </View>
)




