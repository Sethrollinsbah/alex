<script>
	import Text from '$lib/text.svelte';
	import { Button } from '$lib/components/ui/button';
	import Input from '$lib/Input.svelte';
	import Phone from '$lib/Phone.svelte';
	import InsureLogo from '$lib/content/InsureLogo.svelte';
	import { toast } from 'svelte-sonner';

	let form = {
		name: '',
		email: '',
		code: 'US',
		number: ''
	};
</script>

<section id="contact-us" class="h-full min-h-96 w-full bg-black/5 py-12">
	<div class="sticky top-16 mx-auto h-fit w-[90%] max-w-md rounded-md bg-gray-50 p-8 shadow-lg">
		<div class="mb-4 w-fit">
			<InsureLogo />
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
			>By submiting this form you agree to allow us to contact you within accordance of our privacy
			policy</Text
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
			}}
			class="mt-5 rounded-full bg-blue-700 ">Submit</Button
		>
	</div>
</section>
