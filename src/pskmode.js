// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/pskmode.d.ts"

import { Constrained, Uint8 } from "./dep.ts";
import { Enum } from "./enum.js";
import { parseItems } from "./utils.js";

/**
 * PskKeyExchangeMode - @see https://datatracker.ietf.org/doc/html/rfc8446#section-4.4.2
 */
export class PskKeyExchangeMode  extends Enum {
   
   
   /**
    * PSK-only key establishment
    * In this mode, the server
      MUST NOT supply a "key_share" value.
    */
   static PSK_KE = new PskKeyExchangeMode('PSK_KE', 0);

   
   /**
    * PSK with (EC)DHE key establishment
    * In this mode, the
      client and server MUST supply "key_share" values as described in
      Section 4.2.8.
    */
   static PSK_DHE_KE = new PskKeyExchangeMode('PSK_DHE_KE', 1);

   static from(octet) {
      return PskKeyExchangeMode.fromValue(octet[0]) ?? Error(`Unknown ${octet[0]} PskKeyExchangeMode type`);
   }

   /**return 8 */
   get bit() { return 8 }
   get length() { return 1 }

   get Uint8() { return Uint8Array.of(+this)}

}

export class PskKeyExchangeModes extends Constrained {
   static from(array){
      const copy = Uint8Array.from(array);
      const lengthOf = Uint8.from(copy).value;
      const ke_modes = parseItems(copy, 1, lengthOf, PskKeyExchangeMode);
      return new PskKeyExchangeModes(...ke_modes)
   }
   constructor(...ke_modes) {
      super(1, 255, ...ke_modes.map(e => e.Uint8))
      this.ke_modes = ke_modes;
   }
}

/* const test = new PskKeyExchangeModes(PskKeyExchangeMode.PSK_KE);
const back = PskKeyExchangeModes.from(test);  */


// npx -p typescript tsc ./src/pskmode.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ./dist