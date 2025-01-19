// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/handshaketype.d.ts"
import { Enum } from "./enum.js";
import { Struct, Uint24, Uint8 } from "./dep.ts";
import { ContentType } from "./contentype.js"

/**
 * Represents TLS 1.3 Handshake message types as defined in RFC 8446 Section 4
 * @see https://datatracker.ietf.org/doc/html/rfc8446#section-4
 * @extends {Enum}
 */
export class HandshakeType extends Enum {
   /**
    * Used to initiate handshake and establish cryptographic capabilities - 0x01
    * @returns {HandshakeType}
    */
   static CLIENT_HELLO = new HandshakeType('CLIENT_HELLO', 0x01);

   /**
    * Response to ClientHello, provides server's cryptographic choices - 0x02
    * @returns {HandshakeType}
    */
   static SERVER_HELLO = new HandshakeType('SERVER_HELLO', 0x02);

   /**
    * Used for post-handshake re-authentication and key update - 0x04
    * @returns {HandshakeType}
    */
   static NEW_SESSION_TICKET = new HandshakeType('NEW_SESSION_TICKET', 0x04);

   /**
    * If the server sent an "early_data" extension in EncryptedExtensions,
   the client MUST send an EndOfEarlyData message after receiving the
   server Finished.  If the server does not send an "early_data"
   extension in EncryptedExtensions, then the client MUST NOT send an
   EndOfEarlyData message. - 0x05
    * @returns {HandshakeType}
    */
   static END_OF_EARLY_DATA = new HandshakeType('END_OF_EARLY_DATA', 0x05);

   /**
    * Contains cryptographic parameters for server - 0x08
    * @returns {HandshakeType}
    */
   static ENCRYPTED_EXTENSIONS = new HandshakeType('ENCRYPTED_EXTENSIONS', 0x08);

   /**
    * Transmission of end-entity certificate - 0x0B
    * @returns {HandshakeType}
    */
   static CERTIFICATE = new HandshakeType('CERTIFICATE', 0x0B);

   /**
    * Digital signature proving possession of private key - 0x0F
    * @returns {HandshakeType}
    */
   static CERTIFICATE_VERIFY = new HandshakeType('CERTIFICATE_VERIFY', 0x0F);

   /**
    * Indicates key material computation can begin - 0x14
    * @returns {HandshakeType}
    */
   static FINISHED = new HandshakeType('FINISHED', 0x14);

   /**
    * Request for certificate from client - 0x0D
    * @returns {HandshakeType}
    */
   static CERTIFICATE_REQUEST = new HandshakeType('CERTIFICATE_REQUEST', 0x0D);

   /**
    * Message sent post-handshake to update traffic keys - 0x18
    * @returns {HandshakeType}
    */
   static KEY_UPDATE = new HandshakeType('KEY_UPDATE', 0x18);

   /**
    * Used by server to send additional parameters - 0x19
    * @returns {HandshakeType}
    */
   static SERVER_PARAMETERS = new HandshakeType('SERVER_PARAMETERS', 0x19);

   /**
    * Contains a message hash for transcript - 0xFE
    * @returns {HandshakeType}
    */
   static MESSAGE_HASH = new HandshakeType('MESSAGE_HASH', 0xFE);

   
   /**
    * Check and return HandshakeType if valid
    *
    * @static
    * @param {Uint8Array} octet - 8 bit or 1 octet
    * @returns {HandshakeType}
    */
   static from(octet) {
      return HandshakeType.fromValue(octet[0]) ?? Error(`Unknown ${octet[0]} handshake type`);
   }

   /**return 8 */
   get bit(){return 8}

   handshake(message){
      return Handshake.fromMessage(this, message)
   }

   get Uint8(){ return Uint8.fromValue(+this)}
}

export class Handshake extends Uint8Array {
   msg_type
   message
   static fromMessage(msg_type, message){
      return new Handshake(msg_type, message)
   }
   static from(array){
      const copy = Uint8Array.from(array)
      const msg_type = HandshakeType.fromValue(copy[0]);
      const lengthOf = Uint24.from(copy.subarray(1)).value;
      const message = copy.subarray(4, 4 + lengthOf)
      return new Handshake(msg_type, message)
   }
   constructor(msg_type, message){
      const struct = new Struct(msg_type.Uint8,  Uint24.fromValue(message.length), message)
      super(struct)
      this.msg_type = msg_type;
      this.message = message
      this.items = struct.items
   }
   get byte(){ return Uint8Array.from(this)}
   tlsInnerPlaintext(numZeros){
      return ContentType.APPLICATION_DATA.tlsInnerPlaintext(this, numZeros)
   }
}

export class EndOfEarlyData extends Uint8Array {
   static fromHandshake(array){
      const type = HandshakeType.fromValue(array.at(0));
      if(type!==HandshakeType.END_OF_EARLY_DATA) return TypeError(`Expected ${HandshakeType.END_OF_EARLY_DATA.name}`)
      return new EndOfEarlyData
   }
   constructor(){
      super()
   }
   get handshake(){ return HandshakeType.handshake(this)}
}

// npx -p typescript tsc ./src/handshaketype.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ./dist