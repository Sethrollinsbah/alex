<script lang="ts">
	import App from './App.svelte';
	import { page } from '$app/stores'; // Import page store to access the URL
	import type { PageData } from './$types';

	export let data: PageData;

	let name: string;
	// Accessing searchParams from the $page store reactively
	$: $page.url.searchParams.get('name')
		? (name = `Hey ${$page.url.searchParams.get('name') || ''}, `)
		: (name = '');
</script>

<App {name}></App>
