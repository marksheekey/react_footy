import React, {Component} from "react";
import {Text, View, FlatList, Button, TouchableWithoutFeedback, TouchableOpacity} from "react-native";
import styles from "../styles/styles";
import {Player} from "../classes/Player";
import {openDatabase} from "expo-sqlite";

const db = openDatabase('Players.db');

export class StoppedGame extends React.Component {
    state = {
        players: [] as Player[],
    };
    componentDidMount() {
       this.getPlayersFromDb()
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Playing in match</Text>
                <FlatList data={this.state.players.filter(player => player.inMatch)} renderItem={({item}) => (
                    <TouchableOpacity onPress={ () => this.updatePlayer(item.key, false)}>
                        <PlayerView
                            name={item.name}
                            id={item.key}
                        />
                    </TouchableOpacity>
                )}/>
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                    }}
                />
                <Text style={styles.title}>Not playing</Text>
                <FlatList data={this.state.players.filter(player => !player.inMatch)} renderItem={({item}) => (
                    <TouchableOpacity onPress={ () => this.updatePlayer(item.key, true)}>
                    <PlayerView
                        name={item.name}
                        id={item.key}
                    />
                    </TouchableOpacity>
                )}/>
                <Button
                    title="Refresh"
                    onPress={() => {
                        this.getPlayersFromDb()
                    }}/>
            </View>

        );
    }
    getPlayersFromDb() {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM squad',
                [],
                (tx, results) => {
                    var squad = [] as Player[]
                    console.log("results:", results.rows)
                    for (let i = 0; i < results.rows.length; ++i) {
                        var player = new Player(results.rows.item(i).name)
                        player.key = results.rows.item(i).id
                        if(results.rows.item(i).in_match == 0){
                            player.inMatch = false
                        }else{
                            player.inMatch = true
                        }
                        squad.push(player)
                    }
                    this.setState({players: squad})
                }
            );
        });
    }

    updatePlayer(id: String, inMatch: boolean) {
        var newValue = 0
        if(inMatch){
            newValue = 1
        }
        console.log(id, newValue)
        db.transaction((tx) => {
            tx.executeSql(
                'UPDATE squad SET in_match = ? WHERE id = ?',
                [newValue, id],
                (tx, results) => {
                    this.getPlayersFromDb()
                }
            );
        });
    }
}

class PlayerView extends Component<{ name: string, id: String}> {
    render() {
        return (
            <Text style={styles.line}>{this.props.name}</Text>
        )
    }
}



