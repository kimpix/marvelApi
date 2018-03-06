import React, { Component } from 'react';
import Button from './Button';

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
        let networkDataReceived = false;
        const that = this;

        // fetch cached data
        caches.open('apiMarvel').then(function (cache) {
            cache.match(urlInitial).then(function (response) {
                if (response) {

                    return response;
                }
            })
              .then(data => data.json())
              .then(data => {
                  console.log(' Found response in cache:', data);
                  that.setState({
                      data: data,
                      pending: false,
                  })
              }).catch(()=>{
                return networkUpdate();
            });
        });

        const networkUpdate = fetch(urlInitial)
          .then(response => {
              if (!response.ok) {
                  throw Error("Network request failed")
              }

              return caches.open('apiMarvel').then(function(cache) {
                  cache.put(urlInitial, response.clone());
                  return response;
              });
              networkDataReceived = true;
              return response;
          })
          .then(d => d.json())
          .then(d => {
              networkDataReceived = true;
              this.setState({
                  data: d,
                  pending: false
              })
          }, () => {
              this.setState({
                  requestFailed: true
              })
          });

    }

    goTo(direction) {
        let parameter = (direction === 'prev') ? (this.state.offset < 26 ? this.state.offset : this.state.offset - 26 ) : this.state.offset + 26;
        let urlGoTO = `http://gateway.marvel.com/v1/public/characters?limit=26&offset=${parameter}&apikey=c1ac14a35052a29503518fe883970ac7`;
        let networkDataReceived = false;
        return () => {
            const that = this;
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

            // fetch cached data
            caches.open('apiMarvel').then(function (cache) {
                cache.match(urlGoTO).then(function (response) {
                    if (response) {

                        return response;
                    }
                })
                  .then(data => data.json())
                  .then(data => {
                      console.log(' Found response in cache:', data);
                      that.setState({
                          data: data,
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
                  }).catch(()=>{
                    return networkUpdate();
                });
            });

            const networkUpdate = function () {
                fetch(urlGoTO)
                  .then(response => {
                      if (!response.ok) {
                          throw Error("Network request failed")
                      }

                      return caches.open('apiMarvel').then(function(cache) {
                          cache.put(urlGoTO, response.clone());
                          return response;
                      });

                      networkDataReceived = true;

                      return response.clone();
                  })

                  .then(d => d.json())
                  .then(d => {
                      that.setState({
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
            };

        }
    };

    render() {


        if (this.state.requestFailed) {
            return (
              <CharacterList title="Liste des personnages" buttonPrev={this.goTo('prev')}
                             buttonNext={this.goTo('next', this)}>
                  <p> Failed !</p>;
              </CharacterList>
            )
        }
        if (this.state.pending) {
            return (
              <CharacterList title="Liste des personnages" buttonPrev={this.goTo('prev')}
                             buttonNext={this.goTo('next', this)}>
                  <div className="loading"><p>..loading...</p>
                      <div className="lds-interwind">
                          <div></div>
                          <div></div>
                      </div>
                  </div>
              </CharacterList>
            );
        }

        const comicCharacters = this.state.data;

        const mapOfCharacters = [];
        comicCharacters.data.results.map((item, i) => {
            mapOfCharacters.push(
              <li className="list-item" key={i} onClick={this.props.loadCharacter(item.name)}>
                  <a href="#" className="links"><span
                    className="male-character">M</span><span
                    className="character-name">{item.name}</span></a></li>
            );
            return true;
        });

        return (
          <CharacterList title="Liste des personnages"
                         buttonPrev={this.goTo('prev')}
                         buttonNext={this.goTo('next')}>
              { mapOfCharacters }
          </CharacterList>
        );
    }
}


export default CharactersComponent;