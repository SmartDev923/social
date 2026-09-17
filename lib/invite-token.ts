/**
 * Invite token generation and validation utilities
 */

import crypto from "crypto";
import fs from "fs";
import path from "path";
import { INVITE_SECRET_KEY } from "@/config/credentials";

export interface InviteTokenData {
  jobId: string; // 6 letter job code
  expiresAt: number; // timestamp
  createdAt: number; // timestamp
}

const TOKEN_EXPIRY_HOURS = 72;
const TOKEN_LENGTH = 20; // Fixed length: 6 (jobId) + 5 (timestamp) + 5 (random) + 4 (signature)
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

// Path to the used codes JSON file
const USED_CODES_FILE = path.join(process.cwd(), "config", "used_code.json");

// In-memory store for used invite codes (one-time use)
const usedCodes = new Set<string>();

/**
 * Load used codes from JSON file
 */
function loadUsedCodes(): void {
  try {
    if (fs.existsSync(USED_CODES_FILE)) {
      const fileContent = fs.readFileSync(USED_CODES_FILE, "utf-8");
      const data = JSON.parse(fileContent);
      if (Array.isArray(data.usedCodes)) {
        data.usedCodes.forEach((code: string) => {
          usedCodes.add(code.toUpperCase().trim());
        });
      }
    } else {
      // Create file if it doesn't exist
      fs.writeFileSync(
        USED_CODES_FILE,
        JSON.stringify({ usedCodes: [] }, null, 2),
        "utf-8"
      );
    }
  } catch (error) {
    console.error("Error loading used codes from file:", error);
    // Continue with empty set if file read fails
  }
}

/**
 * Save used codes to JSON file
 */
function saveUsedCodes(): void {
  try {
    const data = {
      usedCodes: Array.from(usedCodes),
    };
    fs.writeFileSync(
      USED_CODES_FILE,
      JSON.stringify(data, null, 2),
      "utf-8"
    );
  } catch (error) {
    console.error("Error saving used codes to file:", error);
    // Continue even if save fails - codes are still in memory
  }
}

// Load used codes on module initialization
loadUsedCodes();

/**
 * Encode a number to base36 (0-9, A-Z)
 */
function encodeBase36(num: number, length: number): string {
  let result = "";
  for (let i = 0; i < length; i++) {
    result = CHARS[num % CHARS.length] + result;
    num = Math.floor(num / CHARS.length);
  }
  return result;
}

/**
 * Decode a base36 string to a number
 */
function decodeBase36(str: string): number {
  let result = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const value = CHARS.indexOf(char);
    if (value === -1) return -1;
    result = result * CHARS.length + value;
  }
  return result;
}

/**
 * Generate a random number and encode it to base36
 */
function generateRandomComponent(length: number): string {
  const maxValue = Math.pow(CHARS.length, length) - 1;
  const randomValue = crypto.randomInt(0, maxValue + 1);
  return encodeBase36(randomValue, length);
}

/**
 * Generate a 20-character code from jobId, timestamp, and random component
 * Format: [jobId:6][timestamp:5][random:5][signature:4]
 */
function generateCodeFromData(jobId: string, timestamp: number, random: string): string {
  // Encode timestamp (relative to a base time to keep it smaller)
  // Use minutes since epoch start (Jan 1, 2024) to reduce size
  const BASE_TIME = 1704067200000; // Jan 1, 2024 00:00:00 UTC
  const minutesSinceBase = Math.floor((timestamp - BASE_TIME) / (60 * 1000));
  
  // Encode jobId (6 chars) + timestamp (5 chars) + random (5 chars) = 16 chars
  const jobIdPart = jobId.padEnd(6, "0").substring(0, 6).toUpperCase();
  const timestampPart = encodeBase36(minutesSinceBase, 5);
  const payload = jobIdPart + timestampPart + random;
  
  // Create HMAC signature (4 chars from first 2 bytes)
  const hmac = crypto.createHmac("sha256", INVITE_SECRET_KEY);
  hmac.update(payload);
  const hash = hmac.digest("hex");
  
  // Take first 2 bytes (4 hex chars) and convert to 4 alphanumeric chars
  let signature = "";
  for (let i = 0; i < 4; i++) {
    const byte = parseInt(hash.substr(i * 2, 2), 16);
    signature += CHARS[byte % CHARS.length];
  }
  
  return payload + signature; // 16 + 4 = 20 characters
}

/**
 * Generate an invite token for a job
 * Returns a 20-character code with randomness
 */
export function generateInviteToken(jobId: string): string {
  const now = Date.now();
  
  // Generate random component for uniqueness (5 chars = ~60 million possibilities)
  const random = generateRandomComponent(5);
  
  // Generate code using HMAC with secret key
  const code = generateCodeFromData(jobId, now, random);
  
  return code;
}

/**
 * Mark an invite code as used (one-time use)
 */
export function markCodeAsUsed(code: string): void {
  const normalizedCode = code.toUpperCase().trim();
  usedCodes.add(normalizedCode);
  // Persist to file
  saveUsedCodes();
}

/**
 * Check if an invite code has already been used
 */
export function isCodeUsed(code: string): boolean {
  const normalizedCode = code.toUpperCase().trim();
  return usedCodes.has(normalizedCode);
}

/** Cookie name for resume (same browser can continue after refresh) */
export const INVITE_RESUME_COOKIE_NAME = "invite_resume";

/** Max age for resume cookie (same as token expiry) */
const RESUME_COOKIE_MAX_AGE_SECONDS = TOKEN_EXPIRY_HOURS * 60 * 60;

/**
 * Create signed value for resume cookie. Set when marking invite as used so the same browser can still validate (resume).
 */
export function createResumeCookieValue(code: string): string {
  const normalized = code.toUpperCase().trim();
  const hmac = crypto.createHmac("sha256", INVITE_SECRET_KEY);
  hmac.update("resume:" + normalized);
  return hmac.digest("hex");
}

/**
 * Verify resume cookie value for a given token. Used when token is already "used" to allow same-browser resume.
 */
export function isResumeCookieValid(code: string, cookieValue: string): boolean {
  if (!cookieValue || typeof cookieValue !== "string") return false;
  const expected = createResumeCookieValue(code);
  try {
    const expectedBuf = Buffer.from(expected, "hex");
    const actualBuf = Buffer.from(cookieValue, "hex");
    if (actualBuf.length !== expectedBuf.length) return false;
    return crypto.timingSafeEqual(
      new Uint8Array(expectedBuf),
      new Uint8Array(actualBuf)
    );
  } catch {
    return false;
  }
}

/**
 * Validate and decode an invite token (20-character code)
 * Format: [jobId:6][timestamp:5][random:5][signature:4]
 * @param options.skipUsedCheck - When true, do not reject if code is in used list (for resume with valid cookie).
 */
export function validateInviteToken(
  code: string,
  knownJobIds?: string[],
  options?: { skipUsedCheck?: boolean }
): {
  valid: boolean;
  data?: InviteTokenData;
  error?: string;
} {
  try {
    // Validate and normalize code format
    if (!code || typeof code !== "string") {
      return { valid: false, error: "Invalid invite code format" };
    }
    
    // Normalize to uppercase and trim whitespace
    const normalizedCode = code.toUpperCase().trim();
    
    // Validate length and format (should be exactly 20 alphanumeric characters)
    if (normalizedCode.length !== TOKEN_LENGTH || !/^[A-Z0-9]+$/.test(normalizedCode)) {
      return { valid: false, error: "Invalid invite code format" };
    }

    // Check if code has already been used (one-time use), unless resuming with cookie
    if (!options?.skipUsedCheck && isCodeUsed(normalizedCode)) {
      return { valid: false, error: "This invite code has already been used" };
    }

    // Extract parts: jobId (6), timestamp (5), random (5), signature (4)
    const jobIdPartRaw = normalizedCode.substring(0, 6);
    const timestampPart = normalizedCode.substring(6, 11);
    const randomPart = normalizedCode.substring(11, 16);
    const signaturePart = normalizedCode.substring(16, 20);
    
    // Decode timestamp
    const BASE_TIME = 1704067200000; // Jan 1, 2024 00:00:00 UTC
    const minutesSinceBase = decodeBase36(timestampPart);
    if (minutesSinceBase === -1) {
      return { valid: false, error: "Invalid invite code format" };
    }
    
    const createdAt = BASE_TIME + (minutesSinceBase * 60 * 1000);
    const expiresAt = createdAt + TOKEN_EXPIRY_HOURS * 60 * 60 * 1000;
    
    // Check expiration
    const now = Date.now();
    if (now > expiresAt) {
      return { valid: false, error: "Invite code has expired" };
    }
    
    // Verify signature
    const payload = normalizedCode.substring(0, 16); // jobId + timestamp + random
    const hmac = crypto.createHmac("sha256", INVITE_SECRET_KEY);
    hmac.update(payload);
    const hash = hmac.digest("hex");
    
    let expectedSignature = "";
    for (let i = 0; i < 4; i++) {
      const byte = parseInt(hash.substr(i * 2, 2), 16);
      expectedSignature += CHARS[byte % CHARS.length];
    }
    
    if (signaturePart !== expectedSignature) {
      return { valid: false, error: "Invalid invite code" };
    }
    
    // Verify jobId is in known jobIds
    if (knownJobIds && knownJobIds.length > 0) {
      // Check if any known jobId matches (handle padding with zeros)
      const jobIdMatch = knownJobIds.find(id => {
        const paddedId = id.padEnd(6, "0").substring(0, 6).toUpperCase();
        return paddedId === jobIdPartRaw;
      });
      
      if (!jobIdMatch) {
        return { valid: false, error: "Invalid invite code" };
      }
      
      return {
        valid: true,
        data: {
          jobId: jobIdMatch,
          expiresAt,
          createdAt,
        },
      };
    }
    
    // If no knownJobIds provided, still validate signature and expiration
    // Extract jobId by removing trailing zeros
    const jobId = jobIdPartRaw.replace(/0+$/, "") || jobIdPartRaw;
    
    return {
      valid: true,
      data: {
        jobId,
        expiresAt,
        createdAt,
      },
    };
  } catch (error) {
    return { valid: false, error: "Invalid invite code format" };
  }
}
