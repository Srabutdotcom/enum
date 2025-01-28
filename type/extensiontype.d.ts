import { Uint16, Constrained, Struct } from "../src/dep.ts";
import { Enum } from "../src/enum.js";

/**
 * Represents different TLS extension types.
 * Each extension type is associated with a 16-bit value.
 */
export class ExtensionType extends Enum {
  /** Server Name Indication (SNI) - 0 */
  static SERVER_NAME: ExtensionType;

  /** Maximum Fragment Length - 1 */
  static MAX_FRAGMENT_LENGTH: ExtensionType;

  /** Status Request - 5 */
  static STATUS_REQUEST: ExtensionType;

  /** Supported Groups - 10 */
  static SUPPORTED_GROUPS: ExtensionType;

  /** Signature Algorithms - 13 */
  static SIGNATURE_ALGORITHMS: ExtensionType;

  /** Use SRTP - 14 */
  static USE_SRTP: ExtensionType;

  /** Heartbeat - 15 */
  static HEARTBEAT: ExtensionType;

  /** Application Layer Protocol Negotiation - 16 */
  static APPLICATION_LAYER_PROTOCOL_NEGOTIATION: ExtensionType;

  /** Signed Certificate Timestamp - 18 */
  static SIGNED_CERTIFICATE_TIMESTAMP: ExtensionType;

  /** Client Certificate Type - 19 */
  static CLIENT_CERTIFICATE_TYPE: ExtensionType;

  /** Server Certificate Type - 20 */
  static SERVER_CERTIFICATE_TYPE: ExtensionType;

  /** Padding - 21 */
  static PADDING: ExtensionType;

  /** Record Size Limit - 28 */
  static RECORD_SIZE_LIMIT: ExtensionType;

  /** Session Ticket - 35 */
  static SESSION_TICKET: ExtensionType;

  /** Pre-Shared Key - 41 */
  static PRE_SHARED_KEY: ExtensionType;

  /** Early Data - 42 */
  static EARLY_DATA: ExtensionType;

  /** Supported Versions - 43 */
  static SUPPORTED_VERSIONS: ExtensionType;

  /** Cookie - 44 */
  static COOKIE: ExtensionType;

  /** PSK Key Exchange Modes - 45 */
  static PSK_KEY_EXCHANGE_MODES: ExtensionType;

  /** Reserved - 46 */
  static RESERVED: ExtensionType;

  /** Certificate Authorities - 47 */
  static CERTIFICATE_AUTHORITIES: ExtensionType;

  /** OID Filters - 48 */
  static OID_FILTERS: ExtensionType;

  /** Post-Handshake Auth - 49 */
  static POST_HANDSHAKE_AUTH: ExtensionType;

  /** Signature Algorithms Certificate - 50 */
  static SIGNATURE_ALGORITHMS_CERT: ExtensionType;

  /** Key Share - 51 */
  static KEY_SHARE: ExtensionType;

  /** Renegotiation Info - 65281 */
  static RENEGOTIATION_INFO: ExtensionType;

  /**
   * Check octet and return the corresponding ExtensionType.
   * @param octet A Uint8Array containing the extension type value.
   * @returns The matching ExtensionType or throws an error if unknown.
   */
  static from(octet: Uint8Array): ExtensionType;

  /**
   * The corresponding Uint16 representation of the extension type.
   */
  get Uint16(): Uint16;
  get byte(): Uint16;

  /**
   * The bit length of the extension type.
   */
  get bit(): number;

  /**
   * Create an Extension instance with the current extension type and extension data.
   * @param extension_data The associated data for the extension.
   * @returns A new Extension instance.
   */
  extension(extension_data: Uint8Array): Extension;
}

/**
 * Represents extension data in a TLS context.
 * The data is a constrained opaque value with a length between 0 and 2^16 - 1.
 */
export class ExtensionData extends Constrained {
  /** The raw opaque extension data. */
  opaque: Uint8Array;

  /**
   * Creates a new `ExtensionData` instance from an opaque value.
   * 
   * @param opaque - The opaque value to initialize the `ExtensionData` instance.
   * @returns An instance of `ExtensionData`.
   */
  static fromOpaque(opaque: Uint8Array): ExtensionData;

  /**
   * Parses an `ExtensionData` instance from a serialized array.
   * 
   * @param array - The serialized array containing the `ExtensionData` data.
   * @returns An instance of `ExtensionData`.
   */
  static from(array: Uint8Array): ExtensionData;

  /**
   * Constructs a new `ExtensionData` instance.
   * 
   * @param opaque - The opaque value for the extension data.
   */
  constructor(opaque: Uint8Array);
}

/**
 * Represents an extension in a TLS context.
 * Consists of an extension type and associated extension data.
 */
export class Extension extends Struct {
  /** The extension type. */
  extension_type: Uint16;

  /** The associated extension data. */
  extension_data: Uint8Array;

  /**
   * Constructs a new `Extension` instance.
   * 
   * @param extension_type - The type of the extension (as a `Uint16`).
   * @param extension_data - The associated extension data.
   */
  constructor(extension_type: Uint16, extension_data: Uint8Array);

  /**
   * Parses an `Extension` instance from a serialized array.
   * 
   * @param array - The serialized array containing the extension data.
   * @returns An instance of `Extension`.
   */
  static from(array: Uint8Array): Extension;
}