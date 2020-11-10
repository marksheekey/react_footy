import React, {Component} from "react";
import {Text, View, FlatList} from "react-native";
import { FloatingAction } from "react-native-floating-action";
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
        ]
    };

    render() {
        return (
            <View style = {styles.container}>
                <FloatingAction onPressMain= { () => {
                    <DialogInput
                                 title={"DialogInput 1"}
                                 message={"Message for DialogInput #1"}
                                 hintInput ={"HINT INPUT"}
                                 submitInput={ (inputText) => {this.sendInput(inputText)} }
                                 closeDialog={ () => {this.showDialog(false)}}>
                    </DialogInput>
                }}/>
                <FlatList data={this.state.players} renderItem={({ item }) => (
                    <Player
                        name={item.name}
                    />
                )}
                />
            </View>
        );
    }


}

export default SquadList

class Player extends Component<{ name: string }> {
    render() {
        return (
            <View style={{ alignItems: "flex-start" }}>
                <Text>{this.props.name}</Text>
            </View>
        );
    }
}

function addPlayer(){

}
