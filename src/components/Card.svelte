<script>
  import {fade} from "svelte/transition"
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
    <p><span>{card.count}</span> {card.name}</p>
    {#if hover}
        <button transition:fade={{duration: 200}} on:click={increment}>+</button>
        <button transition:fade={{duration: 200}} on:click={decrement}>-</button>
    {/if}
</main>

<style>
    p {
        font-size: large;
        cursor: pointer;
        transition: color .2s ease-in-out;
        flex-grow: 1;
    }

    main:hover {
        background-image: linear-gradient(to right, var(--background-color-dark) , var(--primary-color) 800%);
        box-shadow: 0 2px;
    }

    button {
        margin: auto;
        cursor: pointer;
        border: none;
        background-color: transparent;
        color: var(--primary-color);
        transition: color .2s ease-in-out;
        font-size: 2rem;
        padding: .5rem
    }

    button:hover,button:focus {
        border: none;
        color: var(--accent-color);
    }

    main {
        display: flex;
        padding: 0 .25rem;
        flex-direction: row;
        align-items: stretch;
        margin: .25rem;
        max-width: 50ch;
    }
</style>
