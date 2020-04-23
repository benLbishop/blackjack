import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import RootState from '../reducers';
import { initializeDeck } from '../actions/cardActions';
import { Dealer, Player } from '../types/playerTypes';
import DealerView from './Dealer';
import PlayerView from './Player';

interface Props {
  dealer: Dealer;
  players: Player[];
  initializeDeck(deckCount?: number): void;
}

class Game extends React.PureComponent<Props> {

  componentDidMount() {
    // TODO: move to app
    this.props.initializeDeck()
  }

  getPlayerDisplays = (): JSX.Element[] => {
    const display: JSX.Element[] = this.props.players.map(p => {
      return <PlayerView
        key={p.id}
        displayName={p.displayName}
        cards={p.cards}
        handleHit={() => {console.log(`hit ${p.id}`)}}
        handleStand={() => {console.log(`stand ${p.id}`)}}
      />
    });
    return display;
  }

  render() {
    return (
      <div className='flex-1 flex-row bg-green-700'>
        <DealerView {...this.props.dealer}/>
        {this.getPlayerDisplays()}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  dealer: state.game.dealer,
  players: state.game.players
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, undefined, Action>) => ({
  initializeDeck: (deckCount?: number) => dispatch(initializeDeck(deckCount))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);