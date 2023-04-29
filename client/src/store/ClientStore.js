import { makeAutoObservable } from 'mobx';

export default class ClientStore {
    constructor() {
        this._client = {};
        this._clientCars = [];
        makeAutoObservable(this);
    }

    setClient(client) {
        this._client = client;
    }

    setClientCars(clientCars){
        this._clientCars = clientCars;
    }

    get client() {
        return this._client;
    }
    get clientCars(){
        return this._clientCars;
    }
}