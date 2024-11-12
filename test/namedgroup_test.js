import { assertEquals } from "jsr:@std/assert";
import { NamedGroup, NamedGroupList } from "../src/namedgroup.js";
import { KeyShareEntry } from "../src/namedgroup.js";

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
      //create keyShareEntry
      const keyShareEntry = x25519.keyShareEntry();
      const back = KeyShareEntry.from(keyShareEntry);
      assertEquals(back, keyShareEntry)
   }
)

Deno.test("NamedGroupList", () => {
   const test = NamedGroupList.fromNamedGroup(
      NamedGroup.X25519,
      NamedGroup.X448,
      NamedGroup.SECP521R1,
      NamedGroup.SECP384R1,
      NamedGroup.SECP256R1
   )

   const back = NamedGroupList.from(test);
   assertEquals(test, back)

})


