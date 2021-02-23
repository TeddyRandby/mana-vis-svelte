<script>
  import Card from "./Card.svelte"
import Fa from "svelte-fa";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

  export let cards
  export let header

    $:count = cards.reduce((sum, card)=>sum+card.count, 0);
</script>

<main>
  <div class=header>
    <p class=title>{header} ({count})</p>
  </div>
  {#each cards as card}
    <Card bind:card />
  {/each}
</main>

<style>

    .header {
      display: flex;
      place-items: center;
    }

    .icon {
      flex-grow: 1;
      text-align: right;
      margin: 0 15px;
      align-content: center;
      opacity: 0.5;
    }
    
    .title{
        color: var(--primary-color);
        text-transform: uppercase;
        font-weight: bold;
        margin: 0;
        cursor: default;
    }
</style>
