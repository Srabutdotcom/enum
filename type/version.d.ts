import { Constrained, Struct, Uint16 } from "../src/dep.ts";
/**
 * Version class representing different protocol versions.
 * Extends Enum to provide constants for SSL and TLS versions.
 *
 * @extends Enum
 */
export class Version extends Enum {
    /**
     * SSL 3.0 version with value 0x0300
     * @type {Version}
     */
    static SSL30: Version;
    /**
     * TLS 1.0 version with value 0x0301
     * @type {Version}
     */
    static TLS10: Version;
    /**
     * TLS 1.1 version with value 0x0302
     * @type {Version}
     */
    static TLS11: Version;
    /**
     * TLS 1.2 version with value 0x0303
     * @type {Version}
     */
    static TLS12: Version;
    /**
     * TLS 1.3 version with value 0x0304
     * @type {Version}
     */
    static TLS13: Version;
    /**
     * Legacy version representing TLS 1.2 with value 0x0303
     * @type {Version}
     */
    static legacy: Version;
    /**
     * Parses a 2-byte Uint8Array to determine the corresponding Version instance.
     *
     * @static
     * @param {Uint8Array} octet - The 2-byte array representing a version value.
     * @returns {Version} The matching Version instance.
     * @throws {Error} If the version type in octet is unknown.
     */
    static from(octet: Uint8Array): Version;
    /**
     * Gets the bit size of the version (16 bits).
     *
     * @returns {number} The bit size of the version.
     */
    get bit(): number;
    /**
     * Converts this Version instance to a ProtocolVersion.
     *
     * @returns {ProtocolVersion} A ProtocolVersion instance representing this Version.
     */
    protocolVersion(): ProtocolVersion;
}
/**
 * Represents a Protocol Version as a 16-bit unsigned integer.
 * Extends Uint16 to handle 2-byte representations of protocol versions.
 */
export class ProtocolVersion extends Uint16 {
    /**
     * Creates a ProtocolVersion instance from a Version.
     *
     * @param {Version | number} version - A `Version` instance or a version number (as a 16-bit integer).
     */
    constructor(version: Version | number);
    /**
     * The `Version` instance associated with this `ProtocolVersion`.
     * @type {Version}
     */
    version: Version;
    /**
     * Creates a new ProtocolVersion from a Version instance.
     *
     * @static
     * @param {Version} version - The `Version` instance to convert to a ProtocolVersion.
     * @returns {ProtocolVersion} A new `ProtocolVersion` instance representing the specified version.
     */
    static fromVersion(version: Version): ProtocolVersion;
    /**
     * Parses a Uint8Array and creates a ProtocolVersion.
     *
     * @static
     * @param {Uint8Array} array - A 2-byte array representing a protocol version.
     * @returns {ProtocolVersion} A new `ProtocolVersion` instance based on the parsed array.
     * @throws {Error} If the array does not represent a valid Version.
     */
    static from(array: Uint8Array): ProtocolVersion;
}

import { Enum } from "../type/enum.d.ts";
