import { fail, type Actions } from '@sveltejs/kit';

import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
export const load: PageServerLoad = async ({ locals, url, platform }) => {
	// if (!locals.user) {
	// 	return redirect(302, '/auth');
	// }
	const kv = await platform.env.KV;

	// Await the result of kv.list() and then map over keys
	const sof = (await kv.list({ prefix: 'sof_' })).keys.map((item) => [
		'Sofia',
		item.name.split('_')[1],
		item.name.split('_')[2],
		item.name.split('_')[3]
	]);
	const bri = (await kv.list({ prefix: 'bri_' })).keys.map((item) => [
		'Briana',
		item.name.split('_')[1],
		item.name.split('_')[2],
		item.name.split('_')[3]
	]);
	const zac = (await kv.list({ prefix: 'zach_' })).keys.map((item) => [
		'Zach',
		item.name.split('_')[1],
		item.name.split('_')[2],
		item.name.split('_')[3]
	]);

	// Combine all leads into one array
	let lead = [...sof, ...bri, ...zac];
	let leads = lead.sort((a, b) => {
		const timestampA = Number(a[1]); // Convert the first column to a number (timestamp)
		const timestampB = Number(b[1]); // Convert the first column to a number (timestamp)
		return timestampB - timestampA;
	});

	console.log(leads);

	const r2 = await platform?.env.MY_BUCKET;
	return {
		leads,
		file0: JSON.stringify(await getContent(r2, 'file_content_0.json')),
		file1: await getContent(r2, 'file_content_1.md'),
		file2: await getContent(r2, 'file_content_2.md'),
		file3: await getContent(r2, 'file_content_3.md'),
		file4: await getContent(r2, 'file_content_4.md'),
		file5: await getContent(r2, 'file_content_5.md'),
		file6: await getContent(r2, 'file_content_6.md'),
		file7: await getContent(r2, 'file_content_7.md'),
		file8: await getContent(r2, 'file_content_8.md'),
		file9: await getContent(r2, 'file_content_9.md'),
		faq: JSON.stringify(await getContent(r2, 'faq.json'))
	};
	// Get the file from the R2 bucket
};

async function getContent(r2: R2Bucket, file: string) {
	file = await r2.get('file_content_0.json');

	// Ensure the file exists
	if (!file.body) {
		throw new Error('File not found or empty body');
	}

	// Read the body of the file (which is a ReadableStream)
	const reader = file.body.getReader();
	const decoder = new TextDecoder(); // Used to convert binary to string
	let jsonString = '';
	let done = false;

	// Loop through the stream and read the data
	while (!done) {
		const { value, done: readDone } = await reader.read();
		done = readDone;
		jsonString += decoder.decode(value, { stream: true });
	}

	// Parse the JSON string into an object
	let fileContent;
	try {
		fileContent = JSON.parse(jsonString);
	} catch (error) {
		throw new Error('Error parsing JSON from file content');
	}

	return fileContent;
}
export const actions: Actions = {
	updateStatus: async ({ request, platform }) => {
		console.log('Received request:', request);

		try {
			// Get the form data
			const data = await request.formData();
			const id = data.get('id');
			const kv: KVNamespace = await platform.env.KV;
			const lead = await kv.get(id);
			return lead;
		} catch (e) {
			// Log error in case of failure
			console.error('Error processing the request:', e);
			return fail(500, { message: 'Internal server error' });
		}
	},
	lead: async ({ request, platform }) => {
		console.log('Received request:', request);

		try {
			// Get the form data
			const data = await request.formData();
			const id = data.get('id');
			const kv: KVNamespace = await platform.env.KV;
			const lead = await kv.get(id);
			return lead;
		} catch (e) {
			// Log error in case of failure
			console.error('Error processing the request:', e);
			return fail(500, { message: 'Internal server error' });
		}
	},
	file: async ({ request, platform }) => {
		// Log incoming request
		console.log('Received request:', request);

		try {
			// Get the form data
			const data = await request.formData();
			const file = data.get('file');
			const content = data.get('content');

			console.log(content);
			// Log received form data
			console.log(`Received file: ${file}, content: ${content}`);

			const r2: R2Bucket = await platform.env.MY_BUCKET;

			// Switch logic for storing content
			switch (file) {
				case 'file0':
					console.log('Saving content to filecontent0');
					await r2.put('file_content_0.json', content);
					break;
				case 'file1':
					console.log('Saving content to filecontent1');
					await r2.put('file_content_1.md', content);
					break;
				case 'file2':
					console.log('Saving content to filecontent2');
					await r2.put('file_content_2.md', content);
					break;
				case 'file3':
					console.log('Saving content to filecontent3');
					await r2.put('file_content_3.md', content);
					break;
				case 'file4':
					console.log('Saving content to filecontent4');
					await r2.put('file_content_4.md', content);
					break;
				case 'file5':
					console.log('Saving content to filecontent5');
					await r2.put('file_content_5.md', content);
					break;
				case 'file6':
					console.log('Saving content to filecontent6');
					await r2.put('file_content_6.md', content);
					break;
				case 'file7':
					console.log('Saving content to filecontent7');
					await r2.put('file_content_7.md', content);
					break;
				case 'file8':
					console.log('Saving content to filecontent8');
					await r2.put('file_content_8.md', content);
					break;
				case 'file9':
					console.log('Saving content to filecontent9');
					await r2.put('file_content_9.md', content);
					break;
				case 'faq':
					console.log('Saving content to faq');
					await r2.put('faq.json', content);
					break;
				default:
					console.error('Unknown file type received:', file);
					return fail(400, { message: 'Unknown file type' });
			}

			// Log success message and return response
			console.log(`Successfully stored content for ${file}`);
			return { status: 'success', message: 'Successfully stored the content' };
		} catch (error) {
			// Log error in case of failure
			console.error('Error processing the request:', error);
			return fail(500, { message: 'Internal server error' });
		}
	}
};
