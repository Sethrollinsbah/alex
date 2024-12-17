<script>
	import Text from '$lib/text.svelte';
	import { Button } from '$lib/components/ui/button';
	import Input from '$lib/Input.svelte';
	import Phone from '$lib/Phone.svelte';
	import InsureLogo from '$lib/content/InsureLogo.svelte';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	let form = {
		name: '',
		email: '',
		code: 'US',
		number: ''
	};
</script>

<section id="contact-us" class=" h-full min-h-96 w-full bg-black/5 px-8 py-12">
	<div class="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
		<div class="mx-auto flex h-full w-full max-w-md flex-col items-center justify-start">
			<div class="h-40 w-72 rounded-md bg-accent shadow">
				<InsureLogo size="h-40 w-72 scale-90" />
			</div>
			<p class="mt-8 text-center text-lg font-light">
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
			<Text className="text-xs mt-2 text-gray-400"
				>By submiting this form you agree to be to contacted in accordance of our privacy policy</Text
			>
			<Button
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
						goto('/~/completion?name=' + form.name);
					}
				}}
				class="mt-5 rounded-full bg-accent ">Submit</Button
			>
		</div>
	</div>
</section>
