import * as React from "react";
import {useState} from "react";
import {StoppedGame} from "../components/StoppedGame";
import {PlayingGame} from "../components/PlayingGame";
import {PreMatch} from "../components/PreMatch";
import {MatchStatus, Player} from "../classes/Classes";
import {useFocusEffect} from '@react-navigation/native';
import {Database} from "../db/Database";
import {LoadingPage} from "../components/LoadingPage";

const db = new Database()
const timer = require('react-native-timer');

const MatchScreen = () => {
    const [loading, setLoading] = useState(true)
    const [status, setStatus] = useState(MatchStatus.Stopped)
    const [players, setPlayers] = useState([] as Player[])
    const [playerOff, setPlayerOff] = useState("")
    const [playerOn, setPlayerOn] = useState("")
    const [clockRunning, setClockRunning] = useState(false)
    const [elapsedTime, setElapsedTime] = useState(0)
    var elapsed = 0

   const doTiming = () => {
        if (clockRunning) {
            elapsed ++
            setElapsedTime(elapsed)
            for (let i = 0; i < players.length; i++) {
                if(players[i].playing) {
                    players[i].timePlayed = players[i].timePlayed + 1
                }
            }
            setPlayers(players)
        }
    }

    const initialise = (players: Player[]) => {
        elapsed = 0
        setElapsedTime(0)
        setLoading(false)
        timer.clearInterval("match")
        setStatus(MatchStatus.Stopped)
        setPlayers(players)
    }

    useFocusEffect(
        React.useCallback(() => {
            db.createTable(initialise)
        }, [])
    );

    const subPlayer = (player: Player) => {
        var playerOnState = playerOn
        var playerOffState = playerOff
        if (player.key == playerOnState || player.key == playerOffState) {
            setPlayerOff("")
            setPlayerOn("")
            return
        }

        if (player.playing) {
            playerOffState = player.key
            setPlayerOff(player.key)
        }

        if (!player.playing) {
            playerOnState = player.key
            setPlayerOn(player.key)
        }

        if (playerOnState.length > 0 && playerOffState.length > 0) {
            var playerComingOff = players.find(list => list.key === playerOffState)
            if (playerComingOff !== undefined) {
                playerComingOff.playing = false
                var playerComingOn = players.find(list => list.key === playerOnState)
                if (playerComingOn != undefined) {
                    playerComingOn.playing = true
                    setPlayerOn("")
                    setPlayerOff("")
                    db.updatePlayers([playerComingOn, playerComingOff], setPlayers)
                }
            }
        }
    }

    const updatePlayer = (player: Player) => {
        db.updatePlayer(player,setPlayers)
    }

    const selectTeam = () => {
        console.log("select team")
        setStatus(MatchStatus.PreMatch)
        setClockRunning(true)
    }

    const startMatch = () => {
        console.log("press start match")
        setStatus(MatchStatus.Playing)
        setClockRunning(true)
        timer.setInterval("match", doTiming, 1000)
    }

    const stopGame = () => {
        console.log("press stop game")
        timer.clearInterval("match")
        setStatus(MatchStatus.Stopped)
        setClockRunning(false)
        db.resetSquad(setPlayers)
    }
    if (loading) {
        return (<LoadingPage />)
    }
    if (status == MatchStatus.Playing) {
        return (<PlayingGame players={players} subPlayer={subPlayer} buttonPress={stopGame} elapsedTime={elapsedTime}/>)
    }
    if (status == MatchStatus.PreMatch) {
        return (<PreMatch players={players} updatePlayer={updatePlayer} buttonPress={startMatch}/>)
    }
    if (status == MatchStatus.Stopped) {
        return (<StoppedGame players={players} updatePlayer={updatePlayer} buttonPress={selectTeam}/>)
    }

    return (<LoadingPage />)
}

export default MatchScreen;
