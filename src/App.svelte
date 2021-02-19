<script>
  import { gqlClient } from "./utils/gqlClient"
  import { SCRYFALLIFY_URL } from "./gql/scryfallify"
  import Deck from "./components/Deck.svelte"
  import Nav from "./components/Nav.svelte"
  let url = ""

  const { query } = gqlClient("https://mana-vis-api.herokuapp.com/")

  $: response = query(SCRYFALLIFY_URL, { url })
</script>

<main>
  <Nav />
  <div class="deck">
    <input bind:value={url} />
    {#await $response}
      <h2>Waiting..</h2>
    {:then data}
      <Deck deck={data.scryfallifyURL} />
    {:catch errors}
      {#each errors as error}
        <p>{error.message}</p>
      {/each}
    {/await}
  </div>
</main>

<style>
  :root {
    --primary-color: #1a5a89;
    --secondary-color: #61c3bb;
    --background-color-light: #ebebeb;
    --background-color-dark: #e0e0e0;
    --accent-color: #e74b25;
  }

  :global(body) {
    margin: 0;
    padding: 0;
    background-color: var(--background-color-light);
    color: var(--primary-color);
  }

  .deck{
    padding: 2vh 5vw;
    min-height: 100vh;
    background-color: var(--background-color-dark);
    color: var(--primary-color);
  }

  input {
    padding: 0.75rem;
    background-color: inherit;
    width: 100%;
    border: 3px var(--background-color-dark) solid;
    border-bottom: 3px var(--primary-color) solid;
    transition: border .5s linear;
  }
  input:hover {
    border: 3px var(--primary-color) solid;
  }
</style>
