<script lang="ts">
	import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date';
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import Input from '$lib/Input.svelte';
	import Phone from '$lib/Phone.svelte';
	import { page } from '$app/stores';
	import Calendar from '$lib/Calendar.svelte';
	import * as Popover from '$lib/components/ui/popover';
	import { toast } from 'svelte-sonner';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';

	// Define strict types for the question types
	type QuestionType = 'name' | 'email' | 'age' | 'zip' | 'phone' | 'choice';

	interface BaseQuestion {
		key: string;
		type: QuestionType;
		title: string;
		validation?: (value: any) => boolean;
		errorMessage?: string;
	}

	interface ChoiceQuestion extends BaseQuestion {
		type: 'choice';
		choices: string[];
	}

	interface OtherQuestion extends BaseQuestion {
		type: Exclude<QuestionType, 'choice'>;
		choices?: never;
	}

	type Question = ChoiceQuestion | OtherQuestion;

	export let questions: Question[];
	export let onSubmit: (answers: Record<string, any>) => void;
	export let lang = 'en';

	let show = 0;
	// Initialize answers with proper structure for name fields
	let answers: Record<string, any> = {};
	questions.forEach((q) => {
		if (q.type === 'name') {
			answers[q.key] = { firstName: '', lastName: '' };
		} else if (q.type === 'phone') {
			answers[q.key] = { code: 'US', number: '' };
		} else {
			answers[q.key] = '';
		}
	});

	let show_percent = ((questions.length - show) / questions.length) * 100;

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	function handleNext() {
		const currentQuestion = questions[show];
		const currentAnswer = answers[currentQuestion.key];

		if (currentQuestion.validation && !currentQuestion.validation(currentAnswer)) {
			toast.error(currentQuestion.errorMessage || 'Please complete this field');
			return;
		}

		if (show < questions.length - 1) {
			show += 1;
			show_percent = ((questions.length - show) / questions.length) * 100;
		} else {
			onSubmit(answers);
		}
	}

	function handleBack() {
		if (show > 0) {
			show -= 1;
			show_percent = ((questions.length - show) / questions.length) * 100;
		}
	}
</script>

<div
	class="absolute bottom-0 right-1/2 z-20 h-fit w-[90%] max-w-4xl translate-x-1/2 overflow-clip rounded-3xl bg-gray-100 shadow-xl"
>
	<p
		class="flex h-fit w-full justify-between bg-blue-200 px-4 py-4 text-center font-bold text-blue-950"
	>
		<span class="my-auto size-5">
			<button aria-label="back" class:hidden={show === 0} class="size-5" on:click={handleBack}>
				<svg
					viewBox="0 0 24 24"
					class="size-full stroke-red-800 stroke-2"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M14.5 17L9.5 12L14.5 7" stroke-linecap="round" stroke-linejoin="round"></path>
				</svg>
			</button>
		</span>
		{questions[show].title}
		<span class="size-5"></span>
	</p>

	<div class="w-full p-8">
		<div class="relative h-4 w-full overflow-clip rounded-full ring-1 ring-gray-600">
			<div
				class="absolute left-0 top-0 flex h-4 w-full justify-end rounded-full bg-blue-600 transition-all duration-300 ease-in-out"
				style="transform: translateX({-show_percent}%);"
			>
				<p class="z-10 ml-auto pr-2 text-xs text-white">
					{(100 - show_percent).toFixed(0)}%
				</p>
			</div>
		</div>

		<div class="relative flex h-32 w-full items-center justify-between pt-4">
			{#each questions as question, i}
				<div
					class:scale-50={show > i || show < i}
					class:-translate-x-full={show > i}
					class:translate-x-full={show < i}
					class:opacity-0={show !== i}
					class:opacity-100={show === i}
					class="absolute left-0 top-4 grid h-fit w-full grid-cols-2 justify-evenly gap-4 transition-all duration-300 md:flex md:space-x-4"
				>
					{#if question.type === 'name'}
						<div class="relative col-span-full flex h-full w-full flex-col">
							<div class="grid h-full min-h-16 w-full grid-cols-2 gap-2">
								<Input
									boolean_disabled={false}
									className=""
									bind:value_place={answers[question.key].firstName}
									placeholder={'First Name'}
									placeholder_eg={''}
								/>
								<Input
									boolean_disabled={false}
									className=""
									bind:value_place={answers[question.key].lastName}
									placeholder={'Last Name'}
									placeholder_eg={''}
								/>
							</div>
							<Button
								on:click={handleNext}
								class="absolute right-1/2 top-20 mx-auto mt-auto w-fit max-w-xs translate-x-1/2"
							>
								{'Continue'}
							</Button>
						</div>
					{:else if question.type === 'email'}
						<div class="relative col-span-full flex h-full w-full flex-col">
							<Input
								boolean_disabled={false}
								className="w-full h-full min-h-16"
								bind:value_place={answers[question.key]}
								placeholder={'Email Address'}
								placeholder_eg={''}
							/>
							<Button on:click={handleNext} class="relative mx-auto w-fit max-w-xs">
								{'Continue'}
							</Button>
						</div>
					{:else if question.type === 'age'}
						<div class="relative col-span-full flex h-full w-full flex-col">
							<Popover.Root>
								<Popover.Trigger asChild let:builder>
									<Button
										variant="outline"
										class={cn(
											'mx-auto mb-4 min-h-16 w-[280px] justify-start text-left font-normal',
											!answers[question.key] && 'text-muted-foreground'
										)}
										builders={[builder]}
									>
										<CalendarIcon class="mr-2 h-4 w-4" />
										{answers[question.key]
											? df.format(answers[question.key].toDate(getLocalTimeZone()))
											: 'Pick a date'}
									</Button>
								</Popover.Trigger>
								<Popover.Content class="w-auto p-0">
									<Calendar bind:value={answers[question.key]} initialFocus />
								</Popover.Content>
							</Popover.Root>
							<Button on:click={handleNext} class="relative mx-auto w-fit max-w-xs">
								{'Continue'}
							</Button>
						</div>
					{:else if question.type === 'zip'}
						<div class="relative col-span-full flex h-full w-full flex-col">
							<Input
								boolean_disabled={false}
								className="w-full h-full min-h-16"
								bind:value_place={answers[question.key]}
								placeholder={'Zip Code'}
								placeholder_eg={'12345'}
							/>
							<Button on:click={handleNext} class="relative mx-auto w-fit max-w-xs">
								{'Continue'}
							</Button>
						</div>
					{:else if question.type === 'phone'}
						<div class="relative col-span-full flex h-full w-full flex-col">
							<Phone
								bind:code={answers[question.key].code}
								valu={'Phone'}
								bind:number={answers[question.key].number}
							/>
							<Button on:click={handleNext} class="relative mx-auto w-fit max-w-xs">
								{'Continue'}
							</Button>
						</div>
					{:else if question.type === 'choice' && 'choices' in question}
						{#each question.choices as choice}
							<button
								class="h-fit w-full rounded-xl bg-gray-50 py-4 capitalize shadow ring-1 ring-gray-200 transition-all duration-300 hover:bg-blue-600 hover:text-gray-100 active:scale-95"
								on:click={() => {
									answers[question.key] = choice;
									handleNext();
								}}
							>
								{choice}
							</button>
						{/each}
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>
