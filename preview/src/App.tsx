import * as React from 'react';
import { showModal } from '../../src';
import './App.css';

interface AppState {
  closeModalFn: (() => void) | null;
}

export class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      closeModalFn: null
    };
  }

  openModal = () => {
    showModal({
      title: "Welcome to Windsurf UI",
      content: (
        <div className="modal-content">
          <p>This is a lightweight React UI library with a focus on modals and smooth interactions.</p>
          <ul>
            <li>Features:
              <ul>
                <li>Smooth animations</li>
                <li>Keyboard navigation</li>
                <li>Accessibility support</li>
                <li>Multiple closing options</li>
                <li>React 15 compatibility</li>
              </ul>
            </li>
          </ul>
          <div className="demo-buttons">
            <button 
              onClick={() => {
                const { closeModalFn } = this.state;
                if (closeModalFn) closeModalFn();
              }}
              className="demo-button secondary"
            >
              Close Modal
            </button>
          </div>
        </div>
      ),
      onShow: () => {
        console.log('Modal shown');
      },
      onClose: () => {
        console.log('Modal closed');
      }
    }).then(closeModal => {
      this.setState({ closeModalFn: closeModal });
    });
  };

  render() {
    return (
      <div className="app">
        <h1>Windsurf UI Demo</h1>
        <p>Click the button below to open a modal:</p>
        <button onClick={this.openModal} className="demo-button primary">
          Open Modal
        </button>
      </div>
    );
  }
}
