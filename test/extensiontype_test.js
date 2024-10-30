import { ExtensionType } from "../src/extensiontype.js";

console.log(ExtensionType.KEY_SHARE);
console.log(ExtensionType.KEY_SHARE)

const codes = [1, 5, 10, 13, 14, 15, 16, 18, 19, 20, 21, 41, 42, 43, 44, 45, 47, 48, 49, 50, 51, 65281]
for (const e of codes) {
   const parse = ExtensionType.parse(new Uint8Array([Math.floor(e / 256), e % 256]))
   console.log(`name: ${parse.name} value: ${parse.value}`)
}
