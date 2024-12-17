import { Resend } from 'resend';

const resend = new Resend(import.meta.env.VITE_RESEND_KEY);

export async function POST({ request, platform }) {
	try {
		const { data, type } = await request.json();

		console.log(data);
		if (!data) {
			return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
		}

		const kv = await platform.env.KV;
		let assignee = await kv.get('turn');

		const id = crypto.randomUUID();
		// Rotate the assignee


		let email = 'alexanderhealthconsulting@gmail.com';
		const calculateCurrentAge = (year, month, day) => {
			const dob = new Date(year, month - 1, day);
			const diff = Date.now() - dob.getTime();
			const ageDate = new Date(diff);
			return Math.abs(ageDate.getUTCFullYear() - 1970);
		};

		const currentAge = calculateCurrentAge(data.age.year, data.age.month, data.age.day);

		await resend.emails.send({
			from: 'Not Seth <leadmagnet@cobrainsure.org>',
			to: [email],
			subject: `NEW LEAD: ${id}`,
			html: `
		    <p>${JSON.stringify(data)}
		    </p>
		  `
		});
		await kv.put('turn', assignee);
		await kv.put(
			assignee + new Date().getTime() + '_' + id + '_' + 'Active' + '_' + type,
			JSON.stringify({
				created_at: new Date().getTime(),
				name: data.firstName || 'first' + ' ' + data.lastName || 'last',
				data: { ...data, currentAge: currentAge || null }
			})
		);
		await resend.emails.send({
			from: 'Not Seth <leadmagnet@cobrainsure.org>',
			to: ['sethryanrollins@gmail.com'],
			subject: `NEW CONTACT: ${id}`,
			html: `
		    <p>${JSON.stringify(data)}
		    </p>
		  `
		});
		await kv.put(
			'seth_' + new Date().getTime() + '_' + id + '_' + 'Active' + '_' + type,
			JSON.stringify({
				created_at: new Date().getTime(),
				name: data.name.firstName + ' ' + data.name.lastName,
				data: { ...data }
			})
		);

		return new Response(JSON.stringify({ status: 200, message: 'Lead successfully created' }), {
			status: 200
		});
	} catch (error) {
		console.error('Error inserting lead:', error);
		return new Response(JSON.stringify({ error: 'Internal server error' }), {
			status: 500
		});
	}
}
