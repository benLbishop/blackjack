import React from 'react';
import CardView from './CardView';
import { Card } from '../types/cardTypes';

interface Props {
  displayName: string;
  score: number;
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
      <p className='text-4xl'>{props.displayName}: {props.score}</p>
      <div className='flex flex-col'>
        <div className='flex flex-row'>
          {getCardDisplay()}
        </div>
        <div className='flex flex-row h-10'>
          <button className='mx-3 bg-white rounded border-2 w-1/12 h-20 bg-blue-500 border-blue-800' onClick={props.handleHit}>Hit</button>
          <button className='mx-3 bg-white rounded border-2 w-1/12 h-20 bg-gray-400 border-gray-800' onClick={props.handleStand}>Stand</button>
        </div>
      </div>
    </div>
  );
};

export default PlayerView;