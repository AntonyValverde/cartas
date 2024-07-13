// src/components/Card.js
import React from 'react';
import './Card.css';

const Card = ({ onClick, isFlipped, cardType }) => {
  const handleCardClick = () => {
    onClick(cardType);
  };

  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleCardClick}>
      <div className="card-inner">
        <div className="card-front">
          ?
        </div>
        <div className="card-back">
          <img
            src={cardType === 'Ganar' ? '/images/justice.jpg' : '/images/death.jpg'}
            alt={cardType}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
