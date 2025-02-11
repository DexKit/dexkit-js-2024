import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16;

export async function encrypt(text: string): Promise<string> {
  const iv = randomBytes(IV_LENGTH);
  const key = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex');

  const cipher = createCipheriv(ALGORITHM, key, iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();

  return Buffer.concat([
    iv,
    authTag,
    Buffer.from(encrypted, 'hex')
  ]).toString('base64');
}

export async function decrypt(encryptedText: string): Promise<string> {
  const buffer = Buffer.from(encryptedText, 'base64');
  
  const iv = buffer.subarray(0, IV_LENGTH);
  const authTag = buffer.subarray(IV_LENGTH, IV_LENGTH + AUTH_TAG_LENGTH);
  const encrypted = buffer.subarray(IV_LENGTH + AUTH_TAG_LENGTH);
  
  const key = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex');
  const decipher = createDecipheriv(ALGORITHM, key, iv);
  
  decipher.setAuthTag(authTag);
  
  let decrypted = decipher.update(encrypted);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  
  return decrypted.toString('utf8');
} 