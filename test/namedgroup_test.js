import { assertEquals } from "jsr:@std/assert";
import { NamedGroup } from "../src/namedgroup.js";
import { p384 } from "@noble/curves/p384";
import elliptic from "elliptic"
import { safeuint8array } from "../src/dep.ts";
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

const x25519_keyPair = await x25519.keyPair();
const x25519_publicKeyByte = await x25519.exportPublicKey();
const x25519_keyShareEntryAsync = await x25519.keyShareEntryAsync();
const x25519_shared = x25519.getSharedKey(x25519_publicKeyByte);
const x25519_keyShareEntry = x25519.keyShareEntry();

const secP384R1 = NamedGroup.SECP384R1;
const p384_keys = await secP384R1.keyPair();
const p384_pub = await secP384R1.exportPublicKey();
const secP384R1_shared = secP384R1.getSharedKey(p384_pub);
const secP384R1_keyShareEntry = secP384R1.keyShareEntry();
const pri = secP384R1.privateKey;

const p256 = NamedGroup.SECP256R1;

const p256_keyPair = await p256.keyPair();
const p256_publicKeyByte = await p256.exportPublicKey();
const p256_keyShareEntryAsync = await p256.keyShareEntryAsync();
const p256_shared = p256.getSharedKey(p256_publicKeyByte);
const p256_keyShareEntry = p256.keyShareEntry();



debugger;

var EC = elliptic.ec;
var ec = new EC('p384');

// generate keys
var key1 = ec.genKeyPair();
var key2 = ec.genKeyPair();
var publicKey1 = key1.getPublic()
var publicKey1Buffer = safeuint8array(0x04, publicKey1.getX().toBuffer(), publicKey1.getY().toBuffer());
var publicKey2Buffer = publicKey1.encode('buffer');

var privateKey1 = key1.getPrivate().toBuffer();
var publicKey2 = key2.getPublic()


const priv = p384.utils.randomPrivateKey();
const publ = p384.getPublicKey(priv, false);
const shar = p384.getSharedSecret(priv, p384_pub);
const shar_p384 = await secP384R1.sharedKey(await importECPublicKey(publ));
debugger;

//const key = ECKey;

const _null = null;
debugger;

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

