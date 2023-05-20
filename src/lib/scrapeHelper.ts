import { kv } from '@vercel/kv';
import axios from 'axios';
import { load } from 'cheerio';

export interface ScrapeData {
  date: string;
  news: string;
  href: string;
}

async function scrapeHTML() {
  const { data } = await axios.get('https://www.gnscr.ac.in/news.aspx');
  const $ = load(data);

  const cron = {
    lastCronHref: await kv.get<string>('lastCronHref'),
  };

  console.log({ $ });

  const results: ScrapeData[] = [];

  let j = 2;

  while (
    !results.length ||
    results[results.length - 1].href !== cron.lastCronHref
  ) {
    {
      const date = $(
        '#gtrgTender > tbody > tr:nth-child(' + j + ') > td:nth-child(1)'
      );
      const news = $(
        '#gtrgTender > tbody > tr:nth-child(' + j + ') > td:nth-child(2)'
      );
      const a = $(
        '#gtrgTender > tbody > tr:nth-child(' + j + ') > td:nth-child(3)'
      );
      const result = {
        date: date.text().trim(),
        news: news.text().trim(),
        href: 'https://gnscr.ac.in/' + $(a).find('a').attr('href'),
      };

      console.log({ result });

      if (!cron.lastCronHref) {
        results.push(result);
        break;
      }

      if (!cron.lastCronHref.length) {
        results.push(result);
        break;
      }

      if (result.href === cron.lastCronHref) {
        break;
      }

      results.push(result);
      j++;
    }
  }
  return results;
}

export default scrapeHTML;
