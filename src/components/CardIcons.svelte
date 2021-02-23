<script>
  import Fa from "svelte-fa"
  import { faCheckCircle, faExclamationCircle, faTimesCircle, faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'
  import {fade} from "svelte/transition"

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
  {#if score[0] > 0}

  {#if !scoreHovered }
      <button in:fade={{delay: 50, duration: 100}} class="hoverable" on:click={decrement}><Fa icon={faMinus} /></button>
      <button in:fade={{delay: 100, duration: 100}} class="hoverable" on:click={increment}><Fa icon={faPlus} /></button>
  {/if}
  <p on:mouseenter={onEnter} on:mouseleave={onLeave} class:success={score[0] > 0.8} class:warning={score[0] > 0.6} class:error={score[0] < 0.6}>
    {#if scoreHovered}
      <div in:fade={{duration: 100}} class="stats hoverable">
        <span >({Math.round(100 * score[0])})</span>
        <span >({Math.round((score[1] + Number.EPSILON) * 10) / 10})</span>
        <span >({Math.round(100 * score[2])})</span>
      </div>
    {:else if score[0] > 0.8}
        <div in:fade={{duration: 100}}>
            <Fa icon={faCheckCircle}/>
        </div>
    {:else if score[0] > 0.6}
        <div in:fade>
            <Fa icon={faExclamationCircle}/>
        </div>
    {:else}
        <div in:fade>
            <Fa icon={faTimesCircle}/>
        </div>
    {/if}
  </p> 
  {/if}
</main>

<style>
  
  .stats {
    padding: .5rem;
	  letter-spacing: 2px;
	  font-weight: 600;
    display: flex;
    place-items: center;
    flex-direction: row;
    color: var(--background-color-dark);
  }

  p {
    margin: 0;
	  display: inline-block;
  }

  button {
    cursor: pointer;
    margin: 0;
    padding: .5rem;
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

</style>
