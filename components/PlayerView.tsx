import React from "react";
import {Text} from "react-native";
import styles from "../styles/styles";

const PlayerView: React.FunctionComponent<{ name: string }> = ({ name }) => {
    console.log("playerview: ",name+Date.now())
    return (<Text style={styles.line}>{name}</Text>)
}
export default PlayerView
export const PlayerViewMemo = React.memo(PlayerView)
