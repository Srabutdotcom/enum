import { Constrained, Uint16 } from "../src/dep.ts";
import { Enum } from "../src/enum.js";

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
   * @param {Uint8Array} certificateMsg - Certificate message.
   * @param {CryptoKey} RSAprivateKey - RSA private key.
   * @returns {Promise<CertificateVerify>} CertificateVerify object.
   */
  certificateVerify(
    clientHelloMsg: Uint8Array,
    serverHelloMsg: Uint8Array,
    certificateMsg: Uint8Array,
    RSAprivateKey: CryptoKey
  ): Promise<CertificateVerify>;
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
 * Generates a signature from input data and a private RSA key.
 * @param {Uint8Array} clientHelloMsg - Client Hello message.
 * @param {Uint8Array} serverHelloMsg - Server Hello message.
 * @param {Uint8Array} certificateMsg - Certificate message.
 * @param {CryptoKey} RSAprivateKey - RSA private key.
 * @returns {Promise<Uint8Array>} The generated signature.
 */
export function signatureFrom(
  clientHelloMsg: Uint8Array,
  serverHelloMsg: Uint8Array,
  certificateMsg: Uint8Array,
  RSAprivateKey: CryptoKey
): Promise<Uint8Array>;

/**
 * Verifies and generates the HMAC for the given data.
 *
 * @param {Uint8Array} serverHS_secret - The server handshake secret used for key derivation.
 * @param {object} certificateVerifyMsg - The certificate verify message object.
 * @param {Uint8Array} certificateVerifyMsg.message.transcriptHash - The transcript hash from the message.
 * @returns {Promise<Uint8Array>} A promise that resolves to the verify_data HMAC value as a Uint8Array.
 */
export declare function finished(
  serverHS_secret: Uint8Array,
  certificateVerifyMsg: {
    message: {
      transcriptHash: Uint8Array;
    };
  }
): Promise<Uint8Array>;

/**
 * Represents the Finished message as a Uint8Array.
 */
export declare class Finished extends Uint8Array {
  /**
   * Creates a Finished message instance.
   *
   * @param {Uint8Array} verify_data - The verify_data HMAC value.
   */
  constructor(verify_data: Uint8Array);
}
