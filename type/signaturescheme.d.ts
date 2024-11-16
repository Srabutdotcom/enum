import { Enum } from "./enum.d.ts"
import { Uint16, Constrained } from "../src/dep.js";
/**
 * Enumeration of signature schemes as defined in RFC 8446.
 * @see https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.3
 */
export class SignatureScheme extends Enum {
    /** RSASSA-PKCS1-v1_5 algorithms */
    static RSA_PKCS1_SHA256: SignatureScheme;
    static RSA_PKCS1_SHA384: SignatureScheme;
    static RSA_PKCS1_SHA512: SignatureScheme;

    /** ECDSA algorithms */
    static ECDSA_SECP256R1_SHA256: SignatureScheme;
    static ECDSA_SECP384R1_SHA384: SignatureScheme;
    static ECDSA_SECP521R1_SHA512: SignatureScheme;

    /** RSASSA-PSS algorithms with public key OID rsaEncryption */
    static RSA_PSS_RSAE_SHA256: SignatureScheme;
    static RSA_PSS_RSAE_SHA384: SignatureScheme;
    static RSA_PSS_RSAE_SHA512: SignatureScheme;

    /** EdDSA algorithms */
    static ED25519: SignatureScheme;
    static ED448: SignatureScheme;

    /** RSASSA-PSS algorithms with public key OID RSASSA-PSS */
    static RSA_PSS_PSS_SHA256: SignatureScheme;
    static RSA_PSS_PSS_SHA384: SignatureScheme;
    static RSA_PSS_PSS_SHA512: SignatureScheme;

    /**
     * Parses an octet array and returns a valid SignatureScheme.
     * 
     * @static
     * @param {Uint8Array} octet - The octet array to parse.
     * @returns {SignatureScheme} The corresponding SignatureScheme instance.
     * @throws {Error} If the octet does not correspond to a known SignatureScheme.
     */
    static from(octet: Uint8Array): SignatureScheme;

    /** Returns the bit length of the SignatureScheme. */
    get bit(): number;

    /**
     * Converts the SignatureScheme to a Uint16 representation.
     * 
     * @returns {Uint16} The Uint16 representation of the SignatureScheme.
     */
    toUint16(): Uint16;
}

/**
 * Represents a list of supported signature schemes.
 */
export class SignatureSchemeList extends Constrained {
    supported_signature_algorithms: SignatureScheme[];

    /**
     * Creates a SignatureSchemeList instance from the provided signature schemes.
     * 
     * @param {...SignatureScheme} signatureScheme - The signature schemes to include in the list.
     */
    constructor(...signatureScheme: SignatureScheme[]);

    /**
     * Creates a SignatureSchemeList from the provided signature schemes.
     * 
     * @static
     * @param {...SignatureScheme} signatureScheme - The signature schemes to include in the list.
     * @returns {SignatureSchemeList} A new instance of SignatureSchemeList.
     */
    static fromSchemes(...signatureScheme: SignatureScheme[]): SignatureSchemeList;

    /**
     * Creates a SignatureSchemeList from a Uint8Array.
     * 
     * @static
     * @param {Uint8Array} array - The array to parse into a SignatureSchemeList.
     * @returns {SignatureSchemeList} A new instance of SignatureSchemeList.
     * @throws {Error} If the length of the array is invalid.
     */
    static from(array: Uint8Array): SignatureSchemeList;
}
