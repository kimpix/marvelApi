import React, { Component } from 'react';

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


export default PlayerOneCharacter;