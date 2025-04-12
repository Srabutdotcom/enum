import { SignatureScheme } from "../src/signaturescheme.js";
import { assertEquals } from "jsr:@std/assert";

console.log(SignatureScheme.ED448);

const codes = [0x0401, 0x0501, 0x0601, 0x0403, 0x0503, 0x0603, 0x0804, 0x0805, 0x0806, 0x0807, 0x0808, 0x0809, 0x080a, 0x080b]
for (const e of codes) {
   const parse = SignatureScheme.from(new Uint8Array([Math.floor(e / 256), e % 256]))
   console.log(`name: ${parse.name} value: ${parse.value}`)
}

Deno.test("SignatureAlgorithmSchema", () => {
   // Example usage
   const test = SignatureScheme.ED448.byte
   const back = SignatureScheme.from(test).byte;
   assertEquals(test, back)
})







