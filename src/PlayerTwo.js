import React, { Component } from 'react';

class PlayerTwoCharacter extends Component {
    render() {
        const adversary = [];

        if (!this.props.isPending) {
            adversary.push(
              <div className="adversary-container">
                  { this.props.score }
                  <div className="adversary">
                      <div id="adversary" className={ this.props.class }>
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

export default PlayerTwoCharacter;