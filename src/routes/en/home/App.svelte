<script lang="ts">
	import Form from '$lib/rebuilt/form.svelte';
	import Contact from '$lib/markdown-content/Contact.svelte';
	import faq from '$lib/faq.json';
	import Text from '$lib/text.svelte';
	import Quiz from '$lib/quiz.svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';

	import { onMount } from 'svelte';

	const questions = [
		{
			key: 'name',
			type: 'name' as const,
			title: 'What is your first and last name?',
			validation: (value: { firstName: string; lastName: string }) =>
				value?.firstName?.length > 0 && value?.lastName?.length > 0,
			errorMessage: 'Please enter your full name'
		},
		{
			key: 'household',
			type: 'choice' as const,
			title: 'What is your household size?',
			choices: ['1', '2', '3', '4', '5+']
		},
		{
			key: 'age',
			type: 'age' as const,
			title: 'What is your DOB?',
			validation: (value: DateValue) => value !== null,
			errorMessage: 'Please select your date of birth'
		},
		{
			key: 'zip',
			type: 'zip' as const,
			title: 'What is your zip code?',
			validation: (value: string) => /^\d{5}$/.test(value),
			errorMessage: 'Please enter a valid zip code'
		},
		{
			key: 'phone',
			type: 'phone' as const,
			title: 'What is your phone number?',
			validation: (value: { code: string; number: string }) =>
				value?.number?.replace(/[^0-9]/g, '').length === 10,
			errorMessage: 'Please enter a valid phone number'
		},
		{
			key: 'email',
			type: 'email' as const,
			title: 'What is your email?',
			validation: (value: string) => /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(value),
			errorMessage: 'Please enter a valid email address'
		},
		{
			key: 'pregnant',
			type: 'choice' as const,
			title: 'Are you and your spouse currently pregnant?',
			choices: ['Yes', 'No']
		}
	];

	export let data: PageData;
	let company = ['/aetna.png', '/cigna.png', '/blue_cross.png', '/united_healthcare.png'];

	// Reactive array to control the display based on showMore
	import FAQ from '$lib/FAQ.svelte';
</script>

<!-- Header -->

<div class="relative h-[100dvh]">
	<div class="relative h-full w-full">
		<div
			class={`absolute left-0 top-0 h-[85dvh] w-full bg-cover bg-center`}
			style={`background-image: url(https://images.pexels.com/photos/5879677/pexels-photo-5879677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`}
		>
			<div class={`z-30 flex h-full w-full flex-col items-center justify-center bg-accent/80 `}>
				<div
					id="enroll"
					class="m-auto mx-8 mt-96 grid w-auto items-center justify-center text-4xl font-semibold md:mt-20 md:grid-cols-2"
				>
					<div>
						<Text
							className="m-auto text-gray-200 text-4xl sm:text-5xl md:text-6xl text-center font-semibold"
							>Alexander Health Consulting<br /></Text
						>
						<Text
							className="m-auto mt-8 text-gray-200/80 text-lg  max-w-md w-[90%] md:text-xl text-center font-light"
							>Empowering you with personalized health insurance guidance tailored to your needs.</Text
						>
					</div>
					<div class="mx-auto mt-8 w-fit">
						<Form></Form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Companies we work with -->
<div
	class="mx-auto grid w-[90%] max-w-xl grid-cols-2 items-center justify-evenly pt-60 sm:flex md:pt-0"
>
	{#each company as c}
		<img alt="insurance company" src={c} class="mx-auto size-16 object-contain" />
	{/each}
</div>
<div class="mx-auto mt-8 w-[90%] max-w-4xl">
	<h3
		class="mx-auto mb-4 text-center text-3xl font-medium leading-snug text-gray-700 sm:text-4xl lg:text-5xl"
	>
		Our Process
	</h3>
	<h5 class="mx-auto mb-8 text-center text-lg font-light text-gray-500 sm:text-xl lg:text-2xl">
		Our goal as a brokerage is to always act in the best interest of our clients, saving them money
		while making sure they are covered for any of life’s uncertainties in the future. We achieve
		this by learning about each clients' occupation, health, and financial situation before making
		any recommendations.
	</h5>
	<h5 class="mx-auto mb-8 text-center text-lg font-light text-gray-500 sm:text-xl lg:text-2xl">
		Some clients may be able to qualify for exclusive private plans, while others are better served
		with an ACA plan designed to cover pre-existing health issues.<!---->
	</h5>
	<h5 class="mx-auto mb-20 text-center text-lg font-light text-gray-500 sm:text-xl lg:text-2xl">
		We prioritize building long lasting relationships with our clients by thoroughly educating them
		about the structure of available plans, guiding them confidently through the complexities of the
		insurance industry.
	</h5>
</div>

<!-- Why us over them -->

<Contact />

<style>
	/* Reset margins for consistent spacing */
	h1,
	h2,
	p {
		margin: 0;
		padding: 0;
		line-height: 1.5;
		color: #333333;
		font-family:
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			Oxygen,
			Ubuntu,
			Cantarell,
			sans-serif;
	}

	/* Heading Styles */
	h1 {
		font-size: 2.5rem; /* 40px */
		font-weight: 700;
		margin-bottom: 1.5rem;
		letter-spacing: -0.025em;
	}

	h2 {
		font-size: 2rem; /* 32px */
		font-weight: 600;
		margin-bottom: 1.25rem;
		letter-spacing: -0.0125em;
	}

	/* Paragraph Styles */
	p {
		font-size: 1rem; /* 16px */
		font-weight: 400;
		margin-bottom: 1rem;
		line-height: 1.7;
	}

	/* Responsive adjustments for smaller screens */
	@media (max-width: 768px) {
		h1 {
			font-size: 2rem;
		}

		h2 {
			font-size: 1.75rem;
		}

		h3 {
			font-size: 1.5rem;
		}

		h4 {
			font-size: 1.25rem;
		}

		h5 {
			font-size: 1.125rem;
		}

		h6 {
			font-size: 1rem;
		}

		p {
			font-size: 0.9375rem;
		}
	}
	/* Unordered list styles */
	ul {
		margin: 1.5rem 0;
		padding-left: 1.5rem;
	}

	ul li {
		font-size: 1.125rem;
		margin-bottom: 1rem;
		padding-left: 0.5rem;
		position: relative;
	}

	/* Custom bullet points */
	ul li::before {
		content: '';
		position: absolute;
		left: -1.25rem;
		top: 0.75rem;
		width: 6px;
		height: 6px;
		background-color: #4a5568;
		border-radius: 50%;
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.markdown-content {
			padding: 1rem;
		}

		.markdown-content h1 {
			font-size: 1.875rem;
		}

		.markdown-content p,
		.markdown-content ul li {
			font-size: 1rem;
		}
	}

	/* Print styles */
	@media print {
		.markdown-content {
			max-width: none;
			padding: 0;
		}

		.markdown-content h1 {
			border-bottom: 1px solid #000;
		}

		.markdown-content ul li::before {
			background-color: #000;
		}
	}
</style>
