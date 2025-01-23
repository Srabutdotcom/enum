import { assertEquals } from "jsr:@std/assert";
import { Cipher } from "../src/cipher.js";

Deno.test("Cipher", () => {
   const test = Cipher.AES_128_GCM_SHA256.Uint16;
   const back = Cipher.from(test).Uint16;
   assertEquals(test, back)
})

console.log(Cipher.AES_128_GCM_SHA256.keyLength);
console.log(Cipher.AES_256_GCM_SHA384.hashLength);
console.log(Cipher.CHACHA20_POLY1305_SHA256.keyLength);