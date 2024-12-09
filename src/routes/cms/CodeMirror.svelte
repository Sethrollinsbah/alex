<script lang="ts">
	import CodeMirror from 'svelte-codemirror-editor';
	import { json } from '@codemirror/lang-json';
	import { markdown } from '@codemirror/lang-markdown';
	import { afterUpdate, onMount } from 'svelte';
	import { textArea } from '$lib/stores.ts';

	export let value = `
  <!DOCTYPE html>
  <html>
      <head>
          <title>My HTML Email Template</title>
      </head>
      <body>
          <h1>Hello, World!</h1>
          <p>This is a sample HTML file.</p>
          <p>This is a sample HTML file.</p>
          <p>This is a sample HTML file.</p>
      </body>
  </html>
`;

	export let mode = 'json';
	$: mode === 'json' ? JSON.stringify(JSON.parse(value), null, 2) : value;

	afterUpdate(() => {
		if (textArea) {
			textArea.set(value);
		}
	});
	export let change;
</script>

<CodeMirror
	on:change={(e) => {
		change = e.detail;
	}}
	bind:value
	lang={mode === 'json' ? json() : markdown()}
	styles={{
		'&': {
			width: '100%',
			height: ` ${400}px`
		}
	}}
/>
