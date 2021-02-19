/* For a list of cards, sum the occurrences of color identies.
 * When done on lands, this equates to the mana production of the deck.
 */
export default function parseProduction(cards:any) {
  return cards.reduce((pips: Object, card: any) => {
    if (card.name.match(fetches))
      ["W", "U", "B", "R", "G"].forEach((pip: string) => pips[pip] = (pips[pip] || 0) + card.count)
    else
      card.color_identity.forEach((pip: string) => pips[pip] = (pips[pip] || 0) + card.count)
    return pips
  }, {})
}

const fetches = /(Fabled Passage)/g
