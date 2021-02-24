<script>
  import Fa from "svelte-fa"
  import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
  import { scores } from "../stores"
  import { slide, fade } from "svelte/transition"
  import CardIcons from "./CardIcons.svelte";
  import CardMana from "./CardMana.svelte"

  export let card
  let hovered = false

  const onEnter = () => {
    hovered = true;
  }

  const onLeave = () => {
    hovered = false;
  }

</script>

<main in:slide={{duration: 800}}>
    <div on:mouseenter={onEnter} on:mouseleave={onLeave} class="name hoverable">
        <p><strong>{card.count}</strong> {card.name}</p>
        {#if hovered}
            <span in:fade={{delay: 300}}>
                <CardMana pips={card.pips}/>
            </span>
        {/if}
    </div>
    {#await $scores}
        <div class="hoverable loading">
            <Fa icon={faCircleNotch} class="rotate"/>
        </div> 
    {:then cardScores}
        {#if cardScores[card.name]}
            <CardIcons score={cardScores[card.name]} bind:card />
        {:else}
            <div class="hoverable loading">
                <Fa icon={faCircleNotch} class="rotate"/>
            </div> 
        {/if}
    {/await}
</main>

<style>
    div {
        cursor: pointer;
        margin: 0;
        padding: .35rem;
	      letter-spacing: 2px;
        font-size: smaller;
	      font-weight: 600;
    }

    p {
        margin: 0;
        padding: 0;
        flex-shrink: 1;
    }

    span {
        flex-grow: 1;
        display: flex;
        flex-wrap: nowrap;
        justify-content: flex-end;
	      letter-spacing: 0px;
    }

    .name {
        flex-grow: 1;
        white-space: nowrap;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        align-items: stretch;
    }

    .loading {
        text-align: center;
    }


    main {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        padding: 0;
        margin-left: .15rem;
        min-width: min-content;
    }

</style>
