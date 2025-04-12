import { Uint16 } from "../src/dep.ts";
import { Enum } from "../src/enum.js";

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
  get byte(): Uint16;

  /**
   * Retrieves the algorithm details for the SignatureScheme.
   * @returns An object describing the algorithm and hash details.
   */
  get algo(): { 
    import: object,
    sign: object,
    verify: object,
  };

}

