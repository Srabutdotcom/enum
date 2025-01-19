import { HandshakeType, EndOfEarlyData } from "../src/handshaketype.js";

console.log(HandshakeType.CLIENT_HELLO);
console.log(HandshakeType.CLIENT_HELLO)

const codes = [1, 2, 4, 5, 8, 11, 13, 15, 20, 24, 254]
for (const e of codes) {
   const parse = HandshakeType.from(new Uint8Array([e]))
   console.log(`name: ${parse.name} value: ${parse.value}`)
}


const eoData = new EndOfEarlyData;
const eoDataHandshake = eoData.handshake;
const eoDataTlsInnerPlaintext = eoDataHandshake.tlsInnerPlaintext();


