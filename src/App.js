import React, { Component } from 'react';
import Modal from './Modal';
import Paragraph from './Paragraph';
import Link from './Link';
import Board from './Board';
import Footer from './Footer';


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

