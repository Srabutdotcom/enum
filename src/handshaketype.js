import { Enum } from "./enum.js";

/**
 * Represents TLS 1.3 Handshake message types as defined in RFC 8446 Section 4
 * @see https://datatracker.ietf.org/doc/html/rfc8446#section-4
 * @extends {Enum}
 */
export class HandshakeType extends Enum {
   /**
    * Used to initiate handshake and establish cryptographic capabilities
    * @returns {HandshakeType}
    */
   static CLIENT_HELLO = new HandshakeType('CLIENT_HELLO', 0x01);

   /**
    * Response to ClientHello, provides server's cryptographic choices
    * @returns {HandshakeType}
    */
   static SERVER_HELLO = new HandshakeType('SERVER_HELLO', 0x02);

   /**
    * Used for post-handshake re-authentication and key update
    * @returns {HandshakeType}
    */
   static NEW_SESSION_TICKET = new HandshakeType('NEW_SESSION_TICKET', 0x04);

   /**
    * If the server sent an "early_data" extension in EncryptedExtensions,
   the client MUST send an EndOfEarlyData message after receiving the
   server Finished.  If the server does not send an "early_data"
   extension in EncryptedExtensions, then the client MUST NOT send an
   EndOfEarlyData message.
    * @returns {HandshakeType}
    */
   static END_OF_EARLY_DATA = new HandshakeType('END_OF_EARLY_DATA', 0x05);

   /**
    * Contains cryptographic parameters for server
    * @returns {HandshakeType}
    */
   static ENCRYPTED_EXTENSIONS = new HandshakeType('ENCRYPTED_EXTENSIONS', 0x08);

   /**
    * Transmission of end-entity certificate
    * @returns {HandshakeType}
    */
   static CERTIFICATE = new HandshakeType('CERTIFICATE', 0x0B);

   /**
    * Digital signature proving possession of private key
    * @returns {HandshakeType}
    */
   static CERTIFICATE_VERIFY = new HandshakeType('CERTIFICATE_VERIFY', 0x0F);

   /**
    * Indicates key material computation can begin
    * @returns {HandshakeType}
    */
   static FINISHED = new HandshakeType('FINISHED', 0x14);

   /**
    * Request for certificate from client
    * @returns {HandshakeType}
    */
   static CERTIFICATE_REQUEST = new HandshakeType('CERTIFICATE_REQUEST', 0x0D);

   /**
    * Message sent post-handshake to update traffic keys
    * @returns {HandshakeType}
    */
   static KEY_UPDATE = new HandshakeType('KEY_UPDATE', 0x18);

   /**
    * Used by server to send additional parameters
    * @returns {HandshakeType}
    */
   static SERVER_PARAMETERS = new HandshakeType('SERVER_PARAMETERS', 0x19);

   /**
    * Contains a message hash for transcript
    * @returns {HandshakeType}
    */
   static MESSAGE_HASH = new HandshakeType('MESSAGE_HASH', 0xFE);

   static parse(octet) {
      return HandshakeType.fromValue(octet[0]) ?? Error(`Unknown ${octet[0]} handshake type`);
   }

   get bit(){return 8}
}