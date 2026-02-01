import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { neon } from '@neondatabase/serverless';
import { Resend } from 'resend';

const sql = neon(process.env.DATABASE_URL!);
const resend = new Resend(process.env.RESEND_API_KEY);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { name, email, purpose, message } = JSON.parse(event.body || '{}');

    // Validate required fields
    if (!name || !email || !purpose || !message) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Save to Neon PostgreSQL database
    await sql`
      INSERT INTO contact_submissions (name, email, purpose, message)
      VALUES (${name}, ${email}, ${purpose}, ${message})
    `;

    // Send notification email to admin
    await resend.emails.send({
      from: 'Kingdom Business <no-reply@kingdombusinessletsroll.com>',
      to: 'kblr1776@gmail.com',
      replyTo: email,
      subject: `New Contact Form Submission: ${purpose}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Purpose:</strong> ${purpose}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    // Send confirmation email to user
    await resend.emails.send({
      from: 'Kingdom Business <no-reply@kingdombusinessletsroll.com>',
      to: email,
      subject: 'We received your message!',
      html: `
        <p>Dear ${name},</p>
        <p>Thank you for reaching out to Kingdom Business Let's Roll. We have received your message and will respond as soon as possible.</p>
        <p>Blessings,<br>The KBLR Team</p>
      `,
    });

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error('Error processing contact form:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Failed to process submission' }),
    };
  }
};
