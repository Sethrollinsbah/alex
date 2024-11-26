<script lang="ts">
	import { formatPhone, phoneFormats } from '$lib/formatPhoneNumber';
	import Input from './Input.svelte';
	import country_codes from '$lib/country_codes.json';
	import { afterUpdate } from 'svelte';

	export let items = [
		{
			text: 'Upps'
		}
	];

	afterUpdate(() => {});
	export let className = '';
	export let valu = 'Phone';
	export let theme_name = 'country';
	export let option = '';
	export let show = false;
	export let number: string | null = '';
	export let code: string | null = 'US';
	export let search_country_code = '';

	let dialog: HTMLDialogElement; // HTMLDialogElement

	$: if (dialog && show) dialog.showModal();
</script>

<div class=" relative col-span-2 h-fit w-full sm:col-span-1">
	<Input
		type="tel"
		boolean_disabled={false}
		placeholder={valu}
		className="overflow-clip "
		placeholder_eg={formatPhone('12345678901', phoneFormats[code])}
		{code}
		iconavail={true}
		bind:value_place={number}
	>
		<svelte:fragment slot="icon">
			<form class="relative pt-4">
				<button
					disabled={false}
					id="states-button"
					on:click={() => {
						show = true;
					}}
					class="border-r-1 peer relative left-0 top-0 z-20 flex h-full w-14 items-center justify-center border-gray-900 text-center text-sm font-medium focus:outline-none dark:border-gray-100"
					type="button"
				>
					{#each country_codes.filter((c) => c.code === code) as c}
						{#if c.code}
							<p class="ml-4 w-4 bg-transparent text-xl">{c.flag}</p>
						{/if}
					{/each}
					<svg
						class:rotate-180={!show}
						class="ml-1 size-5 stroke-black dark:stroke-white"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
							id="SVGRepo_tracerCarrier"
							stroke-linecap="round"
							stroke-linejoin="round"
						></g><g id="SVGRepo_iconCarrier">
							<path d="M7 14.5L12 9.5L17 14.5" stroke-linecap="round" stroke-linejoin="round"
							></path>
						</g></svg
					>
				</button>
				<dialog
					on:close={() => (show = false)}
					on:click|self={() => dialog.close()}
					bind:this={dialog}
					class=" z-50 m-auto max-h-48 w-[80%] max-w-sm space-y-1 overflow-y-scroll rounded-md bg-gray-100 p-1 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-900"
				>
					<div on:click|stopPropagation class="relative">
						<input
							bind:value={search_country_code}
							class="block w-full rounded-md border border-gray-300 bg-transparent px-4 py-2 text-gray-800 focus:outline-none dark:border-gray-700 dark:text-gray-200"
							type="text"
							placeholder={`Find ${theme_name}`}
							autocomplete="off"
						/>
						<!-- Dropdown content goes here -->
						{#each country_codes.filter((country) => country.name
								.toLowerCase()
								.includes(search_country_code.toLowerCase())) as c}
							<button
								on:click={() => {
									code = c.code;
									if (number) {
										const cleaned = number.replace(/\D/g, '');

										number = formatPhone(cleaned, phoneFormats[code]);
										show = false;
										dialog.close();
									}
								}}
								class="block w-full cursor-pointer rounded-md px-4 py-2 text-start text-gray-600 hover:bg-gray-200 dark:text-gray-500 dark:hover:bg-gray-800"
								>{c.name}</button
							>
						{/each}
					</div>
				</dialog>
			</form>
		</svelte:fragment>
	</Input>
</div>

<style>
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
</style>
