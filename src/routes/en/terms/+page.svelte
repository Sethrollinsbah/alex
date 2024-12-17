<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	onMount(() => {
		document.title = 'Terms of Service - Alexander Health Consulting';
	});

	let currentUrl = $page.url.href;
</script>

<svelte:head>
	<!-- Google tag (gtag.js) -->
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta http-equiv="x-ua-compatible" content="IE=edge" />
	<meta name="robots" content="index, follow" />

	<!-- Primary Meta Tags -->
	<meta name="title" content="Terms - Alexander Health Consulting" />
	<meta
		name="description"
		content="Alexander helps users find plans with tailored solutions for their health insurance needs."
	/>
	<!-- <meta name="keywords" content={meta.keywords.join(', ')} /> -->
	<meta name="author" content="Seth Rollins" />

	<!-- Open Graph / Facebook Meta Tags -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Terms of Service - Alexander Health Consulting" />
	<meta
		property="og:description"
		content="Alexander helps users find plans with tailored solutions for their health insurance needs."
	/>
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:url" content={currentUrl} />
	<meta property="og:site_name" content="Alexander Health Consulting" />
	<!-- Additional SEO Meta Tags -->
	<link rel="canonical" href={currentUrl} />
	<meta name="theme-color" content="#022451" />
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

<main class="terms-of-service">
	<h1 class="text-xl font-bold">Terms of Service</h1>

	<section id="introduction">
		<h2>1. Introduction</h2>
		<p>
			This website is operated by Alexander Health Consulting LLC. The terms “we”, “us”, and “our”
			refer to Alexander Health Consulting LLC. The use of our website is subject to the following
			terms and conditions of use, as amended from time to time (the “Terms”). Please review the
			Terms carefully. By accessing and using this website, you accept and agree to comply with the
			Terms and our Privacy Policy. If you do not agree, you are not authorized to use our services
			or website.
		</p>
	</section>

	<section id="use-of-website">
		<h2>2. Use of Our Website</h2>
		<p>
			You agree to use our website for legitimate purposes only. By agreeing to the Terms, you
			represent and warrant that you are at least the age of majority in your state or province of
			residence and are legally capable of entering into a binding contract.
		</p>
		<p>
			You agree not to engage in any unlawful or unauthorized activities, including but not limited
			to interfering with our network, infringing intellectual property rights, or misusing provided
			content.
		</p>
		<p>
			Accurate personal information is required when using our website or services. You authorize us
			to collect and use this information as described in our Privacy Policy.
		</p>
	</section>

	<section id="general-conditions">
		<h2>3. General Conditions</h2>
		<p>
			We reserve the right to modify, suspend, or discontinue our website or services without
			notice. Your continued access indicates your acceptance of such changes.
		</p>
		<p>We will not be liable for any changes or interruptions to our website or services.</p>
	</section>

	<section id="products-services">
		<h2>4. Products or Services</h2>
		<p>
			All purchases are subject to availability. We reserve the right to limit or cancel orders,
			adjust pricing, and correct errors as necessary.
		</p>
		<p>
			Product descriptions and designs are as accurate as possible, but we cannot guarantee their
			complete accuracy.
		</p>
	</section>

	<section id="third-party-links">
		<h2>5. Links to Third-Party Websites</h2>
		<p>
			Our website may include links to third-party websites for your convenience. We are not
			responsible for their content, functionality, or services. Use third-party links at your own
			risk.
		</p>
	</section>

	<section id="user-content">
		<h2>6. Use Comments, Feedback, and Other Submissions</h2>
		<p>
			Any content submitted to our website must be lawful, accurate, and free of intellectual
			property violations. We reserve the right to remove objectionable content and terminate user
			access as necessary.
		</p>
	</section>

	<section id="personal-information">
		<h2>7. Your Personal Information</h2>
		<p>
			Please refer to our Privacy Policy for details on how we collect, use, and share your personal
			information.
		</p>
	</section>

	<section id="errors-omissions">
		<h2>8. Errors and Omissions</h2>
		<p>
			Our website may contain errors or inaccuracies. We reserve the right to correct these and
			update the website at any time without notice.
		</p>
	</section>

	<section id="limitation-liability">
		<h2>9. Disclaimer and Limitation of Liability</h2>
		<p>
			Our website is provided "as is" without warranties of any kind. We are not liable for any
			damages arising from your use of the website.
		</p>
	</section>

	<section id="indemnification">
		<h2>10. Indemnification</h2>
		<p>
			You agree to indemnify and hold us harmless from any claims, losses, or damages arising from
			your use of our website or violation of these Terms.
		</p>
	</section>

	<section id="entire-agreement">
		<h2>11. Entire Agreement</h2>
		<p>
			These Terms represent the complete agreement between you and Alexander Health Consulting LLC
			regarding the use of our website.
		</p>
	</section>

	<section id="governing-law">
		<h2>12. Governing Law</h2>
		<p>
			These Terms and your use of our website are governed by the laws of the State of Florida,
			without regard to its conflict of law provisions. Any disputes must be resolved in courts
			located in Tampa, Florida.
		</p>
	</section>

	<section id="contact-us">
		<h2>13. Questions or Concerns</h2>
		<p>
			For questions or feedback, please contact us at <a
				href="mailto:zachary.alexander@alexanderhealth.com">zachary.alexander@alexanderhealth.com</a
			>.
		</p>
	</section>
</main>

<style>
	.terms-of-service {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
		font-family: Arial, sans-serif;
		line-height: 1.6;
	}
	h1,
	h2 {
		color: #2c3e50;
	}
	p {
		color: #34495e;
	}
	a {
		color: #3498db;
		text-decoration: none;
	}
	a:hover {
		text-decoration: underline;
	}
</style>
