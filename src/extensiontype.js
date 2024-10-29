import { Enum } from "./enum.js";

export class ExtensionType extends Enum {
   /**
   * @type {ExtensionType} Server Name Indication (SNI)
   * @see RFC 6066
   */
   static SERVER_NAME = new ExtensionType("SERVER_NAME", 0);

   /**
    * @type {ExtensionType} Maximum Fragment Length
    * @see RFC 6066
    */
   static MAX_FRAGMENT_LENGTH = new ExtensionType("MAX_FRAGMENT_LENGTH", 1);

   /**
    * @type {ExtensionType} Status Request
    * @see RFC 6066
    */
   static STATUS_REQUEST = new ExtensionType("STATUS_REQUEST", 5);

   /**
    * @type {ExtensionType} Supported Groups
    * @see RFC 8422; RFC 7919
    */
   static SUPPORTED_GROUPS = new ExtensionType("SUPPORTED_GROUPS", 10);

   /**
    * @type {ExtensionType} Signature Algorithms
    * @see RFC 8446
    */
   static SIGNATURE_ALGORITHMS = new ExtensionType("SIGNATURE_ALGORITHMS", 13);

   /**
    * @type {ExtensionType} Use SRTP
    * @see RFC 5764
    */
   static USE_SRTP = new ExtensionType("USE_SRTP", 14);

   /**
    * @type {ExtensionType} Heartbeat
    * @see RFC 6520
    */
   static HEARTBEAT = new ExtensionType("HEARTBEAT", 15);

   /**
    * @type {ExtensionType} Application Layer Protocol Negotiation
    * @see RFC 7301
    */
   static APPLICATION_LAYER_PROTOCOL_NEGOTIATION = new ExtensionType("APPLICATION_LAYER_PROTOCOL_NEGOTIATION", 16);

   /**
    * @type {ExtensionType} Signed Certificate Timestamp
    * @see RFC 6962
    */
   static SIGNED_CERTIFICATE_TIMESTAMP = new ExtensionType("SIGNED_CERTIFICATE_TIMESTAMP", 18);

   /**
    * @type {ExtensionType} Client Certificate Type
    * @see RFC 7250
    */
   static CLIENT_CERTIFICATE_TYPE = new ExtensionType("CLIENT_CERTIFICATE_TYPE", 19);

   /**
    * @type {ExtensionType} Server Certificate Type
    * @see RFC 7250
    */
   static SERVER_CERTIFICATE_TYPE = new ExtensionType("SERVER_CERTIFICATE_TYPE", 20);

   /**
    * @type {ExtensionType} Padding
    * @see RFC 7685
    */
   static PADDING = new ExtensionType("PADDING", 21);

   /**
    * @type {ExtensionType} Record Size Limit
    * @see RFC 8449
    */
   static RECORD_SIZE_LIMIT = new ExtensionType("RECORD_SIZE_LIMIT", 28);

   /**
    * @type {ExtensionType} Session Ticket
    * @see RFC 5077; RFC 8447
    */
   static SESSION_TICKET = new ExtensionType("SESSION_TICKET", 35);

   /**
    * @type {ExtensionType} Pre-Shared Key
    * @see RFC 8446
    */
   static PRE_SHARED_KEY = new ExtensionType("PRE_SHARED_KEY", 41);

   /**
    * @type {ExtensionType} Early Data
    * @see RFC 8446
    */
   static EARLY_DATA = new ExtensionType("EARLY_DATA", 42);

   /**
    * @type {ExtensionType} Supported Versions
    * @see RFC 8446
    */
   static SUPPORTED_VERSIONS = new ExtensionType("SUPPORTED_VERSIONS", 43);

   /**
    * @type {ExtensionType} Cookie
    * @see RFC 8446
    */
   static COOKIE = new ExtensionType("COOKIE", 44);

   /**
    * @type {ExtensionType} PSK Key Exchange Modes
    * @see RFC 8446
    */
   static PSK_KEY_EXCHANGE_MODES = new ExtensionType("PSK_KEY_EXCHANGE_MODES", 45);

   /**
    * @type {ExtensionType} Reserved
    * @see Used but never assigned
    */
   static RESERVED = new ExtensionType("RESERVED", 46);

   /**
    * @type {ExtensionType} Certificate Authorities
    * @see RFC 8446
    */
   static CERTIFICATE_AUTHORITIES = new ExtensionType("CERTIFICATE_AUTHORITIES", 47);

   /**
    * @type {ExtensionType} OID Filters
    * @see RFC 8446
    */
   static OID_FILTERS = new ExtensionType("OID_FILTERS", 48);

   /**
    * @type {ExtensionType} Post-Handshake Auth
    * @see RFC 8446
    */
   static POST_HANDSHAKE_AUTH = new ExtensionType("POST_HANDSHAKE_AUTH", 49);

   /**
    * @type {ExtensionType} Signature Algorithms Certificate
    * @see RFC 8446
    */
   static SIGNATURE_ALGORITHMS_CERT = new ExtensionType("SIGNATURE_ALGORITHMS_CERT", 50);

   /**
    * @type {ExtensionType} Key Share
    * @see RFC 8446
    */
   static KEY_SHARE = new ExtensionType("KEY_SHARE", 51);

   /**
    * @type {ExtensionType} Renegotiation Info
    * @see RFC 5746
    */
   static RENEGOTIATION_INFO = new ExtensionType("RENEGOTIATION_INFO", 65281);

   static parse(octet) {
      const value = octet[0]*256 + octet[1]
      return ExtensionType.fromValue(value) ?? Error(`Unknown ${value} extension type`);
   }

   get bit() { return 16 }
}