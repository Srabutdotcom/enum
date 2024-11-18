// @ts-self-types="../type/cipher.d.ts"

import { Enum } from "./enum.js";

export class Cipher extends Enum {
   static AES_128_GCM_SHA256 = new Cipher('AES_128_GCM_SHA256', 0x01);
   static AES_256_GCM_SHA384 = new Cipher('AES_256_GCM_SHA384', 0x02);
   static CHACHA20_POLY1305_SHA256 = new Cipher('CHACHA20_POLY1305_SHA256', 0x03);
   
   static from(array){
      const copy = Uint8Array.from(array);
      if(copy.at(0)!==0x13)throw TypeError(`Expected 0x13 at index 0`)
      return Cipher.fromValue(copy.at(1))
   }

   get Uint16(){return Uint8Array.of(0x13, +this)}
}

