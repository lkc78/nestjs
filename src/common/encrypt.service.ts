import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class EncryptService {
  // === Encrypt ===

  ENCRYPTION_KEY = 'qwertyuiopasdfgh'.repeat(2); // Must be 256 bits (32 characters)
  IV_LENGTH = 16; // For AES, this is always 16

  /**
   * AES256 암호화 [CBC]
   */
  encrypt(text) {
    const iv = crypto.randomBytes(this.IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(this.ENCRYPTION_KEY), iv);
    const encrypted = cipher.update(text);

    return iv.toString('hex') + ':' + Buffer.concat([encrypted, cipher.final()]).toString('hex');
  }

  /**
   * AES256 복호화 [CBC]
   */
  decrypt(text) {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(this.ENCRYPTION_KEY), iv);
    const decrypted = decipher.update(encryptedText);

    return Buffer.concat([decrypted, decipher.final()]).toString();
  }

  /**
   * AES256 암호화 [ECB]
   */
  encryptAES(text) {
    const cipher = crypto.createCipheriv('aes-256-ecb', this.ENCRYPTION_KEY, '');
    let result = cipher.update(text, 'utf8', 'base64');
    result += cipher.final('base64');

    return result;
  }

  /**
   * AES256 복호화 [ECB]
   */
  decryptAES(text) {
    const cipher = crypto.createDecipheriv('aes-256-ecb', this.ENCRYPTION_KEY, '');
    let result = cipher.update(text, 'base64', 'utf8');
    result += cipher.final('utf8');

    return result;
  }
}
