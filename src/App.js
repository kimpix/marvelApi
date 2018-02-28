import React, { Component } from 'react';
import logo from './marvel.svg';
import fetch from 'node-fetch';
import CountUp from 'react-countup';

class Modal extends React.Component {
    render() {
        if (this.props.isOpen === false)
            return null

        let modalStyle = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '9999',
            background: '#fff',
            padding: '25px'
        }

        if (this.props.width && this.props.height) {
            modalStyle.width = this.props.width + 'px'
            modalStyle.height = this.props.height + 'px'
            modalStyle.marginLeft = '-' + (this.props.width / 2) + 'px',
              modalStyle.marginTop = '-' + (this.props.height / 2) + 'px',
              modalStyle.transform = null
        }

        if (this.props.style) {
            for (let key in this.props.style) {
                modalStyle[key] = this.props.style[key]
            }
        }

        let backdropStyle = {
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: '0px',
            left: '0px',
            zIndex: '9998',
            background: 'rgba(0, 0, 0, 0.3)'
        }

        if (this.props.backdropStyle) {
            for (let key in this.props.backdropStyle) {
                backdropStyle[key] = this.props.backdropStyle[key]
            }
        }

        return (
          <div className={this.props.containerClassName}>
              <div className={this.props.className} style={modalStyle}>
                  {this.props.children}
              </div>
              {!this.props.noBackdrop &&
              <div className={this.props.backdropClassName} style={backdropStyle}
                   onClick={e => this.close(e)}/>}
          </div>
        )
    }

    close(e) {
        e.preventDefault()

        if (this.props.onClose) {
            this.props.onClose()
        }
    }
}


const Header = (props) => {
    return (
      <header>
          <div className="Header-container">
              <img src={logo} className="App-logo"/>
          </div>
          <p className="score">{props.score}</p>

      </header>
    );
}

const Link = (props) => {
    return (
      <a onClick={props.onClick} href={props.link}>{props.textLink}</a>
    )
}

const Paragraph = (props) => {
    return (
      <p>{props.content}</p>
    )
}

class Footer extends Component {
    render() {
        return (<footer></footer>)
    }
}

class CharacterList extends Component {
    render() {
        return (
                <section className="left-column">
                    <h3>{this.props.title}
                        <Button onClick={this.props.buttonNext} class="title-buttons" button="Next >>"/>
                        <Button onClick={this.props.buttonPrev} class="title-buttons" button="<< Prev"/>
                    </h3>
                    <ul>
                        {this.props.children}
                    </ul>
                </section>
                )
    }
}

const Button = (props) => {
    return (
      <button onClick={props.onClick} className={props.class}>{props.button}</button>
    )
};

class CharactersComponent extends Component {
   constructor(props) {
        super(props);
        this.state = {
            requestFailed: false,
            offset: 0,
            pending: true,
            data: ''
        }
    }

    componentDidMount() {
         this.fetchInitial();
    }


    fetchInitial() {
        let urlInitial = 'http://gateway.marvel.com/v1/public/characters?limit=26&apikey=c1ac14a35052a29503518fe883970ac7';
         fetch(urlInitial)
            .then(response => {
                if (!response.ok) {
                    throw Error("Network request failed")
                }
                return response;
            })
            .then(d => d.json())
            .then(d => {
                this.setState({
                    data: d,
                    pending: false
                })
            }, () => {
                this.setState({
                    requestFailed: true
                })
            })
        }

    goTo(direction) {
      let parameter = (direction === 'prev') ? (this.state.offset < 26 ? this.state.offset : this.state.offset - 26 ): this.state.offset + 26;
      let urlGoTO = `http://gateway.marvel.com/v1/public/characters?limit=26&offset=${parameter}}&apikey=c1ac14a35052a29503518fe883970ac7`;

      return () => {
            this.setState({
                offset: parameter,
                pending: true,
                fighting: false,
                heroWin: 0,
                computerWin: 0,
                characterPending: true,
                adversaryPending: true,
                reset: true,
                randomHero: 0,
                randomAdversary: 0,
            });

            fetch(urlGoTO)
              .then(response => {
                  if (!response.ok) {
                      throw Error("Network request failed")
                  }
                  return response;
              })
              .then(d => d.json())
              .then(d => {
                  this.setState({
                      data: d,
                      pending: false,
                      fighting: false,
                      computerWin: null,
                      characterPending: true,
                      adversaryPending: true,
                      reset: true,
                      heroWin: 0,
                      randomHero: 0,
                      randomAdversary: 0
                  })
              }, () => {
                  this.setState({
                      requestFailed: true
                  })
              })
        }
    }

    render() {


        if (this.state.requestFailed) {
          <CharacterList title="Liste des personnages" buttonPrev={this.goTo('prev')} buttonNext={this.goTo('next')}>
              <p> Failed !</p>;
          </CharacterList>
        }
        if (this.state.pending) {
            return (
              <CharacterList title="Liste des personnages" buttonPrev={this.goTo('prev')} buttonNext={this.goTo('next')}>
                  <div className="loading"><p>..loading...</p>
                      <div className="lds-interwind">
                      <div>  </div>
                      <div>  </div>
                  </div>
              </div>
              </CharacterList>
          );
        }

        const comicCharacters = this.state.data;

        const mapOfCharacters = [];
      
        let button = [];
        comicCharacters.data.results.map((item, i) => {
            mapOfCharacters.push(
              <li className="list-item" key={i}>
                  <a href="#" className="links"><span
                    className="male-character">M</span><span
                    className="character-name">{item.name}</span></a></li>
            );
            return true;
        });

        return (
          <CharacterList title="Liste des personnages" buttonPrev={this.goTo('prev')} buttonNext={this.goTo('next')}>
                   { mapOfCharacters }
          </CharacterList>
        );
    }
}

class Board extends Component {
    constructor(props) {
        super(props);
        this.handleData = this.handleData.bind(this);
        this.loadCharacter = this.loadCharacter.bind(this);
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

     handleData(data) {
        this.setState({
           fromChild: data
        });
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
     
        let num = '';
        let image = '';
        let adversaryImage = '';
        let adversariesCount = '';

        const oneCharacter = this.state.characterData;

        const adversaryCharacter = this.state.adversaryData;
        if (adversaryCharacter) {
            adversariesCount = adversaryCharacter.data.results.length;
            this.getRandomInt(adversariesCount);

            adversaryImage = `${adversaryCharacter.data.results[this.state.num].thumbnail.path }.${adversaryCharacter.data.results[this.state.num].thumbnail.extension}`;
        }

        const hero = [];
        const heroScore = [];
        const adversaryScore = [];
        const adversary = [];
        let HeroWin = [];
        let button = [];
        let score = `your score : ${ this.state.score }    |    computer score: ${ this.state.computerScore }`;
      

        if (oneCharacter) {
            image = `${oneCharacter.data.results[0].thumbnail.path }.${oneCharacter.data.results[0].thumbnail.extension}`;
        }

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

            if (this.state.heroWin && this.state.heroWin !== 0) {
                HeroWin.push(<p className="win-message">You Win !</p>)
                button.push(<Button onClick={this.playAgain()} className="fight-button again" button="Play again !"/>)
            }

            if (!this.state.heroWin && this.state.heroWin !== 0) {
                HeroWin.push(<p className="win-message">You Lose !</p>)
                button.push(<Button onClick={this.playAgain()} className="fight-button again" button="Play again !"/>)
            }
        }


        if (this.state.reset) {
            HeroWin = [];
            HeroWin.push();
        }

        const sectionClass = `image-container ${ this.state.clicked }`
        const sectionAdversaryClass = `image-container ${ this.state.clickedAdversary }`

        if (this.state.adversaryPending) {
            if (!this.state.characterPending) {
                button.push(
                  <div>
                      <Button onClick={this.randomAdversary()} class="fight-button random" button="Random adversary"/>
                  </div>)
            }
        } else {
            if (!this.state.fighting) {
                button.push(
                  <Button class="fight-button" onClick={this.fight(100)} button="Fight !"/>
                );
            } else if (this.state.fighting) {
                button.push(
                );
            }

            adversary.push(
              <div className="adversary-container">
                  { adversaryScore }
                  <div className="adversary">
                      <div className={ sectionAdversaryClass }>
                          <img src={adversaryImage}/>
                      </div>
                      <h4>{ adversaryCharacter.data.results[this.state.num].name }</h4>
                      <p className="description"> { adversaryCharacter.data.results[this.state.num].description }</p>
                  </div>
              </div>
            );
        }

        if (this.state.characterPending) {
            hero.push(
              <p className="instruction">
                  Click on a hero on the left column to choose it !
              </p>)
        } else {
            hero.push(
              <div className="fighter-one-container">
                  { heroScore }
                  <div className="fighter-one">
                      <div className={ sectionClass }>
                          <img src={image}/>
                      </div>
                      <h4>{ oneCharacter.data.results[0].name }</h4>
                      <p className="description">  { oneCharacter.data.results[0].description }</p>
                      { HeroWin }
                  </div>
              </div>
            );
        }

        return (
          <div>
              <Header score={ score }/>
              <div className="board">
                  <CharactersComponent/>
                  <section className="right-column">
                      { hero }
                      <div className="button-container">
                      { button }
                      </div>
                      { adversary }
                  </section>
              </div>
          </div>
        );
    }
}

class App extends Component {
    constructor(props) {
        super(props)
        this.state = { isModalOpen: false }
    }

    openModal() {
        this.setState({ isModalOpen: true })
    }

    closeModal() {
        this.setState({ isModalOpen: false })
    }

    render() {
        return (
          <div>
              <Board/>
              <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()} width="450" height="80">
                  <p>This app is entirely made with React.js and the official API of Marvel. From the bottom of my
                      heart, Kim.</p>
                  <p>
                      <button className="modal-close__button" onClick={() => this.closeModal()}>Close</button>
                  </p>
              </Modal>
              <Footer>
                  <Paragraph content="made with &#10084; by kimpix"/>
                  <Link onClick={() => this.openModal()} link="#" textLink="about this project"/>
              </Footer>
          </div>
        );
    }
}

export default App;

