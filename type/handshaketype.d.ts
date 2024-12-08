import { Enum } from "../src/enum.js";

/**
 * Represents TLS 1.3 Handshake message types as defined in RFC 8446 Section 4.
 * @see https://datatracker.ietf.org/doc/html/rfc8446#section-4
 */
export declare class HandshakeType extends Enum {
  /**
   * CLIENT_HELLO - Used to initiate handshake and establish cryptographic capabilities.
   */
  static CLIENT_HELLO: HandshakeType;

  /**
   * SERVER_HELLO - Response to ClientHello, provides server's cryptographic choices.
   */
  static SERVER_HELLO: HandshakeType;

  /**
   * NEW_SESSION_TICKET - Used for post-handshake re-authentication and key update.
   */
  static NEW_SESSION_TICKET: HandshakeType;

  /**
   * END_OF_EARLY_DATA - Indicates the end of early data transmission.
   */
  static END_OF_EARLY_DATA: HandshakeType;

  /**
   * ENCRYPTED_EXTENSIONS - Contains cryptographic parameters for the server.
   */
  static ENCRYPTED_EXTENSIONS: HandshakeType;

  /**
   * CERTIFICATE - Transmission of end-entity certificate.
   */
  static CERTIFICATE: HandshakeType;

  /**
   * CERTIFICATE_VERIFY - Digital signature proving possession of the private key.
   */
  static CERTIFICATE_VERIFY: HandshakeType;

  /**
   * FINISHED - Indicates key material computation can begin.
   */
  static FINISHED: HandshakeType;

  /**
   * CERTIFICATE_REQUEST - Request for a certificate from the client.
   */
  static CERTIFICATE_REQUEST: HandshakeType;

  /**
   * KEY_UPDATE - Message sent post-handshake to update traffic keys.
   */
  static KEY_UPDATE: HandshakeType;

  /**
   * SERVER_PARAMETERS - Used by the server to send additional parameters.
   */
  static SERVER_PARAMETERS: HandshakeType;

  /**
   * MESSAGE_HASH - Contains a message hash for the transcript.
   */
  static MESSAGE_HASH: HandshakeType;

  /**
   * Parses a `HandshakeType` from a given `Uint8Array`.
   * @param octet - 8-bit or 1-octet array.
   * @returns {HandshakeType} The corresponding HandshakeType.
   * @throws {Error} If the handshake type is unknown.
   */
  static from(octet: Uint8Array): HandshakeType;

  /**
   * Number of bits used by the handshake type.
   */
  get bit(): number;

  /**
   * Creates a `Handshake` object from this type and a message.
   * @param message - The message associated with the handshake.
   * @returns {Handshake}
   */
  handshake(message: Uint8Array): Handshake;

  /**
   * Returns the Uint8 representation of the handshake type.
   */
  get Uint8(): Uint8Array;
}

/**
 * Represents a TLS Handshake message.
 */
export declare class Handshake extends Uint8Array {
  /**
   * The handshake message type.
   */
  readonly msg_type: HandshakeType;

  /**
   * The handshake message payload.
   */
  readonly message: Uint8Array;

  /**
   * Creates a `Handshake` object from a message type and payload.
   * @param msg_type - The type of handshake message.
   * @param message - The handshake message payload.
   * @returns {Handshake}
   */
  static fromMessage(msg_type: HandshakeType, message: Uint8Array): Handshake;

  /**
   * Parses a `Handshake` object from a `Uint8Array`.
   * @param array - The array containing the handshake message data.
   * @returns {Handshake} The parsed Handshake object.
   */
  static from(array: Uint8Array): Handshake;

  /**
   * Creates a new `Handshake` object.
   * @param msg_type - The handshake type.
   * @param message - The handshake message payload.
   */
  constructor(msg_type: HandshakeType, message: Uint8Array);
  /** return Uint8Array */
  get byte(): Uint8Array
}
