import React from 'react';

interface Props {
  playerWon: boolean;
  reset(): void;
}

const ResultsScreen: React.FC<Props> = (props) => {
  const backgroundStyle = `
    w-screen h-screen absolute flex justify-center items-center
    ${props.playerWon ? 'bg-green-opaque' : 'bg-red-opaque'}
  `;
  const mainStyle = `
    w-1/2 h-1/3 flex flex-row justify-between items-center rounded-lg border-2 border-gray-700
    ${props.playerWon ? 'bg-green-800' : 'bg-red-800'}
  `;
  const resultText = props.playerWon
  ? 'Congrats, you won!'
  : 'Dealer wins this time.';
  return (
    <div className={backgroundStyle}>
      <div className={mainStyle}>
        <p className='flex-1 text-center text-4xl'>{resultText}</p>
        <button className='flex-1 h-1/3 mx-3 bg-white rounded-lg border border-black' onClick={props.reset}>Play Again?</button>
      </div>
    </div>
  )
}

export default ResultsScreen;