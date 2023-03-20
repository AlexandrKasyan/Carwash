import React from 'react';
import classes from './Myinput.module.css';

const MyInputs = (props) => {
    return (
        <input className={classes.myInput} {...props} type="text" />
    );
};

export default MyInputs;