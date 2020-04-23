import React from 'react';

import { Player } from '../types/playerTypes';
import PlayerView from './PlayerView';

interface Props {
  players: Player[];
  handleHit(playerId: string): void;
  handleStay(playerId: string): void;
}

const PlayersContainer: React.FC<Props> = (props) => {
  const getPlayerDisplays = (): JSX.Element[] => {
    const display: JSX.Element[] = props.players.map(p => {
      return <PlayerView
        key={p.id}
        displayName={p.displayName}
        cards={p.cards}
        handleHit={() => props.handleHit(p.id)}
        handleStand={() => props.handleStay(p.id)}
      />
    });
    return display;
  }
  return (
    <div className='flex-1 flex flex-row'>
      {getPlayerDisplays()}
    </div>
  );
}

export default PlayersContainer;