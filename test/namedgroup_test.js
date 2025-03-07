import { assertEquals } from "jsr:@std/assert";
import { NamedGroup } from "../src/namedgroup.js";
import { p384 } from "@noble/curves/p384";
import elliptic from "elliptic"
import { safeuint8array } from "../src/dep.ts";

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

const secP384R1 = NamedGroup.SECP384R1;
const pub = secP384R1.publicKey;
const pri = secP384R1.privateKey;

const keyPair = await crypto.subtle.generateKey(
   { name: "ECDSA", namedCurve: "P-384" },
   true,
   ["sign", "verify"]
);

const publicKeyJwk = await crypto.subtle.exportKey("raw", keyPair.publicKey);


var EC = elliptic.ec;
var ec = new EC('p384');

// generate keys
var key1 = ec.genKeyPair();
var key2 = ec.genKeyPair();
var publicKey1 = key1.getPublic()
var publicKey1Buffer = safeuint8array(0x04, publicKey1.getX().toBuffer(), publicKey1.getY().toBuffer());
var publicKey2Buffer = publicKey1.encode('buffer');


var shared1 = key1.derive(key2.getPublic());

const priv = p384.utils.randomPrivateKey();
const publ = p384.getPublicKey(priv, false)


