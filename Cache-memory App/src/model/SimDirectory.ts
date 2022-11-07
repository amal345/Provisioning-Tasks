
enum simstate {
    Stock = 0,
    Active = 1,
    Deactive = 2,
}

export class SimDirectoory {

    state: simstate;
    phnnumber: string;
    owner: string;

    constructor(state: simstate, phnnumber: string, owner: string) {
        this.phnnumber = phnnumber;
        this.state = state;
        this.owner = owner

    }
    static fromJson(json: any) {
        if (!Object.values(simstate).includes(json.state as simstate)) {
            throw new TypeError("state must be of Stock, Active or Deactive");
        }
        const sim: SimDirectoory = new SimDirectoory(json.state, json.phnnumber, json.owner);
        return sim;


    }


}
