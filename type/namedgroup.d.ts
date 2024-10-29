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
        * check octet and return valid SignatureScheme
        *
        * @static
        * @param {Uint8Array} octet
        * @returns {NamedGroup}
        */
    static parse(octet: Uint8Array): NamedGroup;
    /**return 16 */
    get bit(): number;
}
import { Enum } from "../src/enum.js";
