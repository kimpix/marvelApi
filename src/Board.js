import React, { Component } from 'react';
import Header from './Header';
import FightingZoneComponent from './FightingZone';
import FightButton from './FightingButton';
import CharactersComponent from './Characters';
import PlayerOneCharacter from './PlayerOne';
import PlayerTwoCharacter from './PlayerTwo';
import fetch from 'node-fetch';
import CountUp from 'react-countup';


class Board extends Component {
    constructor(props) {
        super(props);
        const loadCharacter = this.loadCharacter.bind(this);
        this.randomAdversary = this.randomAdversary.bind(this);
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
            fromChild: '',
            className: 'fight-button'
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
                classDatas : "fight-button again",
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
                classDatas : "fight-button again again--winner",
                fighting: true,
                randomHero: Math.floor(Math.random() * Math.floor(max)),
                randomAdversary: Math.floor(Math.random() * Math.floor(max)),
                reset: false
            });
        }
    }

    calculateWinner(hero, computer) {
        if (hero > computer && this.state.heroWin === 0) {
            this.setState({
                heroWin: true,
                computerWin: false,
                score: this.state.score + 1
            });
        }

        if (hero < computer && this.state.heroWin === 0) {
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
