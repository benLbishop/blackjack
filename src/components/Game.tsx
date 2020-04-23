import React from 'react';
import { connect } from 'react-redux';
import RootState from '../reducers';

interface Props {
  testString: string;
}

class Game extends React.PureComponent<Props> {
  render() {
    return (
      <div className='flex-1 bg-green-700'>
        <p>{this.props.testString}</p>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  testString: state.game.deckId
});

export default connect(
  mapStateToProps
)(Game);