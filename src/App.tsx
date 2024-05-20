import React, {useState} from 'react';
import './App.css';
import Card from './components/Card/Card';
import CardDeck from './lib/CardDeck';

const App: React.FC = () => {
  const [deck, setDeck] = useState(new CardDeck());
  const [cards, setCards] = useState<{ rank: string; suit: string }[]>([]);
  const [remainingCards, setRemainingCards] = useState(52);
  const [gameEnd, setGameEnd] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const drawCards = (howMany: number) => {
    try {
      if (remainingCards < howMany) {
        howMany = remainingCards;
      }

      const drawnCards = deck.getCards(howMany);
      setCards(drawnCards.map(card => ({rank: card.rank, suit: card.suit})));
      setRemainingCards(deck.getRemainingCardsCount());

      if (deck.getRemainingCardsCount() === 0) {
        setGameEnd(true);
      }

      setGameStarted(true);
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  const restartGame = () => {
    setDeck(new CardDeck());
    setCards([]);
    setRemainingCards(52);
    setGameEnd(false);
    setGameStarted(false);
  };

  return (
    <>
      <p>{!gameStarted ? 'Нажмите на кнопку ниже, чтобы получить карты' : `Кол-во карт: ${remainingCards}`}</p>
      <div className="cards-block">
        {!gameStarted
          ? Array.from({length: 5}, (_, index) => <Card rank="back" suit="back" key={index}/>)
          : cards.map((card, index) => <Card rank={card.rank} suit={card.suit} key={index}/>)
        }
      </div>
      <button onClick={gameEnd ? restartGame : () => drawCards(5)}>
        {gameEnd ? 'Начать игру заново' : 'Раздать карты'}
      </button>
    </>
  );
};

export default App;