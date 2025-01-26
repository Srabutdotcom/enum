import { Constrained, Uint16 } from "../src/dep.ts";
import { Enum } from "../src/enum.js";
import { sha256, sha384, sha512 } from "@noble/hashes/sha2";

/**
 * Enumeration of signature schemes as defined in RFC 8446.
 * @see https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.3
 */
export declare class SignatureScheme extends Enum {
  static RSA_PKCS1_SHA256: SignatureScheme;
  static RSA_PKCS1_SHA384: SignatureScheme;
  static RSA_PKCS1_SHA512: SignatureScheme;
  static ECDSA_SECP256R1_SHA256: SignatureScheme;
  static ECDSA_SECP384R1_SHA384: SignatureScheme;
  static ECDSA_SECP521R1_SHA512: SignatureScheme;
  static RSA_PSS_RSAE_SHA256: SignatureScheme;
  static RSA_PSS_RSAE_SHA384: SignatureScheme;
  static RSA_PSS_RSAE_SHA512: SignatureScheme;
  static ED25519: SignatureScheme;
  static ED448: SignatureScheme;
  static RSA_PSS_PSS_SHA256: SignatureScheme;
  static RSA_PSS_PSS_SHA384: SignatureScheme;
  static RSA_PSS_PSS_SHA512: SignatureScheme;
  static RSA_PKCS1_SHA1: SignatureScheme;
  static ECDSA_SHA1: SignatureScheme;
  static dsa_sha1_RESERVED: SignatureScheme;
  static dsa_sha256_RESERVED: SignatureScheme;
  static dsa_sha384_RESERVED: SignatureScheme;
  static dsa_sha512_RESERVED: SignatureScheme;

  /**
   * Parses an octet array and returns a valid SignatureScheme.
   * @param octet The octet array to parse.
   * @returns The corresponding SignatureScheme instance.
   * @throws {Error} If the octet does not correspond to a known SignatureScheme.
   */
  static from(octet: Uint8Array): SignatureScheme;

  /**
   * The bit length of the SignatureScheme.
   * @returns The bit length, which is always 16.
   */
  get bit(): number;
  /**
     * Returns the byte length
     * @returns {number} The byte length, which is always 2.
     */
  get length(): number;

  /**
   * Converts the SignatureScheme to a Uint16 representation.
   * @returns The Uint16 representation of the SignatureScheme.
   */
  get Uint16(): Uint16;

  /**
   * Retrieves the algorithm details for the SignatureScheme.
   * @returns An object describing the algorithm and hash details.
   */
  get algo(): { name: string; hash?: string; saltLength?: number };

  /**
   * Verifies a certificate using the provided messages and private key.
   * @param clientHelloMsg The client hello message.
   * @param serverHelloMsg The server hello message.
   * @param encryptedExtensionsMsg The encrypted extensions message.
   * @param certificateMsg The certificate message.
   * @param RSAprivateKey The private RSA key.
   * @returns A promise that resolves to a CertificateVerify instance.
   */
  certificateVerify(
    clientHelloMsg: Uint8Array,
    serverHelloMsg: Uint8Array,
    encryptedExtensionsMsg: Uint8Array,
    certificateMsg: Uint8Array,
    RSAprivateKey: CryptoKey
  ): Promise<CertificateVerify>;
}

export declare class CertificateVerify extends Uint8Array {
  static fromMsg(array: Uint8Array): CertificateVerify;
  constructor(signatureScheme: SignatureScheme, signature: Uint8Array);
  algorithm: SignatureScheme;
  signature: Uint8Array;
}

export declare class Signature extends Constrained {
  static from(array: Uint8Array): Signature;
  constructor(opaque: Uint8Array);
  opaque: Uint8Array;
}

/**
 * Generates a signature from the provided messages and key.
 * @param clientHelloMsg The client hello message.
 * @param serverHelloMsg The server hello message.
 * @param encryptedExtensionsMsg The encrypted extensions message.
 * @param certificateMsg The certificate message.
 * @param RSAprivateKey The private RSA key.
 * @param algo The algorithm to use for signing.
 * @returns A promise that resolves to the generated signature as a Uint8Array.
 */
export declare function signatureFrom(
  clientHelloMsg: Uint8Array,
  serverHelloMsg: Uint8Array,
  encryptedExtensionsMsg: Uint8Array,
  certificateMsg: Uint8Array,
  RSAprivateKey: CryptoKey,
  algo: { name: string; hash?: string; saltLength?: number }
): Promise<Uint8Array>;

/**
 * Computes the hash function based on the provided algorithm.
 * @param algo The algorithm details.
 * @returns The appropriate hash instance.
 */
export declare function hashFromAlgo(
  algo: { hash?: string; saltLength?: number }
): ReturnType<typeof sha256.create | typeof sha384.create | typeof sha512.create>;

/**
 * Creates a Finished instance from the provided key and messages.
 * @param finishedKey The HMAC key used for the finished computation.
 * @param sha The SHA variant to use (256, 384, etc.).
 * @param messages The messages to include in the transcript.
 * @returns A promise that resolves to a Finished instance.
 */
export declare function finished(
  finishedKey: Uint8Array,
  sha: number,
  ...messages: Uint8Array[]
): Promise<Finished>;

export declare class Finished extends Uint8Array {
  static fromMsg(message: Uint8Array): Finished;
  constructor(verify_data: Uint8Array);
  verify_data: Uint8Array;
}

export declare class SignatureSchemeList extends Constrained {
  /**
   * Parses a `SignatureSchemeList` from a `Uint8Array`.
   * @param array - The input array containing signature schemes data.
   * @returns A new instance of `SignatureSchemeList`.
   * @throws {Error} If the input array is invalid or incomplete.
   */
  static from(array: Uint8Array): SignatureSchemeList;

  /**
   * Constructs a `SignatureSchemeList`.
   * @param supported_signature_algorithms - A list of supported signature schemes.
   * @throws {Error} If the constraints are not satisfied.
   */
  constructor(...supported_signature_algorithms: SignatureScheme[]);

  /**
   * The list of supported signature schemes.
   */
  readonly supported_signature_algorithms: SignatureScheme[];
}