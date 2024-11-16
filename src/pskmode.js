// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/pskmode.d.ts"

import { Enum } from "./enum.js";

/**
 * PskKeyExchangeMode - @see https://datatracker.ietf.org/doc/html/rfc8446#section-4.4.2
 */
export class PskKeyExchangeMode  extends Enum {
   /**psk_ke:  PSK-only key establishment.  In this mode, the server
      MUST NOT supply a "key_share" value. */
   static PSK_KE = new PskKeyExchangeMode('PSK_KE', 0);
   /**psk_dhe_ke:  PSK with (EC)DHE key establishment.  In this mode, the
      client and server MUST supply "key_share" values as described in
      Section 4.2.8. */
   static PSK_DHE_KE = new PskKeyExchangeMode('PSK_DHE_KE', 1);
   /**
    * check octet and return valid PskKeyExchangeMode  
    *
    * @static
    * @param {Uint8Array} octet
    * @returns {PskKeyExchangeMode }
    */
   static from(octet) {
      return PskKeyExchangeMode.fromValue(octet[0]) ?? Error(`Unknown ${octet[0]} PskKeyExchangeMode type`);
   }

   /**return 8 */
   get bit() { return 8 }

}

// npx -p typescript tsc ./src/pskmode.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ./dist