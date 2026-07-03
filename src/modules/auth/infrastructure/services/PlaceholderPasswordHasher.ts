import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

import type { PasswordHasher } from "../../application/services/PasswordHasher.js";

const scryptAsync = promisify(scrypt);

const KEYLEN = 64;

export class PlaceholderPasswordHasher implements PasswordHasher {
  public async hash(value: string): Promise<string> {
    const salt = randomBytes(16).toString("hex");
    const derivedKey = (await scryptAsync(value, salt, KEYLEN)) as Buffer;
    return `${salt}:${derivedKey.toString("hex")}`;
  }

  public async compare(value: string, hash: string): Promise<boolean> {
    const [salt, storedKey] = hash.split(":");
    const storedKeyBuffer = Buffer.from(storedKey, "hex");
    const derivedKey = (await scryptAsync(value, salt, KEYLEN)) as Buffer;
    return timingSafeEqual(storedKeyBuffer, derivedKey);
  }
}
