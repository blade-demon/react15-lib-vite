import React, { Component } from 'react';
import styles from './Modal.module.css';

export interface ModalProps {
  visible: boolean;
  title: string;
  children?: React.ReactNode;
  onClose?: () => void;
}

interface ModalState {
  isExiting: boolean;
}

export class Modal extends Component<ModalProps, ModalState> {
  private animationDuration = 200; // matches CSS animation duration
 
  constructor(props: ModalProps) {
    super(props);
    this.state = {
      isExiting: false
    };
  }

  setModalRef = (element: HTMLDivElement | null) => {
    if (element) {
      element.focus();
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown as EventListener);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown as EventListener);
  }

  handleClose = () => {
    if (this.state.isExiting) return;
    
    this.setState({ isExiting: true });
    setTimeout(() => {
      if (this.props.onClose) {
        this.props.onClose();
      }
      this.setState({ isExiting: false });
    }, this.animationDuration);
  };

  handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      this.handleClose();
    }
  };

  handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.handleClose();
    }
  };

  render() {
    const { visible, title, children } = this.props;
    const { isExiting } = this.state;

    if (!visible && !isExiting) return null;

    const overlayClassName = `${styles.modalOverlay} ${isExiting ? styles.exit : styles.enter}`;
    const containerClassName = `${styles.modalContainer} ${isExiting ? styles.exit : styles.enter}`;

    return (
      <div 
        className={overlayClassName} 
        onClick={this.handleOverlayClick}
        ref={this.setModalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className={containerClassName}>
          <div className={styles.modalHeader}>
            <h2 id="modal-title">{title}</h2>
            <button 
              className={styles.modalClose} 
              onClick={this.handleClose}
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
          <div className={styles.modalContent}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
