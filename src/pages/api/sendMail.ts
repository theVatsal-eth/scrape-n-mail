import scrapeHTML from '@/lib/scrapeHelper';
import type { NextApiRequest, NextApiResponse } from 'next';
import { writeFile } from 'fs';
import cron from '../../lib/cron.json' assert { type: 'json' };
import sendMail from '@/lib/mailer';
import { getEmailTemplate } from '@/lib/email-template';
import { env } from '../../env.mjs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const scrapes = await scrapeHTML();
  const lastCronData = cron;

  if (
    !scrapes.length ||
    scrapes[scrapes.length - 1].href === lastCronData.lastCronHref
  ) {
    console.log({ scrapes, lastCronData });
    console.log('No new data found hence no need to send mail');
    return res.status(200).json({ scrapes, message: 'No new data found' });
  }

  sendMail(
    {
      from: env.EMAIL, // sender address
      bcc: ['0505m2003@gmail.com', 'testingmydevshit@gmail.com'], // receiver email
      subject: 'GNSCR News Update', // Subject line
      html: getEmailTemplate(scrapes),
      replyTo: env.REPLY_TO,
    },
    (err, info) => {
      if (err) {
        console.error({ err });
        return res.status(500).json({ message: 'Error sending mail' });
      }
      console.log({ info });
    }
  );

  const newCronData = {
    lastCronHref: scrapes[0].href,
    lastCronDate: Date.now().toString(),
  };

  const json = JSON.stringify(newCronData);

  writeFile('src/lib/cron.json', json, 'utf-8', (err) => {
    if (err) throw err;
    console.log('Data written to file');
  });

  res.status(200).json({ scrapes });
}
