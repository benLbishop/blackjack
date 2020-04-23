import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import RootState from '../reducers';
import { initializeDeck } from '../actions/cardActions';

interface Props {
  testString: string;
  initializeDeck(deckCount?: number): void;
}

class Game extends React.PureComponent<Props> {

  componentDidMount() {
    // TODO: move to app
    this.props.initializeDeck()
  }

  render() {
    return (
      <div className='flex-1 bg-green-700'>
        <p>{this.props.testString}</p>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  testString: state.game.testString
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, undefined, Action>) => ({
  initializeDeck: (deckCount?: number) => dispatch(initializeDeck(deckCount))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);