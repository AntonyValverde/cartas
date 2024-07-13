// src/components/GameOverModal.js
import React from 'react';
import Modal from 'react-modal';
import './GameOverModal.css';

const GameOverModal = ({ isOpen, onClose, recordHolder }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Game Over"
      className="modal"
      overlayClassName="overlay"
    >
      <h2>¡Perdiste!</h2>
      <p>El récord actual es de {recordHolder.name} con nivel {recordHolder.level}</p>
      <button onClick={onClose}>Reintentar</button>
    </Modal>
  );
};

Modal.setAppElement('#root');

export default GameOverModal;
