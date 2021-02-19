<script>
  import CardList from "./CardList.svelte"
  import parseProduction from "../utils/parseProduction"
  import {production} from "../stores"


  export let deck

  $: creatures = deck.filter((c) => c.type_line.match(/Creature/g))
  $: lands = deck.filter((c) => c.type_line.match(/Land/g))
  $: planeswalkers = deck.filter((c) => c.type_line.match(/Planeswalker/g))
  $: spells = deck.filter((c) => c.type_line.match(/((Instant)|(Sorcery))/g))
  $: artifacts = deck.filter((c) => c.type_line.match(/Artifact/g))
  $: enchantments = deck.filter((c) => c.type_line.match(/Enchantment/g))
  

  $: production.update(()=>parseProduction(lands))

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
