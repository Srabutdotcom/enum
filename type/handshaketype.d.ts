import { Uint8 } from "../src/dep.ts";
import { Enum } from "../src/enum.js";

/**
 * Represents TLS 1.3 Handshake message types as defined in RFC 8446 Section 4.
 * @see https://datatracker.ietf.org/doc/html/rfc8446#section-4
 * @version 0.9.6
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
   * Returns the Uint8 representation of the handshake type.
   */
  get Uint8(): Uint8;
  get byte(): Uint8;
}

