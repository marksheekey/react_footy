import React, {Component} from "react";
import {Text, View, FlatList, Button, TouchableWithoutFeedback, TouchableOpacity} from "react-native";
import styles from "../styles/styles";
import {Player} from "../classes/Classes";
import {PlayerView} from "./PlayerView";

export const PreMatch: React.FunctionComponent<{ players: Player[], updatePlayer: ((player: Player) => void) }> = ({ players , updatePlayer} ) => {
    return (<View style={styles.container}>
            <Text style={styles.title}>Playing</Text>
            <FlatList data={players.filter(player => player.playing && player.inMatch)}
                      renderItem={({item}) => (
                          <TouchableOpacity onPress={() => {
                              var newDetails = item
                              item.playing = false
                              updatePlayer(newDetails)
                          }
                          }>
                              <PlayerView
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
            <FlatList data={players.filter(player => !player.playing && player.inMatch)}
                      renderItem={({item}) => (
                          <TouchableOpacity onPress={() => {
                              var newDetails = item
                              item.playing = true
                              updatePlayer(newDetails)}
                          }>
                              <PlayerView
                                  name={item.name}
                              />
                          </TouchableOpacity>
                      )}/>
        </View>
    )
}
