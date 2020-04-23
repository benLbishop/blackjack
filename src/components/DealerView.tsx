import React from 'react';
import { Card } from '../types/cardTypes';
import CardView from './CardView';

interface Props {
  displayName: string;
  cards: Card[];
}

const DealerView: React.FC<Props> = (props) => {
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
      <div className='flex flex-row'>
        {getCardDisplay()}
      </div>
    </div>
  );
};

export default DealerView;