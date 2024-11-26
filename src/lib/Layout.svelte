<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	import { page } from '$app/stores';
	import InsureLogo from './content/InsureLogo.svelte';

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

<svelte:head>
	<!-- Google tag (gtag.js) -->
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta http-equiv="x-ua-compatible" content="IE=edge" />
	<meta name="robots" content="index, follow" />

	<!-- Primary Meta Tags -->
	<meta name="title" content={meta.title} />
	<meta name="description" content={meta.description} />
	<meta name="keywords" content={meta.keywords.join(', ')} />
	<meta name="author" content={meta.author} />

	<!-- Open Graph / Facebook Meta Tags -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:image" content={meta.image} />
	<meta property="og:image:alt" content={meta.image_alt} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:url" content={currentUrl} />
	<meta property="og:site_name" content="Your Website Name" />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={meta.title} />
	<meta name="twitter:description" content={meta.description} />
	<meta name="twitter:image" content={meta.image} />
	<meta name="twitter:image:alt" content={meta.image_alt} />
	{#if meta.twitterHandle}
		<meta name="twitter:site" content={meta.twitterHandle} />
		<meta name="twitter:creator" content={meta.twitterHandle} />
	{/if}

	<!-- Additional SEO Meta Tags -->
	<link rel="canonical" href={currentUrl} />
	<meta name="theme-color" content="#000000" />
	<meta name="apple-mobile-web-app-status-bar-style" content="default" />
	<meta name="format-detection" content="telephone=no" />

	<!-- Favicon and App Icons -->
	<link rel="icon" href="/favicon.ico" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="manifest" href="/site.webmanifest" />

	<!-- Schema.org for Google -->
	<script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": meta.title,
      "description": meta.description,
      "url": currentUrl,
      "image": meta.image,
      "author": {
        "@type": "Organization",
        "name": meta.author,
      },
    })}
	</script>
</svelte:head>

<section class="relative flex h-full min-h-[100dvh] w-screen flex-col">
	<section class="h-full w-full">
		<div
			class="sticky top-0 z-50 flex h-12 w-full flex-row items-center justify-between bg-gray-100 px-8"
		>
			<InsureLogo></InsureLogo>

			<DropdownMenu.Root>
				<DropdownMenu.Trigger
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-menu stroke-blue-800"
						><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line
							x1="4"
							x2="20"
							y1="18"
							y2="18"
						/></svg
					></DropdownMenu.Trigger
				>
				<DropdownMenu.Content>
					<DropdownMenu.Group>
						<DropdownMenu.Item href="/~/home">Home</DropdownMenu.Item>
						<DropdownMenu.Item href="/~/about-us">About Us</DropdownMenu.Item>
						<DropdownMenu.Item href="/~/home#alternatives">COBRA Alternatives</DropdownMenu.Item>
						<DropdownMenu.Item href="/~/home#proscons">Pros and Cons</DropdownMenu.Item>
						<DropdownMenu.Item href="/~/home#contact-us">Contact Us</DropdownMenu.Item>
						<DropdownMenu.Item class="bg-blue-100 font-medium text-blue-600" href="/~/home#enroll"
							>Enroll Now</DropdownMenu.Item
						>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
		<slot />

		<footer
			class="flex h-fit min-h-16 w-full flex-col items-center justify-between space-y-2 bg-gray-200 px-4 py-4 text-center text-xs font-light text-gray-600 md:flex-row md:space-y-0 md:text-end"
		>
			<div class="flex divide-x-[1px] divide-gray-400/50">
				<a href="/~/home#enroll">Enroll Now</a>
				<span class="mx-1">|</span>

				<a href="/~/about-us">About</a>
				<span class="mx-1">|</span>

				<a href="/~/alternatives">Alternatives</a>
				<span class="mx-1">|</span>

				<a href="/~/auth">Agents</a>
			</div>

			<p>
				Copyright © 2024 COBRA Solutions. All rights reserved.
				<br />
				<i class="mx-auto"> License number: G1341031 </i>
			</p>
		</footer>
	</section>
</section>
