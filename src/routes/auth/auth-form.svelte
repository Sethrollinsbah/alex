<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import { formSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form
	method="POST"
	action="?/register"
	use:enhance={async ({ result }) => {
		if (result.success) {
			toast.success('Registration successful!');
		} else {
			toast.error(result.error.message);
		}
	}}
>
	<Form.Field {form} name="username">
		<Form.Control let:attrs>
			<Form.Label>Username</Form.Label>
			<Input {...attrs} bind:value={$formData.username} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="password">
		<Form.Control let:attrs>
			<Form.Label>Password</Form.Label>
			<Input {...attrs} bind:value={$formData.password} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button
		on:click={async () => {
			const data = new FormData();
			data.append('username', $formData.username);
			data.append('password', $formData.password);
			const submit = await fetch('?/register', {
				method: 'POST',
				body: data
			});
			if (submit.ok) {
				const res = await submit.json();
				if (res.type === 'failure') {
					toast.error('there was an error');
					return;
				}

				return;
			}

			return;
		}}>Submit</Form.Button
	>
</form>
