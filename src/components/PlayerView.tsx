import React from 'react';
import { Card } from '../types/cardTypes';
import CardView from './CardView';

interface Props {
  displayName: string;
  cards: Card[];
  handleHit(): void;
  handleStand(): void;
}

const PlayerView: React.FC<Props> = (props) => {
  const getCardDisplay = () => {
    const cards = props.cards;
    return cards.map(c => {
      return (
        <CardView
          key={c.image}
          imageURL={c.image}
          code={c.code}
        />
      );
    })
  }
  return (
    <div className='flex-1 flex flex-col'>
      <p>{props.displayName}</p>
      <div className='flex flex-col'>
        <div className='flex flex-row'>
          {getCardDisplay()}
        </div>
        <div className='flex flex-row'>
          <button onClick={props.handleHit}>Hit</button>
          <button onClick={props.handleStand}>Stand</button>
        </div>
      </div>
    </div>
  );
};

export default PlayerView;