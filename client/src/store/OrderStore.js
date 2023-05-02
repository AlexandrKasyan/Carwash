import { makeAutoObservable } from 'mobx';

export default class OrderStore {
    constructor() {
        this._orders = [];
        this._statuses = [];
        this._newOrder = {};
        makeAutoObservable(this);
    }

    setOrders(orders) {
        this._orders = orders;
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

}