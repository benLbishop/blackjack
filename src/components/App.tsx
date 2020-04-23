import React from 'react';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';

import RootState from '../reducers';
import { initializeDeck } from '../actions/cardActions';
import Game from './Game';
import { Dealer, Player } from '../types/playerTypes';

interface Props {
  dealer: Dealer;
  players: Player[];
  initializeDeck(deckCount?: number): void;
}

class App extends React.PureComponent<Props> {
  componentDidMount() {
    // TODO: move to app
    this.props.initializeDeck()
  }

  render() {
    return (
      <div className="w-screen h-screen bg-blue-600 flex">
        <header className="App-header">
        </header>
        <Game
          dealer={this.props.dealer}
          players={this.props.players}
          handleHit={(id: string) => {console.log(`hit ${id}`)}} // TODO
          handleStay={(id: string) => {console.log(`stay ${id}`)}} // TODO
        />
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
)(App);
