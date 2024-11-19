import { assertEquals } from "jsr:@std/assert";
import { NamedGroup } from "../src/namedgroup.js";

Deno.test(
   "NamedGroup",
   () => {
      const namedGroups = [23, 24, 25, 29, 30, 256, 257, 258, 259, 260]
      assertEquals(NamedGroup.values().map(e => e.value), namedGroups);

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


