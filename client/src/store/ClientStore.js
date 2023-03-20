import { makeAutoObservable } from 'mobx';

export default class ClientStore {
    constructor() {
        this._client = {};
        makeAutoObservable(this);
    }

    setUser(client) {
        this._client = client;
    }

    get user (){
        return this._client;
    }
}