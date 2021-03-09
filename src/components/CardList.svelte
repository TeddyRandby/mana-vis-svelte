<script>
  import Card from "./Card.svelte"

  export let cards
  export let header

    $:count = cards.reduce((sum, card)=>sum+card.count, 0);
</script>

<main>
  <div class=header>
    <p class=title>{header} ({count})</p>
    <i class={"ms ms-" + header.slice(0,-1).toLowerCase()}>
  </div>
  {#each cards as card}
    <Card bind:card />
  {/each}
</main>

<style>
    
    .header {
      display: flex;
      place-items: center;
      letter-spacing: 0px;
      opacity: 60%;
    }
    
    .title{
        color: var(--primary-color);
        text-transform: uppercase;
        font-weight: bold;
        margin: 0;
        margin-right: 0.55rem;
        cursor: default;
    }
</style>
