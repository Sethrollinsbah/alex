<script lang="ts">
	import { Calendar as CalendarPrimitive } from 'bits-ui';
	import { DateFormatter, getLocalTimeZone, today } from '@internationalized/date';
	import * as Calendar from '$lib/components/ui/calendar/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { cn } from '$lib/utils.js';

	type $$Props = CalendarPrimitive.Props;

	// Set default date to January 1, 2000
	const currentDate = today(getLocalTimeZone());
	const defaultDate = currentDate.set({ year: currentDate.year - 18 });
	export let value: $$Props['value'] = undefined;
	export let placeholder: $$Props['placeholder'] = defaultDate; // Use January 1, 2000 as default
	export let weekdayFormat: $$Props['weekdayFormat'] = 'short';

	const monthOptions = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	].map((month, i) => ({ value: i + 1, label: month }));

	const monthFmt = new DateFormatter('en-US', {
		month: 'long'
	});

	// Calculate year options for users 18 years or older
	const currentYear = new Date().getFullYear();
	const yearOptions = Array.from({ length: 100 }, (_, i) => {
		const year = currentYear - i;
		return {
			label: String(year),
			value: year
		};
	}).filter((year) => year.value <= currentYear - 18); // Filter for users 18+ only

	// Set default year and month based on placeholder (January 1, 2000)
	$: defaultYear = {
		value: placeholder.year,
		label: String(placeholder.year)
	};
	$: defaultMonth = {
		value: placeholder.month,
		label: monthFmt.format(placeholder.toDate(getLocalTimeZone()))
	};

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<CalendarPrimitive.Root
	{weekdayFormat}
	class={cn('rounded-md border p-3', className)}
	{...$$restProps}
	on:keydown
	let:months
	let:weekdays
	bind:value
	bind:placeholder
>
	<Calendar.Header>
		<Calendar.Heading class="flex w-full items-center justify-between gap-2">
			<Select.Root
				selected={defaultMonth}
				items={monthOptions}
				onSelectedChange={(v) => {
					if (!v || !placeholder) return;
					if (v.value === placeholder?.month) return;
					placeholder = placeholder.set({ month: v.value });
				}}
			>
				<Select.Trigger aria-label="Select month" class="w-[60%]">
					<Select.Value placeholder="Select month" />
				</Select.Trigger>
				<Select.Content class="max-h-[200px] overflow-y-auto">
					{#each monthOptions as { value, label }}
						<Select.Item {value} {label}>
							{label}
						</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
			<Select.Root
				selected={defaultYear}
				items={yearOptions}
				onSelectedChange={(v) => {
					if (!v || !placeholder) return;
					if (v.value === placeholder?.year) return;
					placeholder = placeholder.set({ year: v.value });
				}}
			>
				<Select.Trigger aria-label="Select year" class="w-[40%]">
					<Select.Value placeholder="Select year" />
				</Select.Trigger>
				<Select.Content class="max-h-[200px] overflow-y-auto">
					{#each yearOptions as { value, label }}
						<Select.Item {value} {label}>
							{label}
						</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</Calendar.Heading>
	</Calendar.Header>
	<Calendar.Months>
		{#each months as month}
			<Calendar.Grid>
				<Calendar.GridHead>
					<Calendar.GridRow class="flex">
						{#each weekdays as weekday}
							<Calendar.HeadCell>
								{weekday.slice(0, 2)}
							</Calendar.HeadCell>
						{/each}
					</Calendar.GridRow>
				</Calendar.GridHead>
				<Calendar.GridBody>
					{#each month.weeks as weekDates}
						<Calendar.GridRow class="mt-2 w-full">
							{#each weekDates as date}
								<Calendar.Cell {date}>
									<Calendar.Day {date} month={month.value} />
								</Calendar.Cell>
							{/each}
						</Calendar.GridRow>
					{/each}
				</Calendar.GridBody>
			</Calendar.Grid>
		{/each}
	</Calendar.Months>
</CalendarPrimitive.Root>
