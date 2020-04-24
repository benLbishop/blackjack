import React from 'react';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';

import RootState from '../reducers';
import { initializeDeck, handleHit, handleStand, initializeNewGame } from '../actions/cardActions';
import Game from './Game';
import { Dealer, Player } from '../types/playerTypes';
import ResultsScreen from './ResultsScreen';

interface Props {
  dealer: Dealer;
  players: Player[];
  gameComplete: boolean;
  playerWon: boolean;
  initializeDeck(deckCount?: number): void;
  handleHit(playerId: string): void;
  handleStand(playerId: string): void;
  reset(): void;
}

class App extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.initializeDeck()
  }

  render() {
    const { gameComplete, playerWon } = this.props;

    return (
      <div className="w-screen h-screen flex">
        <Game
          dealer={this.props.dealer}
          players={this.props.players}
          handleHit={this.props.handleHit}
          handleStay={this.props.handleStand}
        />
        {gameComplete && <ResultsScreen playerWon={playerWon} reset={this.props.reset} />}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  dealer: state.game.dealer,
  players: state.game.players,
  gameComplete: state.game.gameComplete,
  playerWon: state.game.playerWon
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, undefined, Action>) => ({
  initializeDeck: (deckCount?: number) => dispatch(initializeDeck(deckCount)),
  handleHit: (playerId: string) => dispatch(handleHit(playerId)),
  handleStand: (playerId: string) => dispatch(handleStand(playerId)),
  reset: () => dispatch(initializeNewGame())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
