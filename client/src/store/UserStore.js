import { makeAutoObservable } from 'mobx';

export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._user = {};
        this._carWash= {};
        makeAutoObservable(this);
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    setUser(user) {
        this._user = user;
    }

    setCarWash(carWash) {
        this._carWash = carWash;
    }

    get isAuth(){
        return this._isAuth;
    }

    get user (){
        return this._user;
    }

    get carWash (){
        return this._carWash;
    }
}