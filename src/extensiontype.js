import { Enum } from "./enum.js";

/**
 * Represents different TLS extension types. Each extension type is associated with a 16-bit value.
 */
export class ExtensionType extends Enum {
   /**
    * Used to specify the server name requested by the client.
    * @type {ExtensionType} Server Name Indication (SNI) - 0
    * @see RFC 6066
    */
   static SERVER_NAME = new ExtensionType("SERVER_NAME", 0);

   /**
    * Used to limit the size of fragments in TLS records.
    * @type {ExtensionType} Maximum Fragment Length - 1
    * @see RFC 6066
    */
   static MAX_FRAGMENT_LENGTH = new ExtensionType("MAX_FRAGMENT_LENGTH", 1);

   /**
    * Used to request certificate status information from the server.
    * @type {ExtensionType} Status Request - 5
    * @see RFC 6066
    */
   static STATUS_REQUEST = new ExtensionType("STATUS_REQUEST", 5);

   /**
    * Used to indicate the elliptic curve groups supported by the client.
    * @type {ExtensionType} Supported Groups - 10
    * @see RFC 8422; RFC 7919
    */
   static SUPPORTED_GROUPS = new ExtensionType("SUPPORTED_GROUPS", 10);

   /**
    * Used to negotiate supported signature algorithms.
    * @type {ExtensionType} Signature Algorithms - 13
    * @see RFC 8446
    */
   static SIGNATURE_ALGORITHMS = new ExtensionType("SIGNATURE_ALGORITHMS", 13);

   /**
    * Used to negotiate Secure Real-time Transport Protocol (SRTP) parameters.
    * @type {ExtensionType} Use SRTP - 14
    * @see RFC 5764
    */
   static USE_SRTP = new ExtensionType("USE_SRTP", 14);

   /**
    * Used to detect idle connections and trigger retransmissions.
    * @type {ExtensionType} Heartbeat - 15
    * @see RFC 6520
    */
   static HEARTBEAT = new ExtensionType("HEARTBEAT", 15);

   /**
    * Used to negotiate application layer protocols.
    * @type {ExtensionType} Application Layer Protocol Negotiation - 16
    * @see RFC 7301
    */
   static APPLICATION_LAYER_PROTOCOL_NEGOTIATION = new ExtensionType("APPLICATION_LAYER_PROTOCOL_NEGOTIATION", 16);

   /**
    * Used to provide a timestamp for the server's certificate.
    * @type {ExtensionType} Signed Certificate Timestamp - 18
    * @see RFC 6962
    */
   static SIGNED_CERTIFICATE_TIMESTAMP = new ExtensionType("SIGNED_CERTIFICATE_TIMESTAMP", 18);

   /**
    * Used to indicate the types of client certificates supported.
    * @type {ExtensionType} Client Certificate Type - 19
    * @see RFC 7250
    */
   static CLIENT_CERTIFICATE_TYPE = new ExtensionType("CLIENT_CERTIFICATE_TYPE", 19);

   /**
    * Used to indicate the types of server certificates supported.
    * @type {ExtensionType} Server Certificate Type - 20
    * @see RFC 7250
    */
   static SERVER_CERTIFICATE_TYPE = new ExtensionType("SERVER_CERTIFICATE_TYPE", 20);

   /**
    * Used to add padding to TLS records.
    * @type {ExtensionType} Padding - 21
    * @see RFC 7685
    */
   static PADDING = new ExtensionType("PADDING", 21);

   /**
    * Used to limit the maximum size of TLS records.
    * @type {ExtensionType} Record Size Limit - 28
    * @see RFC 8449
    */
   static RECORD_SIZE_LIMIT = new ExtensionType("RECORD_SIZE_LIMIT", 28);

   /**
    * Used to store session state for faster resumption of connections.
    * @type {ExtensionType} Session Ticket - 35
    * @see RFC 5077; RFC 8447
    */
   static SESSION_TICKET = new ExtensionType("SESSION_TICKET", 35);

   /**
    * Used to establish a secure session using pre-shared keys.
    * @type {ExtensionType} Pre-Shared Key - 41
    * @see RFC 8446
    */
   static PRE_SHARED_KEY = new ExtensionType("PRE_SHARED_KEY", 41);

   /**
    * Used to send application data before the handshake is complete.
    * @type {ExtensionType} Early Data - 42
    * @see RFC 8446
    */
   static EARLY_DATA = new ExtensionType("EARLY_DATA", 42);

   /**
    * Used to negotiate supported TLS versions.
    * @type {ExtensionType} Supported Versions - 43
    * @see RFC 8446
    */
   static SUPPORTED_VERSIONS = new ExtensionType("SUPPORTED_VERSIONS", 43);

   /**
    * Used to implement cookie-based authentication and session resumption.
    * @type {ExtensionType} Cookie - 44
    * @see RFC 8446
    */
   static COOKIE = new ExtensionType("COOKIE", 44);

   /**
    * Used to negotiate PSK key exchange modes.
    * @type {ExtensionType} PSK Key Exchange Modes - 45
    * @see RFC 8446
    */
   static PSK_KEY_EXCHANGE_MODES = new ExtensionType("PSK_KEY_EXCHANGE_MODES", 45);

   /**
    * Reserved for future use.
    * @type {ExtensionType} Reserved - 46
    * @see Used but never assigned
    */
   static RESERVED = new ExtensionType("RESERVED", 46);

   /**
    * Used to indicate the trusted certificate authorities.
    * @type {ExtensionType} Certificate Authorities - 47
    * @see RFC 8446
    */
   static CERTIFICATE_AUTHORITIES = new ExtensionType("CERTIFICATE_AUTHORITIES", 47);

   /**
    * Used to filter the certificate authorities based on OIDs.
    * @type {ExtensionType} OID Filters - 48
    * @see RFC 8446
    */
   static OID_FILTERS = new ExtensionType("OID_FILTERS", 48);

   /**
    * Used to perform additional authentication after the handshake.
    * @type {ExtensionType} Post-Handshake Auth - 49
    * @see RFC 8446
    */
   static POST_HANDSHAKE_AUTH = new ExtensionType("POST_HANDSHAKE_AUTH", 49);

   /**
    * Used to indicate the signature algorithms supported by the certificate.
    * @type {ExtensionType} Signature Algorithms Certificate - 50
    * @see RFC 8446
    */
   static SIGNATURE_ALGORITHMS_CERT = new ExtensionType("SIGNATURE_ALGORITHMS_CERT", 50);

   /**
    * Used to negotiate key exchange groups.
    * @type {ExtensionType} Key Share - 51
    * @see RFC 8446
    */
   static KEY_SHARE = new ExtensionType("KEY_SHARE", 51);

   /**
    * Used to negotiate renegotiation parameters.
    * @type {ExtensionType} Renegotiation Info - 65281
    * @see RFC 5746
    */
   static RENEGOTIATION_INFO = new ExtensionType("RENEGOTIATION_INFO", 65281);

   /**
    * check octet and return ExtensionType 
    *
    * @static
    * @param {Uint8Array} octet
    * @returns {ExtensionType}
    */
   static parse(octet) {
      const value = octet[0] * 256 + octet[1]
      return ExtensionType.fromValue(value) ?? Error(`Unknown ${value} extension type`);
   }

   
   /**
    * Bit 16
    *
    * @type {number}
    */
   get bit() { return 16 }
}

// npx -p typescript tsc ./src/extensiontype.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ./dist