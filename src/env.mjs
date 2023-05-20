import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    EMAIL_HOST: z.string(),
    EMAIL: z.string().email(),
    REPLY_TO: z.string().email(),
    PASSWORD: z.string(),
  },
});
