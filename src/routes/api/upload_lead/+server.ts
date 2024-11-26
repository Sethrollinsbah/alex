import { Resend } from 'resend';
import * as table from '$lib/server/db/schema';

export async function POST({ request, platform }) {
  try {
    const { data, type } = await request.json();

    if (!data) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const kv = await platform.env.KV;
    let assignee = await kv.get('turn');
    // let email = 'Brianna.healthcareadvising@gmail.com';
    // if (assignee === 'zach_') {
    // 	email = 'alexanderhealthconsulting@gmail.com';
    // } else if (assignee === 'sof_') {
    // 	email = 'ayala.healthcareadvising@gmail.com';
    // }

    // Calculate current age based on DOB
    const calculateCurrentAge = (year, month, day) => {
      const dob = new Date(year, month - 1, day);
      const diff = Date.now() - dob.getTime();
      const ageDate = new Date(diff);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    const currentAge = calculateCurrentAge(data.age.year, data.age.month, data.age.day);

    // const resend = new Resend('re_RgVp9JXT_5V13YXcArvmNorXHsucPBeqV');
    //
    // await resend.emails.send({
    // 	from: 'Not Seth <leadmagnet@cobrainsure.org>',
    // 	to: [email],
    // 	subject: `NEW LEAD: ${leadName}`,
    // 	html: `
    //     <p>
    //       <strong>FIRSTNAME:</strong> ${leadName.name}<br>
    //       <strong>LASTNAME:</strong> ${leadName.lastName}<br>
    //       <strong>PHONE:</strong> ${data.phone}<br>
    //       <strong>PHONE TYPE:</strong> ${data.code}<br>
    //       <strong>DOB:</strong> ${data.age.year}-${data.age.month}-${data.age.day}<br>
    //       <strong>CURRENT AGE:</strong> ${currentAge}<br>
    //       <strong>HOUSEHOLD:</strong> ${data.house}<br>
    //       <strong>ZIP:</strong> ${data.zip}<br>
    //       <strong>EMAIL:</strong> ${data.email}
    //     </p>
    //   `
    // });

    // Rotate the assignee
    if (assignee === 'zach_') {
      assignee = 'sof_';
    } else if (assignee === 'sof_') {
      assignee = 'bri_';
    } else {
      assignee = 'zach_';
    }

    await kv.put('turn', assignee);
    if (type === 'Lead') {
      await kv.put(
        assignee + new Date().getTime() + '_' + crypto.randomUUID() + '_' + 'Active' + "_" + type,
        JSON.stringify({
          created_at: new Date().getTime(),
          name: data.name,
          data: { ...data, currentAge: currentAge || null }
        })
      );

      // await db.insert(table.lead).value({
      //   id: crypto.randomUUID(),
      //   createdAt: new Date().getTime(),
      //   data: {
      //     name: data.name.firstName,
      //     surname: data.name.lastName,
      //     phone: data.phone,
      //     phoneCode: data.code,
      //     dob: `${data.age.year}-${data.age.month}-${data.age.day}`,
      //     age: currentAge,
      //     household: data.house,
      //     zip: data.zip,
      //     email: data.email
      //   },
      //   source: type,
      //   status: 'Active'
      // });
    } else {
      // await db.insert(table.lead).value({
      //   id: crypto.randomUUID(),
      //   createdAt: new Date().getTime(),
      //   data: {
      //     name: data.name,
      //     phone: data.phone,
      //     email: data.email
      //   },
      //   source: type,
      //   status: 'Active'
      // });
    }

    console.log(await db.select());
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
