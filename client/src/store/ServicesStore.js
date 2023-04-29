import {makeAutoObservable} from "mobx";

export default class ServicesStore {
    constructor() {
        this._clientId = 0
        this._selectedServices = []
        makeAutoObservable(this)
    }

    setClientId(clientId){
        this._clientId = clientId
    }

    setSelectedServices(selectedServices) {
        this._selectedServices = selectedServices
    }
  
    get selectedServices() {
        return this._selectedServices
    }
   
}
