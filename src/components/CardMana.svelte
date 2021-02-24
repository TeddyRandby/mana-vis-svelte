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
        <i class="ms ms-cost" use:thisClass={classFromPip(pip)}/>
      {/each}
    {:else}
      <i class="ms ms-cost" use:thisClass={"ms-" + pip.amount}/>
    {/if}
  {/each}

</main>

<style>
  main {
    font-size: inherit;
  }
</style>
