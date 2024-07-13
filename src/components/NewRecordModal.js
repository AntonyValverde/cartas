// src/components/NewRecordModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import './NewRecordModal.css';

const NewRecordModal = ({ isOpen, onSubmit, level }) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    onSubmit(name);
    setName('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleSubmit}
      contentLabel="Nuevo Récord"
      className="modal"
      overlayClassName="overlay"
    >
      <h2>¡Felicidades, hiciste un nuevo récord!</h2>
      <p>Nivel: {level}</p>
      <input
        type="text"
        placeholder="Ingresa tu nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSubmit}>Guardar</button>
    </Modal>
  );
};

Modal.setAppElement('#root');

export default NewRecordModal;
