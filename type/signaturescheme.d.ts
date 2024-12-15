import { Constrained, Uint16 } from "../src/dep.ts";
import { Enum } from "../src/enum.js";
import type { Handshake } from "../src/handshaketype.js";

/**
 * Enumeration of signature schemes as defined in RFC 8446.
 * @see https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.3
 */
export class SignatureScheme extends Enum {
  /** RSASSA-PKCS1-v1_5 algorithms */
  static RSA_PKCS1_SHA256: SignatureScheme;
  static RSA_PKCS1_SHA384: SignatureScheme;
  static RSA_PKCS1_SHA512: SignatureScheme;

  /** ECDSA algorithms */
  static ECDSA_SECP256R1_SHA256: SignatureScheme;
  static ECDSA_SECP384R1_SHA384: SignatureScheme;
  static ECDSA_SECP521R1_SHA512: SignatureScheme;

  /** RSASSA-PSS algorithms with public key OID rsaEncryption */
  static RSA_PSS_RSAE_SHA256: SignatureScheme;
  static RSA_PSS_RSAE_SHA384: SignatureScheme;
  static RSA_PSS_RSAE_SHA512: SignatureScheme;

  /** EdDSA algorithms */
  static ED25519: SignatureScheme;
  static ED448: SignatureScheme;

  /** RSASSA-PSS algorithms with public key OID RSASSA-PSS */
  static RSA_PSS_PSS_SHA256: SignatureScheme;
  static RSA_PSS_PSS_SHA384: SignatureScheme;
  static RSA_PSS_PSS_SHA512: SignatureScheme;

  /** Legacy algorithms */
  static RSA_PKCS1_SHA1: SignatureScheme;
  static ECDSA_SHA1: SignatureScheme;

  /** Reserved Code Points */
  static dsa_sha1_RESERVED: SignatureScheme;
  static dsa_sha256_RESERVED: SignatureScheme;
  static dsa_sha384_RESERVED: SignatureScheme;
  static dsa_sha512_RESERVED: SignatureScheme;

  /**
   * Parses an octet array and returns a valid SignatureScheme.
   * @param {Uint8Array} octet - The octet array to parse.
   * @returns {SignatureScheme} The corresponding SignatureScheme instance.
   * @throws {Error} If the octet does not correspond to a known SignatureScheme.
   */
  static from(octet: Uint8Array): SignatureScheme;

  /**
   * Returns the bit length of the SignatureScheme.
   * @returns {number} The bit length, which is always 16.
   */
  get bit(): number;

  /**
   * Converts the SignatureScheme to a Uint16 representation.
   * @returns {Uint16} The Uint16 representation of the SignatureScheme.
   */
  get Uint16(): Uint16;

  /**
   * Generates a CertificateVerify object.
   * @param {Uint8Array} clientHelloMsg - Client Hello message.
   * @param {Uint8Array} serverHelloMsg - Server Hello message.
   * @param {Uint8Array} encryptedExtensionsMsg - encryptedExtensions message
   * @param {Uint8Array} certificateMsg - Certificate message.
   * @param {CryptoKey} RSAprivateKey - RSA private key.
   * @returns {Promise<CertificateVerify>} CertificateVerify object.
   */
  certificateVerify(
    clientHelloMsg: Uint8Array,
    serverHelloMsg: Uint8Array,
    encryptedExtensionsMsg: Uint8Array,
    certificateMsg: Uint8Array,
    RSAprivateKey: CryptoKey
  ): Promise<CertificateVerify>;
  
  /**
   * Generates a CertificateVerify Handshake object.
   * @param {Uint8Array} clientHelloMsg - Client Hello message.
   * @param {Uint8Array} serverHelloMsg - Server Hello message.
   * @param {Uint8Array} encryptedExtensionsMsg - encryptedExtensions message
   * @param {Uint8Array} certificateMsg - Certificate message.
   * @param {CryptoKey} RSAprivateKey - RSA private key.
   * @returns {Promise<Handshake>} Handshake of CertificateVerify object.
   */
  certificateVerifyMsg(
    clientHelloMsg: Uint8Array,
    serverHelloMsg: Uint8Array,
    encryptedExtensionsMsg: Uint8Array,
    certificateMsg: Uint8Array,
    RSAprivateKey: CryptoKey
  ): Promise<Handshake>;
}

/**
 * Represents a CertificateVerify structure.
 */
export class CertificateVerify extends Uint8Array {
  /** The signature algorithm used. */
  algorithm: SignatureScheme;

  /** The signature. */
  signature: Uint8Array;

  /**
   * Parses a byte array into a CertificateVerify object.
   * @param {Uint8Array} array - The byte array to parse.
   * @returns {CertificateVerify} The parsed CertificateVerify object.
   */
  static from(array: Uint8Array): CertificateVerify;

  /**
   * Constructs a new CertificateVerify object.
   * @param {SignatureScheme} signatureScheme - The signature scheme.
   * @param {Uint8Array} signature - The signature.
   */
  constructor(signatureScheme: SignatureScheme, signature: Uint8Array);
}

/**
 * Represents a constrained signature.
 */
export class Signature extends Constrained {
  /** The raw opaque signature data. */
  opaque: Uint8Array;

  /**
   * Parses a byte array into a Signature object.
   * @param {Uint8Array} array - The byte array to parse.
   * @returns {Signature} The parsed Signature object.
   */
  static from(array: Uint8Array): Signature;

  /**
   * Constructs a new Signature object.
   * @param {Uint8Array} opaque - The raw opaque signature data.
   */
  constructor(opaque: Uint8Array);
}

/**
 * Generates a signature from the provided handshake messages and an RSA private key.
 *
 * @param clientHelloMsg - The ClientHello message as a Uint8Array.
 * @param serverHelloMsg - The ServerHello message as a Uint8Array.
 * @param encryptedExtensionsMsg - The EncryptedExtensions message as a Uint8Array.
 * @param certificateMsg - The Certificate message as a Uint8Array.
 * @param RSAprivateKey - The RSA private key used for signing.
 * @param sha - The hash algorithm to use (256, 384, or 512). Defaults to 256.
 * @returns A promise that resolves to a Uint8Array containing the signature. The resulting object also includes the `transcriptHash` property.
 */
export declare function signatureFrom(
  clientHelloMsg: Uint8Array,
  serverHelloMsg: Uint8Array,
  encryptedExtensionsMsg: Uint8Array,
  certificateMsg: Uint8Array,
  RSAprivateKey: CryptoKey,
  sha?: 256 | 384 | 512
): Promise<Uint8Array>;

/**
 * Computes the Finished message verify_data using the provided finished key and handshake messages.
 *
 * @param finishedKey - The finished key as a Uint8Array.
 * @param sha - The hash algorithm to use (256 or 384). Defaults to 256.
 * @param messages - A variable number of handshake messages to include in the transcript hash.
 * @returns A promise that resolves to a Finished instance containing the verify_data. The resulting object also includes the `transcriptHash` property.
 */
export declare function finished(
  finishedKey: Uint8Array,
  sha?: 256 | 384,
  ...messages: Uint8Array[]
): Promise<Finished>;


/**
 * Represents the output of the `finished` function.
 */
export declare class Finished {
  /**
   * Constructs a Finished instance.
   * @param verifyData - The computed verify data.
   */
  constructor(verifyData: ArrayBuffer);

  /**
   * The computed verify data.
   */
  verifyData: ArrayBuffer;

  /**
   * The hash of the handshake transcript.
   */
  transcriptHash: ArrayBuffer;
}
