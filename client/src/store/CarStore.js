import { makeAutoObservable } from 'mobx';

export default class CarStore {
    constructor() {
        this._brands = [
            {id: 1,  name: 'Мерс'},
            {id: 2,  name: 'BMW'},
        ]

        this._bodies = [
            {id: 1,  name: 'Универсал'},
            {id: 2,  name: 'Седан'},
        ]
        makeAutoObservable(this);
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    setUser(user) {
        this._user = user;
    }

    get isAuth(){
        return this._isAuth;
    }
    get user (){
        return this._isAuth;
    }
}