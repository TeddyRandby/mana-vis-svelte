/*
 * Given a card, return an object that counts the appearences of pips in its mana cost.
 * Absent pips are assigned 0.
 * {
 *  "W": 4
 * }
 */
export default function parsePips(card: any) {
  let pips = {};
  ["W", "U", "B", "R", "G", "C"].forEach((pip: string) => {
    const matches = card.mana_cost.match(new RegExp(pip)) 
    pips[pip] = matches ? matches.length : 0
  })
  return pips;
}
