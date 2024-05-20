import React from 'react';

interface ICardProps {
  rank: string;
  suit: string;
}

const Card: React.FC<ICardProps> = ({rank, suit}) => {
  return (
    <>
      <div className="playingCards faceImages">
        <span className={`card rank-${rank} ${suit}`}>
          <span className="rank">{rank.toUpperCase()}</span>
          <span className="suit">
            {suit === 'diams' ? '♦' : suit === 'hearts' ? '♥' : suit === 'clubs' ? '♣' : suit === 'spades' ? '♠' : 'Invalid suit'}
          </span>
        </span>
      </div>
    </>
  );
};

export default Card;