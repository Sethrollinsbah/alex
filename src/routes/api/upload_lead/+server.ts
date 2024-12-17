import { Resend } from 'resend';

const resend = new Resend(import.meta.env.VITE_RESEND_KEY);

export async function POST({ request, platform }) {
	try {
		const { data, type } = await request.json();

		console.log(data);
		// 		{
		//   dob: {
		//     calendar: { identifier: 'gregory' },
		//     era: 'AD',
		//     year: 2006,
		//     month: 12,
		//     day: 29
		//   },
		//   email: 'sethrollinsbahamas@gmail.com',
		//   firstName: 'Seth',
		//   lastName: 'Rollins',
		//   gender: 'male',
		//   phone: '1234567890',
		//   zip: '33613'
		// }
		if (!data) {
			return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
		}

		const kv = await platform.env.alex;

		const id = crypto.randomUUID();
		// Rotate the assignee

		let email = 'alexanderhealthconsulting@gmail.com';
		const calculateCurrentAge = (year, month, day) => {
			const dob = new Date(year, month - 1, day);
			const diff = Date.now() - dob.getTime();
			const ageDate = new Date(diff);
			return Math.abs(ageDate.getUTCFullYear() - 1970);
		};

		// Dynamically generate the email content
		const formattedData = Object.entries(data)
			.map(([key, value]) => {
				if (typeof value === 'object' && value !== null) {
					return `
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; text-align: left;">${key}</td>
          <td style="padding: 8px; border: 1px solid #ddd; text-align: left;">
            <pre style="font-size: 14px; margin: 0;">${JSON.stringify(value, null, 2)}</pre>
          </td>
        </tr>`;
				}
				return `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; text-align: left;">${key}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: left;">${value}</td>
      </tr>`;
			})
			.join('');

		await resend.emails.send({
			from: 'Not Seth <leadmagnet@cobrainsure.org>',
			to: [email],
			subject: `NEW LEAD: ${id}`,
			html: `
           <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h1 style="background-color: #f4f4f4; padding: 10px; text-align: center; color: #444;">
        New Lead Information
      </h1>
      <p style="margin: 20px 0; font-size: 16px;">
        <strong>Lead ID:</strong> ${id}
      </p>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px; margin: 0 auto;">
        <thead>
          <tr>
            <th style="padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4; text-align: left;">Field</th>
            <th style="padding: 10px; border: 1px solid #ddd; background-color: #f4f4f4; text-align: left;">Value</th>
          </tr>
        </thead>
        <tbody>
          ${formattedData}
        </tbody>
      </table>
    </div>
      `
		});

		if (data.age) {
			const currentAge =
				calculateCurrentAge(data.age.year || 1900, data.age.month || 1, data.age.day || 1) || null;

			await kv.put(
				'alexanderForm_' + new Date().getTime() + '_' + id + '_' + 'Active' + '_' + type,
				JSON.stringify({
					created_at: new Date().getTime(),
					name: data.firstName || 'first' + ' ' + data.lastName || 'last',
					data: { ...data, currentAge: currentAge || null }
				})
			);
		} else {
			await kv.put(
				'alexanderLead_' + new Date().getTime() + '_' + id + '_' + 'Active' + '_' + type,
				JSON.stringify({
					created_at: new Date().getTime(),
					name: data.firstName + ' ' + data.lastName,
					data: { ...data }
				})
			);
		}
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
