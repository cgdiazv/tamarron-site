import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    const { name, phone, email, zip, service, details } = await req.json();

    if (!name || !phone || !email) {
      return NextResponse.json(
        { message: 'Name, phone, and email are required.' },
        { status: 400 }
      );
    }

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'notifications@indevasa.com';
      const toEmail = process.env.CONTACT_TO_EMAIL ?? 'hello@tamarronservices.com';

      const { data, error } = await resend.emails.send({
        from: fromEmail,
        to: [toEmail],
        replyTo: email,
        subject: `[Ad Landing Page Lead] ${service || 'General Inquiry'} - ${name}`,
        html: `
          <h2>New Ad Landing Page Lead</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>ZIP Code:</strong> ${zip || 'N/A'}</p>
          <p><strong>Service of Interest:</strong> ${service || 'Not specified'}</p>
          <p><strong>Project Details:</strong></p>
          <p>${details || 'No details provided'}</p>
        `,
      });

      if (error) {
        console.error('Resend Error:', error);
      }
      return NextResponse.json(
        { message: 'Estimate request received successfully!', id: data?.id },
        { status: 200 }
      );
    }

    console.log('Ad Landing Page Lead received (No Resend key configured):', {
      name,
      phone,
      email,
      zip,
      service,
      details,
    });

    return NextResponse.json(
      { message: 'Estimate request received successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Landing Lead submission error:', error);
    return NextResponse.json(
      { message: 'Failed to process estimate request. Please try again or call us directly.' },
      { status: 500 }
    );
  }
}
