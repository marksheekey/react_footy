import React from "react";
import {FlatList, TouchableOpacity} from "react-native";
import {Player} from "../classes/Classes";
import PlayerView, {PlayerViewMemo} from "./PlayerView";

export const PlayerList: React.FunctionComponent<{ players: Player[], itemPress?: ((player: Player) => void) }> = ({players, itemPress}) => {
    console.log("***************************")
    return <FlatList data={players} renderItem={({item}) => (
        <TouchableOpacity onPress={() => {
            if (itemPress !== undefined) {
                itemPress(item)
            }
        }}>
            <PlayerViewMemo
                name={item.name}
            />
        </TouchableOpacity>
    )}/>
}
