import * as dotenv from 'dotenv';

export function loadEnv() {
  if (process.env.npm_command === 'test') {
    dotenv.config({ path: './.env.test' });
  } else {
    dotenv.config();
  }
}
