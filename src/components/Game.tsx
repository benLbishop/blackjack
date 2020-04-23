import React from 'react';

import { Dealer, Player } from '../types/playerTypes';
import DealerView from './DealerView';
import PlayersContainer from './PlayersContainer';

interface Props {
  dealer: Dealer;
  players: Player[];
  handleHit(playerId: string): void;
  handleStay(playerId: string): void;
}

const Game: React.FC<Props> = (props) => {
  return (
    <div className='flex flex-1 flex-col justify-between align-center bg-green-700'>
      <DealerView {...props.dealer}/>
      <PlayersContainer
        players={props.players}
        handleHit={props.handleHit}
        handleStay={props.handleStay}
      />
    </div>
  );
}

export default Game;