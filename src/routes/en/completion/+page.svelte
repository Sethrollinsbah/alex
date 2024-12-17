<script lang="ts">
	import App from './App.svelte';
	import { page } from '$app/stores'; // Import page store to access the URL

	let name: string;
	// Accessing searchParams from the $page store reactively
	$: $page.url.searchParams.get('name')
		? (name = `Hey ${$page.url.searchParams.get('name') || ''}, `)
		: (name = '');

	const currentUrl = $page.url.href;
</script>

<svelte:head>
	<!-- Google tag (gtag.js) -->
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta http-equiv="x-ua-compatible" content="IE=edge" />
	<meta name="robots" content="index, follow" />

	<!-- Primary Meta Tags -->
	<meta name="title" content="Completed - Alexander Health Consulting" />
	<meta
		name="description"
		content="Alexander helps users find plans with tailored solutions for their health insurance needs."
	/>
	<!-- <meta name="keywords" content={meta.keywords.join(', ')} /> -->
	<meta name="author" content="Seth Rollins" />

	<!-- Open Graph / Facebook Meta Tags -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Completed - Alexander Health Consulting" />
	<meta
		property="og:description"
		content="Alexander helps users find plans with tailored solutions for their health insurance needs."
	/>
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:url" content={currentUrl} />
	<meta property="og:site_name" content="Alexander Health Consulting" />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="logo.svg" />
	<!-- Additional SEO Meta Tags -->
	<link rel="canonical" href={currentUrl} />
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

<App {name}></App>
