import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ClientStore from './store/ClientStore';
import DiscountStore from './store/DiscountStore';
import EmployeeStore from './store/EmpoyeeStore';
import OrderStore from './store/OrderStore';
import ServicesStore from './store/ServicesStore';
import UserStore from './store/UserStore';
import './style.css'

export const Context = createContext(null)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        user: new UserStore(),
        selectedServices: new ServicesStore(),
        client: new ClientStore(),
        order: new OrderStore(),
        employee: new EmployeeStore(),
        discount: new DiscountStore()
        
    }}>
        <App />
    </Context.Provider>
);


