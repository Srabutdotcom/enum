// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/version.d.ts"

import { Enum } from "./enum.js";
import { Uint16 } from "./dep.js";

/**
 * Version class representing different protocol versions.
 * Extends Enum to provide constants for SSL and TLS versions.
 * 
 * @extends Enum
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
    * @returns {Version} The matching Version instance, or throws an error if not found.
    * @throws {Error} If the version type in octet is unknown.
    */
   static parse(octet) {
      const value = octet[0] * 256 + octet[1];
      return Version.fromValue(value) ?? Error(`Unknown ${value} Version type`);
   }

   /**
    * Gets the bit size of the version (16 bits).
    * 
    * @returns {number} - The bit size of the version.
    */
   get bit() { return 16 }

   /**
    * Converts this Version instance to a ProtocolVersion.
    * 
    * @returns {ProtocolVersion} A ProtocolVersion instance representing this Version.
    */
   protocolVersion(){
      return ProtocolVersion.fromVersion(this)
   }
}

/**
 * Represents a Protocol Version as a 16-bit unsigned integer.
 * Extends Uint16 to handle 2-byte representations of protocol versions.
 */
export class ProtocolVersion extends Uint16 {
   /**
    * The `Version` instance associated with this `ProtocolVersion`.
    * @type {Version}
    */
   version
   /**
    * Creates a ProtocolVersion instance from a Version.
    * 
    * @param {Version|number} version - A `Version` instance or a version number (as a 16-bit integer).
    */
   constructor(version){
      const uint16 = ProtocolVersion.fromValue(+version);
      super(uint16);
      this.version = version
   }
   /**
    * Creates a new ProtocolVersion from a Version instance.
    * 
    * @static
    * @param {Version} version - The `Version` instance to convert to a ProtocolVersion.
    * @returns {ProtocolVersion} A new `ProtocolVersion` instance representing the specified version.
    */
   static fromVersion(version){
      return new ProtocolVersion(version)
   }
   /**
    * Parses a Uint8Array and creates a ProtocolVersion.
    * 
    * @static
    * @param {Uint8Array} array - A 2-byte array representing a protocol version.
    * @returns {ProtocolVersion} A new `ProtocolVersion` instance based on the parsed array.
    * @throws {Error} If the array does not represent a valid Version.
    */
   static from(array){
      const version = Version.parse(array);
      return ProtocolVersion.fromVersion(version);
   }
}

// npx -p typescript tsc ./src/version.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ./dist
