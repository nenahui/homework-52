import './App.css';
import CardDeck from './lib/CardDeck';

const App: React.FC = () => {
  const deck = new CardDeck();
  deck.getCard();
  deck.getCards(5);

  return (
    <>
    </>
  );
};

export default App;