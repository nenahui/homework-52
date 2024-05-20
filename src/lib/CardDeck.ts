import Card from './Card';

export default class CardDeck {
  private cards: Card[];

  constructor() {
    this.cards = [];
    const suits = ['hearts', 'diams', 'clubs', 'spades'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    for (const suit of suits) {
      for (const rank of ranks) {
        this.cards.push(new Card(rank, suit));
      }
    }
  }

  getCard(): Card {
    if (this.cards.length === 0) {
      throw new Error('Карт не осталось!');
    }
    const randomIndex = Math.floor(Math.random() * this.cards.length);
    return this.cards.splice(randomIndex, 1)[0];
  }

  getCards(howMany: number): Card[] {
    if (howMany > this.cards.length) {
      throw new Error(`Нельзя получить ${howMany} карт, осталось только ${this.cards.length} карты`);
    }
    const drawnCards: Card[] = [];
    for (let i = 0; i < howMany; i++) {
      drawnCards.push(this.getCard());
    }
    return drawnCards;
  }

  getRemainingCardsCount(): number {
    return this.cards.length;
  }
}