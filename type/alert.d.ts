/**
 * Represents alert levels in the protocol
 * @see https://datatracker.ietf.org/doc/html/rfc8446#section-6
 * @version __VERSION__
 */
export class AlertLevel extends Enum {
    /** @type {AlertLevel} warning level (1) */
    static WARNING: AlertLevel;
    /** @type {AlertLevel} fatal level (2) */
    static FATAL: AlertLevel;
    /**
     * check octet and return valid AlertLevel
     *
     * @static
     * @param {Uint8Array} octet
     * @returns {AlertLevel }
     */
    static from(octet: Uint8Array): AlertLevel;
    /**return 8 */
    get bit(): number;
    get byte(): Uint8Array;
}
/**
 * Enum class representing various TLS alert descriptions based on RFC 8446.
 * @see https://datatracker.ietf.org/doc/html/rfc8446#section-6
 * @version __VERSION__
 */
export class AlertDescription extends Enum {
    /**
     * This alert notifies the recipient that the sender will not send any more messages on this connection. Any data received after a closure alert has been received MUST be ignored.
     */
    static CLOSE_NOTIFY: AlertDescription;
    /**
     * An inappropriate message (e.g., the wrong handshake message, premature Application Data, etc.) was received. This alert should never be observed in communication between proper implementations.
     */
    static UNEXPECTED_MESSAGE: AlertDescription;
    /**
     * This alert is returned if a record is received which cannot be deprotected. Because AEAD algorithms combine decryption and verification, this alert is used for all deprotection failures.
     */
    static BAD_RECORD_MAC: AlertDescription;
    /**
     * A TLSCiphertext record was received that had a length more than 2^14 + 256 bytes or a record decrypted to a TLSPlaintext record with more than 2^14 bytes.
     */
    static RECORD_OVERFLOW: AlertDescription;
    /**
     * Receipt of a 'handshake_failure' alert message indicates that the sender was unable to negotiate an acceptable set of security parameters given the options available.
     */
    static HANDSHAKE_FAILURE: AlertDescription;
    /**
     * A certificate was corrupt or contained signatures that did not verify correctly.
     */
    static BAD_CERTIFICATE: AlertDescription;
    /**
     * A certificate was of an unsupported type.
     */
    static UNSUPPORTED_CERTIFICATE: AlertDescription;
    /**
     * A certificate was revoked by its signer.
     */
    static CERTIFICATE_REVOKED: AlertDescription;
    /**
     * A certificate has expired or is not currently valid.
     */
    static CERTIFICATE_EXPIRED: AlertDescription;
    /**
     * Some other issue arose in processing the certificate, rendering it unacceptable.
     */
    static CERTIFICATE_UNKNOWN: AlertDescription;
    /**
     * A field in the handshake was incorrect or inconsistent with other fields.
     */
    static ILLEGAL_PARAMETER: AlertDescription;
    /**
     * A valid certificate chain or partial chain was received, but the CA certificate could not be located or matched with a known trust anchor.
     */
    static UNKNOWN_CA: AlertDescription;
    /**
     * A valid certificate or PSK was received, but access control was applied, and the sender decided not to proceed with negotiation.
     */
    static ACCESS_DENIED: AlertDescription;
    /**
     * A message could not be decoded because some field was out of range or the length of the message was incorrect.
     */
    static DECODE_ERROR: AlertDescription;
    /**
     * A handshake cryptographic operation failed, including verification or validation issues.
     */
    static DECRYPT_ERROR: AlertDescription;
    /**
     * The protocol version the peer has attempted to negotiate is recognized but not supported.
     */
    static PROTOCOL_VERSION: AlertDescription;
    /**
     * A negotiation has failed because the server requires parameters more secure than those supported by the client.
     */
    static INSUFFICIENT_SECURITY: AlertDescription;
    /**
     * An internal error unrelated to the peer or protocol correctness makes it impossible to continue.
     */
    static INTERNAL_ERROR: AlertDescription;
    /**
     * Sent by a server in response to an invalid
      connection retry attempt from a client (see [RFC7507]).
     */
    static INAPPROPRIATE_FALLBACK: AlertDescription;
    /**
     * This alert notifies the recipient that the sender is canceling the handshake for reasons unrelated to a protocol failure.
     */
    static USER_CANCELED: AlertDescription;
    /**
     * Sent when a mandatory extension for the negotiated TLS version or other parameters is missing.
     */
    static MISSING_EXTENSION: AlertDescription;
    /**
     * Sent when an extension is included in a message where it is prohibited.
     */
    static UNSUPPORTED_EXTENSION: AlertDescription;
    /**
     * Sent when no server exists identified by the client-provided 'server_name' extension.
     */
    static UNRECOGNIZED_NAME: AlertDescription;
    /**
     * Sent by clients when an invalid or
      unacceptable OCSP response is provided by the server via the
      "status_request" extension (see [RFC6066]).
     */
    static BAD_CERTIFICATE_STATUS_RESPONSE: AlertDescription;
    /**
     * Sent when PSK key establishment is desired, but no acceptable PSK identity is provided by the client.
     */
    static UNKNOWN_PSK_IDENTITY: AlertDescription;
    /**
     * Sent when a client certificate is required but none was provided.
     */
    static CERTIFICATE_REQUIRED: AlertDescription;
    /**
     * Sent when the client advertises only unsupported protocols in the 'application_layer_protocol_negotiation' extension.
     */
    static NO_APPLICATION_PROTOCOL: AlertDescription;
    static DECRYPTION_FAILED_RESERVED: AlertDescription;
    static DECOMPRESSION_FAILURE_RESERVED: AlertDescription;
    static NO_CERTIFICATE_RESERVED: AlertDescription;
    static EXPORT_RESTRICTION_RESERVED: AlertDescription;
    static NO_RENEGOTIATION_RESERVED: AlertDescription;
    static CERTIFICATE_UNOBTAINABLE_RESERVED: AlertDescription;
    static BAD_CERTIFICATE_HASH_VALUE_RESERVED: AlertDescription;
    /**
     * check octet and return valid AlertDescription
     *
     * @static
     * @param {Uint8Array} octet
     * @returns {AlertDescription }
     */
    static from(octet: Uint8Array): AlertDescription;
    /**return 8 */
    get bit(): number;
    get level(): AlertLevel;
    get byte(): Uint8;
}
/**
 * @version __VERSION__
 */
export declare class Alert extends Uint8Array {
    /**
     * The alert level (0 for warning, 1 for fatal).
     */
    level: AlertLevel;
 
    /**
     * The alert description instance, providing details about the alert.
     */
    description: AlertDescription;
 
    /**
     * Creates an instance of the Alert class.
     * @param level - The alert level.
     * @param description - The alert description instance.
     */
    constructor(level: number, description: AlertDescription);
 
    /**
     * Creates an Alert instance from an AlertDescription.
     * @param description - The alert description to use for creating the Alert.
     * @returns A new Alert instance.
     */
    static fromAlertDescription(description: AlertDescription): Alert;
 
    /**
     * Creates an Alert instance from a Uint8Array.
     * @param array - The array representing the Alert.
     * @returns A new Alert instance created from the provided array.
     * @throws If the input array is invalid or does not contain enough elements.
     */
    static from(array: Uint8Array): Alert;
 }
import { Uint8 } from "../src/dep.ts";
import { Enum } from "../src/enum.js";
