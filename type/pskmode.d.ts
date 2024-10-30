/**
 * Supported groups - @see https://datatracker.ietf.org/doc/html/rfc8446#section-4.2.7.
 */
export class PskKeyExchangeMode extends Enum {
    /**psk_ke:  PSK-only key establishment.  In this mode, the server
       MUST NOT supply a "key_share" value. */
    static PSK_KE: PskKeyExchangeMode;
    /**psk_dhe_ke:  PSK with (EC)DHE key establishment.  In this mode, the
       client and server MUST supply "key_share" values as described in
       Section 4.2.8. */
    static PSK_DHE_KE: PskKeyExchangeMode;
    /**
     * check octet and return valid PskKeyExchangeMode
     *
     * @static
     * @param {Uint8Array} octet
     * @returns {PskKeyExchangeMode }
     */
    static parse(octet: Uint8Array): PskKeyExchangeMode;
    /**return 8 */
    get bit(): number;
}
import { Enum } from "../src/enum.js";
