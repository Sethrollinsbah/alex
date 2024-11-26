<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import Text from '$lib/text/Text.svelte';
	export let value_place: string | null = null;
	export let placeholder: string = 'Placeholder';

	export let placeholder_eg: string = '';

	export let type = 'text';
	export let boolean_disabled: boolean | null;
	export let className = 'border-blue-500';
	export let iconavail = false;
	export let code = 'US';

	import { formatPhone, phoneFormats } from '$lib/formatPhoneNumber.ts';
</script>

<div
	class={twMerge(
		'relative my-2 h-16 overflow-clip rounded-md bg-gray-50 shadow ring-1 ring-gray-300 dark:ring-gray-700',
		className
	)}
>
	<slot name="icon" />
	<input
		disabled={boolean_disabled}
		class:pl-20={iconavail || (value_place !== null && iconavail)}
		class:peer-focus:pl-20={iconavail || (value_place !== null && iconavail)}
		class={value_place !== null
			? 'peer absolute top-2  z-10 h-full w-full rounded-sm bg-transparent px-4 py-2 text-base opacity-100 outline-none transition-all duration-300'
			: 'peer absolute top-2 z-10 h-full w-full rounded-sm bg-transparent px-4 py-2 text-base opacity-0 outline-none transition-all duration-300 focus:opacity-100'}
		name={placeholder}
		placeholder={placeholder_eg}
		bind:value={value_place}
		on:input={() => {
			if (type === 'tel' && value_place) {
				value_place = value_place.replace(/\D/g, '');
				const cleaned = value_place.replaceAll('-', '').replace(/\D/g, '');

				value_place = formatPhone(cleaned, phoneFormats[code]);
			}
		}}
		on:blur={() => {
			if (value_place !== null && value_place.length === 0) {
				value_place = null;
			}
			if (type === 'tel' && value_place) {
				const cleaned = value_place.replaceAll('-', '').replace(/\D/g, '');

				value_place = formatPhone(cleaned, phoneFormats[code]);
			}
		}}
	/>
	<label
		class={` absolute transition-all duration-300 ${
			iconavail && value_place != null
				? 'left-20 top-2 -translate-x-[15%] scale-75 opacity-50'
				: iconavail && (value_place === null || value_place === null)
					? 'left-20 top-5 transition-all   duration-300 peer-focus:left-20 peer-focus:top-2 peer-focus:-translate-x-[15%] peer-focus:scale-75 peer-focus:opacity-50'
					: !iconavail && (value_place === null || value_place === null)
						? ' left-4 top-5  w-fit text-start   peer-focus:left-3 peer-focus:top-2 peer-focus:-translate-x-[12.5%] peer-focus:scale-75 peer-focus:opacity-50'
						: !iconavail && value_place != null
							? '   left-3 top-2  w-fit   -translate-x-[12.5%] scale-75 text-start opacity-50'
							: ''
		} `}
		for={placeholder}
		><Text
			text={placeholder}
			className="w-fit font-medium text-start text-base peer-focus:bg-white"
		/></label
	>
</div>
