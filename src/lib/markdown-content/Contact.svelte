<script>
	import Text from '$lib/text.svelte';
	import { Button } from '$lib/components/ui/button';
	import Input from '$lib/Input.svelte';
	import Phone from '$lib/Phone.svelte';
	import InsureLogo from '$lib/content/InsureLogo.svelte';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { Label } from '$lib/components/ui/label';
	import { Checkbox } from '$lib/components/ui/checkbox';

	let formChecked = $state(false);
	let form = {
		name: '',
		email: '',
		code: 'US',
		number: ''
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
				>Fill out the form to get a quote from one of our registered agents.</Text
			>

			<Input
				boolean_disabled={false}
				bind:value_place={form.name}
				placeholder_eg=""
				placeholder="Name"
			/>
			<Input
				boolean_disabled={false}
				bind:value_place={form.email}
				placeholder_eg=""
				type="email"
				placeholder="Email"
			/>
			<Phone bind:code={form.code} bind:number={form.number} />

			<div class="flex items-center space-x-2">
				<Checkbox id="terms" bind:checked={formChecked} aria-labelledby="terms-label" />
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
				disabled={!formChecked}
				on:click={async () => {
					if (form.name.length < 1) {
						toast.error('Please add your name');
						return;
					}
					if (form.email.length < 1) {
						toast.error('Please add your email');
						return;
					}
					if (form.number.length < 9) {
						toast.error('Please add your phone');
						return;
					}
					const data = form;
					const res = await fetch('/api/upload_lead', {
						method: 'POST',
						body: JSON.stringify({ data, type: 'Contact' })
					});
					if (res.ok) {
						goto('/en/completion?name=' + form.name);
					}
				}}
				class="mt-5 rounded-full bg-accent ">Submit</Button
			>
		</div>
	</div>
</section>
