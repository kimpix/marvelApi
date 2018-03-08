import React, { Component } from 'react';
import Button from './Button';
import gif from './giphy.gif';
import humanWin from './you-win.gif';
import computerWin from './you-lose.gif';

class FightButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            className: 'fight-button random'
        }
     }

    render() {
        let button = [];
        let playerOneWin = this.props.isPlayerOneTheWinner;
        let isFighting = this.props.isFighting;

        if (this.props.isPlayerTwoPending) {
            if (!this.props.isPlayerOnePending) {
                button.push(
                  <Button
                    onClick={ () => this.props.randomAdversary(this.setState({className:'fight-button'}))}
                    class={this.props.classDatas}
                    button="Random adversary"
                  />
                )
            }
        } else {
            if (!isFighting) {                
                button.push(
                  <Button
                    class={this.props.classDatas}
                    onClick={ ()=>this.props.fight(this.setState({className:'fight-button again'}))}
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
                            onClick={ ()=>this.props.playAgain() }
                            class={this.props.classDatas}
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
                            class={ this.props.classDatas }
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