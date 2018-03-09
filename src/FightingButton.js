import React, { Component } from 'react';
import Button from './Button';
import gif from './giphy.gif';
import humanWin from './you-win.gif';
import computerWin from './you-lose.gif';

class FightButton extends Component {
     constructor(props) {
        super(props);
     }

    render() {
        let button = [];
        let playerOneWin = this.props.isPlayerOneTheWinner;
        let isFighting = this.props.isFighting;

        if (this.props.isPlayerTwoPending) {
            if (!this.props.isPlayerOnePending) {
                button.push(
                  <Button
                    onClick={ () => { this.props.randomAdversary()}}
                    class='fight-button random'
                    button="Random adversary"
                  />
                )
            }
        } else {
            if (!isFighting) {   
                button.push(
                  <Button
                    class='fight-button'
                    onClick={ ()=>this.props.fight() }
                    button="Fight !"
                  />
                );
            } else if (isFighting) {
                button.push(
                  <img src={gif} className="App-gif"/>
                );

                if (playerOneWin && playerOneWin !== 0) {
                    button = [];
                    button.push(
                      <div className="winner-container">
                          <p id="winner-paragraph">YOU WIN !</p>
                          <img src={humanWin} className="App-gif App-gif--small"/>
                          <Button
                            onClick={ ()=>this.props.playAgain()}
                            class='fight-button again again--winner'
                            button="Play again !"
                          />
                      </div>)
                }

                if (!playerOneWin && playerOneWin !== 0) {
                    button = [];
                    button.push(
                      <div className="winner-container">
                          <p id="winner-paragraph">YOU LOSE !</p>
                          <img src={computerWin} className="App-gif App-gif--small"/>
                          <Button
                            onClick={()=>this.props.playAgain()}
                            class='fight-button again'
                            button="Play again !"
                          />
                      </div>)
                }
            }
        }

        return (<div>{button}</div>)
    }
}

export default FightButton;