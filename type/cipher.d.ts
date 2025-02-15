import { Uint16 } from "../src/dep.ts";
import { Enum } from "../src/enum.js";

/**
 * Represents a cipher suite used in TLS 1.3.
 * The cipher suite includes the encryption algorithm, mode, and hash function.
 */
export class Cipher extends Enum {
    /**
     * Cipher suite using AES 128 GCM with SHA256 for authentication.
     */
    static AES_128_GCM_SHA256: Cipher;

    /**
     * Cipher suite using AES 256 GCM with SHA384 for authentication.
     */
    static AES_256_GCM_SHA384: Cipher;

    /**
     * Cipher suite using ChaCha20 Poly1305 with SHA256 for authentication.
     */
    static CHACHA20_POLY1305_SHA256: Cipher;

    /**
     * Creates a `Cipher` instance from a binary representation.
     * @param array The binary representation of the cipher suite.
     * @returns The corresponding `Cipher` instance.
     * @throws {TypeError} If the first byte of the input is not `0x13`.
     */
    static from(array: Uint8Array | Array<number>): Cipher;

    /**
     * Gets the 2-byte identifier of the cipher suite.
     * @returns A `Uint8Array` containing the cipher suite identifier.
     */
    get Uint16(): Uint16;
    get byte(): Uint16;
  
    /**
     * Get hash length for respective cipher
     * @returns hash length either 32 or 48 
     */
    get hashLength(): number;

    /**
     * Get key length for respective cipher
     * @returns key length either 16 or 32 
     */
    get keyLength(): number;
}
