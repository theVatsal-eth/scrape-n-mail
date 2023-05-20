import type { NextApiRequest, NextApiResponse } from 'next';

import { env } from '../../env.mjs';

import scrapeHTML from '@/lib/scrapeHelper';
import sendMail from '@/lib/mailer';
import { getEmailTemplate } from '@/lib/email-template';
import { kv } from '@vercel/kv';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const scrapes = await scrapeHTML();
  const lastCronData = {
    lastCronHref: await kv.get<string>('lastCronHref'),
  };

  if (
    !scrapes.length ||
    scrapes[scrapes.length - 1].href === lastCronData.lastCronHref
  ) {
    console.log('No new data found hence no need to send mail');
    return res.status(200).json({ scrapes, message: 'No new data found' });
  }

  sendMail(
    {
      from: env.EMAIL, // sender address
      bcc: await kv.smembers<string[]>('emails'), // receiver email
      subject: 'GNSCR News Update', // Subject line
      html: getEmailTemplate(scrapes),
      replyTo: env.REPLY_TO,
    },
    async (err) => {
      if (err) {
        console.error({ err });
        return res.status(500).json({ message: 'Error sending mail' });
      }
      await kv.set('lastCronHref', scrapes[0].href);
      res.status(200).json({ scrapes });
    }
  );
  res.status(200).json({ scrapes });
}
