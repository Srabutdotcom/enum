import { Enum } from "./enum.d.ts";
import { Constrained, Struct, Uint16 } from "../src/dep.ts";
/**
 * Supported groups - @see https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.7.
 */
export class NamedGroup extends Enum {
  static SECP256R1: NamedGroup;
  static SECP384R1: NamedGroup;
  static SECP521R1: NamedGroup;
  static X25519: NamedGroup;
  static X448: NamedGroup;
  static FFDHE2048: NamedGroup;
  static FFDHE3072: NamedGroup;
  static FFDHE4096: NamedGroup;
  static FFDHE6144: NamedGroup;
  static FFDHE8192: NamedGroup;

  /**
   * Parses an octet array and returns a valid NamedGroup.
   *
   * @static
   * @param {Uint8Array} octet - The octet array to parse.
   * @returns {NamedGroup} The corresponding NamedGroup instance.
   * @throws {Error} If the octet does not correspond to a known NamedGroup.
   */
  static from(octet: Uint8Array): NamedGroup;

  /**
   * Returns the bit length of the NamedGroup.
   * @returns {number} The bit length, which is always 16.
   */
  get bit(): number;
  /**
   * Returns the byte length
   * @returns {number} The byte length, which is always 2.
   */
  get length(): number;

  /**
   * Creates an instance of NamedGroup.
   *
   * @param {string} name - The name of the NamedGroup.
   * @param {number} value - The value associated with the NamedGroup.
   */
  constructor(name: string, value: number);

  /**
   * Converts the NamedGroup to a Uint16 representation.
   *
   * @returns {Uint16} The Uint16 representation of the NamedGroup.
   */
  get Uint16(): Uint16;
  get byte(): Uint16;

  /**
   * Gets the key generation algorithm associated with the NamedGroup.
   *
   * @returns {Function} The key generation function.
   */
  get keyGen(): Function;

  /**
   * Gets the private key associated with the NamedGroup.
   *
   * @returns {Uint8Array} The private key.
   */
  get privateKey(): Uint8Array;

  /** Sets the private key associated with the NamedGroup. */
  set privateKey(key: Uint8Array);

  /**
   * Gets the public key associated with the NamedGroup.
   *
   * @returns {Uint8Array} The public key.
   */
  get publicKey(): Uint8Array;

  /** Sets the public key associated with the NamedGroup. */
  set publicKey(key: Uint8Array);

  /**
   * Computes the shared key with a peer's public key.
   *
   * @param {Uint8Array} peerPublicKey - The public key of the peer.
   * @returns {Uint8Array} The shared secret.
   */
  getSharedKey(peerPublicKey: Uint8Array): Uint8Array;

  /**
   * Creates a key share entry from the NamedGroup.
   *
   * @returns {KeyShareEntry} A new KeyShareEntry instance.
   */
  keyShareEntry(): KeyShareEntry;
}

/**
 * Represents a key exchange mechanism.
 */
export class KeyExchange extends Constrained {
  /**
   * Creates a KeyExchange from an octet array.
   * @param {Uint8Array} octet - The octet array.
   * @returns {KeyExchange} A KeyExchange instance.
   */
  static fromKey(octet: Uint8Array): KeyExchange;

  /**
   * Creates a KeyExchange from a Uint8Array.
   * @param {Uint8Array} array - The input byte array.
   * @returns {KeyExchange} A KeyExchange instance.
   */
  static from(array: Uint8Array): KeyExchange;

  /**
   * Constructs a KeyExchange instance.
   * @param {Uint8Array} octet - The octet array representing the key exchange.
   */
  constructor(octet: Uint8Array);

  /** The key exchange octet. */
  key_exchange: Uint8Array;
}

/**
 * Represents a key share entry in TLS handshake.
 */
export class KeyShareEntry extends Struct {
  /**
   * Creates a KeyShareEntry from a Uint8Array.
   * @param {Uint8Array} array - The input byte array.
   * @returns {KeyShareEntry} A KeyShareEntry instance.
   */
  static from(array: Uint8Array): KeyShareEntry;

  /**
   * Constructs a KeyShareEntry instance.
   * @param {NamedGroup} group - The NamedGroup for the key share.
   * @param {KeyExchange} key_exchange - The KeyExchange for the key share.
   */
  constructor(group: NamedGroup, key_exchange: KeyExchange);

  /** The NamedGroup for the key share. */
  group: NamedGroup;

  /** The key exchange octet. */
  key_exchange: Uint8Array;
}
