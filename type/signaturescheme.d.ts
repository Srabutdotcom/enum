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
   * Creates a CertificateVerify handshake instance.
   * @param clientHelloMsg The ClientHello message.
   * @param serverHelloMsg The ServerHello message.
   * @param encryptedExtensionsMsg The EncryptedExtensions message.
   * @param certificateMsg The Certificate message.
   * @param RSAprivateKey The RSA private key.
   * @param sha The SHA variant (256, 384, or 512).
   */
  certificateVerify(
    clientHelloMsg: Uint8Array,
    serverHelloMsg: Uint8Array,
    encryptedExtensionsMsg: Uint8Array,
    certificateMsg: Uint8Array,
    RSAprivateKey: CryptoKey,
    sha: number,
  ): Promise<CertificateVerify>;
}

/**
 * Represents a CertificateVerify message.
 */
export declare class CertificateVerify extends Uint8Array {
  /**
   * Creates a CertificateVerify instance from an array.
   * @param array The input array.
   */
  static fromMsg(array: Uint8Array): CertificateVerify;

  constructor(signatureScheme: SignatureScheme, signature: Uint8Array);

  algorithm: SignatureScheme;
  signature: Uint8Array;
}

/**
 * Represents a constrained Signature.
 */
export declare class Signature extends Constrained {
  /**
   * Creates a Signature instance from an array.
   * @param array The input array.
   */
  static from(array: Uint8Array): Signature;

  constructor(opaque: Uint8Array);

  opaque: Uint8Array;
}

/**
 * Generates a signature for the CertificateVerify message.
 */
export declare function signatureFrom(
  clientHelloMsg: Uint8Array,
  serverHelloMsg: Uint8Array,
  encryptedExtensionsMsg: Uint8Array,
  certificateMsg: Uint8Array,
  RSAprivateKey: CryptoKey,
  sha?: number,
): Promise<Uint8Array>;

/**
 * Generates a Finished message.
 */
export declare function finished(
  finishedKey: Uint8Array,
  sha: number,
  ...messages: Uint8Array[]
): Promise<Finished>;

/**
 * Represents a Finished handshake message.
 */
export declare class Finished extends Uint8Array {
  /**
   * Creates a Finished instance from a message.
   * @param message The input message.
   */
  static fromMsg(message: Uint8Array): Finished;

  constructor(verify_data: Uint8Array);

  verify_data: Uint8Array;
}
