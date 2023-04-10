import React from "react";
import { NavAdmin } from "./components/NavAdmin";

const Admin = () => {
    return (
        <div className="admin-panel" >
            <NavAdmin ></NavAdmin>
            <div className="admin-content"></div>
        </div>

    );
};

export default Admin;