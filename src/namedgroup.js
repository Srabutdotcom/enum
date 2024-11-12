// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/namedgroup.d.ts"

import { Constrained, p256, p384, p521, Struct, Uint16, Byte, x25519, x448 } from "./dep.js";
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
   static parse(octet) {
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
      switch (this.name) {
         case "SECP256R1": {
            this.#keyGen = p256; break;
         }
         case "SECP384R1": {
            this.#keyGen = p384; break;
         }
         case "SECP521R1": {
            this.#keyGen = p521; break;
         }
         case "X25519": {
            this.#keyGen = x25519; break;
         }
         case "X448": {
            this.#keyGen = x448; break;
         }
      }
      this.#privateKey = this.#keyGen?.utils.randomPrivateKey();
      this.#publicKey = this.#keyGen?.getPublicKey(this.#privateKey);
   }

   /**
    * Converts the NamedGroup to a Uint16 representation.
    * 
    * @returns {Uint16} The Uint16 representation of the NamedGroup.
    */
   toUint16() { return Uint16.fromValue(+this); }

   /**
    * Gets the key generation algorithm associated with the NamedGroup.
    * 
    * @returns {Function} The key generation function.
    */
   get keyGen() { return this.#keyGen; }

   /**
    * Gets the private key associated with the NamedGroup.
    * 
    * @returns {Uint8Array} The private key.
    */
   get privateKey() { return this.#privateKey; }

   /**
    * Gets the public key associated with the NamedGroup.
    * 
    * @returns {Uint8Array} The public key.
    */
   get publicKey() { return this.#publicKey; }

   /**
    * Computes the shared key with a peer's public key.
    * 
    * @param {Uint8Array} peerPublicKey - The public key of the peer.
    * @returns {Uint8Array} The shared secret.
    */
   getSharedKey(peerPublicKey) {
      return this.#keyGen?.getSharedSecret(this.#privateKey, peerPublicKey);
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
 * Represents a list of NamedGroup instances.
 */
export class NamedGroupList extends Constrained {
   /**
    * Creates a NamedGroupList instance from the provided NamedGroup instances.
    * 
    * @param {...NamedGroup} namedgroup - The NamedGroup instances to include in the list.
    * @returns {NamedGroupList} A new instance of NamedGroupList.
    */
   static fromNamedGroup(...namedgroup) {
      return new NamedGroupList(...namedgroup);
   }

   /**
    * Creates a NamedGroupList from a Uint8Array.
    * 
    * @static
    * @param {Uint8Array} array - The array to parse into a NamedGroupList.
    * @returns {NamedGroupList} A new instance of NamedGroupList.
    * @throws {Error} If the length of the array is invalid.
    */
   static from(array) {
      const copy = Uint8Array.from(array);
      const lengthOf = Byte.from(copy.subarray(0, 2)).value;
      const namedGroups = [];
      let offset = 2;
      while (true) {
         const namedgroup = NamedGroup.parse(copy.subarray(offset));
         namedGroups.push(namedgroup);
         offset += 2;
         if (offset >= lengthOf + 2) break;
      }
      return NamedGroupList.fromNamedGroup(...namedGroups);
   }

   /**
    * Creates an instance of NamedGroupList.
    * 
    * @param {...NamedGroup} namedgroup - The NamedGroup instances to include in the list.
    */
   constructor(...namedgroup) {
      const namedgroupUint16 = namedgroup.map(e => e.toUint16());
      super(2, 65535, ...namedgroupUint16);
      this.namedGroups = namedgroup;
   }
}

/**
 * Represents a key exchange mechanism.
 */
export class KeyExchange extends Constrained {
   /**
    * Creates a KeyExchange instance from a given octet.
    * 
    * @static
    * @param {Uint8Array} octet - The octet to create the KeyExchange from.
    * @returns {KeyExchange} A new instance of KeyExchange.
    */
   static fromKey(octet) { return new KeyExchange(octet); }

   /**
    * Creates a KeyExchange from a Uint8Array.
    * 
    * @static
    * @param {Uint8Array} array - The array to parse into a KeyExchange.
    * @returns {KeyExchange} A new instance of KeyExchange.
    * @throws {Error} If the length of the array is invalid.
    */
   static from(array) {
      const copy = Uint8Array.from(array);
      const lengthOf = Byte.from(copy.subarray(0, 2)).value;
      const octet = copy.subarray(2, 2 + lengthOf);
      return new KeyExchange(octet);
   }

   /**
    * Creates an instance of KeyExchange.
    * 
    * @param {Uint8Array} octet - The octet representing the key exchange.
    */
   constructor(octet) {
      super(1, 65535, octet);
      this.key_exchange = octet;
   }
}

/**
 * Represents a key share entry.
 */
export class KeyShareEntry extends Struct {
   /**
    * Creates a KeyShareEntry from a Uint8Array.
    * 
    * @static
    * @param {Uint8Array} array - The array to parse into a KeyShareEntry.
    * @returns {KeyShareEntry} A new instance of KeyShareEntry.
    */
   static from(array) {
      const copy = Uint8Array.from(array);
      const group = NamedGroup.parse(copy.subarray(0, 2));
      const key_exchange = KeyExchange.from(copy.subarray(2));
      return new KeyShareEntry(group, key_exchange);
   }

   /**
    * Creates an instance of KeyShareEntry.
    * 
    * @param {NamedGroup} group - The NamedGroup associated with the key share.
    * @param {KeyExchange} key_exchange - The KeyExchange associated with the key share.
    */
   constructor(group, key_exchange) {
      super(group.toUint16(), key_exchange);
      this.group = group;
      this.key_exchange = key_exchange.key_exchange;
   }
}

// npx -p typescript tsc ./src/namedgroup.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ./dist