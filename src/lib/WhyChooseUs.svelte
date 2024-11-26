<script lang="ts">
	import * as Popover from '$lib/components/ui/popover';
	import { Button } from '$lib/components/ui/button';
	import { Check, X } from 'lucide-svelte';
	import * as Table from '$lib/components/ui/table';
	import InsureLogo from '$lib/content/InsureLogo.svelte';

	let why_us = [
		[
			'Continuation of Coverage',
			true,
			false,
			'COBRA allows you to maintain the same health insurance plan you had while employed, ensuring continuity in care.'
		],
		[
			'No Pre-existing Condition Exclusions',
			true,
			false,
			'You cannot be denied coverage for pre-existing conditions, which is crucial for those with health issues needing ongoing medical care.'
		],
		[
			'Flexible Duration',
			true,
			false,
			'Coverage can last for 18-36 months, providing a temporary safety net while finding a long term solution.'
		],
		[
			'Access to Network Providers',
			true,
			false,
			'You can continue to see the same doctors and use the same healthcare facilities.'
		],
		[
			'Cost',
			true,
			false,
			'You typically have to pay the full premium (including the portion previously covered by the employer) plus a 2% administrative fee, resulting in 2-4x the previous monthly costs.'
		],
		[
			'Limited Duration',
			true,
			false,
			'COBRA is temporary and is not sufficient for long-term health coverage needs.'
		],
		[
			'Complexity',
			true,
			false,
			'The process of enrolling in COBRA can be complicated, with strict timelines and requirements.'
		],
		[
			'No Control Over Changes to Your Plan',
			true,
			false,
			"If your former employer changes their company's health plan, your COBRA plan will also change, and you won’t have the option to choose a different plan or keep your previous one."
		]
	];
	let showMore = false; // To control if we show more entries

	// Reactive array to control the display based on showMore
	$: displayedBenefits = showMore ? why_us : why_us.slice(0, 3);
</script>

<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Head class="max-w-1/2">Included Benefit</Table.Head>
			<Table.Head class="min-w-5/16 hidden text-blue-500 md:block"><InsureLogo /></Table.Head>
			<Table.Head class="min-w-5/16 text-blue-500 md:hidden"><InsureLogo hide={true} /></Table.Head>
			<Table.Head class="min-w-3/16 font-light">Traditional</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each displayedBenefits as wu, i}
			<Table.Row class="border-t-[1px] border-accent">
				<Popover.Root>
					<Popover.Trigger
						><Table.Cell class=" max-w-1/2 font-medium hover:underline">{wu[0]}</Table.Cell
						></Popover.Trigger
					>
					<Popover.Content>{wu[3]}</Popover.Content>
				</Popover.Root>

				<Table.Cell class="w-full min-w-[5/16] bg-blue-200">
					{#if wu[1]}
						<Check class="mx-auto text-blue-900" />
					{:else}
						<X class="mx-auto text-blue-900" />
					{/if}
				</Table.Cell>
				<Table.Cell class="min-w-[3/16]">
					{#if wu[2]}
						<Check class="mx-auto text-gray-500" />
					{:else}
						<X class="mx-auto text-gray-500" />
					{/if}
				</Table.Cell>
			</Table.Row>
		{/each}
		<Table.Row class="h-24 border-t-[1px] border-accent">
			<Table.Cell class="w-1/2 font-medium">
				<button
					on:click={() => {
						showMore = !showMore;
					}}
					class="hover:underline"
				>
					{showMore ? 'See Less' : 'See More'}
				</button>
			</Table.Cell>
			<Table.Cell class="relative w-[5/16] bg-blue-200 px-4">
				<Button
					class="absolute  bottom-1/2 left-1/2 mx-auto -translate-x-1/2 translate-y-1/2 rounded-full bg-blue-800"
				>
					Enroll Now
				</Button>
			</Table.Cell>
			<Table.Cell class="w-[3/16]"></Table.Cell>
		</Table.Row>
	</Table.Body>
</Table.Root>
