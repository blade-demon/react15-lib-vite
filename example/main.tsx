import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Modal, List } from '../src/index';

interface State {
  isModalOpen: boolean;
  selectedItem: string | null;
}

class App extends React.Component<{}, State> {
  state = {
    isModalOpen: false,
    selectedItem: null
  };

  handleOpenModal = () => {
    this.setState({ isModalOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  handleItemClick = (id: string | number) => {
    this.setState({ selectedItem: String(id) });
  };

  render() {
    const listItems = Array.from({ length: 10 }, (_, index) => ({
      id: `item-${index + 1}`,
      content: `List Item ${index + 1}`
    }));

    return (
      <div style={{ padding: '20px' }}>
        <h1>Component Demo</h1>
        
        <h2>Modal Component</h2>
        <button onClick={this.handleOpenModal}>Open Modal</button>
        <Modal
          visible={this.state.isModalOpen}
          onClose={this.handleCloseModal}
          title="Example Modal"
        >
          <p>This is a modal dialog</p>
        </Modal>

        <h2>List Component</h2>
        <List
          items={listItems}
          onItemClick={this.handleItemClick}
        />
        {this.state.selectedItem && (
          <p>Selected item: {this.state.selectedItem}</p>
        )}
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
