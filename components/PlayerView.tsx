import React from "react";
import {Text} from "react-native";
import styles from "../styles/styles";


export const PlayerView: React.FunctionComponent<{ name: string }> = ({ name }) => (<Text style={styles.line}>{name}</Text>)
