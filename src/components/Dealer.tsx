import React from 'react';
import { Card } from '../types/cardTypes';

interface Props {
  displayName: string;
  cards: Card[];
}

const DealerView: React.FC<Props> = (props) => {
  return (
    <div className='flex-1 flex flex-col bg-gray-100'>
      <p>{props.displayName}</p>
    </div>
  );
};

export default DealerView;