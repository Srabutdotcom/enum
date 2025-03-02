import { assertEquals } from "jsr:@std/assert";
import { Cipher } from "../src/cipher.js";

Deno.test("Cipher", () => {
   const test = Cipher.AES_128_GCM_SHA256.byte;
   const back = Cipher.from(test).byte;
   assertEquals(test, back)
})

console.log(Cipher.AES_128_GCM_SHA256.keyLength);
console.log(Cipher.AES_256_GCM_SHA384.hashLength);
console.log(Cipher.CHACHA20_POLY1305_SHA256.keyLength);

const test = Cipher.AES_128_GCM_SHA256.byte;
const back = Cipher.from(test).byte;
