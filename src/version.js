// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/version.d.ts"

import { Enum } from "./enum.js";
import { Uint16 } from "./dep.ts";

/**
 * Version class representing different protocol versions.
 * Extends Enum to provide constants for SSL and TLS versions.
 * 
 * @extends {Enum}
 */
export class Version extends Enum {

   /** 
    * SSL 3.0 version with value 0x0300 
    * @type {Version}
    */
   static SSL30 = new Version('SSL30', 0x0300);

   /** 
    * TLS 1.0 version with value 0x0301 
    * @type {Version}
    */
   static TLS10 = new Version('TLS10', 0x0301);

   /** 
    * TLS 1.1 version with value 0x0302 
    * @type {Version}
    */
   static TLS11 = new Version('TLS11', 0x0302);

   /** 
    * TLS 1.2 version with value 0x0303 
    * @type {Version}
    */
   static TLS12 = new Version('TLS12', 0x0303);

   /** 
    * TLS 1.3 version with value 0x0304 
    * @type {Version}
    */
   static TLS13 = new Version('TLS13', 0x0304);

   /** 
    * Legacy version representing TLS 1.2 with value 0x0303 
    * @type {Version}
    */
   static legacy = Version.TLS12;

   /**
    * Parses a 2-byte Uint8Array to determine the corresponding Version instance.
    *
    * @static
    * @param {Uint8Array} octet - The 2-byte array representing a version value.
    * @returns {Version} The matching Version instance.
    * @throws {Error} If the version type in octet is unknown.
    */
   static from(octet) {
      const value = octet[0] * 256 + octet[1];
      return Version.fromValue(value) ?? Error(`Unknown ${value} Version type`);
   }

   /**
    * Gets the bit size of the version (16 bits).
    * @returns {number} - The bit size of the version.
    */
   get bit() { return 16 }
   get length(){ return 2 }

   get Uint16() { return Uint16.fromValue(+this); }
   get byte(){ return this.Uint16 }

}



// npx -p typescript tsc ./src/version.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ./dist
