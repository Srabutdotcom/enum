// @ts-self-types="../type/cipher.d.ts"

import { sha256, sha384, Uint16 } from "./dep.ts";
import { Enum } from "./enum.js";

export class Cipher extends Enum {
   static AES_128_GCM_SHA256 = new Cipher('AES_128_GCM_SHA256', Uint16.from(Uint8Array.of(0x13, 0x01)).value);
   static AES_256_GCM_SHA384 = new Cipher('AES_256_GCM_SHA384', Uint16.from(Uint8Array.of(0x13, 0x02)).value);
   static CHACHA20_POLY1305_SHA256 = new Cipher('CHACHA20_POLY1305_SHA256', Uint16.from(Uint8Array.of(0x13, 0x03)).value);

   static TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384 = new Cipher('TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384', Uint16.from(Uint8Array.of(0xC0, 0x2C)).value);
   static TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 = new Cipher('TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384', Uint16.from(Uint8Array.of(0xC0, 0x30)).value);
   static TLS_DHE_RSA_WITH_AES_256_GCM_SHA384 = new Cipher('TLS_DHE_RSA_WITH_AES_256_GCM_SHA384', Uint16.from(Uint8Array.of(0x00, 0x9F)).value);
   static TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256 = new Cipher('TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256', Uint16.from(Uint8Array.of(0xCC, 0xA9)).value);
   static TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256 = new Cipher('TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256', Uint16.from(Uint8Array.of(0xCC, 0xA8)).value);
   static TLS_DHE_RSA_WITH_CHACHA20_POLY1305_SHA256 = new Cipher('TLS_DHE_RSA_WITH_CHACHA20_POLY1305_SHA256', Uint16.from(Uint8Array.of(0xCC, 0xAA)).value);
   static TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256 = new Cipher('TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256', Uint16.from(Uint8Array.of(0xC0, 0x2B)).value);
   static TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256 = new Cipher('TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256', Uint16.from(Uint8Array.of(0xC0, 0x2F)).value);
   static TLS_DHE_RSA_WITH_AES_128_GCM_SHA256 = new Cipher('TLS_DHE_RSA_WITH_AES_128_GCM_SHA256', Uint16.from(Uint8Array.of(0x00, 0x9E)).value);
   static TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384 = new Cipher('TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384', Uint16.from(Uint8Array.of(0xC0, 0x24)).value);
   static TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384 = new Cipher('TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384', Uint16.from(Uint8Array.of(0xC0, 0x28)).value);
   static TLS_DHE_RSA_WITH_AES_256_CBC_SHA256 = new Cipher('TLS_DHE_RSA_WITH_AES_256_CBC_SHA256', Uint16.from(Uint8Array.of(0x00, 0x6B)).value);
   static TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256 = new Cipher('TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256', Uint16.from(Uint8Array.of(0xC0, 0x23)).value);
   static TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256 = new Cipher('TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256', Uint16.from(Uint8Array.of(0xC0, 0x27)).value);
   static TLS_DHE_RSA_WITH_AES_128_CBC_SHA256 = new Cipher('TLS_DHE_RSA_WITH_AES_128_CBC_SHA256', Uint16.from(Uint8Array.of(0x00, 0x67)).value);
   static TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA = new Cipher('TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA', Uint16.from(Uint8Array.of(0xC0, 0x0A)).value);
   static TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA = new Cipher('TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA', Uint16.from(Uint8Array.of(0xC0, 0x14)).value);
   static TLS_DHE_RSA_WITH_AES_256_CBC_SHA = new Cipher('TLS_DHE_RSA_WITH_AES_256_CBC_SHA', Uint16.from(Uint8Array.of(0x00, 0x39)).value);
   static TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA = new Cipher('TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA', Uint16.from(Uint8Array.of(0xC0, 0x09)).value);
   static TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA = new Cipher('TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA', Uint16.from(Uint8Array.of(0xC0, 0x13)).value);
   static TLS_DHE_RSA_WITH_AES_128_CBC_SHA = new Cipher('TLS_DHE_RSA_WITH_AES_128_CBC_SHA', Uint16.from(Uint8Array.of(0x00, 0x33)).value);
   static TLS_RSA_WITH_AES_256_GCM_SHA384 = new Cipher('TLS_RSA_WITH_AES_256_GCM_SHA384', Uint16.from(Uint8Array.of(0x00, 0x9D)).value);
   static TLS_RSA_WITH_AES_128_GCM_SHA256 = new Cipher('TLS_RSA_WITH_AES_128_GCM_SHA256', Uint16.from(Uint8Array.of(0x00, 0x9C)).value);
   static TLS_RSA_WITH_AES_256_CBC_SHA256 = new Cipher('TLS_RSA_WITH_AES_256_CBC_SHA256', Uint16.from(Uint8Array.of(0x00, 0x3D)).value);
   static TLS_RSA_WITH_AES_128_CBC_SHA256 = new Cipher('TLS_RSA_WITH_AES_128_CBC_SHA256', Uint16.from(Uint8Array.of(0x00, 0x3C)).value);
   static TLS_RSA_WITH_AES_256_CBC_SHA = new Cipher('TLS_RSA_WITH_AES_256_CBC_SHA', Uint16.from(Uint8Array.of(0x00, 0x35)).value);
   static TLS_RSA_WITH_AES_128_CBC_SHA = new Cipher('TLS_RSA_WITH_AES_128_CBC_SHA', Uint16.from(Uint8Array.of(0x00, 0x2F)).value);
   static TLS_EMPTY_RENEGOTIATION_INFO_SCSV = new Cipher('TLS_EMPTY_RENEGOTIATION_INFO_SCSV', Uint16.from(Uint8Array.of(0x00, 0xFF)).value);

   static from(array) {
      const copy = Uint16.from(array.slice(0, 2)).value;
      return Cipher.fromValue(copy)
   }

   get Uint16() { return Uint16.fromValue(this.value); }
   get byte() { return this.Uint16 }
   get length() { return 2 }

   get hashLength() {
      return this.name.slice(-3) / 8;
   }

   get keyLength() {
      return this.name.startsWith('AES_128') ? 16 : 32
   }

   get hash(){
      const num = parseSHA(this);
      if(num == 256) return sha256;
      if(num == 384) return sha384;
      return sha256
   }
}

function parseSHA(str) {
   const match = str.name.match(/SHA(\d+)/);
   return match ? parseInt(match[1], 10) : null;
}