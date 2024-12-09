<script>
	// @ts-ignore
	import { JSONEditor } from 'svelte-jsoneditor';
	import * as Select from '$lib/components/ui/select';
	import { writable } from 'svelte/store';
	import * as Tabs from '$lib/components/ui/tabs';
	import { goto } from '$app/navigation';
	import { Textarea } from '$lib/components/ui/textarea';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';

	// @ts-ignore
	// @ts-ignore
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	const date_at_load = Date.now();

	let selectedUser = writable('all');
	export let data;
	let filecontent0 = data.file0;
	// @ts-ignore
	let filecontent1 = data.fiie1;
	let filecontent2 = data.fiie2;
	let filecontent3 = data.fiie3;
	let filecontent4 = data.fiie4;
	let filecontent5 = data.fiie5;
	let filecontent6 = data.fiie6;
	let filecontent7 = data.fiie7;
	let filecontent8 = data.fiie8;
	let filecontent9 = data.fiie9;
	let filecontent10 = data.fiie10;
	// Fetch the file content when the component mounts

	import * as Table from '$lib/components/ui/table';
	import CodeMirror from './CodeMirror.svelte';

	// @ts-ignore
	// @ts-ignore
	let leads = data.leads;
	let openDialog = writable(false);
	let selectedId = writable(null);

	// Function to toggle the dialog state and reset selectedId
	function toggleDialog() {
		openDialog.update((currentState) => !currentState);
	}

	/**
	 * @type {any}
	 */
	let change0, change10;
</script>

<Tabs.Root value="home" class="mx-auto w-[90%] max-w-4xl">
	<Tabs.List>
		<Tabs.Trigger value="home">Home Page</Tabs.Trigger>
		<Tabs.Trigger value="alternatives">Alternatives Page</Tabs.Trigger>
		<Tabs.Trigger value="faq">FAQ Page</Tabs.Trigger>
		<Tabs.Trigger value="leads">Leads</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="home">
		<h1 class="mx-auto text-center text-2xl font-bold">Home Page</h1>
		<div class="mx-auto flex w-[90%] max-w-xl flex-col space-y-4">
			{#if filecontent0}
				<CodeMirror bind:change={change0} value={JSON.stringify(JSON.parse(filecontent0), null, 2)}
				></CodeMirror>
			{/if}
			<Button
				on:click={async () => {
					const data = new FormData();
					data.append('content', change0); // Add the Textarea content to FormData
					data.append('file', 'file0'); // Add the Textarea content to FormData

					try {
						const response = await fetch('?/file', {
							method: 'POST',
							body: data // Make sure you pass the body as FormData
						});

						if (!response.ok) {
							toast.error('Error adding form, call Seth');
							throw new Error('Failed to submit the form');
						}

						console.log(response);
						// Handle response if needed
						console.log('Form submitted successfully');
						toast.success('File has been updated', {
							description: 'Good boy - Seth',
							action: {
								label: 'View Live Site',
								onClick: () => {
									goto('/en/home');
								}
							}
						});
					} catch (error) {
						toast.error('Error adding form, call Seth');
						console.error('Error:', error);
					}
				}}>Submit</Button
			>
			<!-- {#if filecontent1} -->
			<!-- 	<CodeMirror bind:change={change1}  mode="md" bind:value={filecontent1}></CodeMirror> -->
			<!-- {/if} -->
			<Textarea class="aspect-video h-full min-h-96" bind:value={filecontent1}></Textarea>
			<Button
				on:click={async () => {
					const data = new FormData();
					data.append('content', filecontent1); // Add the Textarea content to FormData
					data.append('file', 'file1'); // Add the Textarea content to FormData

					try {
						const response = await fetch('?/file', {
							method: 'POST',
							body: data // Make sure you pass the body as FormData
						});

						if (!response.ok) {
							toast.error('Error adding form, call Seth');
							throw new Error('Failed to submit the form');
						}

						// Handle response if needed
						console.log('Form submitted successfully');
						toast.success('File has been updated', {
							description: 'Good boy - Seth',
							action: {
								label: 'View Live Site',
								onClick: () => {
									goto('/en/home');
								}
							}
						});
					} catch (error) {
						toast.error('Error adding form, call Seth');
						console.error('Error:', error);
					}
					console.log(filecontent1);
				}}>Submit</Button
			>

			<!-- {#if filecontent2} -->
			<!-- 	<CodeMirror bind:change={change0} mode="md" value={filecontent2}></CodeMirror> -->
			<!-- {/if} -->
			<Textarea class="aspect-video h-full min-h-96" bind:value={filecontent2}></Textarea>
			<Button
				on:click={async () => {
					const data = new FormData();
					data.append('content', filecontent2); // Add the Textarea content to FormData
					data.append('file', 'file2'); // Add the Textarea content to FormData

					try {
						const response = await fetch('?/file', {
							method: 'POST',
							body: data // Make sure you pass the body as FormData
						});

						if (!response.ok) {
							toast.error('Error adding form, call Seth');
							throw new Error('Failed to submit the form');
						}

						// Handle response if needed
						console.log('Form submitted successfully');
						toast.success('File has been updated', {
							description: 'Good boy - Seth',
							action: {
								label: 'View Live Site',
								onClick: () => {
									goto('/en/home');
								}
							}
						});
					} catch (error) {
						toast.error('Error adding form, call Seth');
						console.error('Error:', error);
					}
				}}>Submit</Button
			>
			<!-- {#if filecontent3} -->
			<!-- 	<CodeMirror bind:change={change0} mode="md" value={filecontent3}></CodeMirror> -->
			<!-- {/if} -->
			<Textarea class="aspect-video h-full min-h-96" bind:value={filecontent3}></Textarea>
			<Button
				on:click={async () => {
					const data = new FormData();
					data.append('content', filecontent3); // Add the Textarea content to FormData
					data.append('file', 'file3'); // Add the Textarea content to FormData

					try {
						const response = await fetch('?/file', {
							method: 'POST',
							body: data // Make sure you pass the body as FormData
						});

						if (!response.ok) {
							toast.error('Error adding form, call Seth');
							throw new Error('Failed to submit the form');
						}

						// Handle response if needed
						console.log('Form submitted successfully');
						toast.success('File has been updated', {
							description: 'Good boy - Seth',
							action: {
								label: 'View Live Site',
								onClick: () => {
									goto('/en/home');
								}
							}
						});
					} catch (error) {
						toast.error('Error adding form, call Seth');
						console.error('Error:', error);
					}
				}}>Submit</Button
			>
			<!-- {#if filecontent4} -->
			<!-- 	<CodeMirror bind:change={change4} mode="md" value={filecontent4}></CodeMirror> -->
			<!-- {/if} -->
			<Textarea class="aspect-video h-full min-h-96" bind:value={filecontent4}></Textarea>
			<Button
				on:click={async () => {
					const data = new FormData();
					data.append('content', filecontent4); // Add the Textarea content to FormData
					data.append('file', 'file4'); // Add the Textarea content to FormData

					try {
						const response = await fetch('?/file', {
							method: 'POST',
							body: data // Make sure you pass the body as FormData
						});

						if (!response.ok) {
							toast.error('Error adding form, call Seth');
							throw new Error('Failed to submit the form');
						}

						// Handle response if needed
						console.log('Form submitted successfully');
						toast.success('File has been updated', {
							description: 'Good boy - Seth',
							action: {
								label: 'View Live Site',
								onClick: () => {
									goto('/en/home');
								}
							}
						});
					} catch (error) {
						toast.error('Error adding form, call Seth');
						console.error('Error:', error);
					}
				}}>Submit</Button
			>

			<!-- {#if filecontent5} -->
			<!-- 	<CodeMirror bind:change={change5} mode="md" value={filecontent5}></CodeMirror> -->
			<!-- {/if} -->
			<Textarea class="aspect-video h-full min-h-96" bind:value={filecontent5}></Textarea>
			<Button
				on:click={async () => {
					const data = new FormData();
					data.append('content', filecontent5); // Add the Textarea content to FormData
					data.append('file', 'file5'); // Add the Textarea content to FormData

					try {
						const response = await fetch('?/file', {
							method: 'POST',
							body: data // Make sure you pass the body as FormData
						});

						if (!response.ok) {
							toast.error('Error adding form, call Seth');
							throw new Error('Failed to submit the form');
						}

						// Handle response if needed
						console.log('Form submitted successfully');
						toast.success('File has been updated', {
							description: 'Good boy - Seth',
							action: {
								label: 'View Live Site',
								onClick: () => {
									goto('/en/home');
								}
							}
						});
					} catch (error) {
						toast.error('Error adding form, call Seth');
						console.error('Error:', error);
					}
				}}>Submit</Button
			>
			<iframe class="aspect-video h-full" src="https://cool-salad-96aa.pages.dev/en//home"></iframe>
			<p><i class="mr-2">Last Updated: {new Date(date_at_load).toLocaleString()}</i></p>
		</div>
	</Tabs.Content>
	<Tabs.Content value="alternatives">
		<h1 class="mx-auto text-center text-2xl font-bold">Alternatives Page</h1>
		<div class="mx-auto flex w-[90%] max-w-xl flex-col space-y-4">
			<!-- {#if filecontent6} -->
			<!-- 	<CodeMirror bind:change={change6} mode="md" value={filecontent6}></CodeMirror> -->
			<!-- {/if} -->
			<Textarea class="aspect-video h-full min-h-96" bind:value={filecontent6}></Textarea>
			<Button
				on:click={async () => {
					const data = new FormData();
					data.append('content', filecontent6); // Add the Textarea content to FormData
					data.append('file', 'file6'); // Add the Textarea content to FormData

					try {
						const response = await fetch('?/file', {
							method: 'POST',
							body: data // Make sure you pass the body as FormData
						});

						if (!response.ok) {
							toast.error('Error adding form, call Seth');
							throw new Error('Failed to submit the form');
						}

						// Handle response if needed
						console.log('Form submitted successfully');
						toast.success('File has been updated', {
							description: 'Good boy - Seth',
							action: {
								label: 'View Live Site',
								onClick: () => {
									goto('/en/home');
								}
							}
						});
					} catch (error) {
						toast.error('Error adding form, call Seth');
						console.error('Error:', error);
					}
				}}>Submit</Button
			>
			<!-- {#if filecontent7} -->
			<!-- 	<CodeMirror bind:change={change7} mode="md" value={filecontent7}></CodeMirror> -->
			<!-- {/if} -->
			<Textarea class="aspect-video h-full min-h-96" bind:value={filecontent7}></Textarea>
			<Button
				on:click={async () => {
					const data = new FormData();
					data.append('content', filecontent7); // Add the Textarea content to FormData
					data.append('file', 'file7'); // Add the Textarea content to FormData

					try {
						const response = await fetch('?/file', {
							method: 'POST',
							body: data // Make sure you pass the body as FormData
						});

						if (!response.ok) {
							toast.error('Error adding form, call Seth');
							throw new Error('Failed to submit the form');
						}

						// Handle response if needed
						console.log('Form submitted successfully');
						toast.success('File has been updated', {
							description: 'Good boy - Seth',
							action: {
								label: 'View Live Site',
								onClick: () => {
									goto('/en/home');
								}
							}
						});
					} catch (error) {
						toast.error('Error adding form, call Seth');
						console.error('Error:', error);
					}
				}}>Submit</Button
			>

			<!-- {#if filecontent8} -->
			<!-- 	<CodeMirror bind:change={change8} mode="md" value={filecontent8}></CodeMirror> -->
			<!-- {/if} -->
			<Textarea class="aspect-video h-full min-h-96" bind:value={filecontent8}></Textarea>
			<Button
				on:click={async () => {
					const data = new FormData();
					data.append('content', filecontent8); // Add the Textarea content to FormData
					data.append('file', 'file8'); // Add the Textarea content to FormData

					try {
						const response = await fetch('?/file', {
							method: 'POST',
							body: data // Make sure you pass the body as FormData
						});

						if (!response.ok) {
							toast.error('Error adding form, call Seth');
							throw new Error('Failed to submit the form');
						}

						// Handle response if needed
						console.log('Form submitted successfully');
						toast.success('File has been updated', {
							description: 'Good boy - Seth',
							action: {
								label: 'View Live Site',
								onClick: () => {
									goto('/en/home');
								}
							}
						});
					} catch (error) {
						toast.error('Error adding form, call Seth');
						console.error('Error:', error);
					}
				}}>Submit</Button
			>

			<!-- {#if filecontent9} -->
			<!-- 	<CodeMirror bind:change={change9} mode="md" value={filecontent9}></CodeMirror> -->
			<!-- {/if} -->
			<Textarea class="aspect-video h-full min-h-96" bind:value={filecontent9}></Textarea>
			<Button
				on:click={async () => {
					const data = new FormData();
					data.append('content', filecontent9); // Add the Textarea content to FormData
					data.append('file', 'file9'); // Add the Textarea content to FormData

					try {
						const response = await fetch('?/file', {
							method: 'POST',
							body: data // Make sure you pass the body as FormData
						});

						if (!response.ok) {
							toast.error('Error adding form, call Seth');
							throw new Error('Failed to submit the form');
						}

						// Handle response if needed
						console.log('Form submitted successfully');
						toast.success('File has been updated', {
							description: 'Good boy - Seth',
							action: {
								label: 'View Live Site',
								onClick: () => {
									goto('/en/home');
								}
							}
						});
					} catch (error) {
						toast.error('Error adding form, call Seth');
						console.error('Error:', error);
					}
				}}>Submit</Button
			>
			<iframe class="aspect-video h-full" src="https://cool-salad-96aa.pages.dev/en/alternatives"
			></iframe>
			<p><i class="mr-2">Last Updated: {new Date(date_at_load).toLocaleString()}</i></p>
		</div>
	</Tabs.Content>
	<Tabs.Content value="faq">
		<div>
			{#if filecontent10}
				<CodeMirror
					bind:change={change10}
					value={JSON.stringify(JSON.parse(filecontent10), null, 2)}
				></CodeMirror>
			{/if}
			<!-- <JSONEditor bind:content={JSON.parse(filecontent10)}></JSONEditor> -->
			<Button
				on:click={async () => {
					const data = new FormData();
					data.append('content', change10); // Add the Textarea content to FormData
					data.append('file', 'faq'); // Add the Textarea content to FormData

					try {
						const response = await fetch('?/file', {
							method: 'POST',
							body: data // Make sure you pass the body as FormData
						});

						if (!response.ok) {
							toast.error('Error adding form, call Seth');
							throw new Error('Failed to submit the form');
						}

						console.log(response);
						// Handle response if needed
						console.log('Form submitted successfully');
						toast.success('File has been updated', {
							description: 'Good boy - Seth',
							action: {
								label: 'View Live Site',
								onClick: () => {
									goto('/en/home');
								}
							}
						});
					} catch (error) {
						toast.error('Error adding form, call Seth');
						console.error('Error:', error);
					}
				}}>Submit</Button
			>
		</div></Tabs.Content
	>

	<Tabs.Content value="leads">
		<h1 class="mx-auto text-center text-2xl font-bold">Leads</h1>

		<Select.Root>
			<Select.Trigger class="w-[180px]">
				<Select.Value placeholder="all" bind:value={$selectedUser} />
			</Select.Trigger>
			<Select.Content>
				<Select.Item
					on:click={() => {
						$selectedUser = 'all';
					}}
					value="all">All</Select.Item
				>
				<Select.Item
					on:click={() => {
						$selectedUser = 'Briana';
					}}
					value="bri_">Briana</Select.Item
				>
				<Select.Item
					on:click={() => {
						$selectedUser = 'Sofia';
					}}
					value="sof_">Sofia</Select.Item
				>
				<Select.Item
					on:click={() => {
						$selectedUser = 'Zach';
					}}
					value="zach_">Zach</Select.Item
				>
			</Select.Content>
		</Select.Root>
		<Table.Root>
			<Table.Caption>A list of your recent leads.</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[100px]">Assignee</Table.Head>
					<Table.Head>Date</Table.Head>
					<Table.Head>Id</Table.Head>
					<Table.Head class="text-right">Status</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each leads as lead, i (i)}
					<Table.Row
						class={$selectedUser === 'all' ? `` : $selectedUser === lead[0] ? `` : `hidden`}
						on:click={async () => {
							const data = new FormData();
							let prefix;
							if (lead[0] === 'Sofia') {
								prefix = 'sof_';
							} else if (lead[0] === 'Zach') {
								prefix = 'zach_';
							} else {
								prefix = 'bri_';
							}
							prefix = prefix + lead[1] + '_' + lead[2] + '_' + lead[3];

							data.append('id', prefix);
							try {
								const response = await fetch('?/lead', {
									method: 'POST',
									body: data // Make sure you pass the body as FormData
								});
								if (!response.ok) {
									toast.error('Error sourcing lead, call Seth');
									throw new Error('Failed to submit the form');
								}
								console.log(response);
								$selectedId = await response.json();
								console.log($selectedId);
								let parsedData = JSON.parse($selectedId.data);
								$selectedId = JSON.parse(parsedData[0]);
								// Handle response if needed
								console.log('Form submitted successfully');
							} catch (error) {
								toast.error('Error sourcing lead, call Seth');
								console.error('Error:', error);
							}
							toggleDialog();
						}}
					>
						<Table.Cell class="font-medium">{lead[0]}</Table.Cell>
						<Table.Cell>{new Date(Number(lead[1])).toLocaleString()}</Table.Cell>
						<Table.Cell>{lead[2]}</Table.Cell>
						<Table.Cell class="text-right">{lead[3]}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</Tabs.Content>
</Tabs.Root>

<Dialog.Root bind:open={$openDialog}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>
				Lead Data<br />
				<!-- Using a date formatting function -->
			</Dialog.Title>
			<i> {new Date($selectedId.created_at).toLocaleString()}</i>
		</Dialog.Header>

		<!-- Displaying Lead Details -->
		<div><b>First Name: </b>{$selectedId.data.name}</div>
		<div><b>Last Name: </b>{$selectedId.data.lastName}</div>

		<!-- Phone Number with link -->
		<div>
			<b>Phone: </b>
			<a href={`tel:${$selectedId.data.phone}`}>{$selectedId.data.phone}</a>
		</div>

		<!-- Email with link -->
		<div>
			<b>Email: </b>
			<a
				class="text-blue-600"
				href={'mailto:' +
					$selectedId.data.email +
					'?subject=' +
					encodeURIComponent('Hey, ' + $selectedId.data.name + '. Do you still need coverage?') +
					'&body=' +
					encodeURIComponent(
						'Hey ' +
							$selectedId.data.name +
							". We're reaching out to you because you recently filled out a form on our website. How can we help you today?"
					)}
			>
				{$selectedId.data.email}
			</a>
		</div>

		<!-- Household and ZIP code -->
		<div><b>Household: </b>{$selectedId.data.house}</div>
		<div><b>ZIP: </b>{$selectedId.data.zip}</div>

		<!-- Age and Date of Birth -->
		<div><b>Age: </b>{$selectedId.data.currentAge}</div>
		<div>
			<b>DOB: </b>
			{$selectedId.data.age.year}-{$selectedId.data.age.month}-{$selectedId.data.age.day}
		</div>
	</Dialog.Content>
</Dialog.Root>
