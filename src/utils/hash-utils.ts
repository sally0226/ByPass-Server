import crypto from 'node:crypto';

export const generateMD5TokenWithSalt = (
  input: string,
  saltSize: number,
): string => {
  const saltBytes = crypto.randomBytes(saltSize);
  return crypto
    .createHash('md5')
    .update(input + saltBytes)
    .digest('hex');
};
