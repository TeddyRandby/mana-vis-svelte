<script>
  import { gqlClient } from "./utils/gqlClient"
  import { MANIFY_URL } from "./gql/scryfallify"
  import Deck from "./components/Deck.svelte"

  import Nav from "./components/Nav.svelte"

  let url = "https://www.mtggoldfish.com/archetype/standard-sultai-control-eld#paper"

  const { watch } = gqlClient("https://mana-vis-api.herokuapp.com/")

  $: response = watch(MANIFY_URL, { url })

</script>

<main>
  <Nav />
  <div class="deck">
    <div class="brackets">
      <input bind:value={url} placeholder="PASTE YOUR DECK LINK HERE" />
    </div>
    {#await $response}
      <h2>We're pulling up your deck...</h2>
    {:then deckData}
      <Deck inputDeck={deckData.manifyURL} />
    {:catch errors}
      {#each errors as error}
        <h2>{error.message}</h2>
      {/each}
    {/await}
  </div>
</main>

<svelte:head>
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap" rel="stylesheet">
</svelte:head>

<style>
  :root {
    --primary-color: #1a5a89;
    --success-color: #61c3bb;
    --warning-color: #faa716;
    --error-color: #e74b25;
    --background-color-dark: #ffffff;
  }
  :global(.rotate) {
    animation: rotation 2s infinite ease-in-out
  }

  @keyframes -global-rotation {
    from {
      transform: rotate(0deg)
    }
    to {
      transform: rotate(360deg);
    }
  }

  :global(body) {
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
    color: var(--primary-color);
  }
  
  :global(.hoverable) {
        border: none;
	      font-family: inherit;
	      font-size: inherit;
	      color: inherit;
	      background: none;
	      cursor: pointer;
	      display: inline-block;
	      outline: none;
	      position: relative;
	      -webkit-transition: all 0.3s;
	      -moz-transition: all 0.3s;
	      transition: all 0.3s;
        z-index: 0;
    }

    :global(.hoverable:after) {
	      content: '';
	      position: absolute;
	      z-index: -1;
	      -webkit-transition: all 0.3s;
	      -moz-transition: all 0.3s;
	      transition: all 0.3s;
	      width: 100%;
	      height: 0;
	      bottom: 0;
	      left: 0;
	      background: var(--primary-color);
    }

    :global(.hoverable:hover,
    .hoverable:active)
    {
	      color: var(--background-color-dark);
    }

    :global(.hoverable:hover:after,
    .hoverable:active:after)
     {
	      height: 100%;
    }

  .deck{
    padding: 2vh 5vw;
    min-height: 100vh;
    background-color: var(--background-color-dark);
    color: var(--primary-color);
  }

  *:after,
  *::before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  input {
    background: none;
    border: none;
    outline: none;
    margin: 0 auto;
    width: 80%;
    transition: border 0.3s;
    padding-bottom:0;
  }

  input:hover, input:focus {
    background: none;
    border: none;
    outline: none;
    margin: 0 auto;
    border-bottom: 2px solid var(--primary-color)
  }

  .brackets {
	position: relative;
	display: inline-block;
	margin: 15px 25px;
  width: 100%;
	outline: none;
	color: var(--primary-color);
	text-decoration: none;
	font-weight: 400;
	font-size: 1.35em;
  }

  .brackets::before,
  .brackets::after {
	display: inline-block;
	opacity: 0;
	-webkit-transition: -webkit-transform 0.3s, opacity 0.2s;
	-moz-transition: -moz-transform 0.3s, opacity 0.2s;
	transition: transform 0.3s, opacity 0.2s;
  z-index: 1;
}

  .brackets::before {
	margin-right: 5px;
	content: '[';
	-webkit-transform: translateX(20px);
	-moz-transform: translateX(20px);
	transform: translateX(20px);
}

.brackets::after {
	margin-left: 5px;
	content: ']';
	-webkit-transform: translateX(-20px);
	-moz-transform: translateX(-20px);
	transform: translateX(-20px);
}

.brackets:hover::before,
.brackets:hover::after,
.brackets:focus::before,
.brackets:focus::after {
	opacity: 1;
	-webkit-transform: translateX(0px);
	-moz-transform: translateX(0px);
	transform: translateX(0px);
}

</style>
