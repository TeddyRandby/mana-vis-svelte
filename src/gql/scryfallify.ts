export const SCRYFALLIFY_URL = `
  query ScyfallifyURL($url: String!) {
    scryfallifyURL(url: $url) {
      name
      count
      type_line
      cmc
      mana_cost
      color_identity
    }
  }
`;
