export function parseItems(copy, start, lengthOf, Fn) {
   const items = new Set;
   let offset = start;
   while (true) {
      const item = Fn.from(copy.subarray(offset)); offset += item.length;
      items.add(item);
      if (offset >= lengthOf + start) break;
   }
   return items
}

/**
 * Converts secp384r1 (P-384) private and public key bytes to JWK format
 * 
 * @param {Uint8Array} privateKeyBytes - Raw private key bytes (optional)
 * @param {Uint8Array} publicKeyBytes - Raw public key bytes (uncompressed format with 0x04 prefix)
 * @returns {Object} JWK representation of the key
 */
export function secp384r1ToJwk(privateKeyBytes, publicKeyBytes) {
   // Ensure we have at least one of the keys
   if (!privateKeyBytes && !publicKeyBytes) {
      throw new Error('Either privateKeyBytes or publicKeyBytes must be provided');
   }

   // Handle public key conversion
   const jwk = {};

   if (publicKeyBytes) {
      // Public key should be in uncompressed form starting with 0x04 followed by 
      // x and y coordinates (each 48 bytes for P-384)
      if (publicKeyBytes.length !== 97 || publicKeyBytes[0] !== 4) {
         throw new Error('Invalid public key format. Expected uncompressed format (0x04 + 96 bytes)');
      }

      // Extract x and y coordinates (skipping the 0x04 prefix)
      const xCoord = publicKeyBytes.slice(1, 49);
      const yCoord = publicKeyBytes.slice(49, 97);

      // Base64Url encode coordinates
      jwk.x = base64UrlEncode(xCoord);
      jwk.y = base64UrlEncode(yCoord);
   }

   // Handle private key if provided
   if (privateKeyBytes) {
      if (privateKeyBytes.length !== 48) {
         throw new Error('Invalid private key length. Expected 48 bytes for P-384');
      }

      jwk.d = base64UrlEncode(privateKeyBytes);
   }

   // Set common parameters for secp384r1 curve
   jwk.kty = "EC";
   jwk.crv = "P-384";

   // Set key use based on what's provided
   jwk.key_ops = privateKeyBytes ?
      ["sign"] : // Private key can sign
      ["verify"]; // Public key can verify

   return jwk;
}

/**
 * Helper function to convert bytes to base64url format
 * 
 * @param {Uint8Array} bytes - Byte array to encode
 * @returns {string} base64url encoded string
 */
function base64UrlEncode(bytes) {
   // Convert to regular base64
   const base64 = btoa(String.fromCharCode.apply(null, bytes));

   // Convert to base64url by replacing characters
   return base64
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
}

export async function convertSecp384r1ToJWK(privateKeyBytes, publicKeyBytes) {
   //const crypto = globalThis.crypto || require("crypto").webcrypto; // Ensure WebCrypto API is available

   // Import Private Key
   const privateKey = await crypto.subtle.importKey(
      "raw",
      privateKeyBytes,
      { name: "ECDH", namedCurve: "P-384" },
      true,
      ["deriveBits"]
   );

   // Export Private Key to JWK
   const jwkPrivateKey = await crypto.subtle.exportKey("jwk", privateKey);

   // Import Public Key
   const publicKey = await crypto.subtle.importKey(
      "raw",
      publicKeyBytes,
      { name: "ECDH", namedCurve: "P-384" },
      true,
      []
   );

   // Export Public Key to JWK
   const jwkPublicKey = await crypto.subtle.exportKey("jwk", publicKey);

   return { jwkPrivateKey, jwkPublicKey };
}