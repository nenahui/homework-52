import React, {useState} from 'react';
import './App.css';
import Card from './components/Card/Card';
import CardDeck from './lib/CardDeck';
import PokerHand from './lib/PokerHand';

const App: React.FC = () => {
  const [deck, setDeck] = useState(new CardDeck());
  const [cards, setCards] = useState<{ rank: string; suit: string }[]>([]);
  const [remainingCards, setRemainingCards] = useState(52);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [buttonWidth, setButtonWidth] = useState<number | string>('auto');

  const drawCards = (howMany: number) => {
    try {
      if (remainingCards < howMany) {
        howMany = remainingCards;
      }

      const drawnCards = deck.getCards(howMany);
      setCards(drawnCards.map(card => ({rank: card.rank, suit: card.suit})));
      setRemainingCards(deck.getRemainingCardsCount());

      if (deck.getRemainingCardsCount() === 0) {
        setGameOver(true);
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
    setGameOver(false);
    setGameStarted(false);
    setButtonWidth('auto');
  };

  const handleButtonClick = () => {
    if (gameOver) {
      restartGame();
      return;
    }

    drawCards(5);
    setButtonWidth('fit-content');
  };

  const currentHand = gameStarted ? new PokerHand(cards).getOutcome() : 'Не найдена';

  return (
    <>
      <p>{!gameStarted ? 'Нажмите на кнопку ниже, чтобы получить карты' : `Кол-во карт: ${remainingCards}`}</p>
      <div className="cards-block">
        {!gameStarted
          ? Array.from({length: 5}, (_, index) => <Card key={index} rank="back" suit="back"/>)
          : cards.map((card, index) => <Card key={index} rank={card.rank} suit={card.suit}/>)
        }
      </div>
      <p>{`Текущая комбинация: ${currentHand}`}</p>
      <button
        className="button-expand"
        style={{width: buttonWidth}}
        onClick={handleButtonClick}
      >
        {gameOver ? 'Начать игру заново' : 'Раздать карты'}
      </button>
    </>
  );
};

export default App;