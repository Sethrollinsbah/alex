<script lang="ts">
	import { DateFormatter, getLocalTimeZone } from '@internationalized/date';

	import Calendar from '$lib/Calendar.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Popover from '$lib/components/ui/popover';
	import { cn, getLocation } from '$lib/utils';
	import { CalendarIcon } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';

	let user = $state({
		dob: undefined,
		email: '',
		firstName: '',
		lastName: '',
		gender: '',
		phone: '',
		zip: ''
	});
	let formChecked = $state(false);
	let validate: Validate = $state({
		email: null,
		zip: null,
		phone: null,
		dob: null,
		gender: null,
		firstName: null,
		lastName: null
	});
	type Validate = {
		email: boolean | null;
		zip: boolean | null;
		dob: boolean | null;
		phone: boolean | null;
		gender: boolean | null;
		firstName: boolean | null;
		lastName: boolean | null;
	};

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});
	/**
	 * @type {string}
	 */
	let zipcodemessage: string = $state('');

	$effect(() => {
		if (user.dob !== undefined) {
			validate.dob = false;
		}
	});
</script>

<div
	class="grid h-full w-full max-w-md grid-cols-2 gap-2 rounded-md bg-stone-100 px-6 py-4 shadow-xl"
>
	<div class="col-span-full mb-6 flex flex-col items-center justify-start text-start">
		<h1 class="w-full text-lg font-medium leading-snug text-stone-700 sm:text-xl lg:text-2xl">
			Request a Quote
		</h1>
		<p class="ml-auto text-start text-base font-light text-stone-700 md:text-lg">
			Fill out the form below to receive a quote from one of our licensed agents
		</p>
	</div>
	<div class=" flex w-full flex-col gap-1.5">
		<Label for="firstName" class={cn('', validate.firstName && 'text-destructive')}
			>First Name</Label
		>
		<Input
			type="text"
			id="firstName"
			on:blur={() => {
				// Validate first name: must be more than 2 characters
				const isValid = user.firstName.length > 2;
				validate.firstName = !isValid; // true if invalid, false if valid
				if (!isValid) {
					toast.error('First name is invalid');
				}
			}}
			on:input={(event) => {
				validate.firstName = false;

				// Remove invalid characters: allow only letters (uppercase and lowercase)
				const sanitizedValue = event.target.value.replace(/[^a-zA-Z]/g, '');
				user.firstName = sanitizedValue;

				// Update validation dynamically while typing
				validate.firstName = sanitizedValue.length > 2;
			}}
			placeholder=""
		/>
	</div>
	<div class="flex w-full flex-col gap-1.5">
		<Label for="lastName" class={cn('', validate.lastName && 'text-destructive')}>Last Name</Label>
		<Input
			type="text"
			id="lastName"
			placeholder=""
			on:blur={() => {
				// Validate last name: must be more than 2 characters
				const isValid = user.lastName.length > 2;
				validate.lastName = !isValid; // true if invalid, false if valid
				if (!isValid) {
					toast.error('Last name is invalid');
				}
			}}
			on:input={(event) => {
				validate.lastName = false;
				// Remove invalid characters: allow only letters (uppercase and lowercase)
				const sanitizedValue = event.target.value.replace(/[^a-zA-Z]/g, '');
				user.lastName = sanitizedValue;

				// Update validation dynamically while typing
				validate.lastName = sanitizedValue.length > 2;
			}}
		/>
	</div>
	<div class=" flex w-full flex-col gap-1.5">
		<Label for="dob" class={cn('', validate.dob && 'text-destructive')}>Date of Birth</Label>
		<div class="">
			<Popover.Root>
				<Popover.Trigger asChild let:builder>
					<Button
						variant="outline"
						class={cn(
							'mx-auto h-12 w-full justify-start text-left font-normal',
							!user.dob && 'text-muted-foreground'
						)}
						builders={[builder]}
					>
						<CalendarIcon class="mr-2 h-4 w-4" />
						{user.dob ? df.format(user.dob.toDate(getLocalTimeZone())) : 'Pick a date'}
					</Button>
				</Popover.Trigger>
				<Popover.Content class="w-auto p-0">
					<Calendar bind:value={user.dob} initialFocus />
				</Popover.Content>
			</Popover.Root>
		</div>
	</div>
	<div class=" flex w-full flex-col gap-1.5">
		<Label for="gender" class={cn('', validate.gender && 'text-destructive')}>Gender</Label>
		<div class="grid h-12 w-full grid-cols-2 gap-1">
			<Button
				variant="outline"
				class={cn(
					'mx-auto h-12 w-full justify-start px-2 text-left font-normal text-primary',

					user.gender === 'male' && 'bg-stone-700 text-stone-600'
				)}
				on:click={() => {
					user.gender = 'male';
					validate.gender = false;
				}}
			>
				<svg class="size-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
					><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
						id="SVGRepo_tracerCarrier"
						stroke-linecap="round"
						stroke-linejoin="round"
					></g><g id="SVGRepo_iconCarrier">
						<path
							class={cn(
								'stroke-gray-500',

								user.gender === 'male' && 'stroke-stone-600'
							)}
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M15.5631 16.1199C14.871 16.81 13.9885 17.2774 13.0288 17.462C12.0617 17.6492 11.0607 17.5459 10.1523 17.165C8.29113 16.3858 7.07347 14.5723 7.05656 12.5547C7.04683 11.0715 7.70821 9.66348 8.8559 8.72397C10.0036 7.78445 11.5145 7.4142 12.9666 7.71668C13.9237 7.9338 14.7953 8.42902 15.4718 9.14008C16.4206 10.0503 16.9696 11.2996 16.9985 12.6141C17.008 13.9276 16.491 15.1903 15.5631 16.1199Z"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path>
						<path
							d="M14.9415 8.60977C14.6486 8.90266 14.6486 9.37754 14.9415 9.67043C15.2344 9.96332 15.7093 9.96332 16.0022 9.67043L14.9415 8.60977ZM18.9635 6.70907C19.2564 6.41617 19.2564 5.9413 18.9635 5.64841C18.6706 5.35551 18.1958 5.35551 17.9029 5.64841L18.9635 6.70907ZM16.0944 5.41461C15.6802 5.41211 15.3424 5.74586 15.3399 6.16007C15.3374 6.57428 15.6711 6.91208 16.0853 6.91458L16.0944 5.41461ZM18.4287 6.92872C18.8429 6.93122 19.1807 6.59747 19.1832 6.18326C19.1857 5.76906 18.8519 5.43125 18.4377 5.42875L18.4287 6.92872ZM19.1832 6.17421C19.1807 5.76001 18.8429 5.42625 18.4287 5.42875C18.0145 5.43125 17.6807 5.76906 17.6832 6.18326L19.1832 6.17421ZM17.6973 8.52662C17.6998 8.94082 18.0377 9.27458 18.4519 9.27208C18.8661 9.26958 19.1998 8.93177 19.1973 8.51756L17.6973 8.52662ZM16.0022 9.67043L18.9635 6.70907L17.9029 5.64841L14.9415 8.60977L16.0022 9.67043ZM16.0853 6.91458L18.4287 6.92872L18.4377 5.42875L16.0944 5.41461L16.0853 6.91458ZM17.6832 6.18326L17.6973 8.52662L19.1973 8.51756L19.1832 6.17421L17.6832 6.18326Z"
							class={cn(
								'fill-gray-500',

								user.gender === 'male' && 'fill-stone-600'
							)}
						></path>
					</g></svg
				>
				Male
			</Button>
			<Button
				variant="outline"
				class={cn(
					'mx-auto h-12 w-full justify-start px-2 text-left font-normal text-primary',
					user.gender === 'female' && 'bg-stone-700 text-stone-600'
				)}
				on:click={() => {
					user.gender = 'female';
					validate.gender = false;
				}}
			>
				<svg class="size-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
					><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
						id="SVGRepo_tracerCarrier"
						stroke-linecap="round"
						stroke-linejoin="round"
					></g><g id="SVGRepo_iconCarrier">
						<path
							class={cn(
								'stroke-gray-500',

								user.gender === 'female' && 'stroke-stone-600'
							)}
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M7 9.94172C7.00137 8.96443 7.29495 8.00988 7.843 7.20072C8.39448 6.38448 9.1753 5.7498 10.087 5.37672C11.9541 4.61174 14.0974 5.033 15.536 6.44772C16.5916 7.4896 17.1196 8.95291 16.9724 10.4288C16.8252 11.9047 16.0186 13.2349 14.778 14.0477C13.9477 14.571 12.9812 14.8372 12 14.8127C10.6855 14.84 9.41385 14.3448 8.464 13.4357C7.52845 12.5137 7.00119 11.2553 7 9.94172Z"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path>
						<path
							d="M12.75 14.8127C12.75 14.3985 12.4142 14.0627 12 14.0627C11.5858 14.0627 11.25 14.3985 11.25 14.8127H12.75ZM11.25 17.0007C11.25 17.415 11.5858 17.7507 12 17.7507C12.4142 17.7507 12.75 17.415 12.75 17.0007H11.25ZM14 17.7507C14.4142 17.7507 14.75 17.415 14.75 17.0007C14.75 16.5865 14.4142 16.2507 14 16.2507V17.7507ZM12 16.2507C11.5858 16.2507 11.25 16.5865 11.25 17.0007C11.25 17.415 11.5858 17.7507 12 17.7507V16.2507ZM11.25 19.0007C11.25 19.415 11.5858 19.7507 12 19.7507C12.4142 19.7507 12.75 19.415 12.75 19.0007H11.25ZM12.75 17.0007C12.75 16.5865 12.4142 16.2507 12 16.2507C11.5858 16.2507 11.25 16.5865 11.25 17.0007H12.75ZM12 17.7507C12.4142 17.7507 12.75 17.415 12.75 17.0007C12.75 16.5865 12.4142 16.2507 12 16.2507V17.7507ZM10 16.2507C9.58579 16.2507 9.25 16.5865 9.25 17.0007C9.25 17.415 9.58579 17.7507 10 17.7507V16.2507ZM11.25 14.8127V17.0007H12.75V14.8127H11.25ZM14 16.2507H12V17.7507H14V16.2507ZM12.75 19.0007V17.0007H11.25V19.0007H12.75ZM12 16.2507H10V17.7507H12V16.2507Z"
							class={cn(
								'fill-gray-500',

								user.gender === 'female' && 'fill-stone-600'
							)}
						></path>
					</g></svg
				>
				Female
			</Button>
		</div>
	</div>
	<div class="col-span-full flex w-full flex-col gap-1.5">
		<Label for="email" class={cn('', validate.email && 'text-destructive')}>Email</Label>
		<Input
			type="email"
			id="email"
			placeholder=""
			bind:value={user.email}
			on:blur={(event) => {
				// Validate ZIP code: must be exactly 5 digits
				const isValid =
					/^[a-zA-Z0-9]+([._-][0-9a-zA-Z]+)*@[a-zA-Z0-9]+([.-][0-9a-zA-Z]+)*\.[a-zA-Z]{2,}$/.test(
						user.email
					);
				validate.email = !isValid;
				if (!isValid) {
					toast.error('Email is invalid');
				}
			}}
			on:input={(event) => {
				// Remove non-numeric characters and lim
				validate.email = false;
			}}
			on:blur={(event) => {}}
		/>
	</div>
	<div class="flex w-full flex-col gap-1.5">
		<Label for="Zip" class={cn('', validate.zip && 'text-destructive')}>Zip Code</Label>
		<Input
			type="number"
			id="zip"
			bind:value={user.zip}
			placeholder=""
			on:blur={(event) => {
				// validate zip code: must be exactly 5 digits
				const isValid = /^[0-9]{5}$/.test(user.zip);
				validate.zip = !isValid;
				if (!isValid) {
					toast.error('Zip Code is invalid');
				}
			}}
			on:input={(event) => {
				// remove non-numeric characters and limit to 5 digits
				const sanitizedvalue = event.target.value.replace(/[^0-9]/g, '').slice(0, 5);
				user.zip = sanitizedvalue;
				validate.zip = false;
			}}
		/>

		<button
			type="button"
			on:click={async () => {
				try {
					const zipCode = await getLocation();
					console.log();
					zipcodemessage = 'Found: ' + zipCode;
					validate.zip = false;
					user.zip = zipCode;
				} catch (error) {
					zipcodemessage = error.message;
				}
			}}
			class="mt-0 w-fit pt-0 text-start text-xs hover:underline"
			>Get location <i class="font-light">
				{#if zipcodemessage}{zipcodemessage}{/if}</i
			></button
		>
	</div>
	<div class="flex w-full flex-col gap-1.5">
		<Label for="phone" class={cn('', validate.phone && 'text-destructive')}>Phone</Label>
		<Input
			type="tel"
			id="phone"
			bind:value={user.phone}
			placeholder=""
			on:blur={() => {
				// Validate zip code: must be exactly 5 digits
				const isValid = /^[0-9]{10}$/.test(user.phone);
				console.log(isValid);
				validate.phone = !isValid; // Assuming `validate.zip` tracks zip code validation
				if (!isValid) {
					toast.error('Phone number is invalid');
				}
			}}
			on:input={(event) => {
				// Remove non-numeric characters and limit to 10 digits
				const sanitizedValue = event.target.value.replace(/[^0-9]/g, '').slice(0, 10);
				user.phone = sanitizedValue;
				validate.phone = sanitizedValue.length === 10; // Valid if 10 digits
			}}
		/>
	</div>
	<div class="col-span-full flex items-center space-x-2">
		<Checkbox id="terms" bind:checked={formChecked} aria-labelledby="terms-label" />
		<Label
			id="terms-label"
			for="terms"
			class="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
		>
			I agree to receive text messages from Alexander Health Consulting. I have read and accept the <span
				><a target="_blank" href="/en/terms" class="text-muted-foreground hover:underline"
					>Terms of Service</a
				></span
			>
			and
			<span
				><a target="_blank" href="/en/privacy" class="text-muted-foreground hover:underline"
					>Privacy Policy</a
				></span
			>. Message and data rates may apply. To opt out, text STOP at any time.
		</Label>
	</div>
	<Button
		disabled={!formChecked}
		on:click={async () => {
			if (Object.values(validate).some((v) => v === true || v === null)) {
				console.log('Validation errors exist. Fix them before proceeding.');
				toast.error('Please complete your form before submitting');

				// Log fields with `true` values (validation errors)
				const errors = Object.entries(validate)
					.filter(([key, value]) => value === true || value === null)
					.map(([key]) => key); // Extract only the keys (field names)
				console.log('Fields with errors or nulls:', errors);

				for (let index = 0; index < errors.length; index++) {
					const field = errors[index];
					validate[field] = true;
				}
				return; // Stop execution if any validation errors exist
			}
			console.log('oj');
			// await fetch('/api/upload_lead');
		}}
		class="col-span-full mt-8 rounded-full bg-accent">Request a Quote</Button
	>
</div>
