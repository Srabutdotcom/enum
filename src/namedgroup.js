// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/namedgroup.d.ts"

import { p256, p384, p521, x25519, x448, Uint16, KeyExchange, KeyShareEntry } from "./dep.ts";
import { Enum } from "./enum.js";

/**
 * Supported groups - @see https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.7.
 */
export class NamedGroup extends Enum {
   #keyGen;
   #privateKey;
   #publicKey;

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
    * Parses an octet array and returns a valid NamedGroup.
    * 
    * @static
    * @param {Uint8Array} octet - The octet array to parse.
    * @returns {NamedGroup} The corresponding NamedGroup instance.
    * @throws {Error} If the octet does not correspond to a known NamedGroup.
    */
   static from(octet) {
      const value = octet[0] * 256 + octet[1];
      return NamedGroup.fromValue(value) ?? Error(`Unknown ${value} NamedGroup type`);
   }

   /** 
    * Returns the bit length of the NamedGroup.
    * @returns {number} The bit length, which is always 16.
    */
   get bit() { return 16; }

   /**
    * Creates an instance of NamedGroup.
    * 
    * @param {string} name - The name of the NamedGroup.
    * @param {number} value - The value associated with the NamedGroup.
    */
   constructor(name, value) {
      super(name, value);

   }

   /**
    * Converts the NamedGroup to a Uint16 representation.
    * 
    * @returns {Uint16} The Uint16 representation of the NamedGroup.
    */
   get Uint16() { return Uint16.fromValue(+this); }

   /**
    * Gets the key generation algorithm associated with the NamedGroup.
    * 
    * @returns {Function} The key generation function.
    */
   get keyGen() {
      switch (this.name) {
         case "SECP256R1": return p256;
         case "SECP384R1": return p384;
         case "SECP521R1": return p521;
         case "X25519": return x25519;
         case "X448": return x448;
         default: return x25519;
      }
   }

   /**
    * Gets the private key associated with the NamedGroup.
    * 
    * @returns {Uint8Array} The private key.
    */
   get privateKey() {
      if (this.#privateKey) return this.#privateKey;
      this.#privateKey = this.keyGen?.utils.randomPrivateKey();
      return this.#privateKey
   }

   /**
    * Gets the public key associated with the NamedGroup.
    * 
    * @returns {Uint8Array} The public key.
    */
   get publicKey() { 
      if(this.#publicKey)return this.#publicKey;
      this.#publicKey = this.keyGen?.getPublicKey(this.privateKey);
      return this.#publicKey;
    }

   /**
    * Computes the shared key with a peer's public key.
    * 
    * @param {Uint8Array} peerPublicKey - The public key of the peer.
    * @returns {Uint8Array} The shared secret.
    */
   getSharedKey(peerPublicKey) {
      return this.keyGen?.getSharedSecret(this.#privateKey, peerPublicKey);
   }

   /**
    * Creates a key share entry from the NamedGroup.
    * 
    * @returns {KeyShareEntry} A new KeyShareEntry instance.
    */
   keyShareEntry() {
      const key_exchange = KeyExchange.fromKey(this.publicKey);
      return new KeyShareEntry(this, key_exchange);
   }
}







// npx -p typescript tsc ./src/namedgroup.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ./dist