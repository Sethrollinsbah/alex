<script>
  import SvelteMarkdown from 'svelte-markdown';
  import Link from './Link.svelte';
  import Header from './Header.svelte';
  import Para from './Para.svelte';
  import Strong from './Strong.svelte';
  export let ordered;
  export let start;
  export let body;
  export let items;
</script>

{#if ordered}
  <ol {start}><slot /></ol>
{:else}
  <ul class="ml-4 list-disc text-gray-600 dark:text-gray-400">
    {#each items as i}
      <li>
        <SvelteMarkdown
          source={i.text}
          renderers={{Header, text: Para, Strong}}
        />
      </li>
    {/each}
  </ul>
{/if}
