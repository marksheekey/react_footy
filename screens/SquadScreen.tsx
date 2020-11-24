import * as React from 'react';
import SquadList from '../components/SquadList'
import {Database} from "../db/Database";
import {useState} from "react";
import {useFocusEffect} from "@react-navigation/native";
import {Player} from "../classes/Classes";
const db = new Database()

const SquadScreen = () => {
    const [players, setPlayers] = useState([] as Player[])

    useFocusEffect(
        React.useCallback(() => {
            db.createTable(setPlayers)
        }, [])
    );

    const addPlayer = (name: string) => {
        if (name.length > 0) {
            db.addPlayer(new Player(name),setPlayers)
        }
    }

    return (<SquadList players={players} addPlayer={addPlayer}/>)
};
export default SquadScreen;
