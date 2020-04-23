import React from 'react';

interface Props {
  playerWon: boolean;
}

const ResultsScreen: React.FC<Props> = (props) => {
  const className = `flex-1 ${props.playerWon ? 'bg-green-600' : 'bg-red-600'}`
  return (
    <div className={className}>
      {props.playerWon
        ? 'Congrats, you won!'
        : 'Dealer wins this time.'
      }
    </div>
  )
}

export default ResultsScreen;