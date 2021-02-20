export const MANIFY_URL = `
  query ManifyURL($url: String!) {
    manifyURL(url: $url) {
      name
      count
      type_line
      cmc
      mana_cost
      color_identity
    }
  }
`;

export const MANIFY_DECK = `
  query ManifyDeck($deck: DeckInput!) {
    manifyDeck(deck: $deck) {
      name
      score
      appearences
      onCurve
    }
  }
`;

