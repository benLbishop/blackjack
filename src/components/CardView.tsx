import React from 'react';

interface Props {
  imageURL: string;
  code: string;
}

const CardView: React.FC<Props> = (props) => {
  return (
    <div className='w 1/5 h 10'>
      <img
        src={props.imageURL}
        alt={props.code}
      />
    </div>
  )
};

export default CardView;