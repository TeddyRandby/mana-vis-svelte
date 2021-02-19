<script>
  import Fa from "svelte-fa"
  import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

  export let card

  let hover = false;

  const increment = () => {
          card.count = card.count + 1; 
      }
  const decrement = () => {
          card.count = card.count - 1; 
      }

  const onEnter = () => {
          hover = true;
      }
  const onLeave= () => {
          hover = false;
      }

</script>

<main on:mouseenter={onEnter} on:mouseleave={onLeave}>
    <p><strong>{card.count}</strong> {card.name}</p>
    <button class:hover on:click={increment}><Fa icon={faPlus} size="sm"/></button>
    <button class:hover on:click={decrement}><Fa icon={faMinus} size="sm"/></button>
</main>

<style>
    p {
        cursor: pointer;
        margin: auto;
        flex-grow: 1;
    }

    main {
        display: flex;
        flex-direction: row;
        align-items: stretch;
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
        margin-bottom: 0;
        padding: .5rem;
	      text-transform: uppercase;
	      letter-spacing: 1px;
	      font-weight: 700;
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
