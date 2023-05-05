import bcrypt from 'bcryptjs';
import { v5 as uuidV5, v4 as uuidV4 } from 'uuid';
import fs from 'fs';
import path from 'path';
const { SALT, SALT_ROUNDS = '10' } = process.env;

if (!SALT) throw new Error('$SALT environment variable is undefined.');

const newSalt = () => {
  const rounds = +SALT_ROUNDS;
  const salt = bcrypt.genSaltSync(rounds);

  try {
    const envPath = path.resolve(__dirname, '../../../.env');
    const envFile = fs.readFileSync(envPath, 'utf8');
    const updatedEnvFile = SALT
      ? envFile.replace(`${SALT}`, `${salt}`)
      : envFile + `\nSALT='${salt}'\n`;
    fs.writeFileSync(envPath, updatedEnvFile, 'utf8');
  } catch (err) {
    console.log('Salt generated, update .env file with this value:');
    console.log(`SALT='${salt}'`);
  }

  return salt;
};

export const hashPassword = (password: string) => {
  const salt = SALT;
  return bcrypt.hashSync(password, salt);
};

export const uuid = (seed?: string) => {
  return seed ? uuidV5(seed, '6ba7b810-9dad-11d1-80b4-00c04fd430c8') : uuidV4();
};

if (require.main === module) {
  newSalt();
}
