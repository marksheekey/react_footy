import * as React from 'react';
import SquadList from '../components/SquadList'

import {SafeAreaView,} from 'react-native';
import {Database} from "../db/Database";
import {useState} from "react";
import {MatchStatus, Player} from "../classes/Classes";
import {useFocusEffect} from "@react-navigation/native";
const db = new Database()

const SquadScreen = () => {
    const [loading, setLoading] = useState(true)
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

    return (
        <SafeAreaView style={{flex: 1}}>
            <SquadList players={players} addPlayer={addPlayer}/>
        </SafeAreaView>
    );
};
export default SquadScreen;
