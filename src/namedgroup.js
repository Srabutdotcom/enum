// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/namedgroup.d.ts"

import { p256, p384, p521, x25519, x448, Uint16, Constrained, Struct } from "./dep.ts";
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
   get length() { return 2;}

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
   get byte() { return this.Uint16 }

   /**
    * Gets the key generation algorithm associated with the NamedGroup.
    * 
    * @returns {Function} The key generation function.
    */
   get keyGen() {
      if (this.#keyGen) return this.#keyGen
      switch (this.name) {
         case "SECP256R1": this.#keyGen = p256; break;
         case "SECP384R1": this.#keyGen = p384; break;
         case "SECP521R1": this.#keyGen = p521; break;
         case "X448": this.#keyGen = x448; break;
         case "X25519":
         default: this.#keyGen = x25519; break;
      }
      return this.#keyGen
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

   set privateKey(key) { this.#privateKey = key }

   /**
    * Gets the public key associated with the NamedGroup.
    * 
    * @returns {Uint8Array} The public key.
    */
   get publicKey() {
      if (this.#publicKey) return this.#publicKey;
      this.#publicKey = this.keyGen?.getPublicKey(this.privateKey);
      return this.#publicKey;
   }

   set publicKey(key) { this.#publicKey = key }

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

/**
 * Represents a key exchange mechanism.
 */
export class KeyExchange extends Constrained {

   static fromKey(octet) { return new KeyExchange(octet); }

   static from(array) {
      const copy = Uint8Array.from(array);
      const lengthOf = Uint16.from(copy.subarray(0, 2)).value;
      const octet = copy.subarray(2, 2 + lengthOf);
      return new KeyExchange(octet);
   }

   constructor(octet) {
      super(1, 65535, octet);
      this.key_exchange = octet;
   }
}

/**
 * Represents a key share entry.
 */
export class KeyShareEntry extends Struct {

   static from(array) {
      const copy = Uint8Array.from(array);
      const group = NamedGroup.from(copy.subarray(0, 2));
      const key_exchange = KeyExchange.from(copy.subarray(2));
      return new KeyShareEntry(group, key_exchange);
   }

   constructor(group, key_exchange) {
      super(group.Uint16, key_exchange);
      this.group = group;
      this.key_exchange = key_exchange.key_exchange;
   }
}


// npx -p typescript tsc ./src/namedgroup.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ./dist