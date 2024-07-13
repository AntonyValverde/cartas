// src/components/Game.js
import React, { useState, useEffect } from 'react';
import Card from './Card';
import GameOverModal from './GameOverModal';
import NewRecordModal from './NewRecordModal';
import { db } from '../firebase';
import { collection, getDocs, addDoc, query, orderBy, limit } from "firebase/firestore";
import './Game.css';

const Game = () => {
  const [level, setLevel] = useState(1);
  const [cards, setCards] = useState(shuffleCards());
  const [flippedCards, setFlippedCards] = useState([false, false]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [highestLevel, setHighestLevel] = useState(0);
  const [recordHolder, setRecordHolder] = useState({ name: '', level: 0 });

  useEffect(() => {
    const fetchHighestLevel = async () => {
      const q = query(collection(db, 'records'), orderBy('level', 'desc'), limit(1));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const record = querySnapshot.docs[0].data();
        setHighestLevel(record.level);
        setRecordHolder(record);
      }
    };
    fetchHighestLevel();
  }, []);

  function shuffleCards() {
    const cardArray = ['Ganar', 'Perder'];
    return cardArray.sort(() => Math.random() - 0.5);
  }

  const handleCardClick = (cardType, index) => {
    const newFlippedCards = [...flippedCards];
    newFlippedCards[index] = true;
    setFlippedCards(newFlippedCards);

    setTimeout(() => {
      if (cardType === 'Ganar') {
        setLevel(level + 1);
        setCards(shuffleCards());
        setFlippedCards([false, false]);
      } else {
        if (level > highestLevel) {
          setIsNewRecord(true);
        } else {
          setIsGameOver(true);
        }
      }
    }, 1000);
  };

  const handleCloseGameOverModal = () => {
    setIsGameOver(false);
    setLevel(1);
    setCards(shuffleCards());
    setFlippedCards([false, false]);
  };

  const handleSaveRecord = async (name) => {
    await addDoc(collection(db, 'records'), {
      name,
      level,
      timestamp: new Date()
    });
    setIsNewRecord(false);
    setLevel(1);
    setCards(shuffleCards());
    setFlippedCards([false, false]);
    // Update highest level and record holder
    setHighestLevel(level);
    setRecordHolder({ name, level });
  };

  return (
    <div className="game">
      <h1>Nivel: {level}</h1>
      <div className="cards">
        {cards.map((cardType, index) => (
          <Card
            key={index}
            cardType={cardType}
            isFlipped={flippedCards[index]}
            onClick={() => handleCardClick(cardType, index)}
          />
        ))}
      </div>
      <GameOverModal isOpen={isGameOver} onClose={handleCloseGameOverModal} recordHolder={recordHolder} />
      <NewRecordModal isOpen={isNewRecord} onSubmit={handleSaveRecord} level={level} />
    </div>
  );
};

export default Game;
