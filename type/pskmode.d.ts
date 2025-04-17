import { Uint8 } from "../src/dep.ts";
import { Enum } from "../src/enum.js";

/**
 * Represents the PskKeyExchangeMode, as defined in RFC 8446, Section 4.4.2.
 * @see https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.7.
 * @version __VERSION__
 */
export declare class PskKeyExchangeMode extends Enum {
  /** PSK-only key establishment. The server MUST NOT supply a "key_share" value. */
  static PSK_KE: PskKeyExchangeMode;

  /** PSK with (EC)DHE key establishment. Both the client and server MUST supply "key_share" values. */
  static PSK_DHE_KE: PskKeyExchangeMode;

  /**
   * Creates a PskKeyExchangeMode instance from an octet.
   * @param octet - The octet value (Uint8Array) to parse.
   * @returns {PskKeyExchangeMode} - The corresponding PskKeyExchangeMode instance.
   * @throws {Error} - If the octet is not a valid PskKeyExchangeMode type.
   */
  static from(octet: Uint8Array): PskKeyExchangeMode;

  /** Returns the bit value for the mode (8). */
  get bit(): number;

  /** Returns the Uint8Array representation of the mode. */
  get Uint8(): Uint8;
  get byte(): Uint8;
}

