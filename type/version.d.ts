import { Uint16 } from "../src/dep.ts";
/**
 * Version class representing different protocol versions.
 * Extends Enum to provide constants for SSL and TLS versions.
 *
 * @extends Enum
 * @version __VERSION__
 */
export class Version extends Enum {
  /**
   * SSL 3.0 version with value 0x0300
   * @type {Version}
   */
  static SSL30: Version;
  /**
   * TLS 1.0 version with value 0x0301
   * @type {Version}
   */
  static TLS10: Version;
  /**
   * TLS 1.1 version with value 0x0302
   * @type {Version}
   */
  static TLS11: Version;
  /**
   * TLS 1.2 version with value 0x0303
   * @type {Version}
   */
  static TLS12: Version;
  /**
   * TLS 1.3 version with value 0x0304
   * @type {Version}
   */
  static TLS13: Version;
  /**
   * Legacy version representing TLS 1.2 with value 0x0303
   * @type {Version}
   */
  static legacy: Version;
  /**
   * Parses a 2-byte Uint8Array to determine the corresponding Version instance.
   *
   * @static
   * @param {Uint8Array} octet - The 2-byte array representing a version value.
   * @returns {Version} The matching Version instance.
   * @throws {Error} If the version type in octet is unknown.
   */
  static from(octet: Uint8Array): Version;
  /**
   * Gets the bit size of the version (16 bits).
   *
   * @returns {number} The bit size of the version.
   */
  get bit(): number;
  get Uint16(): Uint16;
  get byte(): Uint16;
  /**
   * Returns the byte length
   * @returns {number} The byte length, which is always 2.
   */
  get length(): number;
  
}


import { Enum } from "../type/enum.d.ts";
