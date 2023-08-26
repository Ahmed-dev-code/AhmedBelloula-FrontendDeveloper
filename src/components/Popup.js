import React from 'react';
import Modal from 'react-modal';

// Set app element for accessibility
Modal.setAppElement('#root');

function Popup({ isOpen, onClose, children }) {
  return (
    <Modal   isOpen={isOpen} onRequestClose={onClose}>
      {children}
    </Modal>
  );
}

export default Popup;
