<script lang="ts">
  import { nav } from "$lib/stores";
  export let dashboard: string;
</script>

<nav
  class="group relative flex h-8 w-8 flex-col items-end justify-start"
  on:click={() => {
    $nav = !$nav;
  }}
>
  <div
    class="group absolute left-1/2 top-1/2 block w-8 -translate-x-1/2 -translate-y-1/2 transform"
    class:z-20={$nav}
  >
    <span
      aria-hidden="true"
      class="absolute block h-[2px] w-6 {$nav == true
        ? 'bg-gray-600'
        : 'bg-black group-hover:bg-gray-300 dark:bg-white dark:group-hover:bg-gray-500'} transform transition duration-300 ease-in-out"
      class:rotate-45={$nav}
      class:-translate-y-1.5={!$nav}
    />
    <span
      aria-hidden="true"
      class="absolute block h-[2px] w-6 {$nav == true
        ? 'bg-gray-600'
        : 'bg-black group-hover:bg-gray-400 dark:bg-white dark:group-hover:bg-gray-700'}  transform transition duration-300 ease-in-out"
      class:opacity-0={$nav}
    />
    <span
      aria-hidden="true"
      class="absolute block h-[2px] w-6 {$nav == true
        ? 'bg-gray-600'
        : 'bg-black group-hover:bg-gray-500 dark:bg-white dark:group-hover:bg-gray-900'}  transform transition duration-300 ease-in-out"
      class:-rotate-45={$nav}
      class:translate-y-1.5={!$nav}
    />
  </div>
</nav>
