<script>
  import Card from "./Card.svelte"

  export let cards
  export let header

    $:count = cards.reduce((sum, card)=>sum+card.count, 0);
</script>

<main>
  <p class="header">{header.toUpperCase()} ({count})</p>
  {#each cards as card}
    <Card bind:card />
  {/each}
</main>

<style>
    .header {
        color: var(--primary-color);
        font-style: italic;
        font-weight: bolder;
        cursor: default;
    }
    
    main {
      margin: .5rem;
    }
</style>
