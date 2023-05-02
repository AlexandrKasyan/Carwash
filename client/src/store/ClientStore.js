import { makeAutoObservable } from 'mobx';

export default class ClientStore {
    constructor() {
        this._client = {};
        this._clientCars = [];
        this._selectedCar = [];
        makeAutoObservable(this);
    }

    setClient(client) {
        this._client = client;
    }

    setClientCars(clientCars){
        this._clientCars = clientCars;
    }

    setSelectedCar(selectedCar){
        this._selectedCar = selectedCar;
    }

    get client() {
        return this._client;
    }
    get clientCars(){
        return this._clientCars;
    }

    get selectedCar(){
        return this._selectedCar;
    }
}