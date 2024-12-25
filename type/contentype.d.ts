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

  /**
   * Creates a `TLSInnerPlaintext` instance from content and zero padding.
   *
   * @param {Uint8Array} content - The content bytes for the `TLSInnerPlaintext` structure.
   * @param {number} numZeros - The number of zero bytes to pad the structure.
   * @returns {TLSInnerPlaintext} A new `TLSInnerPlaintext` instance.
   */
  tlsInnerPlaintext(content: Uint8Array, numZeros: number): TLSInnerPlaintext;

  /**
   * Creates a `TLSCiphertext` instance from the encrypted record.
   *
   * @param {Uint8Array} encrypted_record - The encrypted record bytes for the `TLSCiphertext` structure.
   * @returns {TLSCiphertext} A new `TLSCiphertext` instance.
   */
  tlsCiphertext(encrypted_record: Uint8Array): TLSCiphertext;
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

/**
 * Represents a TLSInnerPlaintext structure as per the TLS 1.3 specification.
 */
export class TLSInnerPlaintext extends Uint8Array {
  /** The content of the plaintext. */
  content: Uint8Array;

  /** The content type associated with this plaintext. */
  type: ContentType;

  /** The number of trailing zero bytes in the structure. */
  numZeros: number;

  /**
   * Parses a `TLSInnerPlaintext` instance from a given array.
   * @param {Uint8Array} array - The input array to parse.
   * @returns {TLSInnerPlaintext} The parsed `TLSInnerPlaintext` instance.
   */
  static from(array: Uint8Array): TLSInnerPlaintext;

  /**
   * Constructs a `TLSInnerPlaintext` instance.
   * @param {Uint8Array} content - The main content of the plaintext.
   * @param {ContentType} type - The content type associated with the plaintext.
   * @param {number} [numZeros=0] - The number of trailing zero bytes (default is 0).
   */
  constructor(content: Uint8Array, type: ContentType, numZeros?: number);

  /**
   * Generates a header for this plaintext structure.
   * @param {number} keyLength - The length of the encryption key.
   * @returns {Uint8Array} The generated header.
   */
  header(keyLength: number): Uint8Array;
}


/**
 * Represents a TLSCiphertext structure in a TLS handshake.
 * Extends `Uint8Array` to include additional TLS-specific data and methods.
 */
export declare class TLSCiphertext extends Uint8Array {
  /**
   * Constructs a new `TLSCiphertext` instance from an existing array.
   * 
   * @param array - The array containing the ciphertext data.
   * @returns A new instance of `TLSCiphertext`.
   */
  static from(array: Uint8Array | number[]): TLSCiphertext;

  /**
   * Constructs a `TLSCiphertext` instance.
   * 
   * @param encrypted_record - The encrypted record data.
   */
  constructor(encrypted_record: Uint8Array);

  /**
   * The header portion of the TLSCiphertext.
   */
  header: Uint8Array;

  /**
   * The encrypted record data within the TLSCiphertext.
   */
  encrypted_record: Uint8Array;
}
