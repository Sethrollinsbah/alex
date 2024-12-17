<script lang="ts">
	import App from './App.svelte';
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;
	// Correct usage of the page store to access the pathname

	let app = data.file11;
</script>

<App></App>
