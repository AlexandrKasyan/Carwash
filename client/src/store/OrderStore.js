import { makeAutoObservable } from 'mobx';

export default class OrderStore {
    constructor() {
        this._orders = [];
        this._statuses = [];
        this._status = {};
        this._newOrder = {};
        this._services = []
        makeAutoObservable(this);
    }

    setOrders(orders) {
        this._orders = orders;
    }

    setServices(services) {
        this._services = services;
    }
    
    setStatus(status) {
        this._status = status;
    }

    setStatuses(statuses){
        this._statuses = statuses;
    }

    setNewOrder(newOrder) {
        this._newOrder = newOrder;
    }

    get orders() {
        return this._orders;
    }

    get newOrder() {
        return this._newOrder;
    }

    get statuses(){
        return this._statuses
    }

    get status(){
        return this._status
    }

    get services(){
        return this._services
    }

}