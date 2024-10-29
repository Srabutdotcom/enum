/**
 * Enumeration of signature schemes as defined in RFC 8446.
 * @see https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.3
 */
export class SignatureScheme extends Enum {
    static RSA_PKCS1_SHA256: SignatureScheme;
    static RSA_PKCS1_SHA384: SignatureScheme;
    static RSA_PKCS1_SHA512: SignatureScheme;
    static ECDSA_SECP256R1_SHA256: SignatureScheme;
    static ECDSA_SECP384R1_SHA384: SignatureScheme;
    static ECDSA_SECP521R1_SHA512: SignatureScheme;
    static RSA_PSS_RSAE_SHA256: SignatureScheme;
    static RSA_PSS_RSAE_SHA384: SignatureScheme;
    static RSA_PSS_RSAE_SHA512: SignatureScheme;
    static ED25519: SignatureScheme;
    static ED448: SignatureScheme;
    static RSA_PSS_PSS_SHA256: SignatureScheme;
    static RSA_PSS_PSS_SHA384: SignatureScheme;
    static RSA_PSS_PSS_SHA512: SignatureScheme;
    /**
     * check octet and return valid SignatureScheme
     *
     * @static
     * @param {Uint8Array} octet
     * @returns {SignatureScheme}
     */
    static parse(octet: Uint8Array): SignatureScheme;
    /**return 16 */
    get bit(): number;
}
import { Enum } from "../src/enum.js";
