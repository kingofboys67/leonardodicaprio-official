import { NextRequest, NextResponse } from 'next/server';
import { buildEmails } from '../../../../api/submit';

const ALLOWED_HOSTS = [
  'leonardodicaprioofficial.com',
  'www.leonardodicaprioofficial.com',
  'leonardodicaprio-official.vercel.app',
  'localhost',
];

const LIMITS: Record<string, number> = {
  name: 80,
  email: 120,
  phone: 40,
  address: 300,
  reason: 1000,
  amount: 40,
  message: 2000,
};

const EMAIL_RE = /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']{2,}$/;

const clean = (v: unknown, max: number) =>
  typeof v === 'string'
    ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max)
    : '';

const stripTags = (html: string) =>
  html
    .replace(/<(style|head)[\s\S]*?<\/\1>/gi, '')
    .replace(/<(br|\/p|\/div|\/tr|\/h\d)\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n\s*\n\s*\n+/g, '\n\n')
    .trim();

const send = async (apiKey: string, payload: { from: string; to: string; subject: string; html: string; reply_to?: string }) => {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, text: stripTags(payload.html) }),
  });
  if (!res.ok) throw new Error(`resend ${res.status}`);
};

const FROM_WELCOME = 'Leonardo DiCaprio Official <welcome@leonardodicaprioofficial.com>';
const FROM_ALERTS = 'Website Sign-ups <notifications@leonardodicaprioofficial.com>';

export async function POST(req: NextRequest) {
  try {
    const origin = req.headers.get('origin');
    if (origin) {
      try {
        const host = new URL(origin).hostname;
        if (!ALLOWED_HOSTS.includes(host)) {
          return NextResponse.json({ error: 'forbidden' }, { status: 403 });
        }
      } catch {
        // Ignore parsing errors
      }
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'bad-request' }, { status: 400 });
    }

    // Bot trap check
    if (typeof body.website === 'string' && body.website.trim() !== '') {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const type = body.type;
    if (!['fanclub', 'newsletter', 'donation'].includes(type)) {
      return NextResponse.json({ error: 'bad-type' }, { status: 400 });
    }

    const d: any = {};
    for (const k of Object.keys(LIMITS)) {
      const v = clean(body[k], LIMITS[k]);
      d[k] = k === 'reason' || k === 'message' || k === 'address' ? v : v.replace(/\s+/g, ' ');
    }

    if (!EMAIL_RE.test(d.email)) {
      return NextResponse.json({ error: 'bad-email' }, { status: 400 });
    }
    if (type !== 'newsletter' && !d.name) {
      return NextResponse.json({ error: 'name-required' }, { status: 400 });
    }
    if (type === 'fanclub' && (!d.phone || !d.reason || !d.address)) {
      return NextResponse.json({ error: 'missing-fields' }, { status: 400 });
    }
    if (type === 'donation') {
      d.amount = d.amount || 'Not specified';
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      // In development or when unconfigured, accept cleanly
      return NextResponse.json({ ok: true, devMode: true });
    }

    const emails = buildEmails(type, d);
    const [alert, welcome] = await Promise.allSettled([
      send(apiKey, {
        from: FROM_ALERTS,
        to: emails.alert.to,
        subject: emails.alert.subject,
        html: emails.alert.html,
        reply_to: d.email,
      }),
      send(apiKey, {
        from: FROM_WELCOME,
        to: d.email,
        subject: emails.welcome.subject,
        html: emails.welcome.html,
        reply_to: emails.alert.to,
      }),
    ]);

    if (alert.status === 'rejected') {
      return NextResponse.json({ error: 'send-failed' }, { status: 502 });
    }

    return NextResponse.json({ ok: true, welcomeSent: welcome.status === 'fulfilled' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'internal-error' }, { status: 500 });
  }
}
