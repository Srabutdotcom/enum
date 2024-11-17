import { Enum } from "./enum.d.ts";
import { Constrained, Struct, Uint16 } from "../src/dep.ts";
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

/**
 * Represents a list of NamedGroup instances.
 */
export class NamedGroupList extends Constrained {
    /**
     * Creates a NamedGroupList instance from the provided NamedGroup instances.
     *
     * @param {...NamedGroup} namedgroup - The NamedGroup instances to include in the list.
     * @returns {NamedGroupList} A new instance of NamedGroupList.
     */
    static fromNamedGroup(...namedgroup: NamedGroup[]): NamedGroupList;

    /**
     * Creates a NamedGroupList from a Uint8Array.
     *
     * @static
     * @param {Uint8Array} array - The array to parse into a NamedGroupList.
     * @returns {NamedGroupList} A new instance of NamedGroupList.
     * @throws {Error} If the length of the array is invalid.
     */
    static from(array: Uint8Array): NamedGroupList;

    /**
     * Creates an instance of NamedGroupList.
     *
     * @param {...NamedGroup} namedgroup - The NamedGroup instances to include in the list.
     */
    constructor(...namedgroup: NamedGroup[]);
}

/**
 * Represents a key exchange mechanism.
 */
export class KeyExchange extends Constrained {
    /**
     * Creates a KeyExchange instance from a given octet.
     *
     * @static
     * @param {Uint8Array} octet - The octet to create the KeyExchange from.
     * @returns {KeyExchange} A new instance of KeyExchange.
     */
    static fromKey(octet: Uint8Array): KeyExchange;

    /**
     * Creates a KeyExchange from a Uint8Array.
     *
     * @static
     * @param {Uint8Array} array - The array to parse into a KeyExchange.
     * @returns {KeyExchange} A new instance of KeyExchange.
     * @throws {Error} If the length of the array is invalid.
     */
    static from(array: Uint8Array): KeyExchange;

    /**
     * Creates an instance of KeyExchange.
     *
     * @param {Uint8Array} octet - The octet representing the key exchange.
     */
    constructor(octet: Uint8Array);
}

/**
 * Represents a key share entry.
 */
export class KeyShareEntry extends Struct {
    /**
     * Creates a KeyShareEntry from a Uint8Array.
     *
     * @static
     * @param {Uint8Array} array - The array to parse into a KeyShareEntry.
     * @returns {KeyShareEntry} A new instance of KeyShareEntry.
     */
    static from(array: Uint8Array): KeyShareEntry;

    /**
     * Creates an instance of KeyShareEntry.
     *
     * @param {NamedGroup} group - The NamedGroup associated with the key share.
     * @param {KeyExchange} key_exchange - The KeyExchange associated with the key share.
     */
    constructor(group: NamedGroup, key_exchange: KeyExchange);
}

/**
 * Represents a KeyShare extension in the ClientHello message in TLS handshake.
 */
export declare class KeyShareClientHello extends Constrained {
    /**
     * Array of key share entries included in this KeyShareClientHello instance.
     */
    keyShareEntries: KeyShareEntry[];

    /**
     * Creates a new instance of KeyShareClientHello from multiple KeyShareEntry instances.
     * @param {...KeyShareEntry} keyShareEntries - The key share entries to include.
     * @returns {KeyShareClientHello} An instance of KeyShareClientHello.
     */
    static fromKeyShareEntries(
        ...keyShareEntries: KeyShareEntry[]
    ): KeyShareClientHello;

    /**
     * Creates a new instance of KeyShareClientHello from a Uint8Array.
     * Parses the array to extract KeyShareEntry instances.
     * @param {Uint8Array} array - The byte array containing KeyShareEntry data.
     * @returns {KeyShareClientHello} An instance of KeyShareClientHello.
     */
    static from(array: Uint8Array): KeyShareClientHello;

    /**
     * Constructs a new KeyShareClientHello instance.
     * @param {...KeyShareEntry} keyShareEntries - The key share entries to include in this message.
     */
    constructor(...keyShareEntries: KeyShareEntry[]);
}

/**
 * Represents a KeyShare extension in the HelloRetryRequest message.
 */
export declare class KeyShareHelloRetryRequest extends Uint16 {
    /**
     * Creates a new KeyShareHelloRetryRequest instance from a NamedGroup.
     * @param {NamedGroup} group - The named group to be included in the request.
     * @returns {KeyShareHelloRetryRequest} An instance of KeyShareHelloRetryRequest.
     */
    static fromGroup(group: NamedGroup): KeyShareHelloRetryRequest;

    /**
     * Creates a new KeyShareHelloRetryRequest instance from a byte array.
     * Parses the array to extract the NamedGroup.
     * @param {Uint8Array} array - The byte array containing NamedGroup data.
     * @returns {KeyShareHelloRetryRequest} An instance of KeyShareHelloRetryRequest.
     */
    static from(array: Uint8Array): KeyShareHelloRetryRequest;

    /**
     * Constructs a new KeyShareHelloRetryRequest instance.
     * @param {NamedGroup} group - The named group to be used in this request.
     */
    constructor(group: NamedGroup);
}

/**
 * Represents a KeyShare extension in the ServerHello message in TLS handshake.
 */
export declare class KeyShareServerHello extends Uint16 {
    /**
     * Creates a new KeyShareServerHello instance from a KeyShareEntry.
     * @param {KeyShareEntry} keyShareEntry - The key share entry to be included in the message.
     * @returns {KeyShareServerHello} An instance of KeyShareServerHello.
     */
    static fromKeyShareEntry(keyShareEntry: KeyShareEntry): KeyShareServerHello;

    /**
     * Creates a new KeyShareServerHello instance from a byte array.
     * Parses the array to extract a KeyShareEntry.
     * @param {Uint8Array} array - The byte array containing KeyShareEntry data.
     * @returns {KeyShareServerHello} An instance of KeyShareServerHello.
     */
    static from(array: Uint8Array): KeyShareServerHello;

    /**
     * Constructs a new KeyShareServerHello instance.
     * @param {KeyShareEntry} keyShareEntry - The key share entry to be used in this message.
     */
    constructor(keyShareEntry: KeyShareEntry);
}
