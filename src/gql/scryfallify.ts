export const MANIFY_URL = `
  query ManifyURL($url: String!) {
    manifyURL(url: $url) {
      name
      count
      type_line
      cmc
      pips {
        colors
        amount
      }
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
      pips {
        colors
        amount
      }
    }
  }
`;

