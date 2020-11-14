
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
