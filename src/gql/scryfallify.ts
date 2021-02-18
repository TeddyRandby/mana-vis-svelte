export const SCRYFALLIFY_URL = `
  query ScyfallifyURL($url: String!) {
    scryfallifyURL(url: $url) {
      name
      count
      type_line
    }
  }
`;