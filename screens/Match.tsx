import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import SquadList from "../components/SquadList";
import {StoppedGame} from "../components/StoppedGame";
import {Match} from "../components/Match";

const MatchScreen = () => {

    return (
        <SafeAreaView style={{flex: 1}}>
            <Match/>
        </SafeAreaView>
    );
};
export default MatchScreen;
