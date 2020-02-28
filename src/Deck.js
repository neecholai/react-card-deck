import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Card from './Card';
import './Deck.css';

function Deck() {
  const [cards, setCards] = useState([]);
  const [deck, setDeck] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const timerId = useRef();
  const BASE_URL = "https://deckofcardsapi.com/api/deck";

  const getCards = async () => {
    const response = await axios.get(`${BASE_URL}/new/draw/?count=52`);
    setDeck(response.data.cards);
  }

  const toggleDrawing = () => {
    if (isDrawing) clearTimeout(timerId.current)
    setIsDrawing(!isDrawing);
  };

  // Get deck of cards on the initial page load.
  useEffect(() => {
    getCards()
  }, [])

  useEffect(() => {
    const addCard = () => {
      const idx = cards.length;
      const translationX = Math.random() * 40 - 20;
      const translationY = Math.random() * 40 - 20;
      const rotation = Math.random() * 90 - 45;
      const newCard = {
        ...deck[idx],
        rotation,
        translationX,
        translationY
      }
      setCards([...cards, newCard]);
    }
    if (cards.length !== 52 && isDrawing) timerId.current = setTimeout(addCard, 1000);
    if (cards.length === 52) alert("Error: no cards remaining!")
  }, [isDrawing, cards, deck])

  return (
    <div className='Deck'>
      {
        cards.length !== 52 ?
          <button className='Deck-btn' onClick={toggleDrawing}>
            {isDrawing ? "Stop drawing" : "Start drawing"}
          </button> : null
      }
      <div className='Deck-cards'>
        {
          cards.map(card =>
            <Card
              key={card.code}
              cardName={`${card.value} of ${card.suit}`}
              cardImage={card.image}
              rotation={card.rotation}
              translationX={card.translationX}
              translationY={card.translationY} />
          )
        }
      </div>
    </div >
  );
}

export default Deck;