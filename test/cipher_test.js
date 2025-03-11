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

const rnd = crypto.getRandomValues(new Uint8Array(32));

Deno.bench('Using Noble', ()=>{
   const hash1 = Cipher.AES_256_GCM_SHA384.hash.create().update(rnd).digest()
})

Deno.bench('Using webcrypto api', async()=>{
   const hash2 = new Uint8Array(await crypto.subtle.digest("SHA-384", rnd))
})

