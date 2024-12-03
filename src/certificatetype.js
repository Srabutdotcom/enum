// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/certificatetype.d.ts"

import { Enum } from "./enum.js";
import { Constrained, Struct, Uint24, Uint8, Uint16, Extension } from "./dep.ts"
import { x509 } from "./dep.ts";

/**
 * Supported groups - @see https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.7.
 */
export class CertificateType  extends Enum {
   static X509 = new CertificateType('X509', 0);
   static RAWPUBLICKEY = new CertificateType('RAWPUBLICKEY', 2);
   /**
    * check octet and return valid CertificateType  
    *
    * @static
    * @param {Uint8Array} octet
    * @returns {CertificateType }
    */
   static from(octet) {
      return CertificateType.fromValue(octet[0]) ?? Error(`Unknown ${octet[0]} CertificateType type`);
   }

   /**return 8 */
   get bit() { return 8 }

}

export class CertificateEntry extends Uint8Array {
   static from(array){
      const copy = Uint8Array.from(array);
      let offset = 0
      const cert_data = Cert_data.from(copy.subarray(offset));offset+=cert_data.length;
      const extensions = Extensions.from(copy.subarray(offset));
      return new CertificateEntry(cert_data.opaque, ...extensions.extension)
   }
   constructor(opaque, ...extension){
      const cert_data = new Cert_data(opaque);
      const extensions = new Extensions(...extension);
      const struct = new Struct(cert_data, extensions);
      super(struct);
      this.opaque = opaque;
      this.extension = extension
      this.x509 = new x509.X509Certificate(btoa(String.fromCharCode(...opaque)))
   }
}

export class Certificate extends Uint8Array {
   static from(array){
      const copy = Uint8Array.from(array);
      let offset = 0;
      const certificate_request_context = Certificate_request_context.from(copy.subarray(offset)); offset+= certificate_request_context.length;
      const certificate_list = Certificate_list.from(copy.subarray(offset)); 
      return new Certificate(certificate_request_context.opaque, ...certificate_list.certificateEntry)
   }
   constructor(opaque, ...certificateEntry){
      const certificate_request_context = new Certificate_request_context(opaque);
      const certificate_list = new Certificate_list(...certificateEntry);
      const struct = new Struct(certificate_request_context, certificate_list);
      super(struct);
      this.opaque = opaque;
      this.certificateEntry = certificateEntry
   }
}

class Cert_data extends Constrained {
   static from(array){
      const copy = Uint8Array.from(array);
      const lengthOf = Uint24.from(copy).value;
      return new Cert_data(copy.subarray(3, lengthOf+3))
   }
   constructor(opaque){
      super(1, 2**24-1, opaque);
      this.opaque = opaque
   }
}

class Extensions extends Constrained {
   static from(array){
      const copy = Uint8Array.from(array);
      const _lengthOf = Uint16.from(copy).value;
      let offset = 2;
      const extensions = [];
      while(offset< copy.length){
         const extension = Extension.from(copy.subarray(offset));offset+=extension.length;
         extensions.push(extension);
      }
      return new Extensions(...extensions)
   }
   constructor(...extension){
      super(0, 2**16-1, ...extension);
      this.extension = extension
   }
}

class Certificate_request_context extends Constrained {
   static from(array){
      const copy = Uint8Array.from(array);
      const lengthOf = Uint8.from(copy).value;
      return new Certificate_request_context(copy.subarray(1, lengthOf + 1))
   }
   constructor(opaque){
      super(0, 2**8-1, opaque);
      this.opaque = opaque
   }
}

class Certificate_list extends Constrained {
   static from(array){
      const copy = Uint8Array.from(array);
      const _lengthOf = Uint24.from(copy).value;
      let offset = 3;
      const certificateEntries = []
      while(offset<copy.length){
         const certificateEntry = CertificateEntry.from(copy.subarray(offset)); offset+=certificateEntry.length;
         certificateEntries.push(certificateEntry)
      }
      return new Certificate_list(...certificateEntries)
   }
   constructor(...certificateEntry){
      super(0, 2**24-1, ...certificateEntry);
      this.certificateEntry = certificateEntry
   }
}



// npx -p typescript tsc ./src/certificatetype.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ./dist