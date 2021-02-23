<script>
  import Fa from "svelte-fa"
  import { faCheckCircle, faExclamationCircle, faTimesCircle, faPlus, faMinus, faBan} from '@fortawesome/free-solid-svg-icons'
  import {fade, slide} from "svelte/transition"

  let scoreHovered = false
  export let card
  export let score

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
        setTimeout(()=>{
          scoreHovered = false;
        }, 300)
      }

</script>

<main>
  {#if !scoreHovered }
      <button in:slide class="hoverable" on:click={decrement}><Fa icon={faMinus} /></button>
      <button in:slide class="hoverable" on:click={increment}><Fa icon={faPlus} /></button>
  {/if}

  <p on:mouseenter={onEnter} on:mouseleave={onLeave} class:success={score[0] > 0.8} class:warning={score[0] > 0.6} class:error={score[0] < 0.6} class:invalid={score[0]===0}>
    {#if scoreHovered}
      <div in:fade={{duration: 100}} class="stats hoverable">
        <span >({Math.round(100 * score[0])})</span>
        <span >({Math.round((score[1] + Number.EPSILON) * 10) / 10})</span>
        <span >({Math.round(100 * score[2])})</span>
      </div>
    {:else if score[0] > 0.8}
        <div in:slide>
            <Fa icon={faCheckCircle} size="sm"/>
        </div>
    {:else if score[0] > 0.6}
        <div in:slide>
            <Fa icon={faExclamationCircle} size="sm"/>
        </div>
    {:else if score[0] !== 0}
        <div in:slide>
            <Fa icon={faTimesCircle} size="sm"/>
        </div>
    {:else}
        <div in:slide>
            <Fa icon={faBan} size="sm"/>
        </div>
    {/if}
  </p> 
</main>

<style>

  main {
    font-size: smaller;
  }
  
  .stats {
	  letter-spacing: 3px;
	  font-weight: 600;
    font-size: inherit;
    margin: 0;
    height:100%;
    padding: 0 0.5rem;
    display: flex;
    place-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
    color: var(--background-color-dark);
  }

  p {
    margin: 0;
    height: 100%;
	  display: inline-block;
  }

  button {
    cursor: pointer;
    margin: 0;
	  letter-spacing: 2px;
	  font-weight: 600;
  }

  .success, .warning, .error {
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
  .invalid {
    color: var(--primary-color);
    opacity: 50%;
  }

</style>
