import { assertEquals } from "jsr:@std/assert";
import { Cipher } from "../src/cipher.js";

Deno.test("Cipher", () => {
   const test = Cipher.AES_128_GCM_SHA256.Uint16;
   const back = Cipher.from(test).Uint16;
   assertEquals(test, back)
})