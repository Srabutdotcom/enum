// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/contentype.d.ts"

import { Uint8, Uint16, Struct } from "./dep.ts";
import { Enum } from "./enum.js";
import { Version } from "./version.js";

/**
 * The higher-level protocol used to process the enclosed
      fragment
 * @see https://datatracker.ietf.org/doc/html/rfc8446#section-5.1
 * @export
 * @extends {Enum}
 */
export class ContentType extends Enum {
   static INVALID = new ContentType('INVALID', 0);
   static CHANGE_CIPHER_SPEC = new ContentType('CHANGE_CIPHER_SPEC', 20);
   static ALERT = new ContentType('ALERT', 21);
   static HANDSHAKE = new ContentType('HANDSHAKE', 22);
   static APPLICATION_DATA = new ContentType('APPLICATION_DATA', 23);
   /**
    * check octet and return valid ContentType  
    *
    * @static
    * @param {Uint8Array} octet
    * @returns {ContentType }
    */
   static from(octet) {
      return ContentType.fromValue(octet[0]) ?? Error(`Unknown ${octet[0]} ContentType type`);
   }

   get Uint8() {
      return Uint8.fromValue(+this)
   }

   /**return 8 */
   get bit() { return 8 }

   tlsPlainText(fragment) {
      return TLSPlaintext.createFrom(
         this,
         Version.TLS13,
         fragment
      )
   }

   tlsInnerPlaintext(content, numZeros){
      return new TLSInnerPlaintext(content, this, numZeros)
   }

   tlsCiphertext(encrypted_record){
      return new TLSCiphertext(encrypted_record)
   }
}

export class TLSPlaintext extends Uint8Array {
   static from(array) {
      let offset = 0;
      const copy = Uint8Array.from(array);
      const type = ContentType.from(copy); offset += 1;
      const version = Version.from(copy.subarray(offset)); offset += 2;
      const lengthOf = Uint16.from(copy.subarray(offset)).value; offset += 2;
      const fragment = copy.subarray(offset, offset + lengthOf)
      return new TLSPlaintext(type, version, fragment)
   }
   static createFrom(type, version, fragment) { return new TLSPlaintext(type, version, fragment) }
   constructor(type, version, fragment) {
      const struct = new Struct(
         type.Uint8,
         version.protocolVersion(),
         Uint16.fromValue(fragment.length),
         fragment
      )
      super(struct)

      this.type = type;
      this.version = version;
      this.fragment = fragment
      this.items = struct.items
   }
}

export class TLSInnerPlaintext extends Uint8Array {
   static from(array){
      const copy = Uint8Array.from(array);
      const lastNonZeroIndex = copy.reduceRight((li,v,i)=>(li===-1 && v!==0? i:li),-1);
      const content = copy.slice(0, lastNonZeroIndex);
      const type = ContentType.fromValue(copy[lastNonZeroIndex]);
      const numZeros = copy.length - 1 - lastNonZeroIndex;
      return new TLSInnerPlaintext(content, type, numZeros)
   }
   constructor(content, type, numZeros) {
      const struct = new Uint8Array(content.length + 1 + numZeros);
      struct.set(content, 0);
      struct[content.length] = +type;
      super(struct)
   }
}

export class TLSCiphertext extends Uint8Array {
   static from(array){
      const copy = Uint8Array.from(array);
      // NOTE should check contentType
      // NOTE legacy version can be bypassed
      const lengthOf = Uint16.from(copy.subarray(3));
      const encrypted_record = copy.subarray(5, lengthOf+5);
      return new TLSCiphertext(encrypted_record)
   }
   constructor(encrypted_record){
      const struct = new Uint8Array(encrypted_record.length+5);
      const lengthOf = Uint16.fromValue(encrypted_record.length);
      struct[0] = 23; // always application data
      struct[1] = 3; // major legacy version;
      struct[2] = 3; // minor legacy verions = TLS v1.2
      struct.set(lengthOf,3);
      struct.set(encrypted_record, 5);
      super(struct)    
      this.header = struct.subarray(0,5);
      this.encrypted_record = encrypted_record
   }
}

//npx -p typescript tsc ./src/contentype.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ./dist