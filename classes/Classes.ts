
export class Player {
    name: string;
    key: string;
    inMatch: boolean = false;
    playing: boolean = false;
    timePlayed: number = 0;
    selected : boolean = false;
    constructor(name: string) {
        this.key = Date.now().toString()
        this.name = name;
    }
}

export enum MatchStatus { Loading, Stopped, PreMatch, Playing, Paused}


