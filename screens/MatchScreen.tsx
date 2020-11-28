import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {StoppedGame} from "../components/StoppedGame";
import {PlayingGame} from "../components/PlayingGame";
import {PreMatch} from "../components/PreMatch";
import {MatchStatus, Player} from "../classes/Classes";
import {useFocusEffect} from '@react-navigation/native';
import {Database} from "../db/Database";
import {LoadingPage} from "../components/LoadingPage";
import {AppState} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const db = new Database()
const timer = require('react-native-timer');

const MatchScreen = () => {
    const [status, setStatus] = useState(MatchStatus.Loading)
    const [players, setPlayers] = useState([] as Player[])
    const [playerOff, setPlayerOff] = useState("")
    const [playerOn, setPlayerOn] = useState("")
    const [clockRunning, setClockRunning] = useState(false)
    const [elapsedTime, setElapsedTime] = useState(0)
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    useEffect(() => {
        AppState.addEventListener("change", _handleAppStateChange)
        return () => {
            AppState.removeEventListener("change", _handleAppStateChange)
        };
    }, []);

    // @ts-ignore
    const _handleAppStateChange = (nextAppState) => {
        appState.current
        appState.current = nextAppState;
        setAppStateVisible(appState.current)
        if(appState.current.match(/inactive|background/)){
            saveMatch()
        }else{
            fetchMatch()
        }
    };
    let elapsed = 0

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
        timer.clearInterval("match")
        setStatus(MatchStatus.Stopped)
        setPlayers(players)
    }

    useFocusEffect(
        React.useCallback(() => {
            db.createTable(initialise)
        }, [])
    );

    const setSelected = (id: string, selected: boolean) =>{
        let index = players.findIndex(item => item.key === id)
        players[index].selected = selected
        setPlayers(players)
    }

    const subPlayer = (player: Player) => {
        let playerOnState = playerOn
        let playerOffState = playerOff
        if(playerOnState.length > 0){
            setSelected(playerOnState,false)
        }
        if(playerOffState.length > 0){
            setSelected(playerOffState,false)
        }
        if (player.key == playerOnState || player.key == playerOffState) {
            setPlayerOff("")
            setPlayerOn("")
            return
        }

        setSelected(player.key,true)

        if (player.playing) {
            playerOffState = player.key
            setPlayerOff(player.key)
        }

        if (!player.playing) {
            playerOnState = player.key
            setPlayerOn(player.key)
        }

        if (playerOnState.length > 0 && playerOffState.length > 0) {
            let playerComingOff = players.find(list => list.key === playerOffState)
            if (playerComingOff !== undefined) {
                playerComingOff.playing = false
                playerComingOff.selected = false
                let playerComingOn = players.find(list => list.key === playerOnState)
                if (playerComingOn != undefined) {
                    playerComingOn.playing = true
                    playerComingOn.selected = false
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
        setStatus(MatchStatus.PreMatch)
        setClockRunning(true)
    }

    const startMatch = () => {
        setStatus(MatchStatus.Playing)
        setClockRunning(true)
        timer.setInterval("match", doTiming, 1000)
    }

    const stopGame = () => {
        timer.clearInterval("match")
        setStatus(MatchStatus.Stopped)
        setClockRunning(false)
        db.resetSquad(setPlayers)
    }

    const saveMatch = async () => {
        await storeData().then( () => {
                timer.clearInterval("match")
                setStatus(MatchStatus.Stopped)
                setClockRunning(false)
            }
        )
    }

    const storeData = async () => {
        try {
            const storeStatus = MatchStatus[status]
            await AsyncStorage.setItem('@match_status', storeStatus)
            await AsyncStorage.setItem('@backgrounded_time', Date.now().toString())
            await AsyncStorage.setItem('@elapsed_time', elapsedTime.toString())
            if(status === MatchStatus.Playing){
                db.updatePlayers(players)
            }
        } catch (e) {
            // saving error
        }
    }

    const fetchMatch = async () => {
        try {
            const storedStatus = await AsyncStorage.getItem('@match_status')
            const storedTime = await AsyncStorage.getItem('@backgrounded_time')
            const storedElapsed = await AsyncStorage.getItem('@elapsed_time')
            if(status !== null) {
                const newStatus = MatchStatus[storedStatus as unknown as keyof typeof MatchStatus]
                setStatus(newStatus)
                if(newStatus == MatchStatus.Playing && storedTime !== null && storedElapsed !== null){
                    const difference = (Date.now() - parseInt(storedTime)) / 1000
                    elapsed = parseInt(storedElapsed) + difference
                    timer.setInterval("match", doTiming, 1000)
                }
            }
            if(storedTime !== null) {
                console.log("time:"+storedTime)
            }
            if(storedElapsed !== null) {
                console.log("elapsed:"+storedElapsed)
                setElapsedTime(parseInt(storedElapsed))
            }
        } catch(e) {
            setStatus(MatchStatus.Stopped)
        }
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

export default MatchScreen
