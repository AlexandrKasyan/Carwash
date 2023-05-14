import { makeAutoObservable } from 'mobx';

export default class EmployeeStore {
    constructor() {
        this._employee = {};
        makeAutoObservable(this);
    }

    setEmployee(employee) {
        this._employee = employee;
    }

    get employee() {
        return this._employee;
    }

}