import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Modal } from './components';
import './components/Modal/Modal.module.css';

export interface ShowModalOptions {
  title: string;
  content: React.ReactNode;
  onShow?: () => void;
  onClose?: () => void;
}

let modalCounter = 0;

export function showModal(options: ShowModalOptions): Promise<() => void> {
  return new Promise<() => void>((resolve) => {
    const modalId = `modal-${++modalCounter}`;
    const modalRoot = document.createElement('div');
    modalRoot.id = modalId;
    document.body.appendChild(modalRoot);

    let modalInstance: Modal | null = null;

    const closeModal = () => {
      if (options.onClose) {
        options.onClose();
      }
      ReactDOM.unmountComponentAtNode(modalRoot);
      document.body.removeChild(modalRoot);
    };

    const modalProps = {
      ...options,
      onClose: closeModal,
      ref: (ref: Modal | null) => {
        modalInstance = ref;
      }
    };

    // Initial render
    ReactDOM.render(
      React.createElement(Modal as React.ComponentClass<any>, modalProps),
      modalRoot,
      () => {
        // Call user's onShow callback after render
        if (options.onShow) {
          options.onShow();
        }
      }
    );

    resolve(() => {
      if (modalInstance) {
        modalInstance.handleClose();
      }
    });
  });
}