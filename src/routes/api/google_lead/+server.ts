import { Resend } from 'resend';

const resend = new Resend(import.meta.env.VITE_RESEND_KEY);
export async function POST({ request, platform }) {
  try {
    const googlepayload = await request.json();
    const payload = await googlepayload;
    console.log(payload);

    if (!payload) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const kv = await platform.env.KV;
    let assignee = await kv.get('turn');

    const id = payload.lead_id;

    // Rotate the assignee
    if (assignee === 'zach_') {
      assignee = 'sof_';
    } else if (assignee === 'sof_') {
      assignee = 'bri_';
    } else {
      assignee = 'zach_';
    }
    let email = 'Brianna.healthcareadvising@gmail.com';
    if (assignee === 'zach_') {
      email = 'alexanderhealthconsulting@gmail.com';
    } else if (assignee === 'sof_') {
      email = 'ayala.healthcareadvising@gmail.com';
    }

    //
    await resend.emails.send({
      from: 'Not Seth <leadmagnet@cobrainsure.org>',
      to: [email],
      subject: `NEW LEAD: ${id}`,
      html: `
		    <p>
		      <strong>FIRSTNAME:</strong> ${payload.user_column_data[0].string_value}<br>
		      <strong>LASTNAME:</strong> ${payload.user_column_data[1].string_value}<br>
		      <strong>PHONE:</strong> ${payload.user_column_data[2].string_value}<br>
		      <strong>ZIP:</strong> ${payload.user_column_data[4].string_value}<br>
		      <strong>EMAIL:</strong> ${payload.user_column_data[3].string_value}
		    </p>
		  `
    });
    await kv.put('turn', assignee);
    const data = {
      name: {
        firstName: payload.user_column_data[0].string_value,
        lastName: payload.user_column_data[1].string_value
      },
      household: 'null',
      age: {
        calendar: { identifier: 'gregory' },
        era: 'AD',
        year: 2099,
        month: 12,
        day: 1
      },
      zip: payload.user_column_data[4].string_value,
      phone: {
        code: 'US',
        number: payload.user_column_data[2].string_value
      },
      email: payload.user_column_data[3].string_value
    };
    await kv.put(
      assignee + new Date().getTime() + '_' + id + '_' + 'Active' + '_' + 'googleleadform',
      JSON.stringify({
        created_at: new Date().getTime(),
        name: data.name.firstName + ' ' + data.name.lastName,
        data: { ...data, currentAge: null }
      })
    );
    // console.log(await kv.list());

    return Response.json({
      status: 200
    });
  } catch (error) {
    console.error('Error inserting lead:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500
    });
  }
}
