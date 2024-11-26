<script>
  import {twMerge} from 'tailwind-merge';
  import {afterUpdate} from 'svelte';

  export let isOpen = false; // Set to true to open the dropdown by default
  export let searchTerm = '';

  const toggleDropdown = () => {
    isOpen = !isOpen;
  };
  export let items = [
    {
      text: 'Upps'
    }
  ];

  afterUpdate(() => {});
  export let className = '';
  export let theme_name = 'country';
  export let option = '';

  export let dialog; // HTMLDialogElement

  $: if (dialog && isOpen) dialog.showModal();
</script>

<div
  class={twMerge('flex h-fit w-full items-center justify-center', className)}
>
  <div class="relative w-full">
    <button
      on:click={toggleDropdown}
      class="z-50 inline-flex h-16 w-full items-end justify-between rounded-md border border-gray-300 bg-gray-50 px-3 pb-1 pt-2 text-base font-medium text-gray-700 shadow-sm focus:outline-none dark:border-gray-700 dark:bg-gray-950"
    >
      <span class="relative h-full w-full">
        <p
          class:top-0={option.length !== 0}
          class:text-xs={option.length !== 0}
          class:text-gray-600={option.length !== 0}
          class:dark:text-gray-500={option.length !== 0}
          class:top-4={option.length === 0}
          class="absolute line-clamp-1 flex w-full flex-row items-center justify-start capitalize text-gray-800 transition-all duration-100 ease-in-out dark:text-gray-200"
        >
          <span class="hidden w-fit sm:flex">Select </span>
          <span class="sm:ml-1">{theme_name}</span>
        </p>
        <p
          class:opacity-100={option.length !== 0}
          class:pl-1={option.length !== 0}
          class:opacity-0={option.length === 0}
          class:text-gray-800={option.length !== 0}
          class:dark:text-gray-200={option.length !== 0}
          class="absolute bottom-2 text-gray-800 transition-all duration-100 ease-in-out dark:text-gray-200"
        >
          {option}
        </p>
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="absolute right-2 top-1/2 size-4 -translate-y-1/2"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    <dialog
      on:close={() => (isOpen = false)}
      on:click|self={() => dialog.close()}
      bind:this={dialog}
      class=" z-50 m-auto max-h-48 w-[80%] max-w-sm space-y-1 overflow-y-scroll rounded-md bg-gray-100 p-1 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-900"
    >
      <div on:click|stopPropagation class="relative">
        <!-- Search input -->
        <input
          bind:value={searchTerm}
          class="block w-full rounded-md border border-gray-300 bg-transparent px-4 py-2 text-gray-800 focus:outline-none dark:border-gray-700 dark:text-gray-200"
          type="text"
          placeholder={`Find ${theme_name}`}
          autocomplete="off"
        />
        <!-- Dropdown content goes here -->
        <slot name="items">
          {#each items.filter(c => c.text
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) as item}
            <button
              on:click={() => {
                option = item.text;
                isOpen = false;
                dialog.close();
              }}
              class="block w-full cursor-pointer rounded-md px-4 py-2 text-start text-gray-600 hover:bg-gray-200 dark:text-gray-500 dark:hover:bg-gray-800"
              >{item.text}</button
            >
          {/each}
        </slot>
      </div>
    </dialog>
  </div>
</div>

<style>
  dialog > div {
    padding: 1em;
  }
  dialog[open] {
    animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
</style>
