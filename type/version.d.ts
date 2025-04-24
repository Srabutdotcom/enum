import { Uint16 } from "../src/dep.ts";
import { Enum } from "../src/enum.js";
/**
 * Version class representing different protocol versions.
 * Extends Enum to provide constants for SSL and TLS versions.
 *
 * @version 0.9.9
 */
export class Version extends Enum {
  /**
   * SSL 3.0 version with value 0x0300
   */
  static SSL30: Version;

  /**
   * TLS 1.0 version with value 0x0301
   */
  static TLS10: Version;

  /**
   * TLS 1.1 version with value 0x0302
   */
  static TLS11: Version;

  /**
   * TLS 1.2 version with value 0x0303
   */
  static TLS12: Version;

  /**
   * TLS 1.3 version with value 0x0304
   */
  static TLS13: Version;

  /**
   * Legacy version representing TLS 1.2
   */
  static legacy: Version;

  /**
   * Parses a 2-byte Uint8Array to determine the corresponding Version instance.
   * @param octet - The 2-byte array representing a version value.
   * @returns The matching Version instance.
   * @throws Error if the version type in octet is unknown.
   */
  static from(octet: Uint8Array): Version;

  /**
   * Gets the bit size of the version (16 bits).
   */
  get bit(): number;

  /**
   * Gets the byte length of the version (2 bytes).
   */
  get length(): number;

  /**
   * Gets the version as a Uint16 instance.
   */
  get byte(): Uint16;
}
