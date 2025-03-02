// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/signaturescheme.d.ts"

import { Uint16 } from "./dep.ts";
import { Enum } from "./enum.js";

/**
 * Enumeration of signature schemes as defined in RFC 8446.
 * @see https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.3
 */
export class SignatureScheme extends Enum {
   /* RSASSA-PKCS1-v1_5 algorithms */
   static RSA_PKCS1_SHA256 = new SignatureScheme('RSA_PKCS1_SHA256', 0x0401);
   static RSA_PKCS1_SHA384 = new SignatureScheme('RSA_PKCS1_SHA384', 0x0501);
   static RSA_PKCS1_SHA512 = new SignatureScheme('RSA_PKCS1_SHA512', 0x0601);

   /* ECDSA algorithms */
   static ECDSA_SECP256R1_SHA256 = new SignatureScheme('ECDSA_SECP256R1_SHA256', 0x0403);
   static ECDSA_SECP384R1_SHA384 = new SignatureScheme('ECDSA_SECP384R1_SHA384', 0x0503);
   static ECDSA_SECP521R1_SHA512 = new SignatureScheme('ECDSA_SECP521R1_SHA512', 0x0603);

   /* RSASSA-PSS algorithms with public key OID rsaEncryption */
   static RSA_PSS_RSAE_SHA256 = new SignatureScheme('RSA_PSS_RSAE_SHA256', 0x0804);
   static RSA_PSS_RSAE_SHA384 = new SignatureScheme('RSA_PSS_RSAE_SHA384', 0x0805);
   static RSA_PSS_RSAE_SHA512 = new SignatureScheme('RSA_PSS_RSAE_SHA512', 0x0806);

   /* EdDSA algorithms */
   static ED25519 = new SignatureScheme('ED25519', 0x0807);
   static ED448 = new SignatureScheme('ED448', 0x0808);

   /* RSASSA-PSS algorithms with public key OID RSASSA-PSS */
   static RSA_PSS_PSS_SHA256 = new SignatureScheme('RSA_PSS_PSS_SHA256', 0x0809);
   static RSA_PSS_PSS_SHA384 = new SignatureScheme('RSA_PSS_PSS_SHA384', 0x080a);
   static RSA_PSS_PSS_SHA512 = new SignatureScheme('RSA_PSS_PSS_SHA512', 0x080b);

   /* Legacy algorithms */
   static RSA_PKCS1_SHA1 = new SignatureScheme('RSA_PKCS1_SHA1', 0x0201);
   static ECDSA_SHA1 = new SignatureScheme('ECDSA_SHA1', 0x0203);

   /* Reserved Code Points */
   static dsa_sha1_RESERVED = new SignatureScheme('dsa_sha1_RESERVED', 0x0202);
   static dsa_sha256_RESERVED = new SignatureScheme('dsa_sha256_RESERVED', 0x0402);
   static dsa_sha384_RESERVED = new SignatureScheme('dsa_sha384_RESERVED', 0x0502);
   static dsa_sha512_RESERVED = new SignatureScheme('dsa_sha512_RESERVED', 0x0602)
   /*
   static PRIVATE_USE_START = new SignatureScheme('PRIVATE_USE_START', 0xFE00);
   static PRIVATE_USE_END = new SignatureScheme('PRIVATE_USE_END', 0xFFFF);
   static PRIVATE_USE = new SignatureScheme('PRIVATE_USE', 0xFFFF);
   */

   /**
    * Parses an octet array and returns a valid SignatureScheme.
    * 
    * @static
    * @param {Uint8Array} octet - The octet array to parse.
    * @returns {SignatureScheme} The corresponding SignatureScheme instance.
    * @throws {Error} If the octet does not correspond to a known SignatureScheme.
    */
   static from(octet) {
      const value = octet[0] * 256 + octet[1];
      return SignatureScheme.fromValue(value) ?? Error(`Unknown ${value} SignatureScheme type`);
   }

   /** 
    * Returns the bit length of the SignatureScheme.
    * @returns {number} The bit length, which is always 16.
    */
   get bit() { return 16; }
   get length() { return 2; }

   /**
    * Converts the SignatureScheme to a Uint16 representation.
    * 
    * @returns {Uint16} The Uint16 representation of the SignatureScheme.
    */
   get Uint16() { return Uint16.fromValue(+this); }
   get byte() { return this.Uint16 }

   get algo() {
      switch (this) {
         case SignatureScheme.ECDSA_SECP256R1_SHA256: return {
            import: EcKeyImportParams(256),
            sign: EcdsaParams(256),
            verify: EcdsaParams(256)
         }
         case SignatureScheme.ECDSA_SECP384R1_SHA384: return {
            import: EcKeyImportParams(384),
            sign: EcdsaParams(384),
            verify: EcdsaParams(384)
         }
         case SignatureScheme.ECDSA_SECP521R1_SHA512: return {
            import: EcKeyImportParams(521),
            sign: EcdsaParams(512),
            verify: EcdsaParams(512)
         }
         case SignatureScheme.ED25519: return {
            import: { name: 'Ed25519' },
            sign: { name: 'Ed25519' },
            verify: { name: 'Ed25519' }
         }
         case SignatureScheme.ED448: return {
            import: { name: 'Ed448' },
            sign: { name: 'Ed448' },
            verify: { name: 'Ed448' }
         }
         case SignatureScheme.RSA_PSS_RSAE_SHA384:
         case SignatureScheme.RSA_PSS_PSS_SHA384: return {
            import: RsaHashedImportParams(384),
            sign: RsaPssParams(384),
            verify: RsaPssParams(384),
         }
         case SignatureScheme.RSA_PSS_RSAE_SHA512:
         case SignatureScheme.RSA_PSS_PSS_SHA512: return {
            import: RsaHashedImportParams(512),
            sign: RsaPssParams(512),
            verify: RsaPssParams(512),
         }
         case SignatureScheme.RSA_PSS_RSAE_SHA256:
         case SignatureScheme.RSA_PSS_PSS_SHA256:
         default: return {
            import: RsaHashedImportParams(256),
            sign: RsaPssParams(256),
            verify: RsaPssParams(256),
         }
      }
      return {
         name: "RSA-PSS",// RSAprivateKey.algorithm.name,
         saltLength: 256 / 8
      }
   }

}

const EcdsaParams = (num) => ({
   name: "ECDSA",
   hash: `SHA-${num}`
})

const RsaPssParams = (num) => ({
   name: "RSA-PSS",
   saltLength: num / 8
})

const EcKeyImportParams = (num) => ({
   name: "ECDSA",
   namedCurve: `P-${num}`
})

const RsaHashedImportParams = (num) => ({
   name: "RSA-PSS",
   hash: `SHA-${num}`
})


// npx -p typescript tsc ./src/signaturescheme.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ./dist