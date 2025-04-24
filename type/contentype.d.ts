import { Uint8 } from "../src/dep.ts";
import { Enum } from "../src/enum.js";

/**
 * Represents the higher-level protocol used to process the enclosed fragment.
 * Defined in RFC 8446 Section 5.1.
 * @see https://datatracker.ietf.org/doc/html/rfc8446#section-5.1
 * @version 0.9.8
 */
export class ContentType extends Enum {
  /** Represents an invalid ContentType (value 0). */
  static INVALID: ContentType;

  /** Represents the ChangeCipherSpec ContentType (value 20). */
  static CHANGE_CIPHER_SPEC: ContentType;

  /** Represents the Alert ContentType (value 21). */
  static ALERT: ContentType;

  /** Represents the Handshake ContentType (value 22). */
  static HANDSHAKE: ContentType;

  /** Represents the ApplicationData ContentType (value 23). */
  static APPLICATION_DATA: ContentType;

  /**
   * Checks the given octet and returns a valid ContentType instance.
   *
   * @param {Uint8Array} octet - A single-octet Uint8Array to evaluate.
   * @returns {ContentType} The corresponding ContentType or throws an error if invalid.
   */
  static from(octet: Uint8Array): ContentType;

  /**
   * Returns the Uint8 representation of the ContentType.
   *
   * @readonly
   * @type {Uint8}
   */
  get Uint8(): Uint8;
  get byte(): Uint8;

  /**
   * Returns the bit size of the ContentType.
   *
   * @readonly
   * @type {8}
   */
  get bit(): 8;

}

