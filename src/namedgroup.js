// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/namedgroup.d.ts"

import { Enum } from "./enum.js";

/**
 * Supported groups - @see https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.7.
 */
export class NamedGroup extends Enum {
   /* Elliptic Curve Groups (ECDHE) */
   static SECP256R1 = new NamedGroup('SECP256R1', 0x0017);
   static SECP384R1 = new NamedGroup('SECP384R1', 0x0018);
   static SECP521R1 = new NamedGroup('SECP521R1', 0x0019);
   static X25519 = new NamedGroup('X25519', 0x001D);
   static X448 = new NamedGroup('X448', 0x001E);

   /* Finite Field Groups (DHE) */
   static FFDHE2048 = new NamedGroup('FFDHE2048', 0x0100);
   static FFDHE3072 = new NamedGroup('FFDHE3072', 0x0101);
   static FFDHE4096 = new NamedGroup('FFDHE4096', 0x0102);
   static FFDHE6144 = new NamedGroup('FFDHE6144', 0x0103);
   static FFDHE8192 = new NamedGroup('FFDHE8192', 0x0104);
   /**
    * check octet and return valid NamedGroup 
    *
    * @static
    * @param {Uint8Array} octet
    * @returns {NamedGroup}
    */
   static parse(octet) {
      const value = octet[0] * 256 + octet[1]
      return NamedGroup.fromValue(value) ?? Error(`Unknown ${value} NamedGroup type`);
   }

   /**return 16 */
   get bit() { return 16 }

}

// npx -p typescript tsc ./src/namedgroup.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ./dist