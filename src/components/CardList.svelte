<script>
  import Card from "./Card.svelte"

  export let cards
  export let header

    $:count = cards.reduce((sum, card)=>sum+card.count, 0);
</script>

<main>
  <p class="header">{header} ({count})</p>
  {#each cards as card}
    <Card bind:card />
  {/each}
</main>

<style>
    .header {
        color: var(--primary-color);
        text-transform: uppercase;
        font-weight: bold;
        margin-bottom: 0;
        cursor: default;
    }
    
    main {
      margin: .5rem;
    }
</style>
