<!-- ListItem.svelte -->

<script>
  export let text = "";
  export let task = false;
  export let checked = true;
</script>

{#if task}
  <div class:completed={checked}>
    <input type="checkbox" bind:checked />
    <span>{text}</span>
  </div>
{:else}
  <span class="text-gray-400">{text}</span>
{/if}

<style>
  .completed {
    text-decoration: line-through;
  }
</style>
