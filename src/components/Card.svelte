<script>
  import Fa from "svelte-fa"
  import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import hypergeo from "../utils/hypergeo";
import { production } from "../stores";

  export let card

  let hover = false;

  const increment = () => {
          if (card.count < 4 || card.name.match(/(Forest)|(Mountain)|(Swamp)|(Island)|(Plains)|(Wastes)/g))
            card.count = card.count + 1; 
      }
  const decrement = () => {
          if (card.count > 1)
          card.count = card.count - 1; 
      }

  const onEnter = () => {
          hover = true;
      }
  const onLeave= () => {
          hover = false;
      }

 
  let manaScore
  $:if (card.mana_cost) manaScore = hypergeo(60,$production[card.color_identity[0]] , 7 + card.cmc, card.mana_cost.match(card.color_identity[0]).length)
  $:success = manaScore >= 90
  $:warning = manaScore >= 80 && manaScore < 90 
  $:error = manaScore < 80


</script>

<main on:mouseenter={onEnter} on:mouseleave={onLeave}>
    <p class="name"><strong>{card.count}</strong> {card.name}</p>
    {#if manaScore}<p class:success class:warning class:error>{Math.round(manaScore) || ""}</p> {/if}
    <button class:hover on:click={increment}><Fa icon={faPlus} size="sm"/></button>
    <button class:hover on:click={decrement}><Fa icon={faMinus} size="sm"/></button>
</main>

<style>
    p {
        cursor: pointer;
        margin: auto;
    }

    .name {
        flex-grow: 1;
    }

    .success {
        color: var(--success-color)
    }
    .warning{
        color: var(--warning-color)
    }
    .error{
        color: var(--error-color)
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

    button, p {
        border: none;
	      font-family: inherit;
	      font-size: inherit;
	      color: inherit;
	      background: none;
	      cursor: pointer;
	      display: inline-block;
        margin: 0;
        padding: .5rem;
	      letter-spacing: 2px;
	      font-weight: 600;
	      outline: none;
	      position: relative;
	      -webkit-transition: all 0.3s;
	      -moz-transition: all 0.3s;
	      transition: all 0.3s;
        z-index: 0;
    }

    button:after, p:after {
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

    button:hover,
    button:active,
    p:hover, p:active {
	      color: var(--background-color-dark);
    }

    button:hover:after,
    button:active:after,
    p:hover:after,
    p:active:after {
	      height: 100%;
    }
    
    

</style>
