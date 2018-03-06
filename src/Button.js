import React, { Component } from 'react';

const Button = (props) => {
    return (
      <button onClick={props.onClick} className={props.class}>{props.button}</button>
    )
};

export default Button;