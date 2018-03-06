import React, { Component } from 'react';
import logo from './marvel.svg';

const Header = (props) => {
    return (
      <header>
          <div className="Header-container">
              <img src={logo} className="App-logo"/>
          </div>
          <p className="score">{props.score}</p>
      </header>
    )
}

Header.defaultProps = {
    score: 'your score : 0  |  computer score: 0'
};


export default Header;