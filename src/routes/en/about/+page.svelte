<script lang="ts">
	import App from './App.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	// Correct usage of the page store to access the pathname
</script>

<App></App>
