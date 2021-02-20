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

  $:score = Math.round(100 * $scores[card.name])


  $:success = score >= 85
  $:warning = score >= 60 && score < 95 
  $:error = score < 60


</script>

<main>
    <p class="name hoverable"><strong>{card.count}</strong> {card.name}</p>
    {#if score}
        <p class="hoverable" on:mouseenter={onEnter} on:mouseleave={onLeave} class:success class:warning class:error>
            {#if scoreHovered}
                <span in:fade>{score}</span>
            {:else if success}
                <Fa icon={faCheckCircle}/>
            {:else if warning}
                <Fa icon={faExclamationCircle}/>
            {:else if error}
                <Fa icon={faTimesCircle}/>
            {/if}
        </p> 
    {:else if score !== 0}
        <p class="hoverable" on:mouseenter={onEnter} on:mouseleave={onLeave} class:success class:warning class:error>
            <Fa icon={faCircleNotch} class="rotate"/>
        </p> 
    {/if}
    <button class="hoverable" on:click={increment}><Fa icon={faPlus} size="sm"/></button>
    <button class="hoverable" on:click={decrement}><Fa icon={faMinus} size="sm"/></button>
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

    .success {
        color: var(--success-color)
    }
    .warning {
        color: var(--warning-color)
    }
    .error {
        color: var(--error-color)
    }
</style>
