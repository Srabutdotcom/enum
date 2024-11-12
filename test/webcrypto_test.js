import { Crypto } from "npm:@peculiar/webcrypto"

const crypto = new Crypto;

const keys = await crypto.subtle.generateKey(
   {
     name: "ECDSA",
     namedCurve: "P-256", // P-256, P-384, or P-521
   },
   false,
   ["sign", "verify"],
 );
debugger