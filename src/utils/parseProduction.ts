/* For a list of cards, sum the occurrences of color identies.
 * When done on lands, this equates to the mana production of the deck.
 */
export default function parseProduction(cards:any) {
  return cards.reduce((pips: Object, card: any) => {
    if (card.name.match(exceptions))
      ["W", "U", "B", "R", "G", "C"].forEach((pip: string) => pips[pip] = (pips[pip] || 0) + card.count)
    else
      card.color_identity.forEach((pip: string) => pips[pip] = (pips[pip] || 0) + card.count)
    return pips
  }, {})
}

const exceptions = /(Prismatic Vista)|(Fabled Passage)|(Ancient Ziggurat)|(Cavern of Souls)|(Unclaimed Territory)|(City of Brass)|(Gemstone Mine)|(Mana Confluence)|(Gemstone Caverns)|(Wooded Foothills)|(Verdant Catacombs)|(Misty Rainforest)|(Windswept Heath)|(Flooded Strand)|(Polluted Delta)|(Scalding Tarn)|(Bloodstained Mire)|(Arid Mesa)|(Marsh Flats)/g
