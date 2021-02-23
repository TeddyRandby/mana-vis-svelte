<script>
  import Fa from "svelte-fa"
  import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
  import { scores } from "../stores"
  import {slide} from "svelte/transition"
  import CardIcons from "./CardIcons.svelte";

  export let card

</script>

<main in:slide={{duration: 800}}>
    <p class="name hoverable"><strong>{card.count}</strong> {card.name}</p>
    {#await $scores}
        <p class="hoverable loading">
            <Fa icon={faCircleNotch} class="rotate"/>
        </p> 
    {:then cardScores}
        {#if cardScores[card.name]}
            <CardIcons score={cardScores[card.name]} bind:card />
        {:else if cardScores[card.name][0] !== 0}
            <p class="hoverable loading">
                <Fa icon={faCircleNotch} class="rotate"/>
            </p> 
        {/if}
    {/await}
</main>

<style>
    p {
        cursor: pointer;
        margin: 0;
        padding: .5rem;
	      letter-spacing: 2px;
	      font-weight: 600;
    }

    .name {
        flex-grow: 1;
        white-space: nowrap;
    }

    .loading {
        text-align: center;
    }


    main {
        display: flex;
        flex-direction: row;
        align-items: stretch;
        padding: 0;
        margin-left: .15rem;
        min-width: min-content;
    }

    main:hover {
        box-shadow: 0 2px;
    }

</style>
