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
  isComplete: boolean;
  playerWon: boolean;
  initializeDeck(deckCount?: number): void;
  handleHit(playerId: string): void;
  handleStand(playerId: string): void;
  reset(): void;
}

class App extends React.PureComponent<Props> {
  componentDidMount() {
    // TODO: move to app
    this.props.initializeDeck()
  }

  getDisplay = () => {
    const { isComplete, playerWon } = this.props;
    if (isComplete) {
      return <ResultsScreen playerWon={playerWon} reset={this.props.reset} />;
    }
    return (
      <Game
        dealer={this.props.dealer}
        players={this.props.players}
        handleHit={this.props.handleHit}
        handleStay={this.props.handleStand} // TODO
      />
    )
  }

  render() {
    return (
      <div className="w-screen h-screen bg-blue-600 flex">
        {this.getDisplay()}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  dealer: state.game.dealer,
  players: state.game.players,
  isComplete: state.game.isComplete,
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
