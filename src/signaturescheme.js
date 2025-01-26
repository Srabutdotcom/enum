// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/signaturescheme.d.ts"

import { Constrained, Struct, Uint16 } from "./dep.ts";
import { Enum } from "./enum.js";
import { sha256, sha384, sha512 } from "@noble/hashes/sha2"
import { HandshakeType } from "./handshaketype.js";

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

   /**
    * Converts the SignatureScheme to a Uint16 representation.
    * 
    * @returns {Uint16} The Uint16 representation of the SignatureScheme.
    */
   get Uint16() { return Uint16.fromValue(+this); }

   get algo() {
      switch (this) {
         case 'ECDSA_SECP256R1_SHA256': return {
            name: "ECDSA",
            hash: "SHA-256"
         }
         case 'ECDSA_SECP384R1_SHA384': return {
            name: "ECDSA",
            hash: "SHA-384"
         }
         case 'ECDSA_SECP521R1_SHA512': return {
            name: "ECDSA",
            hash: "SHA-512"
         }
         case 'ED25519': return { name: 'Ed25519' }
         case 'RSA_PSS_PSS_SHA384': return {
            name: "RSA-PSS",// RSAprivateKey.algorithm.name,
            saltLength: 384 / 8
         }
         case 'RSA_PSS_PSS_SHA512': return {
            name: "RSA-PSS",// RSAprivateKey.algorithm.name,
            saltLength: 512 / 8
         }
         case 'RSA_PSS_PSS_SHA256':
         default: return {
            name: "RSA-PSS",// RSAprivateKey.algorithm.name,
            saltLength: 256 / 8
         }
      }
      return {
         name: "RSA-PSS",// RSAprivateKey.algorithm.name,
         saltLength: 256 / 8
      }
   }

   async certificateVerify(clientHelloMsg, serverHelloMsg, encryptedExtensionsMsg, certificateMsg, RSAprivateKey) {
      const signature = await signatureFrom(clientHelloMsg, serverHelloMsg, encryptedExtensionsMsg, certificateMsg, RSAprivateKey, this.algo)
      return new CertificateVerify(this, signature)
   }
}

export class SignatureSchemeList extends Constrained {
   static from(array){
      const copy = Uint8Array.from(array);
      const lengthOf = Uint16.from(copy).value;
      const algorithms = new Set;
      let offset = 2;
      while(true){
         const algorithm = SignatureScheme.from(copy.subarray(offset));offset+=2;
         algorithms.add(algorithm);
         if(offset>=lengthOf+2)break; 
      }
      return new SignatureSchemeList(...algorithms)
   }
   constructor(...supported_signature_algorithms) {
      super(2, 2 ** 16 - 2, ...supported_signature_algorithms.map(e => e.Uint16))
      this.supported_signature_algorithms = supported_signature_algorithms;
   }
}

export class CertificateVerify extends Uint8Array {
   static fromMsg(array) {
      const copy = Uint8Array.from(array)
      const algorithm = SignatureScheme.from(copy.subarray(4));
      const signature = Signature.from(copy.subarray(6))
      return new CertificateVerify(algorithm, signature.opaque)
   }
   constructor(signatureScheme, signature) {
      const signatureConstrained = new Signature(signature);
      const struct = new Struct(
         signatureScheme.Uint16,
         signatureConstrained
      )
      super(struct);
      this.algorithm = signatureScheme;
      this.signature = signature
      return HandshakeType.CERTIFICATE_VERIFY.handshake(this);
   }
}

export class Signature extends Constrained {
   static from(array) {
      const copy = Uint8Array.from(array);
      const lengthOf = Uint16.from(copy).value;
      return new Signature(copy.subarray(2, 2 + lengthOf))
   }
   constructor(opaque) {
      super(0, 2 ** 16 - 1, opaque)
      this.opaque = opaque
   }
}

async function signatureFrom(clientHelloMsg, serverHelloMsg, encryptedExtensionsMsg, certificateMsg, RSAprivateKey, algo) {
   const leading = Uint8Array.of(
      //NOTE 64 space characters 
      32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32,
      //NOTE 'TLS 1.3, server CertificateVerify'
      84, 76, 83, 32, 49, 46, 51, 44, 32, 115, 101, 114, 118, 101, 114, 32, 67, 101, 114, 116, 105, 102, 105, 99, 97, 116, 101, 86, 101, 114, 105, 102, 121,
      //NOTE single null char
      0
   )

   const hash = hashFromAlgo(algo)

   const transcriptHash = hash
      .update(clientHelloMsg)
      .update(serverHelloMsg)
      .update(encryptedExtensionsMsg)
      .update(certificateMsg)
      .digest();

   const data = Struct.createFrom(
      leading,
      transcriptHash
   )

   const signBuffer = await crypto.subtle.sign(
      algo,
      RSAprivateKey,
      data
   )

   /* const verify = await crypto.subtle.verify(
         {
            name: "RSA-PSS",//'RSASSA-PKCS1-v1_5',
            saltLength: 256 / 8
         },
         RSAPublicKey, //rsapublickey in Certificate
         sign,
         data
   ) */
   return new Uint8Array(signBuffer)
}

function hashFromAlgo(algo) {
   let sha
   const { hash, saltLength } = algo;
   if (hash) { sha = parseInt(hash.split("-")[1]); }
   else if (saltLength) { sha = saltLength * 8 }
   else { sha = 256 };
   switch (sha) {
      case 384: return sha384.create();
      case 512: return sha512.create();
      case 256:
      default:
         return sha256.create();
   }
}

export async function finished(finishedKey, sha = 256, ...messages) {
   //const finishedKey = hkdfExpandLabel(serverHS_secret, 'finished', new Uint8Array, 32);
   const finishedKeyCrypto = await crypto.subtle.importKey(
      "raw",
      finishedKey,
      {
         name: "HMAC",
         hash: { name: `SHA-${sha}` },
      },
      true,
      ["sign", "verify"]
   );

   const hash = sha == 256 ? sha256.create() :
      sha == 384 ? sha384.create() : sha256.create();

   const messagesStruct = Struct.createFrom(...messages);

   const transcriptHash = hash
      .update(Uint8Array.from(messagesStruct))
      .digest();

   const verify_data = await crypto.subtle.sign(
      { name: "HMAC" },
      finishedKeyCrypto,
      transcriptHash
   )

   /* const _test_verify_data = await crypto.subtle.verify(
      { name: "HMAC" },
      finishedKeyCrypto,
      verify_data,
      transcriptHash
   ) */
   //verify_data.transcriptHash = transcriptHash;
   return new Finished(verify_data);
}

export class Finished extends Uint8Array {
   static fromMsg(message) {
      const copy = Uint8Array.from(message)
      return new Finished(copy.subarray(4))
   }
   constructor(verify_data) {
      super(verify_data);
      this.verify_data = verify_data
      return HandshakeType.FINISHED.handshake(this)
   }
}

// npx -p typescript tsc ./src/signaturescheme.js --declaration --allowJs --emitDeclarationOnly --lib ESNext --outDir ./dist