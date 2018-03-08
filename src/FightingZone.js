import React, { Component } from 'react';

class FightingZoneComponent extends Component {
    render() {
        return (
          <section className="right-column">
              { this.props.children }
          </section>
        );
    }
}


export default FightingZoneComponent;