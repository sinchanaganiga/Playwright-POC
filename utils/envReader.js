import dotenv from 'dotenv';
dotenv.config();

export function getPassword() {
  return process.env.PASSWORD;
}
