import React from 'react';
import './Card.css';

const Card = ({cardName, cardImage, rotation, translationX, translationY}) => {

  const style = {
    transform: `rotate(${rotation}deg) translate(${translationX}px, ${translationY}px)`
  }

  return (
    <img style={style} className='Card' src={cardImage} alt={cardName}/>
  );
}

export default Card;