// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/contentype.d.ts"

import { Uint8 } from "./dep.ts";
import { Enum } from "./enum.js";


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

   get Uint8(){
      return Uint8.fromValue(+this)
   }

   /**return 8 */
   get bit() { return 8 }
}

//npx -p typescript tsc ./src/contentype.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ./dist