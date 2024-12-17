<script>
	import faq from '$lib/faq.json';

	import FAQ from '$lib/FAQ.svelte';

	import { Mail, Instagram, Linkedin } from 'lucide-svelte';
	import Text from '$lib/text.svelte';
	import Autoscroll from 'embla-carousel-auto-scroll';
	import * as Carousel from '$lib/components/ui/carousel';

	import * as Card from '$lib/components/ui/card';
	let agent = {
		name: 'Zach',
		title: '',
		image: '/zach.webp',
		instagram: '',
		linkedin: '',
		email: 'zach@cobrasolutions.org'
	};
	export let name = '';
	import CountdownTimer from '$lib/CountdownTimer.svelte';
</script>

<section class="flex h-full w-full flex-col space-y-8 py-16">
	<div class="mx-auto w-[90%] max-w-xl text-center">
		<Text
			className="m-auto uppercase text-gray-700 text-4xl sm:text-5xl md:text-6xl text-center font-light"
			>{name}we got your request</Text
		>
		<Text className="max-w-sm mx-auto font-light text-gray-500 text-lg"
			><span class="inline"> <CountdownTimer /> </span></Text
		>
	</div>

	<div
		class="border-clip-radius group relative flex aspect-square h-full w-full items-center justify-center rounded-md px-0 shadow-lg"
	>
		<img
			src={agent.image}
			class="border-clip-radius relative flex aspect-square h-full w-full w-full items-center justify-center overflow-clip rounded-md object-center shadow-lg grayscale transition-all duration-100 group-hover:grayscale-0"
		/>
		<div class="absolute bottom-4 left-[1rem] w-[calc(100%-2rem)] rounded-md bg-gray-200 p-4">
			<b class="text-lg">{agent.name}</b><br /><span class="font-light">{agent.title}</span>
			<div class="absolute -bottom-12 left-4 flex space-x-2">
				{#if agent.linkedin}
					<a href={agent.linkedin} target="_blank">
						<Linkedin class="rounded-full  bg-black p-1 text-white" />
					</a>
				{/if}
				{#if agent.instagram}
					<a href={agent.instagram} target="_blank">
						<Instagram class="rounded-full  bg-black p-1 text-white" />
					</a>
				{/if}
				{#if agent.email}
					<a href={agent.email} target="_blank">
						<Mail class="rounded-full  bg-black p-1 text-white" />
					</a>
				{/if}
			</div>
		</div>
	</div>

	<Text className="mx-auto mt-8 font-light w-[90%] max-w-md text-lg text-center"
		>We've been blown away by the support from Zach. Within a few days, he found a better
		alternative that fit our needs, saving us both money and stress!</Text
	>
	<img class="mx-auto h-12 w-12 rounded-full bg-black" src="/customer.webp" />
</section>

<div class="flex flex-col items-center justify-center">
	<h1>Next Steps</h1>

	<Text className="mx-auto  font-light w-[90%] max-w-xl text-lg text-center"
		>Your part is complete. We are currently evaluating your information and matching you with
		another agent. While you wait, feel free to review the rest of out website.</Text
	>
</div>

<style>
	/* Reset margins for consistent spacing */
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
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

	h3 {
		font-size: 1.75rem; /* 28px */
		font-weight: 600;
		margin-bottom: 1rem;
	}

	h4 {
		font-size: 1.5rem; /* 24px */
		font-weight: 500;
		margin-bottom: 1rem;
	}

	h5 {
		font-size: 1.25rem; /* 20px */
		font-weight: 500;
		margin-bottom: 0.75rem;
	}

	h6 {
		font-size: 1.125rem; /* 18px */
		font-weight: 500;
		margin-bottom: 0.75rem;
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
