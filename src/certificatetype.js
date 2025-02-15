// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/certificatetype.d.ts"

import { Enum } from "./enum.js";

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
   get length() { return 1 }
   get byte(){ return Uint8Array.of(+this)}

}



// npx -p typescript tsc ./src/certificatetype.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ./dist