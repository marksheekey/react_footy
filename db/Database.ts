import {openDatabase} from "expo-sqlite";
import {Player} from "../classes/Classes";

const db = openDatabase('Players.db');

export class Database {
    getPlayers = (callback: (players: Player[]) => void) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM squad',
                [],
                (tx, results) => {
                    var squad = [] as Player[]
                    for (let i = 0; i < results.rows.length; ++i) {
                        const item = results.rows.item(i)
                        var player = new Player(item.name)
                        player.key = item.id
                        player.inMatch = item.in_match > 0
                        player.playing = item.playing > 0
                        player.timePlayed = item.time_played
                        squad.push(player)
                    }
                    callback(squad)
                }
            );
        });
    }

    resetSquad = (callback: (players: Player[]) => void) => {
        db.transaction((tx) => {
            tx.executeSql(
                'UPDATE squad set  time_played = ?, playing = ?',
                [0, false],
                (tx, results) => {
                    this.getPlayers(callback)
                }
            );
        });
    }

    updatePlayer = (player: Player, callback: (players: Player[]) => void) => {
        console.log("update player "+player.toString())
        var playing = 0
        var inMatch = 0
        if (player.playing) playing = 1
        if (player.inMatch) inMatch = 1
        db.transaction((tx) => {
            tx.executeSql(
                'UPDATE squad set in_match = ?, playing = ?, time_played = ? WHERE id = ?',
                [inMatch, playing, player.timePlayed, player.key],
                (tx, results) => {
                    this.getPlayers(callback)
                }
            );
        });
    }

    updatePlayers =  (players: Player[], callback?: (players: Player[]) => void) => {
        players.forEach(player => {
            if(players.length == 2) {
                console.log("update players " + player.name + " " + player.playing)
            }
            var playing = 0
            var inMatch = 0
            if (player.playing) playing = 1
            if (player.inMatch) inMatch = 1
            db.transaction((tx) => {
                tx.executeSql(
                    'UPDATE squad set in_match = ?, playing = ?, time_played = ? WHERE id = ?',
                    [inMatch, playing, player.timePlayed, player.key]
                );
            });
        })
        if(callback !== undefined){
            this.getPlayers(callback)
        }
    }


    createTable = (callback: (players: Player[]) => void) => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS squad (id VARCHAR(20) PRIMARY KEY, name VARCHAR(20), in_match int, playing int, time_played int)',
                [],
                (tx, results) => {
                    this.getPlayers(callback)
                }
            );
        });
    }

    addPlayer= (player: Player,callback: (players: Player[]) => void) => {
        db.transaction(tx => {
            tx.executeSql('INSERT INTO squad (id, name, in_match, playing, time_played) VALUES(?,?,0,0,0)', [player.key, player.name]),
                [], this.getPlayers(callback)
        });
    }
}
