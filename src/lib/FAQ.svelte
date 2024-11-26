<script lang="ts">
	export let title = '';
	export let faq;
	import * as Table from '$lib/components/ui/table';
	import InsureLogo from './content/InsureLogo.svelte';
	import Text from '$lib/text.svelte';
</script>

<!-- {JSON.stringify(faq)} -->
<!-- <Table.Root class="mx-auto w-[90%] max-w-4xl"> -->
<!-- 	<Table.Caption>A list of your recent invoices.</Table.Caption> -->
<!-- 	<Table.Header> -->
<!-- 		<Table.Row> -->
<!-- 			<Table.Head class="w-1/2 ">Included Benefit</Table.Head> -->
<!-- 			<Table.Head class="w-5/16 text-blue-500"><InsureLogo></InsureLogo></Table.Head> -->
<!-- 			<Table.Head class="w-3/16 font-light">Traditional</Table.Head> -->
<!-- 		</Table.Row> -->
<!-- 	</Table.Header> -->
<!-- 	<Table.Body class="border-t-[1px] border-accent"> -->
<!-- 		<Table.Row> -->
<!-- 			<Table.Cell class="w-1/2 font-medium">INV001</Table.Cell> -->
<!-- 			<Table.Cell class="w-[5/16] bg-blue-200">Paid</Table.Cell> -->
<!-- 			<Table.Cell class="w-[3/16] ">Credit Card</Table.Cell> -->
<!-- 		</Table.Row> -->
<!-- 	</Table.Body> -->
<!-- </Table.Root> -->
<!---->
<section
	class="relative mx-auto grid h-fit w-[90%] max-w-6xl grid-cols-[60px_1fr] gap-x-4 space-y-8 sm:grid-cols-[100px_1fr] lg:grid-cols-[200px_1fr]"
>
	{#each Object.entries(faq) as [key, value]}
		<div class="mx-auto flex w-full flex-col items-start justify-start pr-2 pt-8">
			<p class="sticky top-20 text-xl font-semibold text-gray-700 sm:text-2xl md:text-3xl">
				{value[0]}
			</p>
		</div>
		<div class="mx-auto flex h-full w-[90%] flex-col items-start justify-start">
			<div class="mx-auto flex w-full flex-col divide-y-[1px] divide-gray-300">
				{#each value[1] as f}
					<div class="my-2 h-fit w-full max-w-xl">
						<button
							on:click={() => {
								f[2] = !f[2];
							}}
							class="flex w-full items-center justify-between"
						>
							<p
								class="my-auto w-fit translate-y-2 text-start text-lg font-light text-gray-500 md:text-xl"
							>
								{f[0]}
							</p>
							<div class="relative mt-1 h-8 w-8">
								<svg
									viewBox="0 0 24 24"
									class:rotate-45={f[2] === true}
									class="stroke-gray-500 transition-all duration-100"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
										id="SVGRepo_tracerCarrier"
										stroke-linecap="round"
										stroke-linejoin="round"
									></g><g id="SVGRepo_iconCarrier">
										<path
											d="M7 12L12 12M12 12L17 12M12 12V7M12 12L12 17"
											stroke-width="1"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
									</g></svg
								>
							</div>
						</button>
						<p
							class:hidden={f[2] === false}
							class="overflow-clip py-4 text-start text-sm font-light sm:text-sm md:text-base"
						>
							{f[1]}
						</p>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</section>
