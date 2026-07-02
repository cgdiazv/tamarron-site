import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, phone, street, city, zip, specialty, details } = await req.json();

    const resend = new Resend(process.env.RESEND_API_KEY);
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'notifications@indevasa.com';
    const toEmail = process.env.CONTACT_TO_EMAIL ?? 'hello@tamarronservices.com';

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `New Lead: ${specialty} - ${firstName} ${lastName}`,
      html: `
        <h2>New Project Inquiry</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${street}, ${city}, ${zip}</p>
        <p><strong>Specialty:</strong> ${specialty}</p>
        <p><strong>Details:</strong></p>
        <p>${details}</p>
      `,
    });

    if (error) {
      throw error;
    }

    return NextResponse.json({ message: 'Email sent successfully', id: data?.id }, { status: 200 });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
  }
}