<script lang="ts">
	import { blur } from 'svelte/transition';
	import { Toaster } from '$lib/components/ui/sonner';
	import '../app.css';
	import { browser } from '$app/environment';
	import InsureLogo from '$lib/content/InsureLogo.svelte';
	let { children } = $props();
	let currentUrl = 'https://CobraSolutions.org';

	const keywords: string[] = [
		// General Insurance Keywords
		'CobraSolutions insurance services',
		'Alternative health insurance with CobraSolutions',
		'Affordable alternatives to COBRA insurance with CobraSolutions',
		'Find better health insurance options with CobraSolutions',
		'Best COBRA alternative plans from CobraSolutions',
		'Expert insurance advice for COBRA alternatives with CobraSolutions',
		'Family insurance plans by CobraSolutions',
		'Comprehensive COBRA replacement plans by CobraSolutions',
		'General health coverage options with CobraSolutions',

		// Insurance Advice & Education
		'How CobraSolutions helps find COBRA alternatives',
		'Insurance advice for COBRA replacement plans from CobraSolutions',
		'Understanding COBRA alternatives with CobraSolutions',
		'CobraSolutions’ guide to affordable COBRA alternatives',
		'Health insurance tips by CobraSolutions',
		'How to find the best COBRA alternatives with CobraSolutions',
		'Expert insurance advice for transitioning from COBRA',

		// Location-Specific Keywords
		'Affordable health insurance in Tampa, Florida with CobraSolutions',
		'Tampa COBRA alternatives with CobraSolutions',
		'Family health insurance in Tampa, Florida with CobraSolutions',
		'Find COBRA replacement plans in Tampa with CobraSolutions',
		'CobraSolutions insurance services in Tampa, Florida',
		'Best COBRA alternatives near Tampa, Florida',

		// Insurance Plans & Costs
		'Affordable COBRA alternatives with CobraSolutions',
		'Cost-effective COBRA replacement plans by CobraSolutions',
		'Comparing health insurance plans with CobraSolutions',
		'Health insurance costs after COBRA with CobraSolutions',
		'Family COBRA replacement insurance costs with CobraSolutions',
		'Best affordable COBRA alternatives by CobraSolutions',

		// Long-Tail Keywords
		'How CobraSolutions helps find affordable COBRA alternatives',
		'What is the best COBRA replacement plan for families?',
		'How to choose the right insurance plan with CobraSolutions',
		'Steps to apply for COBRA alternatives with CobraSolutions',
		'How much does COBRA replacement insurance cost with CobraSolutions?',
		'CobraSolutions vs other COBRA replacement services',
		'Family health coverage options after COBRA with CobraSolutions',
		'Health insurance options after leaving a job with CobraSolutions'
	];
	export const meta = {
		twitterHandle: null,
		keywords: keywords,
		author: 'Seth Rollins',
		title: 'Alexander Health Consulting',
		description:
			'Alexander helps users find plans with tailored solutions for their health insurance needs.',
		image: '/logo.png',
		image_alt: 'Alexander Health Consulting Logo'
	};
	let loaded = $state(false);
	let remove = $state(true);
	$effect(() => {
		if (browser) {
			loaded = true;
		}
		if (loaded) {
			setTimeout(() => {
				remove = false;
			}, 3500);
		}
	});
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
	<meta property="og:site_name" content="Alexander Health Consulting" />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="logo.svg" />
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

{#if loaded}
	<div>
		{@render children()}
	</div>
{/if}
{#if !loaded}
	<div
		out:blur|global={{ delay: 3900, duration: 800 }}
		class="fixed left-0 top-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-accent"
	></div>
{/if}
{#if remove}
	<div
		out:blur={{ duration: 800 }}
		class="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2"
	>
		<InsureLogo hide={false}></InsureLogo>
	</div>
{/if}
<Toaster></Toaster>
