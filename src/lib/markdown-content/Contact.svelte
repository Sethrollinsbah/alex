<script lang="ts">
	import Text from '$lib/text.svelte';
	import { Button } from '$lib/components/ui/button';
	import Phone from '$lib/Phone.svelte';
	import InsureLogo from '$lib/content/InsureLogo.svelte';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { Label } from '$lib/components/ui/label';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { cn } from '$lib/utils';
	import { Input } from '$lib/components/ui/input';

	let userChecked = $state(false);
	let user = $state({
		name: '',
		email: '',
		code: 'US',
		phone: ''
	});
	let validate: Validate = $state({
		email: null,
		phone: null,
		name: null
	});
	type Validate = {
		email: boolean | null;
		phone: boolean | null;
		name: boolean | null;
	};
</script>

<section id="contact-us" class=" h-full min-h-96 w-full bg-black/5 px-8 py-12">
	<div class="mx-auto flex h-fit w-full max-w-5xl flex-col space-x-8 md:flex-row">
		<div class="mx-auto flex h-full w-[90%] max-w-3xl flex-col items-center justify-start">
			<div class="aspect-[9/5] w-full rounded-md bg-accent shadow">
				<InsureLogo size="h-full w-full scale-90" />
			</div>
			<p class="mt-8 w-full text-center text-lg font-light">
				Licensed in 20+ states, AHC helps individuals, families, and businesses find the right
				coverage at the right price. We turn the complexity of health insurance into an empowering
				experience, offering personalized consultations to address your unique needs. From network
				restrictions to out-of-pocket costs, we guide you through every detail to ensure you’re
				fully covered.
			</p>
		</div>
		<div class="sticky top-16 mx-auto h-fit w-[90%] max-w-md rounded-md bg-gray-50 p-8 shadow-lg">
			<div class="mb-4 w-fit">
				<InsureLogo size="h-12 w-20" small={true} />
			</div>

			<Text className="text-lg md:text-xl font-bold">Request a call from us</Text>
			<Text className="text-base  mb-4 text-gray-600"
				>Fill out the user to get a quote from one of our registered agents.</Text
			>

			<div class=" flex w-full flex-col gap-1.5">
				<Label for="name" class={cn('', validate.name && 'text-destructive')}>Name</Label>
				<Input
					type="text"
					id="name"
					on:blur={() => {
						// Validate first name: must be more than 2 characters
						const isValid = user.name.length > 2;
						validate.name = !isValid; // true if invalid, false if valid
						if (!isValid) {
							toast.error('Name is invalid');
						}
					}}
					on:input={(event) => {
						validate.name = false;

						// Remove invalid characters: allow only letters (uppercase and lowercase)
						if (!event.target) {
							return;
						}
						const sanitizedValue = event.target.value.replace(/[^a-zA-Z]/g, '');
						user.name = sanitizedValue;

						// Update validation dynamically while typing
						validate.name = sanitizedValue.length > 2;
					}}
					placeholder=""
				/>
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
				/>
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
					on:input={(/** @type {{ target: { value: string; }; }} */ event) => {
						// Remove non-numeric characters and limit to 10 digits
						const sanitizedValue = event.target.value.replace(/[^0-9]/g, '').slice(0, 10);
						user.phone = sanitizedValue;
						validate.phone = sanitizedValue.length === 10; // Valid if 10 digits
					}}
				/>
			</div>
			<div class="mt-4 flex items-center space-x-2">
				<Checkbox id="terms" bind:checked={userChecked} aria-labelledby="terms-label" />
				<Label
					id="terms-label"
					for="terms"
					class="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					I agree to receive text messages from Alexander Health Consulting. I have read and accept
					the <span
						><a target="_blank" href="/terms" class="text-muted-foreground hover:underline"
							>Terms of Service</a
						></span
					>
					and
					<span
						><a target="_blank" href="/privacy" class="text-muted-foreground hover:underline"
							>Privacy Policy</a
						></span
					>. Message and data rates may apply. To opt out, text STOP at any time.
				</Label>
			</div>
			<Button
				disabled={!userChecked}
				on:click={async () => {
					if (user.name.length < 1) {
						toast.error('Please add your name');
						return;
					}
					if (user.email.length < 1) {
						toast.error('Please add your email');
						return;
					}
					if (user.phone.length < 9) {
						toast.error('Please add your phone');
						return;
					}
					const data = user;
					const res = await fetch('/api/upload_lead', {
						method: 'POST',
						body: JSON.stringify({ data, type: 'Contact' })
					});
					if (res.ok) {
						goto('/en/completion?name=' + user.name);
					}
				}}
				class="mt-5 rounded-full bg-accent ">Submit</Button
			>
		</div>
	</div>
</section>
