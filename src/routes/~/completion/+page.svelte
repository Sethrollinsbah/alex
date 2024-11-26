<script lang="ts">
	import App from '$lib/markdown-content/completed.svx';
	import type { PageData } from './$types';

	export let data: PageData;
	// Correct usage of the page store to access the pathname
	let name = 'John';
</script>

<App {name}></App>
