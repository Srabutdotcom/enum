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
 
   /* Reserved Code Points 
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

   /**
    * Converts the SignatureScheme to a Uint16 representation.
    * 
    * @returns {Uint16} The Uint16 representation of the SignatureScheme.
    */
   get Uint16() { return Uint16.fromValue(+this); }
}

// npx -p typescript tsc ./src/signaturescheme.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ./dist