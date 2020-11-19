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
    leftLine:{
        flex: 5,
        color: heslerton,
        fontSize: 15
    },
    rightLine:{
        textAlign: 'right',
        flex: 1,
        color: heslerton,
        fontSize: 15
    },
    leftTitle:{
        fontWeight: 'bold',
        flex: 5,
        fontSize: 20
    },
    rightTitle:{
        fontWeight: 'bold',
        textAlign: 'right',
        flex: 1,
        fontSize: 20
    },
    leftLineHighlight:{
        flex: 5,
        color: white,
        fontSize: 15
    },
    rightLineHighlight:{
        textAlign: 'right',
        flex: 1,
        color: white,
        fontSize: 15
    },
    titleLine: {
        flexDirection:"row",
        alignSelf:"stretch",
        marginLeft: 10,
        marginRight: 10,
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
