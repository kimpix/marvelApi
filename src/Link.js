import React, { Component } from 'react';

const Link = (props) => {
    return (
      <a onClick={props.onClick} href={props.link}>{props.textLink}</a>
    )
};

export default Link;