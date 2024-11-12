// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/alert.d.ts"

import { Enum } from "./enum.js";

/**
 * Represents alert levels in the protocol
 * @see https://datatracker.ietf.org/doc/html/rfc8446#section-6
 */
export class AlertLevel extends Enum {

   /** @type {AlertLevel} warning level (1) */
   static WARNING = new AlertLevel('WARNING', 1);

   /** @type {AlertLevel} fatal level (2) */
   static FATAL = new AlertLevel('FATAL', 2);

   /**
    * check octet and return valid AlertLevel  
    *
    * @static
    * @param {Uint8Array} octet
    * @returns {AlertLevel }
    */
   static parse(octet) {
      return AlertLevel.fromValue(octet[0]) ?? Error(`Unknown ${octet[0]} AlertLevel type`);
   }

   /**return 8 */
   get bit() { return 8 }
}


/**
 * Enum class representing various TLS alert descriptions based on RFC 8446.
 * @see https://datatracker.ietf.org/doc/html/rfc8446#section-6
 */
export class AlertDescription extends Enum {
   /**
    * This alert notifies the recipient that the sender will not send any more messages on this connection. Any data received after a closure alert has been received MUST be ignored.
    */
   static CLOSE_NOTIFY = new AlertDescription("CLOSE_NOTIFY", 0);

   /**
    * An inappropriate message (e.g., the wrong handshake message, premature Application Data, etc.) was received. This alert should never be observed in communication between proper implementations.
    */
   static UNEXPECTED_MESSAGE = new AlertDescription("UNEXPECTED_MESSAGE", 10);

   /**
    * This alert is returned if a record is received which cannot be deprotected. Because AEAD algorithms combine decryption and verification, this alert is used for all deprotection failures.
    */
   static BAD_RECORD_MAC = new AlertDescription("BAD_RECORD_MAC", 20);

   /**
    * A TLSCiphertext record was received that had a length more than 2^14 + 256 bytes or a record decrypted to a TLSPlaintext record with more than 2^14 bytes.
    */
   static RECORD_OVERFLOW = new AlertDescription("RECORD_OVERFLOW", 22);

   /**
    * Receipt of a 'handshake_failure' alert message indicates that the sender was unable to negotiate an acceptable set of security parameters given the options available.
    */
   static HANDSHAKE_FAILURE = new AlertDescription("HANDSHAKE_FAILURE", 40);

   /**
    * A certificate was corrupt or contained signatures that did not verify correctly.
    */
   static BAD_CERTIFICATE = new AlertDescription("BAD_CERTIFICATE", 42);

   /**
    * A certificate was of an unsupported type.
    */
   static UNSUPPORTED_CERTIFICATE = new AlertDescription("UNSUPPORTED_CERTIFICATE", 43);

   /**
    * A certificate was revoked by its signer.
    */
   static CERTIFICATE_REVOKED = new AlertDescription("CERTIFICATE_REVOKED", 44);

   /**
    * A certificate has expired or is not currently valid.
    */
   static CERTIFICATE_EXPIRED = new AlertDescription("CERTIFICATE_EXPIRED", 45);

   /**
    * Some other issue arose in processing the certificate, rendering it unacceptable.
    */
   static CERTIFICATE_UNKNOWN = new AlertDescription("CERTIFICATE_UNKNOWN", 46);

   /**
    * A field in the handshake was incorrect or inconsistent with other fields.
    */
   static ILLEGAL_PARAMETER = new AlertDescription("ILLEGAL_PARAMETER", 47);

   /**
    * A valid certificate chain or partial chain was received, but the CA certificate could not be located or matched with a known trust anchor.
    */
   static UNKNOWN_CA = new AlertDescription("UNKNOWN_CA", 48);

   /**
    * A valid certificate or PSK was received, but access control was applied, and the sender decided not to proceed with negotiation.
    */
   static ACCESS_DENIED = new AlertDescription("ACCESS_DENIED", 49);

   /**
    * A message could not be decoded because some field was out of range or the length of the message was incorrect.
    */
   static DECODE_ERROR = new AlertDescription("DECODE_ERROR", 50);

   /**
    * A handshake cryptographic operation failed, including verification or validation issues.
    */
   static DECRYPT_ERROR = new AlertDescription("DECRYPT_ERROR", 51);

   /**
    * The protocol version the peer has attempted to negotiate is recognized but not supported.
    */
   static PROTOCOL_VERSION = new AlertDescription("PROTOCOL_VERSION", 70);

   /**
    * A negotiation has failed because the server requires parameters more secure than those supported by the client.
    */
   static INSUFFICIENT_SECURITY = new AlertDescription("INSUFFICIENT_SECURITY", 71);

   /**
    * An internal error unrelated to the peer or protocol correctness makes it impossible to continue.
    */
   static INTERNAL_ERROR = new AlertDescription("INTERNAL_ERROR", 80);
   
   /**
    * Sent by a server in response to an invalid
     connection retry attempt from a client (see [RFC7507]).
    */
   static INAPPROPRIATE_FALLBACK = new AlertDescription("INAPPROPRIATE_FALLBACK", 86)

   /**
    * This alert notifies the recipient that the sender is canceling the handshake for reasons unrelated to a protocol failure.
    */
   static USER_CANCELED = new AlertDescription("USER_CANCELED", 90);

   /**
    * Sent when a mandatory extension for the negotiated TLS version or other parameters is missing.
    */
   static MISSING_EXTENSION = new AlertDescription("MISSING_EXTENSION", 109);

   /**
    * Sent when an extension is included in a message where it is prohibited.
    */
   static UNSUPPORTED_EXTENSION = new AlertDescription("UNSUPPORTED_EXTENSION", 110);

   /**
    * Sent when no server exists identified by the client-provided 'server_name' extension.
    */
   static UNRECOGNIZED_NAME = new AlertDescription("UNRECOGNIZED_NAME", 112);

   
   /**
    * Sent by clients when an invalid or
     unacceptable OCSP response is provided by the server via the
     "status_request" extension (see [RFC6066]).
    */
   static BAD_CERTIFICATE_STATUS_RESPONSE = new AlertDescription("BAD_CERTIFICATE_STATUS_RESPONSE", 113)

   /**
    * Sent when PSK key establishment is desired, but no acceptable PSK identity is provided by the client.
    */
   static UNKNOWN_PSK_IDENTITY = new AlertDescription("UNKNOWN_PSK_IDENTITY", 115);

   /**
    * Sent when a client certificate is required but none was provided.
    */
   static CERTIFICATE_REQUIRED = new AlertDescription("CERTIFICATE_REQUIRED", 116);

   /**
    * Sent when the client advertises only unsupported protocols in the 'application_layer_protocol_negotiation' extension.
    */
   static NO_APPLICATION_PROTOCOL = new AlertDescription("NO_APPLICATION_PROTOCOL", 120);
   static DECRYPTION_FAILED_RESERVED = new AlertDescription("DECRYPTION_FAILED_RESERVED", 21)
   static DECOMPRESSION_FAILURE_RESERVED = new AlertDescription("DECOMPRESSION_FAILURE_RESERVED", 30)
   static NO_CERTIFICATE_RESERVED = new AlertDescription("NO_CERTIFICATE_RESERVED", 41)
   static EXPORT_RESTRICTION_RESERVED = new AlertDescription("EXPORT_RESTRICTION_RESERVED", 60)
   static NO_RENEGOTIATION_RESERVED = new AlertDescription("NO_RENEGOTIATION_RESERVED", 100)
   static CERTIFICATE_UNOBTAINABLE_RESERVED = new AlertDescription("CERTIFICATE_UNOBTAINABLE_RESERVED", 111)
   static BAD_CERTIFICATE_HASH_VALUE_RESERVED = new AlertDescription("BAD_CERTIFICATE_HASH_VALUE_RESERVED", 114)

   /**
    * check octet and return valid AlertDescription  
    *
    * @static
    * @param {Uint8Array} octet
    * @returns {AlertDescription }
    */
   static parse(octet) {
      return AlertDescription.fromValue(octet[0]) ?? Error(`Unknown ${octet[0]} AlertDescription type`);
   }

   /**return 8 */
   get bit() { return 8 }

   get level() {
      const warning = [
         0,   // CLOSE_NOTIFY
         90,  // USER_CANCELED
         21,  // DECRYPTION_FAILED_RESERVED
         41,  // NO_CERTIFICATE_RESERVED
         60,  // EXPORT_RESTRICTION_RESERVED
         30,  // DECOMPRESSION_FAILURE_RESERVED
         100, // NO_RENEGOTIATION_RESERVED
         111, // CERTIFICATE_UNOBTAINABLE_RESERVED
         114  // BAD_CERTIFICATE_HASH_VALUE_RESERVED
      ]
      if(warning.includes(this.value))return AlertLevel.WARNING
      return AlertLevel.FATAL
   }
   alert(){
      return Alert.fromAlertDescription(this)
   }
}

/**
 * Represents an alert in the TLS protocol.
 * Extends Uint8Array to store alert information in a binary format.
 */
export class Alert extends Uint8Array {
   level
   description
   /**
    * Creates an Alert from an AlertDescription.
    * @param {AlertDescription} description - The alert description.
    * @returns {Alert} The created Alert instance.
    */
   static fromAlertDescription(description){
      return new Alert(description.level, description)
   }
   /**
    * Creates an Alert from a Uint8Array.
    * @param {Uint8Array} array - The array representing the Alert.
    * @returns {Alert} The created Alert instance.
    * @throws {Error} If the input array is invalid.
    */
   static from(array){
      if (array.length < 2) {
         throw new Error("Input array must have at least 2 elements.");
      }
      const description = AlertDescription.fromValue(array[1]);
      return new Alert(description.level, description)
   }
   /**
    * @param {number} level - The alert level.
    * @param {AlertDescription} description - The alert description instance.
    */
   constructor(level, description){
      super(2);
      this[0] = +level;
      this[1] = +description;
      this.level = level
      this.description = description
   }
}


//npx -p typescript tsc ./src/alert.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ./dist