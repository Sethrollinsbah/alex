<script lang="ts">
	import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date';

	import Quiz from './Quiz.svelte';
	import InsureLogo from './content/InsureLogo.svelte';
	import Renderer from './markdown/renderer.svelte';
	import { onMount } from 'svelte';

	export let filecontent2,
		filecontent1,
		filecontent3,
		filecontent4,
		filecontent5,
		section_one,
		section_two,
		data;
	export let company = ['/aetna.png', '/cigna.png', '/blue_cross.png', '/united_healthcare.png'];

	let value: DateValue | undefined = undefined;
	let form_q = {
		name: {
			value: '',
			placeholder: 'Name',
			eg: 'Carl'
		},
		house: ['1', '2', '3', '4+'],
		age: value,
		zip: '',
		phone: '',
		email: ''
	};

	type CustomerData = {
		coverage_type: string;
		name: string | null;
		lastName: string | null;
		phone: string;
		code: string; // Assuming 'US' is a string code
		dob: string | null; // Date of birth as a string (e.g., "YYYY-MM-DD"), or use `Date` if needed
		house: string;
		age: DateValue | undefined; // `undefined` by default
		zip: string | null;
		email: string;
	};

	let customer_data: CustomerData = {
		coverage_type: '',
		name: null,
		lastName: null,
		phone: '',
		code: 'US',
		dob: null,
		house: '',
		age: undefined,
		zip: null,
		email: ''
	};

	let show = 0;
	let show_percent = 1;

	$: show_percent = parseFloat((1 - show / 6).toFixed(2)) * 100;
	export let background = '/bg.jpg';
</script>

<section
	class="relative mb-24 flex h-[80vh] min-h-[30rem] w-full flex-col items-center justify-between bg-gray-300 pt-32"
>
	<div
		class={`absolute left-0 top-0 h-full w-full overflow-clip bg-cover bg-center`}
		style={`background-image: url(${background})`}
	>
		<div
			class="absolute left-0 top-0 size-96 -translate-x-1/2 -translate-y-1/2 scale-125 rounded-full ring-1 ring-gray-600/20"
		></div>
		<div
			class="absolute left-0 top-0 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full ring-1 ring-gray-600/30"
		></div>
		<div
			class="absolute bottom-0 right-0 size-96 translate-x-1/2 translate-y-3/4 scale-150 rounded-full ring-1 ring-gray-600/20"
		></div>
		<div
			class="absolute bottom-0 right-0 size-96 translate-x-1/2 translate-y-1/2 rounded-full ring-1 ring-gray-600/30"
		></div>
		<div class="absolute left-0 top-0 h-full w-full bg-black/50"></div>
	</div>
	<div
		class="flex h-full w-[90%] flex-col items-start justify-start md:grid md:grid-cols-2 md:items-center"
	>
		<div
			class="mb-auto flex w-full max-w-sm flex-col items-start justify-start md:max-w-none md:items-start"
		>
			<p
				class="relative z-10 mt-20 w-full bg-gradient-to-br from-gray-100/80 via-gray-100 to-gray-200 bg-clip-text text-start text-3xl font-bold text-transparent sm:text-4xl lg:text-5xl"
			>
				<span
					class="absolute -top-8 rounded-full bg-blue-200 px-2 py-1 text-xs font-light text-blue-700 ring-1 ring-blue-700 sm:text-sm"
					>{data.lang === 'es' ? 'Mejor calificado en your State' : 'Top Rated in your State'}</span
				>
				<slot name="Title">
					<span class:hidden={data.lang !== 'es'}>Alternativa<br />a burial asequible</span>
					<span class:hidden={data.lang === 'es'}>Affordable<br />burial Alternative</span>
				</slot>
			</p>
			<p
				class="z-10 bg-gradient-to-br from-gray-100/80 via-gray-100 to-gray-200 bg-clip-text text-start text-base font-bold text-transparent md:relative"
			>
				<slot name="Subtitle">
					<span class="text-base font-light"
						>View the available coverage in your state, with the flexibility to apply & enroll
						online</span
					>
				</slot>
			</p>
		</div>
		<div
			id="enroll"
			class="absolute top-0 h-full w-full scale-75 object-cover opacity-50 md:relative md:scale-100 md:opacity-100"
		></div>
	</div>
	<Quiz {data} {customer_data} {show_percent} {show} {value} {form_q}></Quiz>
</section>
<div class="grid w-[90%] max-w-xl grid-cols-2 items-center justify-evenly pt-16 sm:flex">
	{#each company as c}
		<img alt="insurance company" src={c} class="mx-auto size-16 object-contain" />
	{/each}
</div>
<div class="mt-4 h-[1px] w-[80%] max-w-sm bg-gray-200"></div>
<p id="benefits" class="font-bold text-gray-500">
	{section_one.category}
</p>
<div class="grid w-[90%] grid-cols-1 gap-6 pt-8 lg:grid-cols-[1fr_400px]">
	<div class="mx-auto max-w-3xl">
		<p class="max-w-2xl text-start text-2xl font-bold text-gray-700 sm:text-3xl lg:text-4xl">
			{section_one.header}
		</p>
		<p class="my-4 max-w-3xl text-start text-base font-light text-gray-500 sm:text-lg lg:text-xl">
			{section_one.subheader}
		</p>
		<div class=" w-[90%] max-w-4xl gap-6">
			{#each section_one.content as hiw}
				<div class="mt-4 h-fit w-full rounded-2xl text-start">
					<p class="text-xl font-bold text-gray-500">
						{hiw[0]}
					</p>
					<p class="text-lg font-light text-gray-500">
						{hiw[1]}
					</p>
				</div>
			{/each}
		</div>
	</div>
	<div
		class="group relative mx-auto flex aspect-video h-full w-full max-w-sm flex-col justify-between overflow-clip rounded-lg bg-blue-500 bg-cover p-4 text-center font-serif shadow-xl md:max-w-none"
		style={`background-image: url(${section_one.background})`}
	>
		<div
			class="absolute left-0 top-0 h-full w-full bg-black/50 opacity-100 transition-all duration-300 group-hover:opacity-0"
		></div>

		<div class="z-10 opacity-100 transition-all duration-300 group-hover:opacity-0">
			<div class="flex flex-row justify-between">
				<InsureLogo></InsureLogo>
			</div>
		</div>

		<div class="z-10 opacity-100 transition-all duration-300 group-hover:opacity-0">
			<!-- <a -->
			<!-- 	class="mb-2 rounded-md bg-gray-100 px-2 py-1 text-blue-800 ring-1 ring-blue-200" -->
			<!-- 	href="mailto:info@cobrainsure.org?subject=Inquiry%20About%20Burial%20Alternatives&body=Hello,%0A%0AI'm%20interested%20in%20learning%20more%20about%20your%20services.%20Could%20you%20please%20provide%20more%20information?%0A%0AThank%20you!" -->
			<!-- 	>Email us</a -->
			<!-- > -->
			<p class="mt-auto text-xs text-blue-100">
				cobrainsure.org helps connect customers with COBRA Insurance plans. Please contact our
				Licenced Insurance Agent.
			</p>
		</div>
	</div>
</div>

<div class="mt-8 h-[1px] w-[80%] max-w-sm bg-gray-200"></div>
<p class="font-bold text-gray-500">
	{section_two.category}
</p>
<div class="w-[90%]">
	<p class="mx-auto max-w-2xl text-center text-2xl font-bold text-gray-700 sm:text-3xl lg:text-4xl">
		{section_two.header}
	</p>
	<p
		class="mx-auto my-4 max-w-3xl text-center text-base font-light text-gray-500 sm:text-lg lg:text-xl"
	>
		{section_two.subheader}
	</p>
</div>
<div class="grid w-[90%] max-w-4xl gap-6 md:grid-cols-3">
	{#each section_two.content as hiw}
		<div class="h-fit w-full rounded-2xl bg-gray-50 p-8 text-center shadow">
			<p class="text-2xl font-bold text-gray-800">
				{hiw[0]}
			</p>
			<p class="text-lg font-light text-gray-500">
				{hiw[1]}
			</p>
		</div>
	{/each}
</div>
<div class="mt-8 grid grid-cols-1 gap-8 bg-blue-100 px-8 py-5">
	<div>
		<Renderer fileContent={filecontent1}></Renderer>
	</div>
	{#if filecontent3.length > 0}
		<div>
			<Renderer fileContent={filecontent2}></Renderer>
		</div>
	{/if}
</div>
{#if filecontent3.length > 0}
	<div class=" w-full px-8 py-5">
		<div class="mx-auto max-w-4xl">
			<Renderer fileContent={filecontent3}></Renderer>
		</div>
	</div>
{/if}
{#if filecontent4.length > 0 || filecontent5.length > 0}
	<div class="grid h-fit w-full grid-cols-1 gap-8 bg-blue-100 px-8 py-5">
		{#if filecontent4.length > 0}
			<div>
				<Renderer fileContent={filecontent4}></Renderer>
			</div>
		{/if}
		{#if filecontent5.length > 0}
			<div>
				<Renderer fileContent={filecontent5}></Renderer>
			</div>
		{/if}
	</div>
{/if}

<style>
	@keyframes grow {
		0% {
			transform: scale(1);
		}
		20% {
			transform: scale(1.25);
		}
		40% {
			transform: scale(1);
		}
	}
	.grow {
		animation: grow 2s ease-in-out infinite;
		animation-delay: 3s;
	}
	@keyframes grow1 {
		20% {
			transform: scale(1);
		}
		40% {
			transform: scale(1.25);
		}
		60% {
			transform: scale(1);
		}
	}
	.grow1 {
		animation: grow1 2s ease-in-out infinite;
		animation-delay: 3s;
	}
	@keyframes grow2 {
		40% {
			transform: scale(1);
		}
		60% {
			transform: scale(1.25);
		}
		80% {
			transform: scale(1);
		}
	}
	.grow2 {
		animation: grow2 2s ease-in-out infinite;
		animation-delay: 3s;
	}
</style>
