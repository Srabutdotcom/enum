import { Enum } from "./enum.d.ts";
import { Uint16, KeyShareEntry } from "../src/dep.ts";
/**
 * Supported groups - @see https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.7.
 */
export class NamedGroup extends Enum {
    static SECP256R1: NamedGroup;
    static SECP384R1: NamedGroup;
    static SECP521R1: NamedGroup;
    static X25519: NamedGroup;
    static X448: NamedGroup;
    static FFDHE2048: NamedGroup;
    static FFDHE3072: NamedGroup;
    static FFDHE4096: NamedGroup;
    static FFDHE6144: NamedGroup;
    static FFDHE8192: NamedGroup;

    /**
     * Parses an octet array and returns a valid NamedGroup.
     *
     * @static
     * @param {Uint8Array} octet - The octet array to parse.
     * @returns {NamedGroup} The corresponding NamedGroup instance.
     * @throws {Error} If the octet does not correspond to a known NamedGroup.
     */
    static from(octet: Uint8Array): NamedGroup;

    /**
     * Returns the bit length of the NamedGroup.
     * @returns {number} The bit length, which is always 16.
     */
    get bit(): number;

    /**
     * Creates an instance of NamedGroup.
     *
     * @param {string} name - The name of the NamedGroup.
     * @param {number} value - The value associated with the NamedGroup.
     */
    constructor(name: string, value: number);

    /**
     * Converts the NamedGroup to a Uint16 representation.
     *
     * @returns {Uint16} The Uint16 representation of the NamedGroup.
     */
    get Uint16(): Uint16;

    /**
     * Gets the key generation algorithm associated with the NamedGroup.
     *
     * @returns {Function} The key generation function.
     */
    get keyGen(): Function;

    /**
     * Gets the private key associated with the NamedGroup.
     *
     * @returns {Uint8Array} The private key.
     */
    get privateKey(): Uint8Array;

    /**
     * Gets the public key associated with the NamedGroup.
     *
     * @returns {Uint8Array} The public key.
     */
    get publicKey(): Uint8Array;

    /**
     * Computes the shared key with a peer's public key.
     *
     * @param {Uint8Array} peerPublicKey - The public key of the peer.
     * @returns {Uint8Array} The shared secret.
     */
    getSharedKey(peerPublicKey: Uint8Array): Uint8Array;

    /**
     * Creates a key share entry from the NamedGroup.
     *
     * @returns {KeyShareEntry} A new KeyShareEntry instance.
     */
    keyShareEntry(): KeyShareEntry;
}

