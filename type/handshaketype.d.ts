/**
 * Represents TLS 1.3 Handshake message types as defined in RFC 8446 Section 4
 * @see https://datatracker.ietf.org/doc/html/rfc8446#section-4
 * @extends {Enum}
 */
export class HandshakeType extends Enum {
    /**
     * Used to initiate handshake and establish cryptographic capabilities - 0x01
     * @returns {HandshakeType}
     */
    static CLIENT_HELLO: HandshakeType;
    /**
     * Response to ClientHello, provides server's cryptographic choices - 0x02
     * @returns {HandshakeType}
     */
    static SERVER_HELLO: HandshakeType;
    /**
     * Used for post-handshake re-authentication and key update - 0x04
     * @returns {HandshakeType}
     */
    static NEW_SESSION_TICKET: HandshakeType;
    /**
     * If the server sent an "early_data" extension in EncryptedExtensions,
    the client MUST send an EndOfEarlyData message after receiving the
    server Finished.  If the server does not send an "early_data"
    extension in EncryptedExtensions, then the client MUST NOT send an
    EndOfEarlyData message. - 0x05
     * @returns {HandshakeType}
     */
    static END_OF_EARLY_DATA: HandshakeType;
    /**
     * Contains cryptographic parameters for server - 0x08
     * @returns {HandshakeType}
     */
    static ENCRYPTED_EXTENSIONS: HandshakeType;
    /**
     * Transmission of end-entity certificate - 0x0B
     * @returns {HandshakeType}
     */
    static CERTIFICATE: HandshakeType;
    /**
     * Digital signature proving possession of private key - 0x0F
     * @returns {HandshakeType}
     */
    static CERTIFICATE_VERIFY: HandshakeType;
    /**
     * Indicates key material computation can begin - 0x14
     * @returns {HandshakeType}
     */
    static FINISHED: HandshakeType;
    /**
     * Request for certificate from client - 0x0D
     * @returns {HandshakeType}
     */
    static CERTIFICATE_REQUEST: HandshakeType;
    /**
     * Message sent post-handshake to update traffic keys - 0x18
     * @returns {HandshakeType}
     */
    static KEY_UPDATE: HandshakeType;
    /**
     * Used by server to send additional parameters - 0x19
     * @returns {HandshakeType}
     */
    static SERVER_PARAMETERS: HandshakeType;
    /**
     * Contains a message hash for transcript - 0xFE
     * @returns {HandshakeType}
     */
    static MESSAGE_HASH: HandshakeType;
    /**
     * Check and return HandshakeType if valid
     *
     * @static
     * @param {Uint8Array} octet - 8 bit or 1 octet
     * @returns {HandshakeType}
     */
    static parse(octet: Uint8Array): HandshakeType;
    /**return 8 */
    get bit(): number;
}
import { Enum } from "../src/enum.js";
