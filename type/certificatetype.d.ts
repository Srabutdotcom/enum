import { Enum } from "../src/enum.js";
import { Uint8 } from "../src/dep.ts";

/**
 * Represents TLS Certificate Types.
 * @see https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.7
 * @extends {Enum}
 */
export class CertificateType extends Enum {
  /** Certificate type X.509 */
  static X509: CertificateType;

  /** Certificate type Raw Public Key */
  static RAWPUBLICKEY: CertificateType;

  /**
   * Checks the given octet and returns a valid `CertificateType`.
   * @param {Uint8Array} octet - The octet to validate.
   * @returns {CertificateType} The corresponding `CertificateType`.
   * @throws Will throw an error if the type is unknown.
   */
  static from(octet: Uint8Array): CertificateType;

  /**
   * The bit length of the certificate type.
   * @type {number}
   * @readonly
   */
  get bit(): number;
  get byte(): Uint8;
}
