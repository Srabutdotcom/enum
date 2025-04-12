import { assertEquals } from "jsr:@std/assert";
import { NamedGroup } from "../src/namedgroup.js";
import { p384 } from "@noble/curves/p384";
import elliptic from "elliptic"
import { unity } from "../src/dep.ts";
import ECKey from "ec-key"

Deno.test(
   "NamedGroup",
   () => {
      const namedGroups = [23, 24, 25, 29, 30, 256, 257, 258, 259, 260]
      assertEquals(NamedGroup.values(), namedGroups);

      const x25519 = NamedGroup.X25519;
      assertEquals(x25519.name, 'X25519')
      const pub = x25519.keyGen.getPublicKey(x25519.privateKey);
      assertEquals(pub.length, 32)
      const peerPublicKey = crypto.getRandomValues(new Uint8Array(32));
      assertEquals(peerPublicKey.length, 32)
      const sharedKey = x25519.getSharedKey(peerPublicKey)
      assertEquals(sharedKey.length, 32)

   }
)

const x25519 = NamedGroup.X25519;


var EC = elliptic.ec;
var ec = new EC('p384');

// generate keys
var key1 = ec.genKeyPair();
var key2 = ec.genKeyPair();
var publicKey1 = key1.getPublic()
var publicKey1Buffer = unity(0x04, publicKey1.getX().toBuffer(), publicKey1.getY().toBuffer());
var publicKey2Buffer = publicKey1.encode('buffer');

var privateKey1 = key1.getPrivate().toBuffer();
var publicKey2 = key2.getPublic()

//const key = ECKey;

const _null = null;

async function generateKey() {
   return await crypto.subtle.generateKey(
      { name: "ECDH", namedCurve: "P-384" },
      true,
      ["deriveKey", "deriveBits"]
   );
}
async function x25519Key() {
   return await crypto.subtle.generateKey(
      "X25519",
      true,
      ["deriveKey", "deriveBits"]
   )
}
;

async function importEcPrivateKey(ecPrivKey) {
   return await crypto.subtle.importKey(
      "pkcs8",      // Key format (PKCS#8 for private keys)
      ecPrivKey,    // Key data (ArrayBuffer)
      {
         name: "ECDH",  // Algorithm name (Elliptic Curve Diffie-Hellman)
         namedCurve: "P-384" // SECP384R1 curve
      },
      true,         // Key is extractable (can be exported)
      ["deriveKey", "deriveBits"] // Usages
   );
}

async function importECPublicKey(keyBuffer) {
   // 2️⃣ Import Key
   return await crypto.subtle.importKey(
       "raw",       // Public key format (SPKI)
       keyBuffer,    // Key data (ArrayBuffer)
       { 
           name: "ECDH",  // Algorithm (Elliptic Curve Diffie-Hellman)
           namedCurve: "P-384" // SECP384R1 curve
       },
       true,         // Key is extractable (can be exported)
       []            // No key usages (public key is used for verification/derivation)
   );
}

async function deriveECKey(privateKey, publicKey) {
   return await crypto.subtle.deriveBits(
      { name: "ECDH", public: publicKey },
      privateKey,
      384 // Output key length (384 bits for P-384)
  )
}

