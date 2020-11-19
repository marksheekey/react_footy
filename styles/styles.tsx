import React, {Component} from "react";
import { StyleSheet } from 'react-native';
import {heslerton, white} from "../constants/Colors";


export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        padding: 20
    },
    title: {
        marginLeft: 10,
        marginBottom:10,
        fontWeight: 'bold',
        fontSize: 20
    },
    line: {
        color: heslerton,
        flexDirection:"row",
        alignSelf:"stretch",
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: white,
        marginBottom:2,
        padding:10,
        fontSize: 15
    },
    selectedLine: {
        color: white,
        flexDirection:"row",
        alignSelf:"stretch",
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: heslerton,
        marginBottom:2,
        padding:10,
        fontSize: 15
    },
    innerContainer:{
        flex: 1,
        flexDirection: "column"
    }
})
