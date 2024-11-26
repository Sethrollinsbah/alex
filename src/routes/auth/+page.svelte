<script lang="ts">
	import type { PageData } from './$types.js';
	import SettingsForm from './auth-form.svelte';
	export let data: PageData;
</script>

<section class="flex min-h-[85dvh] flex-col items-center justify-center py-12">
	<div class="mx-auto w-[90%] max-w-sm p-8 ring-1 ring-gray-200">
		<SettingsForm data={data.form} />
	</div>
</section>
