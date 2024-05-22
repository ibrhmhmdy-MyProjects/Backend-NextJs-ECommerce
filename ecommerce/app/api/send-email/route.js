import { useContext } from 'react';
import { EmailTemplate } from '../../_components/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [user?.primaryEmailAddress.emailAddress],
      subject: 'Hello Mohammed',
      react: EmailTemplate({ firstName: 'Mohammed' }),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
