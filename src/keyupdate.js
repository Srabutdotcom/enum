// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/keyupdate.d.ts"

import { Enum } from "./enum.js";

/**
 * KeyUpdateRequest - @see https://datatracker.ietf.org/doc/html/rfc8446#section-4.6.3
 * Indicates whether the recipient of the KeyUpdate
      should respond with its own KeyUpdate.  If an implementation
      receives any other value, it MUST terminate the connection with an
      "illegal_parameter" alert.
 */
export class KeyUpdateRequest  extends Enum {
   static UPDATE_NOT_REQUESTED = new KeyUpdateRequest('UPDATE_NOT_REQUESTED', 0);
   static UPDATE_REQUESTED = new KeyUpdateRequest('UPDATE_REQUESTED', 1);
   /**
    * check octet and return valid KeyUpdateRequest  
    *
    * @static
    * @param {Uint8Array} octet
    * @returns {KeyUpdateRequest }
    */
   static from(octet) {
      return KeyUpdateRequest.fromValue(octet[0]) ?? Error(`Unknown ${octet[0]} KeyUpdateRequest type`);
   }

   /**return 8 */
   get bit() { return 8 }
   get length() { return 1 }

}

// npx -p typescript tsc ./src/keyupdate.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ./dist