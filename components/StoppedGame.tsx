import React from "react";
import {Button, FlatList, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles";
import {Player} from "../classes/Classes";
import {PlayerView} from "./PlayerView";

export const StoppedGame: React.FunctionComponent<{ players: Player[], updatePlayer: ((player: Player) => void), buttonPress: (() => void) }> = ({players, updatePlayer, buttonPress}) => {
    return (<View style={styles.innerContainer}>
            <Text style={styles.title}>Select match day squad....</Text>
            <Text style={styles.title}>Playing in Match</Text>
            <FlatList data={players.filter(player => player.inMatch)}
                      renderItem={({item}) => (
                          <TouchableOpacity onPress={() => {
                              var newDetails = item
                              item.inMatch = false
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
            <Text style={styles.title}>Not Playing</Text>
            <FlatList data={players.filter(player => !player.inMatch)}
                      renderItem={({item}) => (
                          <TouchableOpacity onPress={() => {
                              var newDetails = item
                              item.inMatch = true
                              updatePlayer(newDetails)
                          }
                          }>
                              <PlayerView
                                  name={item.name}
                              />
                          </TouchableOpacity>
                      )}/>

            <Button title="Select Team to start" onPress={() => {
                buttonPress()
            }}>
            </Button>
        </View>
    )
}



