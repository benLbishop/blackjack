import React from 'react';
import { Card } from '../types/cardTypes';

interface Props {
  displayName: string;
  cards: Card[];
  handleHit(): void;
  handleStand(): void;
}

const PlayerView: React.FC<Props> = (props) => {
  return (
    <div className='flex-1 flex flex-col bg-gray-100'>
      <p>{props.displayName}</p>
      <button onClick={props.handleHit}>Hit</button>
      <button onClick={props.handleStand}>Stand</button>
    </div>
  );
};

export default PlayerView;