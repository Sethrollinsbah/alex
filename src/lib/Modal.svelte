<script>
  export let showModal; // boolean

  let dialog; // HTMLDialogElement

  $: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
  bind:this={dialog}
  class="h-fit max-h-[35rem] w-[90%] max-w-md overflow-x-clip overflow-y-scroll bg-gray-50 text-gray-950 ring-2 ring-gray-100 dark:bg-gray-950 dark:text-gray-50 dark:ring-gray-900"
  on:close={() => (showModal = false)}
  on:click|self={() => {
    dialog.close();
  }}
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div on:click|stopPropagation class="relative">
    <div class="flex w-full items-start justify-between space-x-4">
      <p class="text-xl font-normal">
        <slot name="header" />
      </p>
      <button on:click={() => dialog.close()}
        ><svg
          class="size-6 rounded-md stroke-gray-900 stroke-1 hover:bg-gray-900/10 dark:stroke-gray-100 dark:hover:bg-gray-100/10"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g><g id="SVGRepo_iconCarrier">
            <g id="Menu / Close_SM">
              <path
                id="Vector"
                d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </g>
          </g></svg
        ></button
      >
    </div>
    <hr class="my-2 opacity-20" />
    <div class="px-1">
      <slot />
    </div>
    <hr class="my-2 opacity-40" />
    <div
      class="sticky bottom-0 z-20 flex w-full items-center bg-gray-50 py-2 dark:bg-gray-950"
    >
      <slot name="footer" />
    </div>
    <!-- svelte-ignore a11y-autofocus -->
  </div>
</dialog>

<style>
  dialog {
    max-width: 32em;
    border-radius: 0.2em;
    border: none;
    padding: 0;
  }
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }
  dialog > div {
    padding: 1em;
  }
  dialog[open] {
    animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  @keyframes zoom {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }
  dialog[open]::backdrop {
    animation: fade 0.2s ease-out;
  }
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  button {
    display: block;
  }
</style>
