import React, {Component} from "react";
import {Text, View, FlatList, Button} from "react-native";
import styles from "../styles/styles";
import Dialog from 'react-native-dialog';

class SquadList extends React.Component {

    state = {
        players: [
            {
                key: "1",
                inMatch: false,
                playing: false,
                name: "George",
                timePlayed: 0
            },
            {
                key: "2",
                inMatch: false,
                playing: false,
                name: "Mark",
                timePlayed: 0
            }
        ],
        visible: false,
        newPlayer: ""
    };

    render() {
        return (
            <View style = {styles.container}>
                <View>
                    <Dialog.Container visible={this.state.visible}>
                        <Dialog.Title>Add Player</Dialog.Title>
                        <Dialog.Button label="Add" onPress={() => {
                            this.setState( {visible : false})
                            console.log(this.state.newPlayer)
                        }} />
                        <Dialog.Button label="Cancel" onPress={ () => this.setState( {visible : false})  } />
                        <Dialog.Input onChangeText={ value => this.setState( {newPlayer : value})  } />
                        <Dialog.Description>
                            Add a player to the squad
                        </Dialog.Description>

                    </Dialog.Container>
                </View>
                <FlatList data={this.state.players} renderItem={({ item }) => (
                    <Player
                        name={item.name}
                    />
                )}/>
                <Button
                    title="Add Player"
                    onPress={() => {
                        this.setState( {visible : true}) }}/>

            </View>
        );
    }

    addPlayer = () => {
        this.setState( {visible : false})
        console.log(this.state.newPlayer)
    }
}

export default SquadList


class AddPlayer extends Component{
    state = {
        visible: true
    }

    render() {
        console.log("addPlayer")
        return (
            <View>
                <Dialog.Container visible={true}>
                    <Dialog.Title>Account delete</Dialog.Title>
                    <Dialog.Description>
                        Add a player to the squad
                    </Dialog.Description>

                </Dialog.Container>
            </View>
        );
    }
}

class PlayerType{
    constructor(key, inMatch, pla)
    key: "1",
    inMatch: false,
    playing: false,
    name: "George",
    timePlayed: 0
}


class Player extends Component<{ name: string }> {
    render() {
        return (
            <View style={{ alignItems: "flex-start" }}>
                <Text>{this.props.name}</Text>
            </View>
        );
    }
}
