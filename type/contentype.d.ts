import { Uint8 } from "../src/dep.ts";
import { Enum } from "../src/enum.js";
import { Version } from "../src/version.js";

/**
 * Represents the higher-level protocol used to process the enclosed fragment.
 * Defined in RFC 8446 Section 5.1.
 * @see https://datatracker.ietf.org/doc/html/rfc8446#section-5.1
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

  /**
   * Returns the bit size of the ContentType.
   *
   * @readonly
   * @type {8}
   */
  get bit(): 8;

  /**
   * Creates a `TLSPlaintext` instance using the ContentType, TLS version, and fragment.
   *
   * @param {Uint8Array} fragment - The plaintext fragment to include.
   * @returns {TLSPlaintext} A TLSPlaintext object created with the specified parameters.
   */
  tlsPlainText(fragment: Uint8Array): TLSPlaintext;
}

/**
 * Represents a TLS plaintext record as a specialized `Uint8Array`.
 */
export class TLSPlaintext extends Uint8Array {
  /**
   * Parses a given array into a `TLSPlaintext` instance.
   *
   * @param {Uint8Array} array - The input byte array.
   * @returns {TLSPlaintext} A new `TLSPlaintext` instance created from the array.
   */
  static from(array: Uint8Array): TLSPlaintext;

  /**
   * Creates a `TLSPlaintext` instance from specific type, version, and fragment.
   *
   * @param {ContentType} type - The content type of the plaintext.
   * @param {Version} version - The protocol version.
   * @param {Uint8Array} fragment - The fragment data.
   * @returns {TLSPlaintext} A new `TLSPlaintext` instance.
   */
  static createFrom(
    type: ContentType,
    version: Version,
    fragment: Uint8Array,
  ): TLSPlaintext;

  /**
   * Constructs a new `TLSPlaintext` instance.
   *
   * @param {ContentType} type - The content type.
   * @param {Version} version - The protocol version.
   * @param {Uint8Array} fragment - The fragment data.
   */
  constructor(type: ContentType, version: Version, fragment: Uint8Array);

  /**
   * The content type of the TLS plaintext record.
   * @type {ContentType}
   */
  readonly type: ContentType;

  /**
   * The protocol version of the TLS plaintext record.
   * @type {Version}
   */
  readonly version: Version;

  /**
   * The fragment data of the TLS plaintext record.
   * @type {Uint8Array}
   */
  readonly fragment: Uint8Array;

  /**
   * The underlying `Struct` instance representing the TLS plaintext record.
   * @type {[Uint8Array,Uint8Array,Uint8Array]}
   */
  readonly items: [Uint8Array, Uint8Array, Uint8Array];
}
