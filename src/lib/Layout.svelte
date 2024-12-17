<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	import { page } from '$app/stores';
	import InsureLogo from './content/InsureLogo.svelte';
	import { Calendar } from 'lucide-svelte';

	export let data;

	// Get the current URL dynamically
	$: currentUrl = $page.url.href;
	const burialInsuranceKeywords: string[] = [
		'COBRA insurance',
		'COBRA health insurance',
		'COBRA health coverage',
		'COBRA insurance plans',
		'Affordable COBRA insurance',
		'COBRA health insurance continuation',
		'COBRA plan for former employees',
		'Employer-sponsored COBRA insurance',
		'COBRA insurance benefits',
		'Health insurance after job loss',

		'COBRA insurance eligibility',
		'How COBRA insurance works',
		'COBRA health plan continuation',
		'Affordable health insurance after job loss',
		'COBRA insurance options',
		'COBRA health coverage for families',
		'COBRA insurance rates',
		'COBRA insurance cost',
		'COBRA vs private health insurance',
		'COBRA insurance for dependents',

		// Location-Specific Keywords
		'COBRA insurance in [City/State]',
		'COBRA health insurance in [City/State]',
		'Affordable COBRA plans in [City/State]',
		'[City/State] COBRA health coverage',
		'COBRA insurance options in [City/State]',
		'COBRA plan for former employees in [City/State]',

		// Insurance-related Keywords
		'COBRA insurance with no medical exam',
		'Instant approval COBRA insurance',
		'Affordable COBRA insurance for seniors',
		'COBRA insurance for families',
		'Guaranteed issue COBRA health insurance',
		'COBRA health insurance for retirees',
		'COBRA insurance for young adults',
		'Best COBRA insurance plans',
		'Short-term COBRA insurance plans',

		// Long-Tail Keywords
		'How to apply for COBRA insurance after leaving a job',
		'What is COBRA insurance and how does it work?',
		'How much does COBRA insurance cost?',
		'COBRA insurance for family coverage',
		'Is COBRA insurance cheaper than private insurance?',
		'COBRA vs marketplace health insurance',
		'How long does COBRA insurance last after job loss?'
	];
	export const meta = {
		twitterHandle: null,
		keywords: burialInsuranceKeywords,
		author: 'Seth Ryan Rollins',

		title: 'Cobra Insure.',
		description: 'Cobra Insure gets you amazing deals on health insurance',
		image: '/businesscard.webp',
		image_alt: 'Famile'
	};
</script>

<section class="relative flex h-full min-h-[100dvh] w-screen flex-col">
	<section class="h-full w-full">
		<div
			class="sticky top-0 z-50 flex h-16 w-full flex-row items-center justify-between bg-accent px-8 py-2"
		>
			<InsureLogo small={true} size="h-12 w-20"></InsureLogo>

			<a
				class="transiton-all flex rounded-full bg-[#CDBC8A] px-4 py-1 font-medium text-accent duration-300 hover:bg-opacity-50"
				target="_blank"
				href="https://calendly.com/alexanderhealthconsulting/health-insurance-consultation"
				><Calendar class="my-auto size-4 stroke-[1.5] sm:mr-2"></Calendar><span
					class="hidden sm:block">Book a Consultation</span
				></a
			>
		</div>
		<slot />

		<footer
			class="flex h-fit min-h-16 w-full flex-col items-center justify-between space-y-2 bg-gray-200 px-4 py-4 text-center text-xs font-light text-gray-600 md:flex-row md:space-y-0 md:text-end"
		>
			<div class="flex divide-x-[1px] divide-gray-400/50">
				<a class="px-1 hover:underline" href="/en/home#enroll">Enroll</a>
				<a class="px-1 hover:underline" href="/en/about">About</a>
				<a class="px-1 hover:underline" href="/en/terms">Terms</a>
				<a class="px-1 hover:underline" href="/en/privacy">Privacy</a>
				<a class="px-1 hover:underline" href="/auth">Agents</a>
			</div>

			<p>
				Copyright © 2024 Alexander Health Consulting. All rights reserved.
				<br />
			</p>
		</footer>
	</section>
</section>
