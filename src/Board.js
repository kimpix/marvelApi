import React, { Component } from 'react';
import Header from './Header';
import Button from './Button';
import CharactersComponent from './Characters';
import fetch from 'node-fetch';
import CountUp from 'react-countup';
import gif from './giphy.gif';
import humanWin from './you-win.gif';
import computerWin from './you-lose.gif';


class FightingZoneComponent extends Component {
    render() {
        return (
          <section className="right-column">
              { this.props.children }
          </section>
        );
    }
}

class FightButton extends Component {
    render() {
        let button = [];
        let playerOneWin = this.props.isPlayerOneTheWinner;
        let isFighting = this.props.isFighting;

        if (this.props.isPlayerTwoPending) {
            if (!this.props.isPlayerOnePending) {
                button.push(
                  <Button
                    onClick={ this.props.randomAdversary }
                    class="fight-button random"
                    button="Random adversary"
                  />
                )
            }
        } else {
            if (!isFighting) {
                button.push(
                  <Button
                    class="fight-button"
                    onClick={ this.props.fight }
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
                            onClick={ this.props.playAgain }
                            class="fight-button again again--winner"
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
                            onClick={this.props.playAgain}
                            class="fight-button again"
                            button="Play again !"
                          />
                      </div>)
                }
            }
        }

        return (<div>{button}</div>)
    }
}

class PlayerOneCharacter extends Component {
    render() {
        const hero = [];

        if (this.props.isPending) {
            hero.push(
              <p className="instruction">
                  Click on a hero on the left column to choose it !
              </p>)
        } else {
            hero.push(
              <div className="fighter-one-container">
                  { this.props.score }
                  <div className="fighter-one">
                      <div className={ this.props.class }>
                          <img src={ this.props.image }/>
                      </div>
                      <h4>{ this.props.name }</h4>
                      <p className="description">{ this.props.description }</p>
                  </div>
              </div>
            );
        }

        return (<div>{hero}</div>)
    }
}


class PlayerTwoCharacter extends Component {
    render() {
        const adversary = [];

        if (!this.props.isPending) {
            adversary.push(
              <div className="adversary-container">
                  { this.props.score }
                  <div className="adversary">
                      <div className={ this.props.class }>
                          <img src={this.props.image}/>
                      </div>
                      <h4>{ this.props.name }</h4>
                      <p className="description">
                          { this.props.description }
                      </p>
                  </div>
              </div>);
        }


        return (<div>{adversary}</div>)
    }
}


class Board extends Component {
    constructor(props) {
        super(props);
        const loadCharacter = this.loadCharacter.bind(this);
        this.state = {
            characterPending: true,
            adversaryPending: true,
            clicked: '',
            clickedAdversary: '',
            num: 0,
            fighting: false,
            randomHero: 0,
            randomAdversary: 0,
            heroWin: 0,
            computerWin: null,
            reset: false,
            score: 0,
            computerScore: 0,
            fromChild: ''
        }
    }

    loadCharacter(name) {
        return () => {
            this.setState({
                characterPending: true,
                clicked: 'flip-it',
                reset: true,
                fighting: false,
                randomHero: 0,
                randomAdversary: 0,
                heroWin: 0
            }, () => {
                setTimeout(() => this.setState({ clicked: '' }), 3500)
            });

            fetch(`http://gateway.marvel.com/v1/public/characters?name=${name}&apikey=c1ac14a35052a29503518fe883970ac7`)
              .then(response => {
                  if (!response.ok) {
                      throw Error("Network request failed")
                  }
                  return response;
              })
              .then(d => d.json())
              .then(d => {
                  this.setState({
                      characterData: d,
                      characterPending: false,
                      adversaryPending: true,
                      reset: true,
                      fighting: false,
                      randomHero: 0,
                      randomAdversary: 0,
                      heroWin: 0
                  })
              }, () => {
                  this.setState({
                      requestFailed: true
                  })
              })
        }
    }


    randomAdversary() {
        let randomString = (length, possible) => {
            let text = "";
            for (let i = 0; i < length; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        };

        let string = randomString(1, 'abcdefghijklmnopqrstuvwxyz3');

        return () => {
            this.setState({
                adversaryPending: true,
                clickedAdversary: 'flip-it',
                randomHero: 0,
                randomAdversary: 0,
                heroWin: 0,
                fighting: false
            }, () => {
                setTimeout(() => this.setState({ clickedAdversary: '' }), 3000)
            });

            fetch(`http://gateway.marvel.com/v1/public/characters?nameStartsWith=${string}&apikey=c1ac14a35052a29503518fe883970ac7`)
              .then(response => {
                  if (!response.ok) {
                      throw Error("Network request failed")
                  }
                  return response;
              })
              .then(d => d.json())
              .then(d => {
                  this.setState({
                      adversaryData: d,
                      adversaryPending: false,
                      randomHero: 0,
                      randomAdversary: 0,
                      heroWin: 0
                  })
              }, () => {
                  this.setState({
                      requestFailed: true
                  })
              })
        }

    }

    playAgain() {
        return () => {
            this.setState({
                characterPending: false,
                adversaryPending: true,
                reset: true,
                fighting: false,
                randomHero: 0,
                randomAdversary: 0,
                heroWin: 0
            });
        }
    }


    getRandomInt(max) {
        return () => {
            this.setState({
                num: Math.floor(Math.random() * Math.floor(max))
            });
        }
    }

    fight(max) {
        return () => {
            this.setState({
                fighting: true,
                randomHero: Math.floor(Math.random() * Math.floor(max)),
                randomAdversary: Math.floor(Math.random() * Math.floor(max)),
                reset: false
            });
        }
    }

    calculateWinner(hero, computer) {
        if (hero > computer && this.state.heroWin === 0) {
            console.log('toto');
            this.setState({
                heroWin: true,
                computerWin: false,
                score: this.state.score + 1
            });
        }

        if (hero < computer && this.state.heroWin === 0) {
            console.log('toto');
            this.setState({
                heroWin: false,
                computerWin: true,
                computerScore: this.state.computerScore + 1
            });
        }
    }

    render() {

        let name = '';
        let nameAdversary = '';
        let image = '';
        let imageAdversary = '';
        let description = '';
        let descriptionAdversary = '';
        let adversariesCount = '';

        const oneCharacter = this.state.characterData;
        const adversaryCharacter = this.state.adversaryData;

        const sectionClass = `image-container ${ this.state.clicked }`;
        const sectionAdversaryClass = `image-container ${ this.state.clickedAdversary }`;


        if (oneCharacter) {
            name = oneCharacter.data.results[0].name;
            image = `${oneCharacter.data.results[0].thumbnail.path }.${oneCharacter.data.results[0].thumbnail.extension}`;
            description = oneCharacter.data.results[0].description;
        }


        if (adversaryCharacter) {
            adversariesCount = adversaryCharacter.data.results.length;
            this.getRandomInt(adversariesCount);
            nameAdversary = adversaryCharacter.data.results[this.state.num].name
            imageAdversary = `${adversaryCharacter.data.results[this.state.num].thumbnail.path }.${adversaryCharacter.data.results[this.state.num].thumbnail.extension}`;
            descriptionAdversary = adversaryCharacter.data.results[this.state.num].description;
        }

        const heroScore = [];
        const adversaryScore = [];
        let HeroWin = [];
        let score = `your score : ${ this.state.score }    |    computer score: ${ this.state.computerScore }`;


        if (this.state.fighting) {
            const that = this;
            const scoreH = this.state.randomHero;
            const scoreC = this.state.randomAdversary;
            heroScore.push(<CountUp className="hero-score" start={0} end={scoreH} duration={3}/>);
            adversaryScore.push(<CountUp className="adversary-score" start={0} end={scoreC} duration={3}/>);
            if (this.state.heroWin === 0) {
                window.setTimeout(() => {
                    that.calculateWinner(scoreH, scoreC);
                }, 3000);
            }
        }


        if (this.state.reset) {
            HeroWin = [];
            HeroWin.push();
        }


        const loadCharacter = this.loadCharacter;

        return (
          <div>
              <Header score={ score }/>
              <div className="board">
                  <CharactersComponent loadCharacter={loadCharacter.bind(this)}/>
                  <FightingZoneComponent>
                      <PlayerOneCharacter
                        name={name}
                        description={description}
                        image={image}
                        class={sectionClass}
                        isPending={this.state.characterPending}
                        score={heroScore}
                      />
                      <FightButton
                        isPlayerTwoPending={this.state.adversaryPending}
                        isPlayerOnePending={this.state.characterPending}
                        isPlayerOneTheWinner={this.state.heroWin}
                        isFighting={this.state.fighting}
                        randomAdversary={this.randomAdversary()}
                        fight={this.fight(100)}
                        playAgain={this.playAgain()}
                      />
                      <PlayerTwoCharacter
                        name={nameAdversary}
                        description={descriptionAdversary}
                        image={imageAdversary}
                        class={sectionAdversaryClass}
                        isPending={this.state.adversaryPending}
                        score={adversaryScore}
                      />
                  </FightingZoneComponent>
              </div>
          </div>
        );
    }
}




export default Board;
