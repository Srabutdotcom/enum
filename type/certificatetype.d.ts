import { Enum } from "../src/enum.js";
import { Constrained } from "../src/dep.ts";

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
}

/**
 * Represents a TLS Certificate Entry.
 * @extends {Uint8Array}
 */
export class CertificateEntry extends Uint8Array {
  /**
   * Parses an array to create a `CertificateEntry`.
   * @param {Uint8Array} array - The array to parse.
   * @returns {CertificateEntry} The parsed certificate entry.
   */
  static from(array: Uint8Array): CertificateEntry;

  /**
   * Constructs a `CertificateEntry`.
   * @param {Uint8Array} opaque - The certificate data.
   * @param {...Uint8Array} extension - The certificate extensions.
   */
  constructor(opaque: Uint8Array, ...extension: Uint8Array[]);

  /** The certificate data. */
  opaque: Uint8Array;

  /** The certificate extensions. */
  extension: Uint8Array[];
}

/**
 * Represents a TLS Certificate structure.
 * @extends {Uint8Array}
 */
export class Certificate extends Uint8Array {
  /**
   * Parses an array to create a `Certificate`.
   * @param {Uint8Array} array - The array to parse.
   * @returns {Certificate} The parsed certificate.
   */
  static from(array: Uint8Array): Certificate;

  /**
   * Constructs a `Certificate`.
   * @param {Uint8Array} opaque - The certificate request context.
   * @param {...CertificateEntry} certificateEntry - The list of certificate entries.
   */
  constructor(opaque: Uint8Array, ...certificateEntry: CertificateEntry[]);

  /** The certificate request context. */
  opaque: Uint8Array;

  /** The list of certificate entries. */
  certificateEntry: CertificateEntry[];
}

/**
 * Represents constrained certificate data.
 * @extends {Constrained}
 * @private
 */
declare class Cert_data extends Constrained {
  /**
   * Parses an array to create `Cert_data`.
   * @param {Uint8Array} array - The array to parse.
   * @returns {Cert_data} The parsed certificate data.
   */
  static from(array: Uint8Array): Cert_data;

  /**
   * Constructs a `Cert_data` instance.
   * @param {Uint8Array} opaque - The certificate data.
   */
  constructor(opaque: Uint8Array);

  /** The certificate data. */
  opaque: Uint8Array;
}

/**
 * Represents constrained extensions.
 * @extends {Constrained}
 * @private
 */
declare class Extensions extends Constrained {
  /**
   * Parses an array to create `Extensions`.
   * @param {Uint8Array} array - The array to parse.
   * @returns {Extensions} The parsed extensions.
   */
  static from(array: Uint8Array): Extensions;

  /**
   * Constructs an `Extensions` instance.
   * @param {...Uint8Array} extension - The list of extensions.
   */
  constructor(...extension: Uint8Array[]);

  /** The list of extensions. */
  extension: Uint8Array[];
}

/**
 * Represents a certificate request context.
 * @extends {Constrained}
 * @private
 */
declare class Certificate_request_context extends Constrained {
  /**
   * Parses an array to create `Certificate_request_context`.
   * @param {Uint8Array} array - The array to parse.
   * @returns {Certificate_request_context} The parsed context.
   */
  static from(array: Uint8Array): Certificate_request_context;

  /**
   * Constructs a `Certificate_request_context` instance.
   * @param {Uint8Array} opaque - The context data.
   */
  constructor(opaque: Uint8Array);

  /** The context data. */
  opaque: Uint8Array;
}

/**
 * Represents a certificate list.
 * @extends {Constrained}
 * @private
 */
declare class Certificate_list extends Constrained {
  /**
   * Parses an array to create `Certificate_list`.
   * @param {Uint8Array} array - The array to parse.
   * @returns {Certificate_list} The parsed list.
   */
  static from(array: Uint8Array): Certificate_list;

  /**
   * Constructs a `Certificate_list` instance.
   * @param {...CertificateEntry} certificateEntry - The list of certificate entries.
   */
  constructor(...certificateEntry: CertificateEntry[]);

  /** The list of certificate entries. */
  certificateEntry: CertificateEntry[];
}
