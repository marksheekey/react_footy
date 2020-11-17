import React, {Component} from "react";
import {Text, View, FlatList, Button} from "react-native";
import styles from "../styles/styles";
import Dialog from 'react-native-dialog';
import {Player} from "../classes/Classes";
import {openDatabase} from "expo-sqlite";
const db = openDatabase('Players.db');

class SquadList extends React.Component {
    state = {
        players: [] as Player[],
        visible: false,
        newPlayer: ""
    };

    componentDidMount () {
       createTable()
        this.getPlayersFromDb()
    }

    addPlayer = (name: string) => {
        if (this.state.newPlayer.length > 0) {
            var player = new Player(name)
            this.addPlayerToDb(player)
        }
        this.dismiss()
    }
    dismiss() {
        this.setState({visible: false})
        this.state.newPlayer = ""
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Squad list</Text>
                <View>
                    <Dialog.Container visible={this.state.visible}>
                        <Dialog.Title>Add Player</Dialog.Title>
                        <Dialog.Button label="Add" onPress={() => {
                            this.addPlayer(this.state.newPlayer)
                        }}/>
                        <Dialog.Button label="Cancel" onPress={() => this.dismiss()}/>
                        <Dialog.Input onChangeText={value => this.setState({newPlayer: value})}/>
                        <Dialog.Description>
                            Add a player to the squad
                        </Dialog.Description>
                    </Dialog.Container>
                </View>
                <FlatList data={this.state.players} renderItem={({item}) => (
                    <PlayerView
                        name={item.name}
                    />
                )}/>
                <Button
                    title="Add Player"
                    onPress={() => {
                        this.setState({visible: true})
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
                       squad.push(player)
                   }
                   this.setState({players: squad})
               }
           );
       });
   }

    addPlayerToDb(player: Player) {
        console.log("player",player)
        db.transaction(tx =>
        {
            tx.executeSql('INSERT INTO squad (id, name, in_match, playing, time_played) VALUES(?,?,0,0,0)', [player.key, player.name]),
                null, this.getPlayersFromDb()
    });
}

}

export default SquadList

class PlayerView extends Component<{ name: string }> {
    render() {
        return (
            <Text style={styles.line}>{this.props.name}</Text>
        );
    }
}

export function createTable() {
    db.transaction(function (tx) {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS squad (id VARCHAR(20) PRIMARY KEY, name VARCHAR(20), in_match int, playing int, time_played int)',
            []
        )
    });
}
