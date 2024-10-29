/**
 * Represents different TLS extension types. Each extension type is associated with a 16-bit value.
 */
export class ExtensionType extends Enum {
    /**
     * Used to specify the server name requested by the client.
     * @type {ExtensionType} Server Name Indication (SNI) - 0
     * @see RFC 6066
     */
    static SERVER_NAME: ExtensionType;
    /**
     * Used to limit the size of fragments in TLS records.
     * @type {ExtensionType} Maximum Fragment Length - 1
     * @see RFC 6066
     */
    static MAX_FRAGMENT_LENGTH: ExtensionType;
    /**
     * Used to request certificate status information from the server.
     * @type {ExtensionType} Status Request - 5
     * @see RFC 6066
     */
    static STATUS_REQUEST: ExtensionType;
    /**
     * Used to indicate the elliptic curve groups supported by the client.
     * @type {ExtensionType} Supported Groups - 10
     * @see RFC 8422; RFC 7919
     */
    static SUPPORTED_GROUPS: ExtensionType;
    /**
     * Used to negotiate supported signature algorithms.
     * @type {ExtensionType} Signature Algorithms - 13
     * @see RFC 8446
     */
    static SIGNATURE_ALGORITHMS: ExtensionType;
    /**
     * Used to negotiate Secure Real-time Transport Protocol (SRTP) parameters.
     * @type {ExtensionType} Use SRTP - 14
     * @see RFC 5764
     */
    static USE_SRTP: ExtensionType;
    /**
     * Used to detect idle connections and trigger retransmissions.
     * @type {ExtensionType} Heartbeat - 15
     * @see RFC 6520
     */
    static HEARTBEAT: ExtensionType;
    /**
     * Used to negotiate application layer protocols.
     * @type {ExtensionType} Application Layer Protocol Negotiation - 16
     * @see RFC 7301
     */
    static APPLICATION_LAYER_PROTOCOL_NEGOTIATION: ExtensionType;
    /**
     * Used to provide a timestamp for the server's certificate.
     * @type {ExtensionType} Signed Certificate Timestamp - 18
     * @see RFC 6962
     */
    static SIGNED_CERTIFICATE_TIMESTAMP: ExtensionType;
    /**
     * Used to indicate the types of client certificates supported.
     * @type {ExtensionType} Client Certificate Type - 19
     * @see RFC 7250
     */
    static CLIENT_CERTIFICATE_TYPE: ExtensionType;
    /**
     * Used to indicate the types of server certificates supported.
     * @type {ExtensionType} Server Certificate Type - 20
     * @see RFC 7250
     */
    static SERVER_CERTIFICATE_TYPE: ExtensionType;
    /**
     * Used to add padding to TLS records.
     * @type {ExtensionType} Padding - 21
     * @see RFC 7685
     */
    static PADDING: ExtensionType;
    /**
     * Used to limit the maximum size of TLS records.
     * @type {ExtensionType} Record Size Limit - 28
     * @see RFC 8449
     */
    static RECORD_SIZE_LIMIT: ExtensionType;
    /**
     * Used to store session state for faster resumption of connections.
     * @type {ExtensionType} Session Ticket - 35
     * @see RFC 5077; RFC 8447
     */
    static SESSION_TICKET: ExtensionType;
    /**
     * Used to establish a secure session using pre-shared keys.
     * @type {ExtensionType} Pre-Shared Key - 41
     * @see RFC 8446
     */
    static PRE_SHARED_KEY: ExtensionType;
    /**
     * Used to send application data before the handshake is complete.
     * @type {ExtensionType} Early Data - 42
     * @see RFC 8446
     */
    static EARLY_DATA: ExtensionType;
    /**
     * Used to negotiate supported TLS versions.
     * @type {ExtensionType} Supported Versions - 43
     * @see RFC 8446
     */
    static SUPPORTED_VERSIONS: ExtensionType;
    /**
     * Used to implement cookie-based authentication and session resumption.
     * @type {ExtensionType} Cookie - 44
     * @see RFC 8446
     */
    static COOKIE: ExtensionType;
    /**
     * Used to negotiate PSK key exchange modes.
     * @type {ExtensionType} PSK Key Exchange Modes - 45
     * @see RFC 8446
     */
    static PSK_KEY_EXCHANGE_MODES: ExtensionType;
    /**
     * Reserved for future use.
     * @type {ExtensionType} Reserved - 46
     * @see Used but never assigned
     */
    static RESERVED: ExtensionType;
    /**
     * Used to indicate the trusted certificate authorities.
     * @type {ExtensionType} Certificate Authorities - 47
     * @see RFC 8446
     */
    static CERTIFICATE_AUTHORITIES: ExtensionType;
    /**
     * Used to filter the certificate authorities based on OIDs.
     * @type {ExtensionType} OID Filters - 48
     * @see RFC 8446
     */
    static OID_FILTERS: ExtensionType;
    /**
     * Used to perform additional authentication after the handshake.
     * @type {ExtensionType} Post-Handshake Auth - 49
     * @see RFC 8446
     */
    static POST_HANDSHAKE_AUTH: ExtensionType;
    /**
     * Used to indicate the signature algorithms supported by the certificate.
     * @type {ExtensionType} Signature Algorithms Certificate - 50
     * @see RFC 8446
     */
    static SIGNATURE_ALGORITHMS_CERT: ExtensionType;
    /**
     * Used to negotiate key exchange groups.
     * @type {ExtensionType} Key Share - 51
     * @see RFC 8446
     */
    static KEY_SHARE: ExtensionType;
    /**
     * Used to negotiate renegotiation parameters.
     * @type {ExtensionType} Renegotiation Info - 65281
     * @see RFC 5746
     */
    static RENEGOTIATION_INFO: ExtensionType;
    /**
     * check octet and return ExtensionType
     *
     * @static
     * @param {Uint8Array} octet
     * @returns {ExtensionType}
     */
    static parse(octet: Uint8Array): ExtensionType;
    /**
     * Bit 16
     *
     * @type {number}
     */
    get bit(): number;
}
import { Enum } from "../src/enum.js";
