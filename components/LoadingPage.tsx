import React from "react";
import {Button, FlatList, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles";

export const LoadingPage: React.FunctionComponent = () => {
    return (<View style={styles.container}>
            <Text style={styles.title}>Loading....</Text>
        </View>
    )
}

