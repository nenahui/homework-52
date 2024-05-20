class PokerHand {
  private readonly cards: { rank: string; suit: string }[];

  constructor(cards: { rank: string; suit: string }[]) {
    this.cards = cards;
  }

  private countRanks() {
    const rankCounts: { [key: string]: number } = {};
    for (const card of this.cards) {
      rankCounts[card.rank] = (rankCounts[card.rank] || 0) + 1;
    }
    return rankCounts;
  }

  private countSuits() {
    const suitCounts: { [key: string]: number } = {};
    for (const card of this.cards) {
      suitCounts[card.suit] = (suitCounts[card.suit] || 0) + 1;
    }
    return suitCounts;
  }

  private isFlush() {
    const suitCounts = this.countSuits();
    return Object.values(suitCounts).some(count => count >= 5);
  }

  private isThreeOfAKind(rankCounts: { [key: string]: number }) {
    return Object.values(rankCounts).some(count => count === 3);
  }

  private isTwoPairs(rankCounts: { [key: string]: number }) {
    const pairs = Object.values(rankCounts).filter(count => count === 2);
    return pairs.length === 2;
  }

  private isOnePair(rankCounts: { [key: string]: number }) {
    return Object.values(rankCounts).some(count => count === 2);
  }

  public getOutcome() {
    const rankCounts = this.countRanks();

    if (this.isFlush()) {
      return 'Флэш';
    }

    if (this.isThreeOfAKind(rankCounts)) {
      return 'Тройка';
    }

    if (this.isTwoPairs(rankCounts)) {
      return 'Две пары';
    }

    if (this.isOnePair(rankCounts)) {
      return 'Одна пара';
    }

    return 'Старшая карта';
  }
}

export default PokerHand;