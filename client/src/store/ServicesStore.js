import { makeAutoObservable } from "mobx";

export default class ServicesStore {
    constructor() {
        this._clientId = 0
        this._selectedServices = []
        this._generalPrice = 0
        makeAutoObservable(this)
    }

    setClientId(clientId) {
        this._clientId = clientId;
    }

    setGeneralPrice(price) {
        this._generalPrice = price;
    }

    setSelectedServices(selectedServices) {
        this._selectedServices = selectedServices;
    }

    get selectedServices() {
        return this._selectedServices;
    }

    get clientId() {
        return this._clientId;
    }

    get generalPrice() {
        return this._generalPrice;
    }

}
