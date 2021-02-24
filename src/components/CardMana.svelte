<script>
  import { thisClass } from "../actions"

  export let pips

  function classFromPip(pip) {
      return 'ms-' + pip.colors.toLowerCase();
  } 


  
</script>

<main>
  {#each pips as pip}
    {#if pip.colors}
      {#each Array(pip.amount) as _}
        <i class="ms ms-cost ms-shadow" use:thisClass={classFromPip(pip)}/>
      {/each}
    {:else}
      <i class="ms ms-cost ms-shadow" use:thisClass={"ms-" + pip.amount}/>
    {/if}
  {/each}

</main>

<style>
  main {
    display: flex;
    flex-direction: row;
    place-items: center;
  }

</style>
