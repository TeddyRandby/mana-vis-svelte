<script>
  import CardList from "./CardList.svelte"

  export let deck

  $: creatures = {
    header: "Creatures",
    cards: deck.filter((c) => c.type_line.match(/Creature/g)),
  }
  $: lands = {
    header: "Lands",
    cards: deck.filter((c) => c.type_line.match(/Land/g)),
  }
  $: planeswalkers = {
    header: "Planeswalkers",
    cards: deck.filter((c) => c.type_line.match(/Planeswalker/g)),
  }
  $: spells = {
    header: "Spells",
    cards: deck.filter((c) => c.type_line.match(/!(Land)((Instant)|(Sorcery))/g)),
  }
  $: artifacts = {
    header: "Artifacts",
    cards: deck.filter((c) => c.type_line.match(/Artifact/g)),
  }
  $: enchantments = {
    header: "Enchantments",
    cards: deck.filter((c) => c.type_line.match(/Enchantment/g)),
  }
</script>

<main class="deck">
  <div class="deck-column">
    {#if creatures.cards.some((c) => !!c)} <CardList {...creatures} /> {/if}
    {#if planeswalkers.cards.some((c) => !!c)}
      <CardList {...planeswalkers} />
    {/if}
    {#if spells.cards.some((c) => !!c)} <CardList {...spells} /> {/if}
    {#if artifacts.cards.some((c) => !!c)} <CardList {...artifacts} /> {/if}
    {#if enchantments.cards.some((c) => !!c)}
      <CardList {...enchantments} />
    {/if}
  </div>
  <div class="deck-column">
    {#if lands.cards.some((c) => !!c)} <CardList {...lands} /> {/if}
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
  }
</style>
