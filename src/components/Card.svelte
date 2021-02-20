<script>
  import Fa from "svelte-fa"
  import {fade} from "svelte/transition"
  import { faPlus, faMinus, faCheckCircle, faExclamationCircle, faTimesCircle, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
  import { scores } from "../stores"

  export let card
  let scoreHovered = false;

  const increment = () => {
          if (card.count < 4 || card.name.match(/(Forest)|(Mountain)|(Swamp)|(Island)|(Plains)|(Wastes)/g))
            card.count = card.count + 1; 
      }
  const decrement = () => {
          if (card.count > 1)
          card.count = card.count - 1; 
      }

      const onEnter = () => {
              scoreHovered = true;
      }

      const onLeave = () => {
              scoreHovered = false;
      }

</script>

<main>
    <p class="name hoverable"><strong>{card.count}</strong> {card.name}</p>
    {#await $scores}
        <p class="hoverable loading">
            <Fa icon={faCircleNotch} class="rotate"/>
        </p> 
    {:then data}
        {#if data[card.name]}
        <p class="hoverable" on:mouseenter={onEnter} on:mouseleave={onLeave} class:success={data[card.name][0] > 0.8} class:warning={data[card.name][0] > 0.6} class:error={data[card.name][0] < 0.6}>
            {#if scoreHovered}
                <div in:fade class="stats">
                    <span >({Math.round(100 * (data[card.name])[0])})</span>
                    <span >({Math.round((($scores[card.name])[1] + Number.EPSILON) * 10) / 10})</span>
                    <span >({Math.round(100 * ($scores[card.name])[2])})</span>
                </div>
            {:else if data[card.name][0] > 0.8}
                <Fa icon={faCheckCircle}/>
            {:else if data[card.name][0] > 0.6}
                <Fa icon={faExclamationCircle}/>
            {:else if data[card.name][0] !== 0}
                <Fa icon={faTimesCircle}/>
            {/if}
        </p> 
        {:else}
            <p class="hoverable loading">
                <Fa icon={faCircleNotch} class="rotate"/>
            </p> 
        {/if}
    {/await}
    {#if !scoreHovered }
        <button class="hoverable" on:click={increment}><Fa icon={faPlus} /></button>
        <button class="hoverable" on:click={decrement}><Fa icon={faMinus} /></button>
    {/if}
</main>

<style>
    p, button {
        cursor: pointer;
        margin: 0;
        padding: .5rem;
	      letter-spacing: 2px;
	      font-weight: 600;
    }

    .name {
        flex-grow: 1;
    }

    .stats {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
    }

    main {
        display: flex;
        flex-direction: row;
        align-items: stretch;
        margin-left: .15rem;
    }

    main:hover {
        box-shadow: 0 2px;
    }

    .hoverable {
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

    .hoverable:after {
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

    .hoverable:hover,
    .hoverable:active
    {
	      color: var(--background-color-dark);
    }

    .hoverable:hover:after,
    .hoverable:active:after
     {
	      height: 100%;
    }

    .success, .warning, .error, .loading  {
        text-align: center;
    }

    .warning {
        color: var(--warning-color);
    }
    .success {
        color: var(--success-color);
    }
    .error {
        color: var(--error-color);
    }

</style>
