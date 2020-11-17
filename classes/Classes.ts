
export class Player {
    name: string;
    key: string;
    inMatch: boolean = false;
    playing: boolean = false;
    timePlayed: number = 0;
    constructor(name: string) {
        this.key = Date.now().toString()
        this.name = name;
    }
}

export enum MatchStatus { Stopped, Playing, Paused}
export class MatchProps  {
    status: MatchStatus;
    players: Player[];
    constructor(status: MatchStatus, players: Player[]) {
        this.status = status
        this.players = players;
    }
}

