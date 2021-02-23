<script>
  import CardList from "./CardList.svelte"
  import { deck, scores, debounce } from "../stores"

  import { gqlClient } from "../utils/gqlClient"
  import { MANIFY_DECK } from "../gql/scryfallify"

  export let inputDeck

  $: creatures = inputDeck.filter((c) => c.type_line.match(/Creature/g) && !c.type_line.match(/Land/g))
  $: lands = inputDeck.filter((c) => c.type_line.match(/Land/g))
  $: planeswalkers = inputDeck.filter((c) => c.type_line.match(/Planeswalker/g) && !c.type_line.match(/Land/g))
  $: spells = inputDeck.filter((c) => c.type_line.match(/((Instant)|(Sorcery))/g) && !c.type_line.match(/Land/g))
  $: artifacts = inputDeck.filter((c) => c.type_line.match(/(Artifact)/g) && !c.type_line.match(/Land/g) && !c.type_line.match(/Creature/g))
  $: enchantments = inputDeck.filter((c) => c.type_line.match(/Enchantment/g))
  
  $: deck.update(()=>[...lands, ...creatures, ...planeswalkers, ...spells, ...artifacts, ...enchantments].map(c=>({name: c.name, count: c.count})))

  const { watch } = gqlClient("https://mana-vis-api.herokuapp.com/")

  // Watch a debounced version of the deck store - and refresh the query when debounced deck changes.
  $: debouncedDeck = debounce(deck);
  $: response = watch(MANIFY_DECK, {deck :{cards: $debouncedDeck}})

  // A function which waits for the response to come in, and updates the scores store when it does.
  const updateScores = async (updatedScores) => {
    updatedScores = await updatedScores;
      scores.update(() => updatedScores.manifyDeck.reduce((acc, curr)=>{
          acc[curr.name] = [curr.score, curr.appearences, curr.onCurve]
          return acc

        },{}))
  }

  $: updateScores($response)

</script>

<main class="deck">
  <div class="deck-column">
    {#if creatures.some((c) => !!c)} <CardList bind:cards={creatures} header="Creatures" /> {/if}
    {#if planeswalkers.some((c) => !!c)}
      <CardList bind:cards={planeswalkers} header="Planeswalkers"/>
    {/if}
    {#if spells.some((c) => !!c)} <CardList bind:cards={spells} header="Spells" /> {/if}
      {#if artifacts.some((c) => !!c)} <CardList bind:cards={artifacts} header="Artifacts" /> {/if}
    {#if enchantments.some((c) => !!c)}
      <CardList bind:cards={enchantments} header = "Enchantments" />
    {/if}
  </div>
  <div class="deck-column">
    {#if lands.some((c) => !!c)} <CardList bind:cards={lands} header="Lands" /> {/if}
  </div>
</main>

<style>
  .deck {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .deck-column {
    width: 100%;
    max-width: 55ch;
  }

</style>
